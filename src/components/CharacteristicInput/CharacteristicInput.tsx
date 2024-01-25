import {
	TextInput,
	Textarea,
	Checkbox,
	Group,
	Select,
	Box,
	Button,
	OptionsFilter,
	ComboboxItem,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconPlus, IconTrashX } from '@tabler/icons-react';
import classes from './CharacteristicInput.module.css';
import { useTranslation } from 'react-i18next';

const FieldTypeInput = ({ fieldType, onChange, value, ...props }) => {
	const { t } = useTranslation();
	switch (fieldType) {
		case 'integer':
			return (
				<TextInput
					type="number"
					onChange={onChange}
					value={value}
					placeholder={t('general.value')}
					{...props}
				/>
			);
		case 'string':
			return (
				<TextInput
					onChange={onChange}
					value={value}
					placeholder={t('general.value')}
					{...props}
				/>
			);
		case 'multi-line':
			return (
				<Textarea
					onChange={onChange}
					value={value}
					placeholder={t('general.value')}
					{...props}
				/>
			);
		case 'logical':
			return (
				<Checkbox
					checked={value}
					onChange={(event) => onChange(event.currentTarget.checked)}
				/>
			);
		case 'date':
			return (
				<DatePickerInput
					onChange={onChange}
					value={new Date(value)}
					placeholder={t('general.value')}
					{...props}
				/>
			);
		default:
			return null;
	}
};

const allowedTypes = ['integer', 'string', 'multi-line', 'logical', 'date'];

type FieldType = 'integer' | 'string' | 'multi-line' | 'logical' | 'date' | '';

interface Field {
	type: FieldType;
	name: string;
	value: string | number | boolean | Date; // Accommodate different value types
	_id?: string;
}
export type Fields = Field[];

type CharacteristicsFormProps = {
	fields: Fields;
	setFields: (fields: Fields) => void;
	charsctsType: 'setValues' | 'setInputTypes';
};

const CharacteristicsForm = ({
	fields,
	setFields,
	charsctsType,
}: CharacteristicsFormProps) => {
	const { t } = useTranslation();
	// const [fields, setFields] = useState<Fields>(initFields);
	const addField = () => {
		if (fields.length >= 15) return;
		setFields([
			...fields,
			{
				type: '',
				name: '',
				value: '',
			},
		]);
	};
	const deleteField = (index: number) => {
		const newFields = [...fields];
		newFields.splice(index, 1);
		setFields(newFields);
	};
	const updateField = (index: number, key, newValue) => {
		const newFields = [...fields];
		newFields[index][key] = newValue;
		setFields(newFields);
	};

	const optionsFilter: OptionsFilter = ({ options }) => {
		return (options as ComboboxItem[]).filter((option) => {
			return fields.filter((field) => field.type === option.label).length < 3;
		});
	};

	return (
		<div>
			{fields.map((field, index) => (
				<Group
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					style={{
						marginBottom: 10,
					}}
					justify={charsctsType === 'setInputTypes' ? 'center' : 'start'}
				>
					{charsctsType === 'setInputTypes' && (
						<Select
							allowDeselect={false}
							// defaultValue='string'
							// disabled={charsctsType === 'setInputTypes'}
							filter={optionsFilter}
							data={allowedTypes}
							value={field.type}
							onChange={(value) => updateField(index, 'type', value)}
							defaultValue="integer"
							w="7em"
						/>
					)}

					<TextInput
						placeholder="Name"
						w="8em"
						value={field.name}
						onChange={(event) =>
							updateField(index, 'name', event.currentTarget.value)
						}
						disabled={charsctsType === 'setValues'}
					/>

					{charsctsType === 'setValues' ? (
						<FieldTypeInput
							w="10.5em"
							fieldType={field.type}
							value={field.value}
							onChange={(value) => {
								value.target
									? updateField(index, 'value', value.target.value)
									: updateField(index, 'value', value);
							}}
						/>
					) : (
						<Button
							onClick={() => deleteField(index)}
							variant="subtle"
							color="red"
							style={{
								minWidth: 'auto',
							}}
							className={classes.trashBtn}
						>
							<IconTrashX size={18} />
						</Button>
					)}
				</Group>
			))}
			{charsctsType === 'setInputTypes' && (
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					<Button leftSection={<IconPlus />} onClick={addField} mb="2em">
						{t('characteristicInput.addNew')}
					</Button>
				</Box>
			)}
		</div>
	);
};
export default CharacteristicsForm;
