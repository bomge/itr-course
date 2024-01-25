import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import {
	Group,
	Select,
	Box,
	Button,
	DefaultMantineColor,
	Autocomplete,
} from '@mantine/core';
import { IconPlus, IconTrashX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import classes from './BadgeInputForm.module.css';
import { useTranslation } from 'react-i18next';

export const defaultMantineColors: DefaultMantineColor[] = [
	'dark',
	'gray',
	'red',
	'pink',
	'grape',
	'violet',
	'indigo',
	'blue',
	'cyan',
	'green',
	'lime',
	'yellow',
	'orange',
	'teal',
];

interface Badge {
	color: DefaultMantineColor;
	text: string;
}
export type Badges = Badge[];

type CharacteristicsFormProps = {
	badges: Badges;
	setBadges: (fields: Badges) => void;
};

const MAX_ITEM_TAGS = 5;
const BadgeInputForm = ({ badges, setBadges }: CharacteristicsFormProps) => {
	const axios = useAxiosPrivate();
	const { t } = useTranslation();
	const [loadedTags, setLoadedTags] = useState([]);
	const addField = () => {
		if (badges.length >= MAX_ITEM_TAGS) return;
		setBadges([
			...badges,
			{
				color: '',
				text: '',
			},
		]);
	};
	const deleteField = (index: number) => {
		const newFields = [...badges];
		newFields.splice(index, 1);
		setBadges(newFields);
	};
	const updateField = (index: number, key: keyof Badge, newValue) => {
		const newFields = [...badges];
		newFields[index][key] = newValue;
		setBadges(newFields);
	};

	useEffect(() => {
		async function getUniqueTags() {
			const { data } = await axios.get('/uniqueItemTags');
			setLoadedTags(data.tags);
		}
		getUniqueTags();
	}, [axios]);

	return (
		<div>
			{badges.map((field, index) => (
				<Group
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					style={{
						marginBottom: 10,
					}}
					justify="start"
				>
					<Select
						allowDeselect={false}
						// defaultValue='string'
						data={defaultMantineColors}
						value={field.color}
						onChange={(value) => updateField(index, 'color', value)}
						defaultValue="grape"
						maw="7em"
						placeholder="Color"
					/>

					<Autocomplete
						onChange={(value) => {
							updateField(index, 'text', value);
						}}
						data={loadedTags}
						value={field.text}
						w="7em"
						placeholder="Tag Text"
						maxLength={10}
					/>

					<Button
						onClick={() => deleteField(index)}
						variant="subtle"
						color="red"
						p="4px 8px"
						style={{
							minWidth: 'auto',
						}}
					>
						<IconTrashX size={18} />
					</Button>
				</Group>
			))}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: 20,
				}}
			>
				{badges.length < MAX_ITEM_TAGS ? (
					<Button leftSection={<IconPlus />} onClick={addField} mb="2em">
						{t('itemPage.badges.addNew')}
					</Button>
				) : (
					<span className={classes.maxBadgesInfo}>
						{t('itemPage.badges.reachedMaxCount')}
					</span>
				)}
			</Box>
		</div>
	);
};
export default BadgeInputForm;
