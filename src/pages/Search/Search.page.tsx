import { Box, Flex, Stack } from '@mantine/core';
import { useParams, useSearchParams } from 'react-router-dom';
import ItemCard from '@/components/Cards/ItemCard/ItemCard';
import { fakeCards, fakeCollections } from '../Home/Home.page';
import { useEffect, useState } from 'react';
import CollectionCard from '@/components/Cards/CollectionCard/CollectionCard';
import AddCard_SearchPage from '@/components/Cards/AddCard_SearchPage/AddCard_SearchPage';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { UserState } from '@/components/Header/Header';
import { Text } from '@mantine/core';

export default function SearchPage() {
	const authUser = useAuthUser() as UserState | null;
	const [searchParams] = useSearchParams();
	// for (const entry of searchParams.entries()) {
	// 	console.log(entry);
	//   }

	const { authorId } = useParams();

	const text = searchParams.get('text');
	// const authorId = searchParams.get('authorId');

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const itemsDiv = fakeCards.map((item, i) => (
		<>
			{/* // biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
			<ItemCard item={item} loading={loading} />

			{fakeCollections[i] && (
				<CollectionCard item={fakeCollections[i]} loading={loading} />
			)}
		</>
	));

	//if its our page, add card to create new collection
	authUser &&
		authUser.id === authorId &&
		itemsDiv.unshift(
			<AddCard_SearchPage key={itemsDiv.length + 1} page="search" />,
		);

	return (
		<Box>
			<Stack maw="80vw" m="auto" gap="0" mt="4em">
				<Text fw={700} style={{ fontSize: 'xx-large' }} mb='0.5em' ml='-0.5em'>
					{authorId ? `Collections by ${authorId}` : `Search for: ${text}`}
				</Text>

				<Flex
					style={{
						marginBottom: 20,
					}}
					wrap="wrap"
					gap="5em"
					justify="center"
				>
					{itemsDiv}
				</Flex>
			</Stack>
		</Box>
	);
}
