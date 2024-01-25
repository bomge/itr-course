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
import ActionIconAuth from '@/components/ActionIconAuth/ActionIconAuth';
import { handleLike } from '@/api/api';
import { useTranslation } from 'react-i18next';

interface CollectionCardProps {
	item: ICollectionCard;
	loading?: boolean;
}
const MAX_LENGTH_DESCRIPTION = 60;

export default function CollectionCard({ item, loading }: CollectionCardProps) {
	const { t } = useTranslation();
	const {
		owner,
		description_text,
		isLiked: liked,
		title,
		_id,
		type,
		img,
	} = item;
	const [isLiked, setIsLiked] = useState(liked);
	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	if (loading) {
		return <CollectionCardSkeleton />;
	}

	const truncatedDescr = truncateText(description_text, MAX_LENGTH_DESCRIPTION);

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
			radius="lg"
			className="hoverTransform"
			mih="16.5em"
		>
			<CardSection>
				<div className={classes.cardSection}>
					<Badge
						color="orange"
						variant={'filled'}
						style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							zIndex: 1,
						}}
					>
						{t('general.collection')}
					</Badge>

					<Link to={`/collection/${_id}`}>
						<Image
							src={img || placeHolder}
							height={160}
							fit="contain"
							alt="Collection img"
							className={classes.imageSection}
						/>
					</Link>

					<ActionIconAuth
						className={classes['cardSection-icon']}
						variant="transparent"
						// color="gray"
						onClick={() =>
							handleLike({
								id: _id as string,
								setIsLiked: setIsLiked,
								type: 'collections',
							})
						}
					>
						<IconHeart
							size={24}
							color="red"
							fill={isLiked ? 'red' : 'transparent'}
						/>
					</ActionIconAuth>
				</div>
			</CardSection>
			<Flex direction="column" mb="5px" mt="10px">
				<Anchor
					style={{ color: 'inherit' }}
					component={Link}
					to={`/collection/${_id}`}
				>
					<Text truncate="end" className={classes.title}>
						{title} <br />
					</Text>
				</Anchor>
				<Text truncate="end" className={classes.author} mt="-8px">
					{t('general.author')}&nbsp;
					{/* <a href={authorId} >{author}</a> */}
					<Anchor
						size="14px"
						className={classes['author-link']}
						href={`/user/${owner?._id}`}
						underline="never"
					>
						{owner.name}
					</Anchor>
				</Text>
			</Flex>
			<Text
				style={{
					fontSize: 16,
					marginBottom: 5,
					marginTop: -10,
					textAlign: 'left',
				}}
				className={classes.author}
			>
				{t('general.category')}:{' '}
				<Anchor
					component={Link}
					size="16px"
					to={`/search?category=${type.type}`}
					underline="never"
				>
					{type.type}
				</Anchor>
			</Text>
			<Text size="sm" className={classes.description}>
				{truncatedDescr}
			</Text>
		</Card>
		// </Link>
	);
}
