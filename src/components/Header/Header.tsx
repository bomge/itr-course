import {
	Group,
	Button,
	Divider,
	Box,
	Burger,
	Drawer,
	ScrollArea,
	rem,
	Modal,
	Image,
} from '@mantine/core';
import { useDisclosure, useToggle } from '@mantine/hooks';


import siteIcon from '../../assets/collector-logo.svg';

import classes from './Header.module.css';
import { LanguagePicker } from './LanguagePicker/LanguagePicker';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal_tabs from '../AuthForm/authform_tabs';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import SearchBar from './SearchBar/SearchBar';
import AvatarMenu from './AvatarMenu/AvatarMenu';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';

export type FormType = 'login' | 'register';
export type UserState = {name: string, email: string, id:string}

export default function Header() {
	const [searchText, setSearchText] = useState('');
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer, open: openDrawer }] =
		useDisclosure(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [type, toggle] = useToggle<FormType>(['login', 'register']);



	const authUser = useAuthUser() as UserState | null;
	const [user, setUser] = useState<UserState | null>(authUser);

	function HandleLogBtn_modal() {
		closeDrawer();
		if (type !== 'login') {
			toggle();
		}
		open();
	}
	function HandleRegBtn_modal() {
		closeDrawer();
		if (type !== 'register') {
			toggle();
		}
		open();
	}


	return (
		<div className={classes.mainHeader}>

			<Modal
				opened={opened}
				onClose={close}
				centered
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
				radius="md"
				p="xl"
				styles={{
					root: {
						padding:0
					},
					header: {
						position: 'absolute',
						right: '1em',
						top: '0.15em',
						background: 'none',
					},
					overlay: {
						zIndex: 999,
					},
					inner: {
						zIndex: 999,
						// width: mobile ? 'auto' : '100%',
						// width:'auto'
					},
				}}
				// trapFocus
			>
				{/* <AuthModal type={type} toggle={toggle}/> */}


				<AuthModal_tabs
					activeTab={type}
					toggle={toggle}
					setUser={setUser}
					closeModal={close}
					openDrawer={openDrawer}
				/>
			</Modal>

			<Box pb={5}>
				<header className={classes.header}>
					<Group justify="space-between" h="100%">
						{/* <MantineLogo size={30} /> */}
						<Link to="/" >
							<Image src={siteIcon} alt="Logo" mt='0.2em'/>
						</Link>

						<Group h="100%" gap={0} visibleFrom="sm">
							<Link to="/" className={classes.link}>
								Home
							</Link>
							<Link to="/" className={classes.link}>
								Collections
							</Link>
						</Group>

						<Group visibleFrom="xxs">
							<SearchBar value={searchText} setValue={setSearchText} />
							
							<Group visibleFrom="md">
								<LanguagePicker />
								<ThemeSwitcher/>
								{user ? (
									<AvatarMenu/>
								) : (
									<>
										<Button
											variant="default"
											radius="md"
											onClick={HandleLogBtn_modal}
										>
											Log in
										</Button>
										<Button radius="md" onClick={HandleRegBtn_modal}>
											Sign up
										</Button>
									</>
								)}
							</Group>
						</Group>

						<Burger
							opened={drawerOpened}
							onClick={toggleDrawer}
							hiddenFrom="md"
						/>
					</Group>
				</header>

				<Drawer
					opened={drawerOpened}
					onClose={closeDrawer}
					size="100%"
					padding="md"
					title={
						<Group pb="0">
							{user ? (
								<AvatarMenu/>
							) : (<></>)}
							<LanguagePicker />
							<ThemeSwitcher/>
						</Group>
					}
					hiddenFrom="md"
					zIndex={1000000}
					styles={{
						header: {
							paddingBottom: 0,
						},
						inner: {
							width: 'auto',
						},
						close: {
							display: 'none',
						},
					}}
				>
					<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
						<Divider my="sm" mt="5px" />
						<SearchBar value={searchText} setValue={setSearchText} />
						
						
						<a href="#" className={classes.link}>
							Home
						</a>

						<a href="#" className={classes.link}>
							Collections
						</a>

						<Divider my="sm" />

						{!user ? 
							
							<Group justify="center" grow pb="xl" px="md">
								<Button variant="default" onClick={HandleLogBtn_modal}>
								Log in
								</Button>
								<Button pr='10px' onClick={HandleRegBtn_modal}>Sign up</Button>
							</Group>
							: <></>
						}
					</ScrollArea>
				</Drawer>
			</Box>
		</div>
	);
}
