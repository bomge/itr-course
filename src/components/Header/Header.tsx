import {
	Group,
	Button,
	Divider,
	Box,
	Burger,
	Drawer,
	ScrollArea,
	rem,
	Autocomplete,
	Modal,
	Avatar,
	Menu,
} from '@mantine/core';
import { useDisclosure, useMediaQuery, useToggle } from '@mantine/hooks';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import {
	IconSun,
	IconMoonStars,
	IconSearch,
	IconHeart,
	IconLogout,
	IconPhotoStar,
} from '@tabler/icons-react';

import siteIcon from '../../assets/collector-logo.svg';

import classes from './Header.module.css';
import { LanguagePicker } from './LanguagePicker/LanguagePicker';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal_tabs from '../AuthForm/authform_tabs';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

type FormType = 'login' | 'register';

export default function Header() {
	const [searchText, setSearchText] = useState('');
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [type, toggle] = useToggle<FormType>(['login', 'register']);

	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';
	const mobile = useMediaQuery('(max-width:48em)');

	const authUser = useAuthUser();
	const signOut = useSignOut();
	const [user, setUser] = useState(authUser);

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
			{/* <div>{JSON.stringify(authUser)}</div> */}

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
						width: mobile ? 'auto' : '100%',
						// width:'auto'
					},
				}}
				trapFocus
			>
				{/* <AuthModal type={type} toggle={toggle}/> */}

				{/* @ts-expect-error  prost*/}

				<AuthModal_tabs
					activeTab={type}
					toggle={toggle}
					setUser={setUser}
					closeModal={close}
				/>
			</Modal>

			<Box pb={5}>
				<header className={classes.header}>
					<Group justify="space-between" h="100%">
						{/* <MantineLogo size={30} /> */}
						<Link to="/">
							<img src={siteIcon} alt="Logo" />
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
							<Autocomplete
								placeholder="Search"
								leftSection={
									<IconSearch
										style={{ width: rem(16), height: rem(16) }}
										stroke={1.5}
									/>
								}
								data={[
									'React',
									'Angular',
									'Vue',
									'Next.js',
									'Riot.js',
									'Svelte',
									'Blitz.js',
								]}
								visibleFrom="xxs"
								radius="md"
								value={searchText}
								onChange={setSearchText}
							/>
							<Group visibleFrom="md">
								<LanguagePicker />
								<ActionIcon
									//   variant="outline"
									variant={dark ? 'default' : 'outline'}
									color={dark ? 'yellow' : 'blue'}
									onClick={() => toggleColorScheme()}
									title="Toggle color scheme"
									size="lg"
								>
									{dark ? (
										<IconSun size="1.2rem" color="#FCC419" />
									) : (
										<IconMoonStars size="1.1rem" />
									)}
								</ActionIcon>
								{user ? (
									<Menu>
										<Menu.Target>
											<Avatar color="gray" className={classes.avatar}/>
										</Menu.Target>
										<Menu.Dropdown>
											<Menu.Item
												leftSection={
													<IconPhotoStar
														style={{ width: rem(16), height: rem(16) }}
														stroke={1.5}
													/>
												}
											>
												My collections
											</Menu.Item>
											<Menu.Item
												onClick={() => {
													signOut();
													setUser(null);
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
								<Menu withArrow styles={{
									dropdown:{
										zIndex:9999999
									}
								}}>
									<Menu.Target>
										<Avatar color="gray" className={classes.avatar}/>
									</Menu.Target>
									<Menu.Dropdown>
										<Menu.Item
											leftSection={
												<IconPhotoStar
													style={{ width: rem(16), height: rem(16) }}
													// color="yellow"
													stroke={1.5}
												/>
											}
										>
												My collections
										</Menu.Item>
										<Menu.Item
											onClick={() => {
												signOut();
												setUser(null);
												closeDrawer();
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
							) : (<></>)}
							<LanguagePicker />
							<ActionIcon
								variant={dark ? 'default' : 'outline'}
								color={dark ? 'yellow' : 'blue'}
								onClick={() => toggleColorScheme()}
								title="Toggle color scheme"
								size={'lg'}
							>
								{dark ? (
									<IconSun size="1.1rem" color="#FCC419" />
								) : (
									<IconMoonStars size="1.1rem" />
								)}
							</ActionIcon>
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
						<Autocomplete
							placeholder="Search"
							leftSection={
								<IconSearch
									style={{ width: rem(16), height: rem(16) }}
									stroke={1.5}
								/>
							}
							data={[
								'React',
								'Angular',
								'Vue',
								'Next.js',
								'Riot.js',
								'Svelte',
								'Blitz.js',
							]}
							// visibleFrom="xxs"
							radius="md"
							mb="1em"
							comboboxProps={{ zIndex: 9999999 }}
							value={searchText}
							onChange={setSearchText}
						/>
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
