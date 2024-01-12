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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars, IconSearch } from '@tabler/icons-react';

import siteIcon from '../../assets/collector-logo.svg';

import classes from './Header.module.css';
import { LanguagePicker } from './LanguagePicker/LanguagePicker';
import { useState } from 'react';

export default function Header() {
	const [searchText, setSearchText] = useState('');
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	return (
		<div className={classes.mainHeader}>
			<Box pb={5}>
				<header className={classes.header}>
					<Group justify="space-between" h="100%">
						{/* <MantineLogo size={30} /> */}
						<a href="#">
							<img src={siteIcon} alt="Logo" />
						</a>

						<Group h="100%" gap={0} visibleFrom="sm">
							<a href="#" className={classes.link}>
							Home
							</a>
							<a href="#" className={classes.link}>
							Collections
							</a>
						</Group>

						<Group visibleFrom="xxs">
							<Autocomplete
								placeholder="Search"
								leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
								data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
								visibleFrom="xxs"
								radius='md'
								value={searchText}
								onChange={setSearchText} 
							/>
							<Group visibleFrom='md'>

								<LanguagePicker />
								<ActionIcon
									//   variant="outline"
									variant={dark ? 'default' : 'outline'}
									color={dark ? 'yellow' : 'blue'}
									onClick={() => toggleColorScheme()}
									title="Toggle color scheme"
									size='lg'
								
								>
									{dark ? (
										<IconSun size="1.2rem" color="#FCC419" />
									) : (
										<IconMoonStars size="1.1rem" />
									)}
								</ActionIcon>
								<Button variant="default" radius='md'>Log in</Button>
								<Button radius='md' >Sign up</Button>
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
						<Group>
							<a href="#">
								<img src={siteIcon} alt="Logo" />
							</a>
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
							<Group>
							
							</Group>
						</Group>
					}
					hiddenFrom="md"
					zIndex={1000000}
				>
					<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
						<Divider my="sm" />
						<Autocomplete
							placeholder="Search"
							leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
							data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
							// visibleFrom="xxs"
							radius='md'
							mb='1em'
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

						<Group justify="center" grow pb="xl" px="md">
							<Button variant="default">Log in</Button>
							<Button>Sign up</Button>
						</Group>
					</ScrollArea>
				</Drawer>
			</Box>
		</div>
	);
}
