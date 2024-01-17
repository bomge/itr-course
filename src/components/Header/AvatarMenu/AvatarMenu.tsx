import { Avatar, Menu, rem } from '@mantine/core';

import classes from './AvatarMenu.module.css';
import { IconLogout, IconPhotoStar } from '@tabler/icons-react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { UserState } from '../Header';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Link, useNavigate } from 'react-router-dom';

export default function AvatarMenu() {

	const authUser = useAuthUser() as UserState;
	const signOut = useSignOut();
	const navigate = useNavigate();
	
	return (
		<Menu withArrow styles={{
			dropdown:{
				zIndex:9999999
			}
		}}>
			<Menu.Target>
				<Avatar color="gray" className={classes.avatar} />
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>
					{authUser?.name || 'No Name'}
					<br />
					{authUser.email}
				</Menu.Label>
				<Menu.Item
					leftSection={
						<IconPhotoStar
							style={{ width: rem(16), height: rem(16) }}
							stroke={1.5}
						/>
					}
					component={Link}
					to={`/user/${authUser.id}`}
					
				>
					My collections
				</Menu.Item>
				<Menu.Item
					onClick={() => {
						signOut();
						// setUser(null);
						navigate('/refresh');
						navigate(-1);
					}}
					leftSection={
						<IconLogout
							style={{ width: rem(16), height: rem(16) }}
							stroke={1.5}
						/>
					}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
