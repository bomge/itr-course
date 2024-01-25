import {
	Card,
	CardSection,
	Badge,
	Image,
	ActionIcon,
	Text,
	// useMantineColorScheme,
	Flex,
	Anchor,
	useMantineColorScheme,
	Group,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './ItemCard.module.css';
import placeHolder from '../../../assets/product-placeholder.png';
import ItemCardSkeleton from './ItemCardSkeleton';
import { IItemCard } from '@/pages/Home/Home.page';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ActionIconAuth from '@/components/ActionIconAuth/ActionIconAuth';
import { handleLike } from '@/api/api';
import { useTranslation } from 'react-i18next';

interface ItemCardProps {
	item: IItemCard;
	loading?: boolean;
}

export default function ItemCard({ item, loading }: ItemCardProps) {
	const {
		owner,
		collectionId: collection,
		_id,
		isLiked: liked,
		title,
		tags,
		img,
	} = item;
	const [isLiked, setIsLiked] = useState(liked);
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	const tagsToShow = tags.length <= 3 ? tags : tags.slice(0, 2);
	const additionalTags = Math.max(tags.length - 3, 0);

	const tagDiv = (
		<>
			{tagsToShow.map((tag, i) => (
				<Link to={`/search?tag=${tag.text}`} key={tag.color + tag.text + i}>
					<Badge
						color={tag.color}
						size="sm"
						variant={dark ? 'outline' : 'light'}
					>
						{tag.text}
					</Badge>
				</Link>
			))}
			{additionalTags > 0 && (
				<Badge color="gray" size="sm" variant={dark ? 'filled' : 'outline'}>
					+{additionalTags} {t('general.nMoreItems')}
				</Badge>
			)}
		</>
	);
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
				radius="lg"
				className="hoverTransform card"
				// m="auto"
				mih="16.5em"
			>
				<CardSection>
					<div className={classes.cardSection}>
						<Badge
							color="pink"
							variant={'filled'}
							style={{
								position: 'absolute',
								top: '10px',
								right: '10px',
								zIndex: 1,
							}}
						>
							{t('general.item')}
						</Badge>

						<Link to={`/item/${_id}`}>
							<Image
								src={img || placeHolder}
								fit="contain"
								height={160}
								alt={t('alt.itemImg')}
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
									type: 'items',
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
						to={`/item/${_id}`}
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
							className={classes.author}
							component={Link}
							to={`/user/${owner?._id}`}
							underline="never"
						>
							{owner.name}
						</Anchor>
					</Text>
				</Flex>

				<Group className={classes.tags}>{tagDiv}</Group>

				<Text mb="-7px" color="#808080">
					{t('general.collection')}:
				</Text>
				<Anchor
					component={Link}
					to={`/collection/${collection._id}`}
					underline="never"
					inherit
					className={classes.collectionName}
				>
					<Text size="sm" className={classes.description}>
						{collection.title}
					</Text>
				</Anchor>
			</Card>
		</>
	);
}
