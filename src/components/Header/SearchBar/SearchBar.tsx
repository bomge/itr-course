import { useRef, useState } from 'react';
import {
	Combobox,
	ComboboxOptionProps,
	Loader,
	TextInput,
	rem,
	useCombobox,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { getTypeAndIdFromString, groupBy } from '@/utils/util';
import { useTranslation } from 'react-i18next';

type mockData = {
	title: string;
	type: 'collection' | 'item';
	id: string;
};

const MOCKDATA2: mockData[] = [
	{ id: '1', title: 'collection1', type: 'collection' },
	{ id: '2', title: 'item1_1', type: 'item' },
	{ id: '3', title: 'item1_2', type: 'item' },
	{ id: '4', title: 'item1_3', type: 'item' },
	{ id: '5', title: 'item1_4', type: 'item' },
	{ id: '6', title: 'item1_5', type: 'item' },
	{ id: '7', title: 'collection2', type: 'collection' },
	{ id: '8', title: 'item2_1', type: 'item' },
	{ id: '9', title: 'item2_2', type: 'item' },
	{ id: '10', title: 'item2_3', type: 'item' },
	{ id: '11', title: 'item2_4', type: 'item' },
	{ id: '12', title: 'item2_5', type: 'item' },
	{ id: '13', title: 'collection3', type: 'collection' },
	{ id: '14', title: 'item3_1', type: 'item' },
	{ id: '15', title: 'item3_2', type: 'item' },
	{ id: '16', title: 'item3_3', type: 'item' },
	{ id: '17', title: 'item3_4', type: 'item' },
	{ id: '18', title: 'item3_5', type: 'item' },
	{ id: '19', title: 'collection4', type: 'collection' },
	{ id: '20', title: 'item4_1', type: 'item' },
	{ id: '21', title: 'item4_2', type: 'item' },
	{ id: '22', title: 'item4_3', type: 'item' },
	{ id: '23', title: 'item4_4', type: 'item' },
	{ id: '24', title: 'item4_5', type: 'item' },
	{ id: '25', title: 'collection5', type: 'collection' },
	{ id: '26', title: 'item5_1', type: 'item' },
	{ id: '27', title: 'item5_2', type: 'item' },
	{ id: '28', title: 'item5_3', type: 'item' },
	{ id: '29', title: 'item5_4', type: 'item' },
	{ id: '30', title: 'item5_5', type: 'item' },
];

function getAsyncData(searchQuery: string, signal: AbortSignal) {
	return new Promise<mockData[]>((resolve, reject) => {
		signal.addEventListener('abort', () => {
			reject(new Error('Request aborted'));
		});

		setTimeout(() => {
			resolve(
				MOCKDATA2.filter((item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase()),
				).slice(0, 5),
			);
		}, Math.random() * 1000);
	});
}

export default function SearchBar({ value, setValue }) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Record<string, mockData[]> | null>(null);
	const [empty, setEmpty] = useState(false);
	const abortController = useRef<AbortController>();
	const comboboxRef = useRef<HTMLInputElement>(null);

	const fetchOptions = (query: string) => {
		abortController.current?.abort();
		abortController.current = new AbortController();
		setLoading(true);

		getAsyncData(query, abortController.current.signal)
			.then((result) => {
				const grouped = groupBy(result, 'type');
				setData(grouped);
				setLoading(false);
				setEmpty(result.length === 0);
				abortController.current = undefined;
			})
			.catch(() => {});
	};

	const options =
		data != null &&
		Object.keys(data).map((key) => (
			<Combobox.Group label={`${key}s`}>
				{data[key].map((a) => (
					<Combobox.Option value={`${key}_${a.id}`} key={a.title}>
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
		const { type, id } = parsedValue;
		setValue(optionProps.children);
		combobox.closeDropdown();
		comboboxRef.current?.blur();

		navigate({
			pathname: `/${type}/${id}`,
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
						fetchOptions(event.currentTarget.value);
						combobox.resetSelectedOption();
						combobox.openDropdown();
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => {
						combobox.openDropdown();
						if (data === null) {
							fetchOptions(value);
						}
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
				<Combobox.Options>
					{options}
					{empty && (
						<Combobox.Empty>{t('header.search.noResults')}</Combobox.Empty>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
