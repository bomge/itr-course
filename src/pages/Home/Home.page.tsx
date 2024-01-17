import HeroBullets from '@/components/HeroBullets/HeroBullets';
// import CollectionCard from '@/components/CarouselSection/CollectionCard/old';
import CarouselSection from '@/components/CarouselSection/CarouselSection';
import { useEffect, useState } from 'react';
export interface ITag {
	color: string;
	text: string;
}

export interface ICollectionCard {
	title: string;
	author: string;
	authorId: string;
	tags: ITag[];
	description: string;
	liked: boolean;
	id: string;
}
export interface IItemCard{
	title: string;
	author: string;
	authorId: string;
	liked: boolean;
	id: string;
	collectionName: string;
	collectionId: string;
}

export const fakeCollections: ICollectionCard[] = [
	{
		title: 'Rarest books est 1980',
		author: 'Oleg Petrov',
		authorId: '1',
		id: '1',
		tags: [
			{
				color: 'pink',
				text: 'books',
			},
			{
				color: 'gray',
				text: 'old',
			},
			{
				color: 'grape',
				text: 'gem',
			},
		],
		description:
			'собирал эту коллекцию примерно 50 лет ужеasdddddddddddddddddddddddddddddddddddddddddddddddddddddd',
		liked: true,
	},
	{
		title: 'Vintage Postcards',
		author: 'Maria Fernandez',
		authorId: '2',
		id: '2',
		tags: [
			{
				color: 'yellow',
				text: 'postcards',
			},
			{
				color: 'brown',
				text: 'vintage',
			},
		],
		description: 'My collection of postcards from the 1920s-1950s',
		liked: false,
	},
	{
		title: 'Rare Coins',
		author: 'John Davis',
		authorId: '3',
		id: '3',
		tags: [
			{
				color: 'gold',
				text: 'coins',
			},
			{
				color: 'silver',
				text: 'rare',
			},
		],
		description: 'One of the best rare coin collections in the country',
		liked: false,
	},
	{
		title: 'Vintage Cameras',
		author: 'Naomi Ito',
		authorId: '4',
		id: '4',
		tags: [
			{
				color: 'black',
				text: 'cameras',
			},
			{
				color: 'brown',
				text: 'vintage',
			},
		],
		description: 'My collection of classic antique cameras',
		liked: true,
	},
	{
		title: 'Rare Stamps',
		author: 'Carlos Gutierrez',
		authorId: '5',
		id: '5',
		tags: [
			{
				color: 'red',
				text: 'stamps',
			},
			{
				color: 'orange',
				text: 'rare',
			},
		],
		description: 'Extensive collection of the rarest stamps',
		liked: false,
	},
];
export const fakeCards: IItemCard[] = [
	{
	  title:'Ancient Pottery',
	  author:'Sara Smith',
	  authorId:'1',
	  collectionName:'Historical Artifacts',
	  collectionId:'1',
	  liked: true,
	  id: '1'
	},
	{
	  title: 'Roman Coin',
	  author: 'Tom Wilson',
	  authorId: '2',
	  collectionName: 'Ancient Currencies',
	  collectionId: '2',
	  liked: false, 
	  id: '2'
	},
	{
	  title: 'Ming Vase', 
	  author: 'Linda Chang',
	  authorId: '3',
	  collectionName: 'Chinese Antiques',
	  collectionId: '3',
	  liked: true,
	  id: '3'
	},
	{
	  title: 'Navajo Blanket',
	  author: 'John Two Feathers',
	  authorId: '4',
	  collectionName: 'Native American Art',
	  collectionId: '4',
	  liked: false,
	  id: '4'
	},
	{
	  title: 'Stradivarius Violin',
	  author: 'Elena Rosati',
	  authorId: '5', 
	  collectionName: 'Fine Musical Instruments',
	  collectionId: '5',
	  liked: true,
	  id: '5' 
	},
	{
	  title: 'Civil War Sword',
	  author: 'James McPherson',
	  authorId: '6',
	  collectionName: '19th Century Americana',
	  collectionId: '6', 
	  liked: false,
	  id: '6'
	},
	{
	  title: '1920s Flapper Dress',
	  author: 'Amanda Davis',
	  authorId: '7',
	  collectionName: 'Vintage Fashion',
	  collectionId: '7',
	  liked: true, 
	  id: '7'
	}
];

export function HomePage() {

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<>
			<HeroBullets />


			<CarouselSection data={fakeCollections} title='Largest Collections' loading={loading}/>
			<CarouselSection data={fakeCards} title='Recently added Items' loading={loading}/>
			
		</>
	);
}
