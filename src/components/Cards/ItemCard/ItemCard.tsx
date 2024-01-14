import {
	Card,
	CardSection,
	Badge,
	Image,
	ActionIcon,
	Text,
	useMantineColorScheme,
	Flex,
	Anchor,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './ItemCard.module.css';
import placeHolder from '../../../assets/product-placeholder.png';
import ItemCardSkeleton from './ItemCardSkeleton';
import { IItemCard } from '@/pages/Home/Home.page';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface ItemCardProps {
	item: IItemCard;
	loading: boolean;
}

export default function ItemCard({ item, loading }: ItemCardProps) {
	const { author, authorId, collectionId, collectionName, id, liked, title } =
		item;
	const [isLiked, setLiked]=useState(liked);
	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	if (loading) return <ItemCardSkeleton />;

	return (
		<>
			<Card
				shadow="sm"
				padding="lg"
				pos="relative"
				w="17em"
				style={{ textDecoration: 'none' }}
				withBorder
				radius='lg'
				className='hoverTransform'
				// m="auto"
			>
				<CardSection>
					<div className={classes.cardSection}>
						<Badge
							color="pink"
							variant={dark ? 'outline' : 'light'}
							style={{
								position: 'absolute',
								top: '10px',
								right: '10px',
								zIndex: 1,
							}}
						>
							Item
						</Badge>

						
						<Link to={`/item/${id}`}><Image src={placeHolder} height={160} alt="Rare books" /></Link> 

						<ActionIcon
							className={classes['cardSection-icon']}
							variant="transparent"
							// color="gray"
							onClick={()=>setLiked(prev=>!prev)}
						>
							<IconHeart
								size={24}
								color="red"
								fill={isLiked ? 'red' : 'transparent'}
							/>
						</ActionIcon>
					</div>
				</CardSection>
				<Flex direction="column" mb="5px" mt="10px">
					<Anchor style={{ color: 'inherit' }} component={Link} to={`/item/${id}`}>
						<Text truncate="end" className={classes.title}>
							{title} <br />
						</Text>
					</Anchor>
					<Text truncate="end" className={classes.author} mt="-8px">
						by&nbsp;
						{/* <a href={authorId} >{author}</a> */}
						<Anchor
							size="14px"
							className={classes.author}
							component={Link}
							to={`/user/${authorId}`}
							target="_blank"
							underline="never"
						>
							{author}
						</Anchor>
					</Text>
				</Flex>
				<Anchor component={Link} to={`/collection/${collectionId}`} underline="never">
					<Text
						size="sm"
						// style={{
						// 	color: 'gray',
						// 	textDecoration: 'none',
						// }}
						className={classes.description}
						// color='red'
					>
						{/* {truncatedDescr} */}
						{collectionName}
					</Text>
				</Anchor>
			</Card>
		</>
	);
}
// function CollectionCarousel() {
// 	const [loading, setLoading] = useState(true);
// 	useEffect(() => {
// 		setTimeout(() => {
// 			setLoading(false); // Simulate a loading delay
// 		}, 1500);
// 	}, []);
// 	return (
// 		<ItemCard
// 			title="Ancient Pottery"
// 			author="Sara Smith"
// 			collection="Historical Artifacts"
// 			imageUrl="/placeholder-item.png"
// 			loading={loading}
// 			liked
// 		/>
// 	);
// }
// export default CollectionCarousel;
