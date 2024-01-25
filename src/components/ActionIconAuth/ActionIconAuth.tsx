import { ActionIcon, ActionIconProps } from '@mantine/core';
import { Bounce, toast } from 'react-toastify';
import { useAuthStore } from '@/stores/authStore_zutands';
import { useTranslation } from 'react-i18next';

interface ActionIconAuthProps extends ActionIconProps {
	onClick?: () => void;
}

export default function ActionIconAuth({
	children,
	...props
}: ActionIconAuthProps) {
	const { t } = useTranslation();
	const { userinfo } = useAuthStore();
	const handleClick = () => {
		if (!userinfo) {
			toast.error(t('api.errors.onlyForAuthed'), {
				autoClose: 3000,
				closeOnClick: true,
				theme: 'light',
				transition: Bounce,
			});
		} else {
			if (props.onClick) props.onClick();
		}
	};

	return (
		<ActionIcon {...props} onClick={handleClick}>
			{children}
		</ActionIcon>
	);
}
