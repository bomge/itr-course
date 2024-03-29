import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import images from './images';
import classes from './LanguagePicker.module.css';
import { useLocalStorage } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

const data = [
	{ label: 'EN', image: images.english },
	{ label: 'PL', image: images.polish },
];

export function LanguagePicker() {
	const [opened, setOpened] = useState(false);
	const [selected, setSelected] = useLocalStorage({
		key: 'lang',
		defaultValue: data[0],
	});
	const { i18n } = useTranslation();

	const items = data.map((item) => (
		<Menu.Item
			leftSection={<Image src={item.image} width={18} height={18} />}
			onClick={() => {
				setSelected(item);
				i18n.changeLanguage(item.label);
			}}
			key={item.label}
		>
			{item.label}
		</Menu.Item>
	));

	return (
		<Menu
			onOpen={() => setOpened(true)}
			onClose={() => setOpened(false)}
			// radius="100px"
			width="target"
			withinPortal
			zIndex={9999999}
		>
			<Menu.Target>
				<UnstyledButton
					size="100px"
					className={classes.control}
					data-expanded={opened || undefined}
					style={{ borderRadius: '6px' }}
				>
					<Group gap="xs">
						<Image src={selected.image} width={22} height={22} />
						<span className={classes.label}>{selected.label}</span>
					</Group>
					<IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>{items}</Menu.Dropdown>
		</Menu>
	);
}
