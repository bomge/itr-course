import {
	Text,
	Card,
	CardSection,
	Image,
	ActionIcon,
	Group,
	Badge,
	Flex,
	useMantineColorScheme,
	Anchor,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import placeHolder from '../../../assets/placeholder.png';
import { ICollectionCard } from '@/pages/Home/Home.page';
import { truncateText } from '@/utils/util';
import classes from './CollectionCard.module.css';
import { Link } from 'react-router-dom';
import CollectionCardSkeleton from './CollectionCardSkeleton';
import { useState } from 'react';

interface CollectionCardProps {
	item: ICollectionCard;
	loading: boolean;
}
const MAX_LENGTH_DESCRIPTION = 60;

export default function CollectionCard({ item, loading }: CollectionCardProps) {
	const { author, authorId, description, liked, tags, title, id } = item;
	const [isLiked, setLiked]=useState(liked);
	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	if(loading){
		return <CollectionCardSkeleton/>;
	}

	const tagDiv = tags.map((tag, i) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
		<Badge color={tag.color} size='sm' variant={dark ? 'outline' : 'light'} key={i}>
			{tag.text}
		</Badge>
	));

	const truncatedDescr = truncateText(description, MAX_LENGTH_DESCRIPTION);

	return (
		// <Link to={`/collection/${id}`}
		// >
		<Card
			shadow="sm"
			padding="lg"
			pos="relative"
			w="17em"
			// style={{ textDecoration: 'none' }}
			withBorder
			radius='lg'
			className='hoverTransform'
		>
			<CardSection>
				<div className={classes.cardSection}>
					<Badge
						color="orange"
						variant={dark ? 'outline' : 'light'}
						style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							zIndex: 1,
						}}
					>
						Collection
					</Badge>

					<Link to={`/collection/${id}`}><Image src={placeHolder} height={160} alt="Rare books" /></Link> 

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
				<Anchor style={{ color: 'inherit' }} component={Link} to={`/collection/${id}`}>
					<Text truncate="end" className={classes.title}>
						{title} <br />
					</Text>
				</Anchor>
				<Text truncate="end" className={classes.author} mt="-8px">
					by&nbsp;
					{/* <a href={authorId} >{author}</a> */}
					<Anchor
						size="14px"
						className={classes['author-link']}
						href={`/users/${authorId}`}
						target="_blank"
						underline="never"
					>
						{author}
					</Anchor>
				</Text>
			</Flex>
			<Group className={classes.tags}>{tagDiv}</Group>
			<Text
				size="sm"
				style={{
					color: 'gray',
					textDecoration: 'none',
				}}
			>
				{truncatedDescr}
			</Text>
		</Card>
		// </Link>
	);
}
