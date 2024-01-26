import { useEffect, useRef, useState } from 'react';
import {
	Combobox,
	ComboboxOptionProps,
	Loader,
	ScrollArea,
	TextInput,
	rem,
	useCombobox,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { getTypeAndIdFromString, groupBy } from '@/utils/util';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useDebouncedValue } from '@mantine/hooks';

type mockData = {
	title: string;
	type: 'collection' | 'item';
	_id: string;
};

export default function SearchBar() {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const { t } = useTranslation();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const [value, setValue] = useState('');
	const [debounced] = useDebouncedValue(value, 300);

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Record<string, mockData[]> | null>(null);
	const [empty, setEmpty] = useState(false);
	const abortController = useRef<AbortController>();
	const comboboxRef = useRef<HTMLInputElement>(null);

	async function fetchSearch() {
		try {
			const { data } = await axiosPrivate.post('/search/minified', {
				text: value,
			});
			setData(data);
			const isEmpty = data.collections.length === 0 && data.items.length === 0;
			setEmpty(isEmpty);
			setLoading(false);
		} catch (e) {
			setLoading(false);
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		value && fetchSearch();
	}, [debounced]);

	const options =
		data != null &&
		Object.keys(data).map((key) => (
			<Combobox.Group label={key} key={key}>
				{data[key].map((a) => (
					<Combobox.Option value={`${key}_${a._id}`} key={a._id}>
						{a.title}
					</Combobox.Option>
				))}
			</Combobox.Group>
		));

	const searchKeyHandle = (k: React.KeyboardEvent<HTMLInputElement>) => {
		if (value && k.keyCode === 13) {
			combobox.closeDropdown();
			comboboxRef.current?.blur();
			navigate({
				pathname: '/search',
				// search: '?sort=date&order=newest',
				search: `?text=${value}`,
			});
		}
	};

	const HandleOptionSubmit = (
		value: string,
		optionProps: ComboboxOptionProps,
	) => {
		const parsedValue = getTypeAndIdFromString(value);
		if (!parsedValue) {
			return console.error('error parsing value type+id');
		}
		const { type, _id } = parsedValue;
		setValue(optionProps.children!.toString());
		combobox.closeDropdown();
		comboboxRef.current?.blur();

		//remove last char cuz of collectionS
		const fixedType = type.slice(0, type.length - 1);

		navigate({
			pathname: `/${fixedType}/${_id}`,
		});
	};
	return (
		<Combobox
			onOptionSubmit={HandleOptionSubmit}
			withinPortal={false}
			store={combobox}
			styles={{
				dropdown: {},
			}}
		>
			<Combobox.Target>
				<TextInput
					ref={comboboxRef}
					placeholder={t('header.search.placeHolder')}
					value={value}
					onChange={(event) => {
						setValue(event.currentTarget.value);
						// fetchOptions(event.currentTarget.value);
						combobox.resetSelectedOption();
						combobox.openDropdown();
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => {
						combobox.openDropdown();
					}}
					onBlur={() => combobox.closeDropdown()}
					onKeyDown={searchKeyHandle}
					rightSection={loading && <Loader size={18} />}
					leftSection={
						<IconSearch
							style={{ width: rem(16), height: rem(16) }}
							stroke={1.5}
						/>
					}
					radius="sm"
				/>
			</Combobox.Target>

			<Combobox.Dropdown hidden={data === null}>
				<ScrollArea.Autosize type="scroll" mah={200}>
					<Combobox.Options>
						{options}
						{empty && (
							<Combobox.Empty>{t('header.search.noResults')}</Combobox.Empty>
						)}
					</Combobox.Options>
				</ScrollArea.Autosize>
			</Combobox.Dropdown>
		</Combobox>
	);
}
