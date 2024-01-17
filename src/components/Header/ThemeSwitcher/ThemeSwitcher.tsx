import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

export default function ThemeSwitcher (){

	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	return (
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
	);
}