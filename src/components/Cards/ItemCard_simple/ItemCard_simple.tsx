import { ItemCardCollectionPage } from '@/pages/Collection/Collection.page';
import { ActionIcon, Card, Group, Image, Text } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './ItemCard_simple.module.css';
import ActionIconAuth from '@/components/ActionIconAuth/ActionIconAuth';
import placeholder_item from '../../../assets/product-placeholder.png';
import { handleLike } from '@/api/api';

type ItemCard_simple_Props = {
	item: ItemCardCollectionPage;
};

export default function ItemCard_simple({ item }: ItemCard_simple_Props) {
	const [isLiked, setIsLiked] = useState(item.isLiked);
	return (
		<Card
			style={{
				padding: 0,
				width: 160,
				textAlign: 'center',
				minHeight: '13em',
				// margin: '0 auto',
			}}
			withBorder
			radius="md"
			className="hoverTransform"
		>
			<Group>
				<Link to={`/item/${item._id}`}>
					<Image
						src={item.img || placeholder_item}
						fit="contain"
						h="10em"
						className={classes.imageSection}
					/>
				</Link>
				<ActionIconAuth
					// className={classes['main-heart']}
					variant="transparent"
					m="auto"
					style={{
						position: 'absolute',
						top: '7.9em',
						right: '5px',
					}}
					onClick={() =>
						handleLike({
							id: item._id as string,
							setIsLiked: setIsLiked,
							type: 'items',
						})
					}
					// color="gray"
				>
					<IconHeart
						size={24}
						color="red"
						fill={isLiked ? 'red' : 'transparent'}
					/>
				</ActionIconAuth>
			</Group>

			<Link style={{ color: 'inherit' }} to={`/item/${item._id}`}>
				<Text
					mah="5em"
					p="0.5em"
					// style={{
					// 	overflow: 'hidden',
					// 	'-webkit-box-orient': 'vertical',
					// 	'-webkit-line-clamp': 2,
					// 	display: '-webkit-box',
					// }}
					className={classes['card-title']}
				>
					{item.title}
				</Text>
			</Link>
		</Card>
	);
}
