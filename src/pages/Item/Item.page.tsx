import {
	Text,
	Paper,
	Image,
	ActionIcon,
	Title,
	Badge,
	Stack,
	Button,
	TextInput,
	Divider,
	Box,
	Avatar,
	Table,
	Anchor,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconBrandTelegram, IconHeart } from '@tabler/icons-react';
import placeholder_item from '../../assets/product-placeholder.png';
import classes from './Item.page.module.css';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Link } from 'react-router-dom';
import CharacteristicsForm, {
	Fields,
} from '@/components/CharacteristicInput/CharacteristicInput';

const author = 'Oleg Petrov';
const authorId = '1';

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
	{
		name: 'name3',
		type: 'multi-line',
		value: '',
	},
	{
		name: 'name4',
		type: 'logical',
		value: '',
	},
	{
		name: 'name4',
		type: 'date',
		value: '',
	},
];

export default function ItemPage() {
	const [liked, setLiked] = useState(true);
	const [showMore, setShowMore] = useState(false);
	const [title, setTitle] = useState('библия');

	const [fields, setFields] = useState<Fields>(initFields);
	const [isEdit, setIsEdit] = useState(false);

	const authUser = useAuthUser();
	console.log(fields);
	// const [newCharacteristics, setNewCharacteristics] = useState([]);
	// const characteristics = [
	// 	{
	// 		label: 'Author',
	// 		value: 'Иисус',
	// 	},
	// 	{
	// 		label: 'Year',
	// 		value: '1856',
	// 	},
	// 	{
	// 		label: 'Rare',
	// 		value: 'true',
	// 	},
	// 	{
	// 		label: 'Publisher',
	// 		value: 'Publisher Name',
	// 	},
	// 	{
	// 		label: 'Pages',
	// 		value: '300',
	// 	},
	// 	{
	// 		label: 'Language',
	// 		value: 'Russian',
	// 	},
	// 	{
	// 		label: 'Genre',
	// 		value: 'Fiction',
	// 	},
	// ];
	const characteristics = fields.map((field) => {
		return { label: field.name, value: field.value instanceof Date ? field.value.toLocaleDateString() :field.value.toString() };
	});
	// const addCharacteristics = (label, value) => {
	// 	const newChar = {
	// 		label,
	// 		value,
	// 	};
	// 	setNewCharacteristics([...newCharacteristics, newChar]);
	// };
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div
			style={{
				padding: '20px',
				marginTop: '3em',
			}}
		>
			<Text
				style={{
					marginBottom: '20px',
					fontSize: '14px',
					// color: '#34495e',
				}}
				// className={classes.navText}
			>
				{'collection->rarest books est 1980->items->библия'}
			</Text>

			<Paper
				style={{
					display: 'flex',
					padding: '20px',
					flexWrap: 'wrap',
				}}
				styles={{
					root: {
						marginLeft: '8%',
					},
				}}
			>
				<div
					style={{
						marginRight: '20px',
						position: 'relative',
					}}
				>
					<Image
						src={placeholder_item}
						alt="Book cover"
						style={{
							width: '300px',
							height: '400px',
							//   objectFit: 'cover',
						}}
					/>
					<ActionIcon
						// className={classes['cardSection-icon']}
						variant="transparent"
						// color="gray"
						style={{
							position: 'absolute',
							left: '270px',
							bottom: '10px',
						}}
						onClick={() => setLiked((prev) => !prev)}
					>
						<IconHeart
							size={24}
							color="red"
							fill={liked ? 'red' : 'transparent'}
						/>
					</ActionIcon>
				</div>

				<div className={classes['item-description']}>
					{isEdit ? <TextInput
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
					/> :
						<><Title
							order={1}
							style={{
								fontSize: '26px',
								color: '#e74c3c',
							}}
						>
							{title}
							<Badge
								style={{
									marginLeft: '10px',
									backgroundColor: '#f1c40f',
									color: 'white',
								}}
							>
							old
							</Badge>
						</Title></>
					}
					
					

					<Text truncate="end" className={classes.author} mt="-7px" mb="5px">
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
					<Button onClick={() => setIsEdit((v) => !v)}>
						{isEdit ? 'Save' : 'Edit'}{' '}
					</Button>

					{isEdit ? (
						<CharacteristicsForm
							fields={fields}
							setFields={setFields}
							charsctsType="setValues"
						/>
					) : (
						<Table>
							<tbody>
								{characteristics
									.slice(0, showMore ? characteristics.length : 3)
									.map((char) => (
										<tr className={classes.rows}>
											<td>
												<Text>{char.label}:</Text>
											</td>
											<td>
												<Text ml="0.55em">{char.value}</Text>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					)}
					{!isEdit && characteristics.length>3 && <Button
						onClick={() => setShowMore(!showMore)}
						color="nonde"
						className={classes['descr-btn']}
					>
						{showMore ? 'Show Less' : 'Show More'}
					</Button>}

					{/* <TextInput
							placeholder="Add new characteristic"
							rightSection={
								<ActionIcon
									onClick={() => addCharacteristics('New Label', 'New Value')}
								>
									<IconBrandTelegram size={16} />
								</ActionIcon>
							}
							style={{
								paddingRight: '30px',
							}}
						/> */}
				</div>
			</Paper>

			<Paper
				style={{
					marginTop: '20px',
					padding: '20px',
					flexDirection: 'column',
					margin: 'auto',
				}}
				display="flex"
				maw="80vw"
			>
				<Title
					order={2}
					style={{
						marginBottom: '10px',
						color: '#34495e',
						justifyContent: 'center',
					}}
					display="flex"
				>
					COMMENTS
				</Title>
				<Divider
					style={{
						marginBottom: '20px',
					}}
				/>
				<Stack>
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<Avatar
							src="/placeholder.png"
							alt="Petya"
							style={{
								marginRight: '10px',
							}}
						/>
						<div>
							<Text
								style={{
									fontWeight: 500,
								}}
							>
								Petya
							</Text>
							<Text className={classes['comment-text']}>
								Вау, супер крутая книга. Сам с женой её читаю
							</Text>
						</div>
					</Box>
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '20px',
						}}
					>
						<Avatar
							src="/placeholder.png"
							alt="Ира"
							style={{
								marginRight: '10px',
							}}
						/>
						<div>
							<Text
								style={{
									fontWeight: 500,
								}}
							>
								Ира
							</Text>
							<Text className={classes['comment-text']}>
								Очень качественная книга, никогда подобного не читал. Вот что
								нужно читать своим детям
							</Text>
						</div>
					</Box>
					<div className="comment-submit-section">
						{authUser ? (
							<TextInput
								placeholder="Your comment"
								rightSection={
									<ActionIcon>
										<IconBrandTelegram size={16} />
									</ActionIcon>
								}
								style={
									{
										// paddingRight: '30px',
									}
								}
							/>
						) : (
							<TextInput
								placeholder="You must be logged in to comment"
								disabled
								rightSection={
									<ActionIcon disabled>
										<IconBrandTelegram size={16} />
									</ActionIcon>
								}
								styles={{
									input: {
										textAlign: 'center',
									},
								}}
							/>
						)}
					</div>
				</Stack>
			</Paper>
		</div>
	);
}
