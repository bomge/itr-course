import { Carousel } from '@mantine/carousel';
import CollectionCard from '../Cards/CollectionCard/CollectionCard';
import { ICollectionCard, IItemCard } from '@/pages/Home/Home.page';
import classes from './CarouselSection.module.css';
import { Title } from '@mantine/core';
import ItemCard from '../Cards/ItemCard/ItemCard';
import { useMediaQuery } from '@mantine/hooks';
import { isICollectionCard } from '@/utils/util';
import ItemCardSkeleton from '../Cards/ItemCard/ItemCardSkeleton';
import CollectionCardSkeleton from '../Cards/CollectionCard/CollectionCardSkeleton';

type CarouselSectionProps = {
	data: (ICollectionCard | IItemCard)[];
	title: string;
	loading: boolean;
	type: 'collections' | 'items';
};

function SkeletonSlide({ type }) {
	if (type === 'items') {
		return (
			<Carousel.Slide>
				<ItemCardSkeleton />
			</Carousel.Slide>
		);
	}

	return (
		<Carousel.Slide>
			<CollectionCardSkeleton />
		</Carousel.Slide>
	);
}

export default function CarouselSection({
	data,
	title,
	loading,
	type,
}: CarouselSectionProps) {
	const slides = loading
		? //render skeletons while loading
		  [...Array(7)].map((_, i) => <SkeletonSlide key={i + type} type={type} />)
		: //render actual data when loaded
		  data.map((item) => (
				<Carousel.Slide key={item._id}>
					{isICollectionCard(item) ? (
						<CollectionCard item={item} />
					) : (
						<ItemCard item={item} />
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
				draggable={mobile ? true : false}
				styles={{
					container: {
						// marginLeft: '15%',
						// marginLeft: '2em',
					},
					viewport: {
						paddingTop: '10px',
						paddingBottom: '10px',
					},
				}}
				// classNames={{ container: classes.container }}
			>
				{slides}
			</Carousel>
		</>
	);
}
