import { ActionIcon, Autocomplete } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function CollectionTypeSelect({ type, setType }) {
	const [types, setTypes] = useState([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const { t } = useTranslation();
	useEffect(() => {
		fetch('http://localhost:3500/collections/types')
			.then((res) => res.json())
			.then((data) => setTypes(data.map((a) => a.type)));
	}, []);

	const HanldeclearValue = () => {
		setType(''); // Clear the selected value
		inputRef?.current?.focus();
	};

	return (
		<Autocomplete
			data={types}
			ref={inputRef}
			label={t('collectionPage.typeInput.label')}
			placeholder={t('collectionPage.typeInput.placeHolder')}
			//   onOptionSubmit={optionSubmitHandler}
			value={type}
			onChange={setType}
			w="13em"
			mb="0.5em"
			style={{ alignSelf: 'center' }}
			rightSection={
				type && (
					<ActionIcon
						// size={36}
						variant="transparent"
						color="dark"
						onClick={HanldeclearValue}
					>
						<IconX />
					</ActionIcon>
				)
			}
		/>
	);
}
