import {
	Text,
	Card,
	CardSection,
	Image,
	ActionIcon,
	Group,
	Badge,
	Flex,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import placeHolder from '../../../assets/placeholder.png';
import { ICollectionCard } from '@/pages/Home/Home.page';
import { truncateText } from '@/utils/util';
interface CollectionCardProps {
	collectionItem: ICollectionCard;
  }
const MAX_LENGTH_DESCRIPTION = 60;

export default function CollectionCard({collectionItem}: CollectionCardProps) {

	const {author,authorId,description,liked,tags,title} = collectionItem;

	const tagDiv = tags.map(tag => 
		<Badge color={tag.color} variant="light">{tag.text}</Badge>
	);
	
	const truncatedDescr = truncateText(description, MAX_LENGTH_DESCRIPTION);

	return (
		<Card shadow="sm" padding="lg" pos="relative" w='17em'>
			<CardSection >
				<div style={{
					position: 'relative'
				}}
				>
					<Image src={placeHolder} height={160} alt="Rare books" />

					<ActionIcon
						style={{
							position: 'absolute',
							bottom: '10px',
							right: '10px',
							// color: '#ff6b6b',
						}}
						variant="transparent"
						// color="gray"
					>
						<IconHeart
							size={24}
							color="red"
							fill={liked ? 'red' : 'transparent'}
						/>
					</ActionIcon>
				</div>
			</CardSection>
			<Flex direction='column'
				// position="apart"
				style={{
					marginBottom: '5px',
					marginTop: '10px',
				}}
			>
				<Text
					truncate="end"
					style={{
						fontSize: '18px',
						fontWeight: 700,
					}}
				>
					{title} <br/>
				</Text>
				<Text
					truncate="end"
					style={{
						fontSize: '14px',
						color: 'gray',
						textAlign:'end'

					}}
					mt='-8px'
				>
					by <a href={authorId}>{author}</a>
				</Text>
			</Flex>
			<Group
				style={{
					marginBottom: '10px',
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
				}}
			>
				{tagDiv}
			</Group>
			<Text
				// truncate="end"
				size="sm"
				style={{
					color: 'gray',
				}}
			>
				{ truncatedDescr }
			</Text>
		</Card>
	);
}
