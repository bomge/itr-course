import {
	Text,
	Image,
	Button,
	Box,
	Stack,
	useMantineColorScheme,
	Group,
	Flex,
	Anchor,
	Input,
} from '@mantine/core';
import {
	IconHeart,
	IconMinus,
	IconPlus,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import ObjectId from 'bson-objectid';

import placeholder_collection from '../../assets/placeholder.png';
import classes from './Collection.page.module.css';
import {
	Link,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import ItemCard_simple from '@/components/Cards/ItemCard_simple/ItemCard_simple';
import CharacteristicsForm, {
	Fields,
} from '@/components/CharacteristicInput/CharacteristicInput';
import AddCard_SearchPage from '@/components/Cards/AddCard_SearchPage/AddCard_SearchPage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import CollectionTypeSelect from '@/components/TypeInput/TypeInput';
import { toast } from 'react-toastify';
import ActionIconAuth from '@/components/ActionIconAuth/ActionIconAuth';
import { deleteItemAPI, handleLike } from '@/api/api';
import DeleteIcon from '@/components/DeleteBtn/DeleteBtn';
import { useAuthStore } from '@/stores/authStore_zutands';
import { axiosPrivate } from '@/api/axios';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import { useTranslation } from 'react-i18next';
import TextRchEditor from '@/components/TextRchEditor/TextRchEditor';
export type ItemCardCollectionPage = {
	img: string;
	title: string;
	id: string;
	_id?: string;
	isLiked?: boolean;
};

const maxDescriptionLength = 145;

let changedEditro = false;


function CollectionPage({ isCreate = false }) {
	const { collectionID } = useParams();
	const axios = useAxiosPrivate({ noToastError: true });
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [isLoading,setIsLoading] = useState(true)
	const [canEdit, setCanEdit] = useState(isCreate);

	const [expand, setExpand] = useState(false);
	const [isLiked, setIsLiked] = useState(true);

	const [owner, setOwner] = useState('');
	const [ownerId, setOwnerId] = useState('');
	const [description, setDescription] = useState(t('general.description'));
	const [description_text, setDescription_text] = useState(
		t('general.description'),
	);
	const [allowedFields, setAllowedFields] = useState<Fields>([]);
	const [title, setTitle] = useState(t('general.title'));
	const [items, setItems] = useState<ItemCardCollectionPage[]>([]);
	const [type, setType] = useState('');
	const [_id, set_Id] = useState(collectionID || new ObjectId().toString());

	const [imageUploaded, setImageUploaded] = useState(false);

	const [effect, setEffect] = useState(true);
	const [isEdit, setIsEdit] = useState(isCreate);

	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';
	const handleExpand = () => {
		setExpand(!expand);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { userinfo } = useAuthStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		async function fetchData() {
			// otrybite mne ryki
			const { data } = await axios.get(`/collections/${collectionID}`);
			const {
				description,
				description_text,
				title,
				items,
				allowedFields,
				owner: { _id: ownerId, name },
				type: { type },
				isLiked,
				_id,
				img,
			} = data;
			setDescription(description);
			setDescription_text(description_text);
			setTitle(title);
			setItems(items);
			setAllowedFields(allowedFields);
			setOwner(name);
			setOwnerId(ownerId);
			setType(type);
			setIsLiked(isLiked);
			set_Id(_id);
			setImage(img);
			// editor?.commands.setContent(description);
			if (ownerId === userinfo?.id) {
				setCanEdit(true);
			}

			setIsLoading(false)
		}
		if (collectionID) {
			//fetch collection data

			fetchData().catch((e) => {
				console.error('fetch err');
				navigate('/');
			});
		} else if (isCreate) {
			//if creaction
			setOwner(userinfo!.name);
			setOwnerId(userinfo!.id);
		}
	}, [collectionID, axios, isCreate, navigate, effect]);

	const handleSave = async () => {
		const postData = {
			description,
			description_text,
			allowedFields: allowedFields.filter((a) => a.type && a.name),
			title,
			type,
			_id,
			updImg: imageUploaded,
		};
		const { data } = await axios.post(
			`/collections/${collectionID || 'new'}`,
			postData,
		);
		setAllowedFields(data.allowedFields);

		setEffect((p) => !p);
		isCreate && navigate(`/collection/${data._id}`);

		toast.success(
			isCreate
				? t('collectionPage.created_collection')
				: t('collectionPage.updated_collection'),
		);
	};
	const handleBtnSave = async () => {
		if (isEdit) {
			await handleSave();
		}
		setIsEdit((v) => !v);
	};
	const getDescriptionText = () => {
		return expand ? description : description.slice(0, maxDescriptionLength);
	};

	// truncate="end"
	// items;
	//fakeItems_collectPage
	const itemsDiv = items.map((item, i) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
		<ItemCard_simple item={item} key={i} />
	));
	canEdit &&
		itemsDiv.unshift(
			<AddCard_SearchPage
				key={itemsDiv.length + 1}
				page="collection"
				id={collectionID}
			/>,
		);
	const editor = useEditor({
		extensions: [StarterKit, TextStyle, Color, Underline, Highlight],
		content: description,
		onUpdate: () => {
			setDescription(editor?.getHTML() || '');
			setDescription_text(editor?.getText() || '');
		},
	});
	useEffect(() => {
		if (!changedEditro && editor && description !== 'Description') {
			editor?.commands?.setContent(description);
			changedEditro = true;
		}
	}, [description, editor]);
	const handleDelete = async () => {
		await deleteItemAPI({ type: 'collections', id: collectionID as string });
		toast.success(t('collectionPage.deleted_collection'));
		navigate('/');
	};

	const [image, setImage] = useState('');

	const [isUploading, setIsUploading] = useState(false);

	if(isLoading){
		t('general.loading')
	}

	return (
		<>
			<Box>
				<Stack maw="80vw" m="auto" gap="0" mt="4em">
					<Text
						style={{
							marginBottom: '20px',
							fontSize: '14px',
							// marginBottom: 10,
						}}
					>
						{/* biome-ignore lint/style/useTemplate: <explanation> */}
						{t('general.collection') + ' '}{' '}
						{isCreate ? (
							t('collectionPage.creatingNewCollection')
						) : (
							<Anchor
								component={Link}
								to={`/collection/${collectionID}`}
								style={{ color: 'inherit', fontSize: '14px' }}
							>
								{title}
							</Anchor>
						)}
					</Text>

					<div
						style={{
							position: 'relative',
							display: 'flex',
							alignSelf: 'center',
						}}
					>
						{canEdit && (
							<>
								<Button
									pos="absolute"
									right="0"
									top="0.5em"
									radius="9px 0px 0px 9px"
									onClick={handleBtnSave}
									disabled={isUploading}
								>
									{isEdit
										? isCreate
											? t('general.create')
											: t('general.save')
										: t('general.edit')}{' '}
								</Button>
								{!isCreate && <DeleteIcon handleDelete={handleDelete} />}
							</>
						)}

						<Stack maw="360" className={classes.imageSection}>
							<div style={{ width: '360', height: '240' }}>
								<Image
									radius="sm"
									src={image || placeholder_collection}
									m="auto"
									className={classes.imgMain}
									w="360"
									h="240"
									fit="contain"
									maw="100%"
								/>
							</div>
							{isEdit && (
								<ImageUpload
									collectableId={_id}
									image={image}
									isUploading={isUploading}
									setImage={setImage}
									setIsUploading={setIsUploading}
									setImageUploaded={setImageUploaded}
								/>
							)}
						</Stack>
					</div>

					<Group m="auto">
						{isEdit ? (
							<Input
								value={title}
								onChange={(event) => setTitle(event.currentTarget.value)}
								style={{
									fontSize: 30,
									fontWeight: 700,
									textAlign: 'center',
								}}
								placeholder={t('general.title')}
								// w='2em'
								mt="0.4em"
								mb="0.0em"
								pb="0"
								// h='0.3em'
							/>
						) : (
							<Text
								style={{
									fontSize: 30,
									fontWeight: 700,
									textAlign: 'center',
								}}
							>
								{title}
							</Text>
						)}
						<ActionIconAuth
							className={classes['main-heart']}
							variant="transparent"
							m="auto"
							onClick={() =>
								handleLike({
									id: collectionID as string,
									setIsLiked: setIsLiked,
									type: 'collections',
								})
							}
						>
							<IconHeart
								size={24}
								color="red"
								fill={isLiked ? 'red' : 'transparent'}
							/>
						</ActionIconAuth>
					</Group>

					<Text
						style={{
							fontSize: 14,
							textAlign: 'center',
						}}
						className={classes.author}
					>
						{t('general.author')}{' '}
						<Anchor
							component={Link}
							size="14px"
							className={classes['author-link']}
							to={`/user/${ownerId}`}
							underline="never"
						>
							{owner}
						</Anchor>
					</Text>
					{!isEdit && (
						<Text
							style={{
								fontSize: 14,
								marginBottom: 10,
								textAlign: 'center',
							}}
							className={classes.author}
						>
							{t('general.category')}:{' '}
							<Anchor
								component={Link}
								size="14px"
								className={classes['author-link']}
								to={`/search?text=${type}`}
								underline="never"
							>
								{type}
							</Anchor>
						</Text>
					)}
					{isEdit && (
						<>
							<CollectionTypeSelect type={type} setType={setType} />
							<div style={{ textAlign: 'center', width: '100%' }}>
								{t('general.characteristics')}
							</div>
							<CharacteristicsForm
								fields={allowedFields}
								setFields={setAllowedFields}
								charsctsType="setInputTypes"
							/>
						</>
					)}

					{isEdit ? (
						<TextRchEditor editor={editor}/>
					) : (
						<Text
							style={{
								fontSize: 14,
								textAlign: 'center',
								wordWrap: 'break-word',
							}}
							mt="1em"
							mb="20px"
							span
						>
							{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
							<div dangerouslySetInnerHTML={{ __html: getDescriptionText() }} />
							<br />
							{description.length > maxDescriptionLength && (
								<Button
									onClick={handleExpand}
									className={classes['descr-btn']}
									color="none"
								>
									{expand ? (
										<>
											<IconMinus size={16} /> {t('general.collapse')}
										</>
									) : (
										<>
											<IconPlus size={16} /> {t('general.expand')}
										</>
									)}
								</Button>
							)}
						</Text>
					)}

					<Text
						style={{
							fontSize: 24,
							fontWeight: 500,
							marginBottom: 20,
							textAlign: 'center',
						}}
					>
						{t('general.items')}
					</Text>
					<Flex
						style={{
							marginBottom: 20,
						}}
						wrap="wrap"
						gap="5em"
						justify="center"
					>
						{itemsDiv}
					</Flex>
					{items.length > 5 && (
						<Button
							style={{
								// width: '100%',
								width: 'fit-content',
								padding: '5px 10px',
								marginBottom: '20px',
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
							variant={dark ? 'outline' : 'light'}
							color="gray"
							radius="md"
						>
							{t('general.showMore')}
						</Button>
					)}
					{items.length === 0 && (
						<Text
							style={{
								fontSize: 17,
								fontWeight: 300,
								textAlign: 'center',
								marginBottom: '2em',
							}}
						>
							{t('collectionPage.noItems')}
						</Text>
					)}
				</Stack>
			</Box>
		</>
	);
}
export default CollectionPage;
