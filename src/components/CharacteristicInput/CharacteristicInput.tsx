import {
	MantineProvider,
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
import { useState} from 'react';
import { IconPlus, IconTrashX } from '@tabler/icons-react';
const FieldTypeInput = ({ fieldType, onChange, value }) => {
	switch (fieldType) {
	case 'integer':
		return (
			<TextInput
				type="number"
				onChange={onChange}
				value={value}
				placeholder="value"
			/>
		);
	case 'string':
		return (
			<TextInput onChange={onChange} value={value} placeholder="value" />
		);
	case 'multi-line':
		return <Textarea onChange={onChange} value={value} placeholder="value" />;
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
				value={value}
				placeholder="value"
			/>
		);
	default:
		return null;
	}
};

const allowedTypes = [
	'integer',
	'string',
	'multi-line',
	'logical',
	'date',
];

type FieldType = 'integer' | 'string' | 'multiline' | 'checkbox' | 'date' | '';

interface Field {
  type: FieldType;
  name: string;
  value: string | number | boolean | Date; // Accommodate different value types
}
export type Fields = Field[];

type CharacteristicsFormProps = {
	fields: Fields
	setFields: (fields: Fields) => void
}

const CharacteristicsForm = ({fields, setFields}: CharacteristicsFormProps) => {

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
			  return fields.filter(field=>field.type === option.label).length < 3;
		});
	  };

	return (
		<div>
			{fields.map((field, index) => (
				<MantineProvider>
					<Group
						key={index}
						style={{
							marginBottom: 10,
						}}
						justify="center"
					>
						<Select
							allowDeselect={false}
							// defaultValue='string'
							filter={optionsFilter}
							data={allowedTypes}
							value={field.type}
							onChange={(value) => updateField(index, 'type', value)}
							defaultValue="integer"
							maw='8em'
						/>

						<TextInput
							placeholder="Name"
							value={field.name}
							onChange={(event) =>
								updateField(index, 'name', event.currentTarget.value)
							}
						/>

						{/* // TODO this is for item page, not for collection */}
						{/* <FieldTypeInput
							fieldType={field.type}
							value={field.value}
							onChange={(value) => {
								value.target? updateField(index, 'value', value.target.value) : updateField(index, 'value', value);
							}}
						/> */}

						<Button
							onClick={() => deleteField(index)}
							variant="subtle"
							color="red"
							style={{
								minWidth: 'auto',
							}}
						>
							<IconTrashX size={18} />
						</Button>
					</Group>
				</MantineProvider>
			))}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: 20,
				}}
			>
				<Button leftSection={<IconPlus />} onClick={addField} mb="2em">
					Add new characteristic
				</Button>
			</Box>
		</div>
	);
};
export default CharacteristicsForm;
