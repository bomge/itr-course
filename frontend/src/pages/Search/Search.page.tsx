import { Box, Flex, Stack } from '@mantine/core';
import { useParams, useSearchParams } from 'react-router-dom';
import ItemCard from '@/components/Cards/ItemCard/ItemCard';
import { useEffect, useState } from 'react';
import CollectionCard from '@/components/Cards/CollectionCard/CollectionCard';
import AddCard_SearchPage from '@/components/Cards/AddCard_SearchPage/AddCard_SearchPage';
import { Text } from '@mantine/core';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { ICollectionCard, IItemCard } from '../Home/Home.page';
import { useAuthStore } from '@/stores/authStore_zutands';
import { useTranslation } from 'react-i18next';
import axiosPublic from '@/api/axios';

type SearchResult = {
	collections: ICollectionCard[];
	items: IItemCard[];
};

export default function SearchPage() {
	const { userinfo } = useAuthStore();
	const [searchParams] = useSearchParams();

	const axiosPrivate = useAxiosPrivate();
	const { authorId } = useParams();
	const { t } = useTranslation();
	const text = searchParams.get('text');
	const tag = searchParams.get('tag');
	const category = searchParams.get('category');

	const [items, setItems] = useState<SearchResult | null>(null);
	const [ownerName, setOwnerName] = useState(authorId);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function userObjectsFecth() {
			try {
				const { data } = await axiosPrivate.get(
					`/search/userCollections/${authorId}`,
				);
				setItems(data);
				setOwnerName(data.ownerName);
				setLoading(false);
			} catch (e) {
				setLoading(false);
			}
		}
		if (authorId) {
			userObjectsFecth();
		}
	}, [authorId, axiosPrivate]);

	useEffect(() => {
		async function fetchSearch() {
			try {
				const { data } = await axiosPublic.post('/search', { tag, category });
				setItems(data);
				setLoading(false);
			} catch (e) {
				setLoading(false);
			}
		}
		fetchSearch();
	}, [tag, category]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	//TODO LOADING

	if (loading) {
		return 'Loading...';
	}

	return (
		<Box>
			<Stack maw="80vw" m="auto" gap="0" mt="4em">
				<Text fw={700} style={{ fontSize: 'xx-large' }} mb="0.5em" ml="-0.5em">
					{authorId
						? t('seacrhPage.collection_by_author', { authorName: ownerName })
						: `${t('seacrhPage.search_text')} ${text || tag || category}`}
				</Text>

				<Flex
					style={{
						marginBottom: 20,
					}}
					wrap="wrap"
					gap="5em"
					justify="center"
				>
					{userinfo && userinfo.id === authorId && (
						<AddCard_SearchPage page="search" />
					)}
					{items?.collections?.map((col) => (
						<CollectionCard item={col} key={col._id} />
					))}
					{items?.items?.map((item) => (
						<ItemCard item={item} key={item._id} />
					))}
				</Flex>
			</Stack>
		</Box>
	);
}
