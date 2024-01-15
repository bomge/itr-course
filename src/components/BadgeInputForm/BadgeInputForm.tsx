import {
	TextInput,
	Group,
	Select,
	Box,
	Button,
	DefaultMantineColor,
} from '@mantine/core';
import { IconPlus, IconTrashX } from '@tabler/icons-react';


const defaultMantineColors: DefaultMantineColor[] = [
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
	text: string
}
export type Badges = Badge[];

type CharacteristicsFormProps = {
	badges: Badges;
	setBadges: (fields: Badges) => void;
};

const FieldTypeInput = ({ fieldType, onChange, value }) => {
	switch (fieldType) {
	case 'string':
		return (
			<TextInput onChange={onChange} value={value} w='7em' placeholder="Tag Text" />
		);
	default:
		return null;
	}
};
const BadgeInputForm = ({
	badges,
	setBadges,
}: CharacteristicsFormProps) => {
	// const [fields, setFields] = useState<Fields>(initFields);
	const addField = () => {
		if (badges.length >= 15) return;
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
		console.log(newValue);
		setBadges(newFields);
	};

	return (
		<div>
			{badges.map((field, index) => (
				<Group
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					style={{
						marginBottom: 10,
					}}
					justify='start'
				>
					<Select
						allowDeselect={false}
						// defaultValue='string'
						data={defaultMantineColors}
						value={field.color}
						onChange={(value) => updateField(index, 'color', value)}
						defaultValue="grape"
						maw="8em"
						placeholder="Color"
					/>

					<FieldTypeInput
						fieldType='string'
						value={field.text}
						onChange={(value) => {
							updateField(index, 'text', value.target.value);
						}}
					/>

					<Button
						onClick={() => deleteField(index)}
						variant="subtle"
						color="red"
						p='4px 8px'
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
				<Button leftSection={<IconPlus />} onClick={addField} mb="2em">
					Add new tag
				</Button>
			</Box>
		</div>
	);
};
export default BadgeInputForm;
