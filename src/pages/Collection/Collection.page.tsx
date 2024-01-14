import {
	Text,
	Card,
	Image,
	Button,
	Box,
	Stack,
	Badge,
	useMantineColorScheme,
	Group,
	Flex,
	ActionIcon,
	Anchor,
} from '@mantine/core';
import { IconHeart, IconMinus, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import placeholder_item from '../../assets/product-placeholder.png';
import placeholder_collection from '../../assets/placeholder.png';
import classes from './Collection.page.module.css';
import { ITag } from '../Home/Home.page';
import { Link } from 'react-router-dom';

type ItemCardCollectionPage = {
	img: string;
	title: string;
	id: string;
};

const fakeTags: ITag[] = [
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
];

const fakeItems_collectPage: ItemCardCollectionPage[] = [
	{
		img: placeholder_item,
		title: 'Бибилия',
		id: '1',
	},
	{
		img: placeholder_item,
		title: 'Тайна каменных пеликанов',
		id: '2',
	},
	{
		img: placeholder_item,
		title:
			'Английская поэзия в русских сказочках ааааааааааааааааааааааааааааааааааааааааааааааааааааааааа',
		id: '3',
	},
	{
		img: placeholder_item,
		title: 'Старинные рецепты',
		id: '4',
	},
	{
		img: placeholder_item,
		title: 'Лечение водкой и вином вином вином вином огнем и пламенем',
		id: '5',
	},
];

function CollectionPage() {
	const [expand, setExpand] = useState(false);
	const [liked, setLiked]=useState(true);

	const author='Oleg Popov';
	const authorId='1';
	
	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';
	const maxDescriptionLength = 45;
	const handleClick = () => {
		setExpand(!expand);
	};
	const getDescriptionText = () => {
		const description =
			'эту коллекцию я собирал тысячу лет. А вообще ее собирать начинал еще отец. А по правде, и его отец тоже бла-бла-бла-бла.. здесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цвет';
		return expand ? description : description.slice(0, maxDescriptionLength);
	};

	const tagDiv = fakeTags.map((tag, i) => (
		<Badge
			color={tag.color}
			size="sm"
			variant={dark ? 'outline' : 'light'}
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			key={i}
		>
			{tag.text}
		</Badge>
	));
	// truncate="end"

	const itemsDiv = fakeItems_collectPage.map((item, i) => (
		<Card
			style={{
				padding: 0,
				width: 160,
				textAlign: 'center',
				margin: '0 auto',
			}}
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			key={i}
			withBorder
			radius='md'
			className='hoverTransform'
		>
			<Link to={`/item/${item.id}`}><Image src={item.img} fit="contain" /></Link> 
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
		</Card>
	));
	return (
		<>
			<Box>
				<Stack maw="80vw" m="auto" gap="0" mt='4em'>
					<Text
						style={{
							fontSize: 12,
							// marginBottom: 10,
						}}
					>
						{'collections -> rarest books est 1980'}
					</Text>

					<Image radius='sm' src={placeholder_collection} w="360" m="auto" />
					
					<Text
						style={{
							fontSize: 30,
							fontWeight: 700,
							textAlign: 'center',
						}}
					>
						Rarest books est 1980
						 {<ActionIcon
							className={classes['main-heart']}
							variant="transparent"
							m='auto'
							style={{
								position: 'absolute',
								// bottom:'20px'
							}}
							onClick={()=>setLiked(prev=>!prev)}
						// color="gray"
						>
							<IconHeart
								size={24}
								color="red"
								fill={liked ? 'red' : 'transparent'}
							/>
						</ActionIcon>}
					</Text>
					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							textAlign: 'center',
						}}
						className={classes.author}
					>
						by <Anchor
							size="14px"
							className={classes['author-link']}
							href={`/users/${authorId}`}
							target="_blank"
							underline="never"
						>
							{author}
						</Anchor>
					</Text>

					<Group className={classes.tags}>{tagDiv}</Group>

					<Text
						style={{
							fontSize: 14,
							textAlign: 'center',
						}}
						mt="1em"
						mb="20px"
					>
						{getDescriptionText()} <br />
						<Button
							onClick={handleClick}
							className={classes['descr-btn']}
							color="none"
						>
							{expand ? (
								<>
									<IconMinus size={16} /> Collapse
								</>
							) : (
								<>
									<IconPlus size={16} /> Expand
								</>
							)}
						</Button>
					</Text>
					<Text
						style={{
							fontSize: 24,
							fontWeight: 500,
							marginBottom: 20,
							textAlign: 'center',
						}}
					>
						Items
					</Text>
					<Flex
						style={{
							marginBottom: 20,
						}}
						wrap='wrap'
						gap='5em'
					>
						{itemsDiv}
					</Flex>
					<Button
						style={{
							// width: '100%',
							width:'fit-content',
							padding: '5px 10px',
							marginBottom:'20px',
							marginLeft:'auto',
							marginRight:'auto',
						}}
						variant={dark ? 'outline' : 'light'}
						 color="gray"
						 radius='md'
					>
						Show More
					</Button>
				</Stack>
			</Box>
		</>
	);
}
export default CollectionPage;
