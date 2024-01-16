import {
	Text,
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
	Input,
	Card,
} from '@mantine/core';
import {
	IconColorPicker,
	IconHeart,
	IconMinus,
	IconPlus,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import placeholder_item from '../../assets/product-placeholder.png';
import placeholder_collection from '../../assets/placeholder.png';
import classes from './Collection.page.module.css';
import { ITag } from '../Home/Home.page';
import { Link } from 'react-router-dom';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import ItemCard_simple from '@/components/Cards/ItemCard_simple/ItemCard_simple';
import CharacteristicsForm, {
	Fields,
} from '@/components/CharacteristicInput/CharacteristicInput';
export type ItemCardCollectionPage = {
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

const initDescription =
	'эту коллекцию я собирал тысячу лет. А вообще ее собирать начинал еще отец. А по правде, и его отец тоже бла-бла-бла-бла.. здесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цветздесь типа жирный А здесь курсив и другой цвет';
const initTitle = 'Rarest books est 1980';

const maxDescriptionLength = 145;

const initFields: Fields = [
	{
		name: 'Name1',
		type: 'string',
		value: 'value1',
	},
	{
		name: 'name2',
		type: 'integer',
		value: '123',
	},
];

function CollectionPage() {
	const [expand, setExpand] = useState(false);
	const [liked, setLiked] = useState(true);

	const [fields, setFields] = useState<Fields>(initFields);

	const author = 'Oleg Popov';
	const authorId = '1';

	const [description, setDescription] = useState(initDescription);
	const [title, setTitle] = useState(initTitle);
	const [isEdit, setIsEdit] = useState(false);

	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';
	const handleClick = () => {
		setExpand(!expand);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const getDescriptionText = () => {
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
		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
		<ItemCard_simple item={item} key={i} />
	));
	itemsDiv.unshift(
		<Anchor component={Link} m='auto' to={'/collection/1/addItem'} key={itemsDiv.length+1}>
			<Card
				style={{
					padding: 0,
					minWidth: 160,
					minHeight: '14.5em',
					textAlign: 'center',
					margin: '0 auto',
					justifyContent: 'center',
				}}
				withBorder
				radius="md"
				className="hoverTransform"
			>
				{' '}
				<IconPlus size="100px" style={{ margin: 'auto' }} />
			</Card>
		</Anchor>
		
	);
	const editor = useEditor({
		extensions: [StarterKit, TextStyle, Color, Underline, Highlight],
		content: description,
		onUpdate: () => setDescription(editor?.getHTML() || ''),
	});
	return (
		<>
			<Box>
				<Stack maw="80vw" m="auto" gap="0" mt="4em">
					<Text
						style={{
							fontSize: 12,
							// marginBottom: 10,
						}}
					>
						{'collections -> rarest books est 1980'}
					</Text>

					<div style={{ position: 'relative', display:'flex', alignSelf:'center' }}>
						<Button
							pos="absolute"
							right="0"
							top='0.5em'
							onClick={() => setIsEdit((v) => !v)}
						>
							{isEdit ? 'Save' : 'Edit'}{' '}
						</Button>

						<Image radius="sm" src={placeholder_collection} m="auto" className={classes.imgMain} />
					</div>

				
					<Group m="auto">
						{isEdit ? (
							<Input
								value={title}
								onChange={(event) => setTitle(event.currentTarget.value)}
								style={{
									fontSize: 30,
									fontWeight: 700,
									textAlign: 'center',
								}}
								// w='2em'
								mt="0.4em"
								mb="0.0em"
								pb="0"
								// h='0.3em'
							/>
						) : (
							<Text
								style={{
									fontSize: 30,
									fontWeight: 700,
									textAlign: 'center',
								}}
							>
								{title}
							</Text>
						)}
						<ActionIcon
							className={classes['main-heart']}
							variant="transparent"
							m="auto"
							style={
								{
									// position: 'absolute',
									// bottom:'20px'
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
					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							textAlign: 'center',
						}}
						className={classes.author}
					>
						by{' '}
						<Anchor
							component={Link}
							size="14px"
							className={classes['author-link']}
							to={`/users/${authorId}`}
							target="_blank"
							underline="never"
						>
							{author}
						</Anchor>
					</Text>
					{isEdit && (
						<CharacteristicsForm fields={fields} setFields={setFields} charsctsType='setInputTypes'/>
					)}
					<Group className={classes.tags}>{tagDiv}</Group>

					{isEdit ? (
						<RichTextEditor editor={editor} mt="1em" mb="-0.5m">
							<RichTextEditor.Toolbar sticky stickyOffset={60}>
								<RichTextEditor.ColorPicker
									colors={[
										'#25262b',
										'#868e96',
										'#fa5252',
										'#e64980',
										'#be4bdb',
										'#7950f2',
										'#4c6ef5',
										'#228be6',
										'#15aabf',
										'#12b886',
										'#40c057',
										'#82c91e',
										'#fab005',
										'#fd7e14',
									]}
								/>

								<RichTextEditor.ControlsGroup>
									<RichTextEditor.Control interactive={false}>
										<IconColorPicker size="1rem" stroke={1.5} />
									</RichTextEditor.Control>
									<RichTextEditor.Color color="#F03E3E" />
									<RichTextEditor.Color color="#7048E8" />
									<RichTextEditor.Color color="#1098AD" />
									<RichTextEditor.Color color="#37B24D" />
									<RichTextEditor.Color color="#F59F00" />
								</RichTextEditor.ControlsGroup>

								<RichTextEditor.UnsetColor />

								<RichTextEditor.ControlsGroup>
									<RichTextEditor.Bold />
									<RichTextEditor.Italic />
									<RichTextEditor.Underline />
									<RichTextEditor.Strikethrough />
									<RichTextEditor.Highlight />
									<RichTextEditor.Code />
								</RichTextEditor.ControlsGroup>
								<RichTextEditor.ClearFormatting />

							</RichTextEditor.Toolbar>

							<RichTextEditor.Content />
						</RichTextEditor>
					) : <Text
						style={{
							fontSize: 14,
							textAlign: 'center',
						}}
						mt="1em"
						mb="20px"
						span
					// dangerouslySetInnerHTML={{ __html: htmlString }}
					// dangerouslySetInnerHTML={getDescriptionText()}
					>
						{/* {getDescriptionText()} */}
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
						<div dangerouslySetInnerHTML={{ __html: getDescriptionText() }} />
						<br />
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
					</Text>}
					
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
						wrap="wrap"
						gap="5em"
					>
						{itemsDiv}
					</Flex>
					<Button
						style={{
							// width: '100%',
							width: 'fit-content',
							padding: '5px 10px',
							marginBottom: '20px',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
						variant={dark ? 'outline' : 'light'}
						color="gray"
						radius="md"
					>
						Show More
					</Button>
				</Stack>
			</Box>
		</>
	);
}
export default CollectionPage;
