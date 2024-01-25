import { Avatar, Menu, rem } from '@mantine/core';

import classes from './AvatarMenu.module.css';
import { IconLogout, IconPhotoStar } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore_zutands';
import { useTranslation } from 'react-i18next';

export default function AvatarMenu({ closeDrawer }) {
	const { t } = useTranslation();
	const { userinfo } = useAuthStore();
	const navigate = useNavigate();
	const { logout } = useAuthStore();

	return (
		<Menu
			withArrow
			styles={{
				dropdown: {
					zIndex: 9999999,
				},
			}}
		>
			<Menu.Target>
				<Avatar color="gray" className={classes.avatar} />
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>
					{userinfo?.name || 'No Name'}
					<br />
					{userinfo?.email}
				</Menu.Label>
				<Menu.Item
					leftSection={
						<IconPhotoStar
							style={{ width: rem(16), height: rem(16) }}
							stroke={1.5}
						/>
					}
					component={Link}
					to={`/user/${userinfo?.id}`}
				>
					{t('header.avatarMenu.myCollection')}
				</Menu.Item>
				<Menu.Item
					onClick={() => {
						logout();
						closeDrawer();
						navigate('/'); //temporarily (hope so)
						navigate(-1);
					}}
					leftSection={
						<IconLogout
							style={{ width: rem(16), height: rem(16) }}
							stroke={1.5}
						/>
					}
				>
					{t('header.avatarMenu.logOut')}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
