import { IconTrash } from '@tabler/icons-react';
import ActionIconAuth from '../ActionIconAuth/ActionIconAuth';
import { Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

type DeleteBtnProps = {
	handleDelete: () => void;
};

export default function DeleteBtn({ handleDelete }: DeleteBtnProps) {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMediaQuery('(max-width:48em)');
	const handleIconClick = () => {
		setIsOpen(true);
	};
	const { t } = useTranslation();

	return (
		<>
			<ActionIconAuth
				pos="absolute"
				right="0"
				top="3em"
				radius="9px 0px 0px 9px"
				variant="outline"
				color="#ff13139e"
				onClick={handleIconClick}
			>
				<IconTrash />
			</ActionIconAuth>

			<Modal
				opened={isOpen}
				onClose={() => setIsOpen(false)}
				centered={isMobile}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
				title={t('deleteModal.confirmDelTile')}
				mt="2em"
				styles={{
					title: {
						fontWeight: '640',
					},
					header: {
						right: '1em',
						top: '0.15em',
						background: 'none',
					},
					content: {
						marginTop: '1.5em',
					},
				}}
			>
				<p>{t('deleteModal.modalText')}</p>
				<Group className="mt-4">
					<Button onClick={() => setIsOpen(false)} variant="outline">
						{t('general.cancel')}
					</Button>
					<Button
						color="#ff13139e"
						onClick={() => {
							setIsOpen(false);
							handleDelete();
						}}
					>
						{t('general.delete')}
					</Button>
				</Group>
			</Modal>
		</>
	);
}
