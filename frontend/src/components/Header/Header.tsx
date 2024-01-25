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
import SearchBar from './SearchBar/SearchBar';
import AvatarMenu from './AvatarMenu/AvatarMenu';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import { useAuthStore } from '@/stores/authStore_zutands';
import { useTranslation } from 'react-i18next';

export type FormType = 'login' | 'register';
export type UserState = { name: string; email: string; id: string };

export default function Header() {
	const { t } = useTranslation();
	const [
		drawerOpened,
		{ toggle: toggleDrawer, close: closeDrawer, open: openDrawer },
	] = useDisclosure(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [type, toggle] = useToggle<FormType>(['login', 'register']);

	const { userinfo } = useAuthStore();

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
						padding: 0,
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
					closeModal={close}
					openDrawer={openDrawer}
				/>
			</Modal>

			<Box pb={5}>
				<header className={classes.header}>
					<Group justify="space-between" h="100%">
						{/* <MantineLogo size={30} /> */}
						<Link to="/">
							<Image src={siteIcon} alt="Logo" mt="0.2em" />
						</Link>

						<Group h="100%" gap={0} visibleFrom="sm">
							<Link to="/" className={classes.link}>
								{t('header.home')}
							</Link>
							<Link to="/" className={classes.link}>
								{t('header.collections')}
							</Link>
						</Group>

						<Group visibleFrom="xxs">
							<SearchBar />

							<Group visibleFrom="sm">
								<LanguagePicker />
								<ThemeSwitcher />
								{userinfo ? (
									<AvatarMenu closeDrawer={closeDrawer} />
								) : (
									<>
										<Button
											variant="default"
											radius="md"
											onClick={HandleLogBtn_modal}
										>
											{t('header.logIn')}
										</Button>
										<Button radius="md" onClick={HandleRegBtn_modal}>
											{t('header.signUp')}
										</Button>
									</>
								)}
							</Group>
						</Group>

						<Burger
							opened={drawerOpened}
							onClick={toggleDrawer}
							// hiddenFrom="md"
							hiddenFrom="sm"
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
							{userinfo ? <AvatarMenu closeDrawer={closeDrawer} /> : <></>}
							<LanguagePicker />
							<ThemeSwitcher />
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
						<SearchBar  />

						<a href="#" className={classes.link}>
							{t('header.home')}
						</a>

						<a href="#" className={classes.link}>
							{t('header.collections')}
						</a>

						<Divider my="sm" />

						{!userinfo ? (
							<Group justify="center" grow pb="xl" px="md">
								<Button variant="default" onClick={HandleLogBtn_modal}>
									{t('header.logIn')}
								</Button>
								<Button pr="10px" onClick={HandleRegBtn_modal}>
									{t('header.signUp')}
								</Button>
							</Group>
						) : (
							<></>
						)}
					</ScrollArea>
				</Drawer>
			</Box>
		</div>
	);
}
