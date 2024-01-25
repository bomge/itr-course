import { Button, Flex, Input, Loader, Text } from '@mantine/core';
import { useRef, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const validFileTypes = [
	'image/jpg',
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/bmp',
	'image/svg',
];

type ImageUploadProps = {
	isUploading: boolean;
	setIsUploading: (boolean) => void;
	image: string;
	setImage: (string) => void;
	setImageUploaded: (string) => void;
	collectableId: string;
};

export default function ImageUpload({
	isUploading,
	setIsUploading,
	image,
	setImage,
	collectableId,
	setImageUploaded,
}: ImageUploadProps) {
	const axiosPrivate = useAxiosPrivate();
	const [error, setError] = useState('');
	const { t } = useTranslation();

	const handleUpload = (event) => {
		setError('');
		const file = event.target.files[0];
		// if (!validFileTypes.find((type) => type === file.type)) {
		// 	setError('File must be in JPG/PNG format');
		// 	console.log(file.type)
		// 	return;
		// }
		//Display preview
		const url = URL.createObjectURL(file);
		setImage(url);
	};
	const inputImgRef = useRef<HTMLInputElement>(null);
	const handleSubmitImg = async () => {
		if (!image) {
			return setError(t('fileInput.noFileSelected'));
		}
		const file = inputImgRef.current?.files?.[0];
		if (!file) return;
		if (!validFileTypes.find((type) => type === file.type)) {
			return setError(t('fileInput.errorType'));
		}
		const formData = new FormData();
		formData.append('image', file);
		formData.append('collectableId', collectableId);
		setIsUploading(true);
		try {
			const { data } = await axiosPrivate.post('/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			toast.success(t('fileInput.successUpload'));
			setIsUploading(false);
			setImageUploaded(true);
		} catch (e) {
			setIsUploading(false);
		}
	};
	return (
		<>
			<>
				<Flex>
					<Input
						ref={inputImgRef}
						id="imageInput"
						type="file"
						hidden
						accept="image/*"
						onChange={handleUpload}
						h="1.5em"
						w="50%"
					/>
					{isUploading && <Loader size={30} />}
					<Button w="50%" disabled={isUploading} onClick={handleSubmitImg}>
						{t('fileInput.upload')}
					</Button>
				</Flex>
				{error && (
					<Text ta="center" color="red">
						{error}
					</Text>
				)}
			</>
		</>
	);
}
