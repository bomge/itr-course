import {
	Text,
	Paper,
	Image,
	Title,
	Badge,
	Stack,
	Button,
	TextInput,
	Divider,
	Box,
	Table,
	Anchor,
	useMantineColorScheme,
	Group,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconHeart } from '@tabler/icons-react';
import placeholder_item from '../../assets/product-placeholder.png';
// import placeholder_item2 from '../../assets/Без названия.jpg';
import classes from './Item.page.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CharacteristicsForm, {
	Fields,
} from '@/components/CharacteristicInput/CharacteristicInput';
import BadgeInputForm, {
	Badges,
} from '@/components/BadgeInputForm/BadgeInputForm';
import ActionIconAuth from '@/components/ActionIconAuth/ActionIconAuth';
import { deleteItemAPI, handleLike } from '@/api/api';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import CommentsBox from '@/components/CommentsBox/CommentsBox';
import DeleteIcon from '@/components/DeleteBtn/DeleteBtn';
import { useAuthStore } from '@/stores/authStore_zutands';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import ObjectId from 'bson-objectid';
import { useTranslation } from 'react-i18next';

const initBadges: Badges = [
	{
		color: 'yellow',
		text: 'Yellow',
	},
	{
		color: 'grape',
		text: 'grape',
	},
];

export default function ItemPage({ isCreate = false }) {
	const { t } = useTranslation();
	const { itemID, collectionID } = useParams();
	const axios = useAxiosPrivate();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [isLiked, setIsLiked] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [title, setTitle] = useState('Item Title');
	const [coltitle, setcolTitle] = useState('colTitle');
	const [colId, setcolId] = useState(collectionID);
	const [_id, set_Id] = useState(itemID || new ObjectId().toString());

	const [owner, setOwner] = useState('');
	const [ownerId, setOwnerId] = useState('');

	const [allowedFields, setAllowedFields] = useState<Fields>([]);
	const [badges, setBadges] = useState<Badges>(initBadges);

	const [isEdit, setIsEdit] = useState(isCreate);
	const [canEdit, setCanEdit] = useState(isCreate);
	const [triggerRefresh, setTriggerRefresh] = useState(0);

	const [imageUploaded, setImageUploaded] = useState(false);

	const { userinfo } = useAuthStore();

	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function fetchCollectionData() {
			// otrybite mne ryki
			const { data } = await axios.get(`/collections/mini/${collectionID}`);
			const {
				allowedFields,
				owner: { _id: ownerId, name },
				title,
			} = data;
			setAllowedFields(allowedFields);
			setOwner(name);
			setOwnerId(ownerId);
			setcolTitle(title);
			// editor?.commands.setContent(description);
			if (ownerId === userinfo?.id) {
				setCanEdit(true);
			}
			setIsLoading(false);
		}
		async function fetchItemData() {
			// otrybite mne ryki
			const { data } = await axios.get(`/items/${itemID}`);
			const {
				fields,
				owner: { _id: ownerId, name },
				title,
				collectionTitle,
				tags,
				collectionId,
				isLiked,
				_id,
				img,
			} = data;
			setAllowedFields(fields);
			setOwner(name);
			setOwnerId(ownerId);
			setcolTitle(collectionTitle);
			setcolId(collectionId);
			setTitle(title);
			setBadges(tags);
			setIsLiked(isLiked);
			set_Id(_id);
			setImage(img);

			if (ownerId === userinfo?.id) {
				setCanEdit(true);
			}
			setIsLoading(false);
		}
		if (isCreate) {
			fetchCollectionData().catch((e) => {
				navigate('/');
			});
			if (!userinfo) return;
			setOwner(userinfo?.name);
			setOwnerId(userinfo?.id);
		} else {
			fetchItemData().catch((e) => {
				navigate('/');
			});
		}
	}, [itemID, userinfo, axios, navigate, triggerRefresh]);

	const handleSave = async () => {
		const postData = {
			fields: allowedFields.map((a) => {
				return { value: a.value ?? null, _id: a._id };
			}), //: allowedFields.filter((a) => a.value),
			title,
			tags: badges.filter((a) => a.text),
			_id,
			updImg: imageUploaded,
		};
		const { data } = await axios.post(
			`/items/${itemID || `collections/${collectionID}/new`}`,
			postData,
		);
		isCreate && navigate(`/item/${data._id}`);

		setTriggerRefresh(Math.random());

		toast.success(t('itemPage.updated'));
	};

	const handleBtnSave = async () => {
		if (isEdit) {
			await handleSave();
		}
		setIsEdit((v) => !v);
	};
	const characteristics = allowedFields.map((field) => {
		return {
			label: field.name,
			value: field.value || field.type=='logical'
				? field.type == 'date'
					? new Date(field.value as Date).toLocaleDateString()
					: field.value?.toString()
				: null,
		};
	});
	const tagDiv = badges.map((tag, i) => (
		<Link to={`/search?tag=${tag.text}`} key={tag.color + tag.text + i}>
			<Badge color={tag.color} size="sm" variant={dark ? 'outline' : 'light'}>
				{tag.text}
			</Badge>
		</Link>
	));
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleDelete = async () => {
		await deleteItemAPI({ type: 'items', id: itemID as string });
		toast.success(t('itemPage.deleted'));
		navigate(`/collection/${colId}`);
	};

	const [image, setImage] = useState('');

	const [isUploading, setIsUploading] = useState(false);

	if (isLoading) {
		return t('general.loading');
	}

	return (
		<Box>
			<Stack maw="80vw" m="auto" gap="0" mt="4em">
				<Text
					style={{
						marginBottom: '20px',
						fontSize: '14px',
						// color: '#34495e',
					}}
					// className={classes.navText}
				>
					<Anchor
						component={Link}
						to={`/collection/${colId}`}
						style={{ color: 'inherit', fontSize: '14px' }}
					>
						{t('general.collection')} {coltitle}
					</Anchor>
					{`->${isCreate ? t('itemPage.creating') : title}`}
				</Text>

				<Paper
					style={{
						display: 'flex',
						// padding: '20px',
						flexWrap: 'wrap',
					}}
					styles={{
						root: {
							marginLeft: '8%',
						},
					}}
					className={classes.paper}
				>
					<div
						style={{
							marginRight: '20px',
							position: 'relative',
							height: 'fit-content',
							maxWidth: '100%',
						}}
					>
						<Stack maw="400" className={classes.imageSection}>
							<div
								style={{
									width: '400px',
									height: '400px',
									position: 'relative',
									maxWidth: '100%',
								}}
							>
								<Image
									src={image || placeholder_item}
									fit="contain"
									alt="Item img"
									style={{
										width: '100%',
										height: '100%',
										// height: '400px',
									}}
								/>
								<ActionIconAuth
									variant="transparent"
									style={{
										position: 'absolute',
										// left: '270px',
										right: '5px',
										bottom: '10px',
									}}
									onClick={() =>
										handleLike({
											id: itemID as string,
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

							{isEdit && (
								<ImageUpload
									collectableId={_id}
									image={image}
									isUploading={isUploading}
									setImage={setImage}
									setIsUploading={setIsUploading}
									setImageUploaded={setImageUploaded}
								/>
							)}
						</Stack>

						{canEdit && (
							<>
								<Button
									pos="absolute"
									right="0"
									top="0.5em"
									radius="9px 0px 0px 9px"
									onClick={handleBtnSave}
									disabled={isUploading}
								>
									{isEdit
										? isCreate
											? t('general.create')
											: t('general.save')
										: t('general.edit')}{' '}
								</Button>
								{!isCreate && <DeleteIcon handleDelete={handleDelete} />}
							</>
						)}
					</div>

					<div className={classes['item-description']}>
						{isEdit ? (
							<TextInput
								value={title}
								onChange={(event) => setTitle(event.currentTarget.value)}
								placeholder={t('itemPage.itemTitle')}
								style={{
									fontSize: 30,
									fontWeight: 700,
									textAlign: 'center',
								}}
								// w='2em'
								mt="0.4em"
								mb="0.0em"
								pb="0"
								w="65%"
								// h='0.3em'
							/>
						) : (
							<div style={{ maxWidth: '100%' }}>
								<Title
									order={1}
									style={{
										fontSize: '26px',
										color: '#e74c3c',
										wordWrap: 'break-word',
									}}
								>
									{title}
								</Title>
							</div>
						)}

						<Text truncate="end" className={classes.author} mt="-7px" mb="5px">
							{t('general.author')}&nbsp;
							{/* <a href={authorId} >{author}</a> */}
							<Anchor
								size="14px"
								className={classes.author}
								component={Link}
								to={`/user/${ownerId}`}
								underline="never"
							>
								{owner}
							</Anchor>
						</Text>

						<Group className={classes.tags} mt="0.6em" mb="0.3em">
							{tagDiv}
						</Group>

						{isEdit && (
							<>
								<br />
								<div style={{ textAlign: 'center', width: '100%' }}>
									{t('general.tags')}
								</div>
								<BadgeInputForm badges={badges} setBadges={setBadges} />
							</>
						)}

						{isEdit ? (
							<>
								<br />
								<div
									style={{
										textAlign: 'center',
										width: '100%',
										fontWeight: '700',
									}}
								>
									{t('general.characteristics')}
								</div>
								{allowedFields.length ? (
									<CharacteristicsForm
										fields={allowedFields}
										setFields={setAllowedFields}
										charsctsType="setValues"
									/>
								) : (
									<></>
								)}
								{allowedFields.length === 0 && isEdit && (
									<>
										{t('itemPage.noChrcts1')}
										<br />
										{t('itemPage.noChrcts2')}
									</>
								)}
							</>
						) : (
							<Table w="fit-content">
								<tbody>
									{characteristics
										.filter(c=>c.value ?? false )
										.slice(0, showMore ? characteristics.length : 3)
										.map((char) => (
											<tr
												className={classes.rows}
												key={char.label + char.value}
											>
												<td>
													<Text>{char.label}:</Text>
												</td>
												<td>
													<Text ml="0.55em" style={{ whiteSpace: 'pre-wrap' }}>
														{(char.value)}
													</Text>
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						)}
						{!isEdit && characteristics.length > 3 && (
							<div style={{ width: '100%' }}>
								<Button
									onClick={() => setShowMore(!showMore)}
									color="nonde"
									className={classes['descr-btn']}
								>
									{showMore ? t('general.showLess') : t('general.showMore')}
								</Button>
							</div>
						)}
						<br />
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
					{!isCreate && (
						<>
							<Title
								order={2}
								style={{
									marginBottom: '10px',
									color: '#34495e',
									justifyContent: 'center',
								}}
								display="flex"
							>
								{t('general.comments').toLocaleUpperCase()}
							</Title>
							<Divider
								style={{
									marginBottom: '20px',
								}}
							/>

							<CommentsBox />
						</>
					)}
				</Paper>
			</Stack>
		</Box>
	);
}
