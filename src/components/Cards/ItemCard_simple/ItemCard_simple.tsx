import { ItemCardCollectionPage } from '@/pages/Collection/Collection.page';
import { ActionIcon, Card, Group, Image, Text } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './ItemCard_simple.module.css';

type ItemCard_simple_Props = {
	item: ItemCardCollectionPage
}

export default function ItemCard_simple ({item}: ItemCard_simple_Props) {
	const [liked, setLiked] = useState(true);

	return <Card
		style={{
			padding: 0,
			width: 160,
			textAlign: 'center',
			margin: '0 auto',
		}}
		withBorder
		radius="md"
		className="hoverTransform"
	>
		<Group>

			<Link to={`/item/${item.id}`}>
				<Image src={item.img} fit="contain" />
			</Link>
			<ActionIcon
				// className={classes['main-heart']}
				variant="transparent"
				m="auto"
				style={
					{
						position: 'absolute',
						top: '7.9em',
						right: '5px'
					}
				}
				onClick={() => setLiked((prev) => !prev)}
				// color="gray"
			>
				<IconHeart
					size={24}
					color="red"
					fill={liked ? 'red' : 'transparent'}
				/>
			</ActionIcon>
		</Group>

		<Link style={{ color: 'inherit' }} to={`/item/${item.id}`}>
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
	</Card>;
}