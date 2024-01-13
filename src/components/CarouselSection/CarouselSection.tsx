import { Carousel } from '@mantine/carousel';
import CollectionCard from '../Cards/CollectionCard/CollectionCard';
import { ICollectionCard, IItemCard } from '@/pages/Home.page';
import classes from './CarouselSection.module.css';
import { Title } from '@mantine/core';
import ItemCard from '../Cards/ItemCard/ItemCard';
import { useMediaQuery } from '@mantine/hooks';

type CarouselSectionProps = {
	data: (ICollectionCard | IItemCard)[];
	title: string;
	loading: boolean
};

function isICollectionCard(item: unknown): item is ICollectionCard {
	return (item as ICollectionCard).tags !== undefined;
}

export default function CarouselSection({ data, title, loading }: CarouselSectionProps) {
	const slides = data.map((item) => (
		<Carousel.Slide key={item.id}>
			{/* //TODO mb refactor???? */}
			{isICollectionCard(item) ? (
				<CollectionCard item={item} loading={loading} />
			) : (
				<ItemCard item={item} loading={loading} />
			)}
		</Carousel.Slide>
	));

	const mobile = useMediaQuery('(max-width:48em)');
	

	return (
		<>
			<Title
				className={classes.title}
				// style={{ color: '#E9ECEF' }}
				order={2}
				ml="0.7em"
				mb="0.3em"
			>
				{title}
			</Title>
			<Carousel
				className={classes.carousel}
				// slideSize={{ base: '100%', sm: '50%' }}
				// slideGap={{ base: rem(0.5), sm: 'xl' }}
				align="start"
				slidesToScroll={1}
				slideSize="30%"
				slideGap="150"
				controlSize={40}
				draggable={mobile? true :false}
				styles={{
					container: {
						// marginLeft: '15%',
						// marginLeft: '2em',
					},
					viewport:{
						paddingTop:'10px',
						paddingBottom:'10px',
					}
				}}
				// classNames={{ container: classes.container }}
			>
				{slides}
			</Carousel>
		</>
	);
}
