import {
	ActionIcon,
	Avatar,
	Box,
	ScrollArea,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';

import classes from './CommentsBox.module.css';
import { IconBrandTelegram } from '@tabler/icons-react';
import { useRef, useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import CommentSingle, { IComment } from './CommentsSingle/CommentSingle';
import { useAuthStore } from '@/stores/authStore_zutands';
import socketio from 'socket.io-client';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const socket = socketio('http://localhost:3500', {
	transports: ['websocket'],
	auth: {
		token: Cookies?.get('access_token'),
	},
});

export default function CommentsBox() {
	const axios = useAxiosPrivate();
	const { itemID } = useParams();
	const { t } = useTranslation();
	const { userinfo } = useAuthStore();
	const viewport = useRef<HTMLDivElement>(null);

	const [comments, setComments] = useState<IComment[]>([]);
	const [text, setText] = useState('');

	useEffect(() => {
		comments.sort((a, b) => +new Date(a.date) - +new Date(b.date)); //cuz from server string

		viewport.current?.scrollTo({
			top: viewport.current.scrollHeight,
			behavior: 'smooth',
		});
	}, [comments]);

	useEffect(() => {
		async function getComments() {
			const { data } = await axios.get(`/items/${itemID}/comments`);
			setComments(data);
		}
		getComments();
	}, [itemID, axios]);

	const postComment = async () => {
		const { data } = await axios.post(`/items/${itemID}/comment`, {
			text,
		});
		const succes = { data };
		if (!succes) {
			throw new Error(`failed post comment ${data}`);
		}
		socket.emit('send_comment', { text, itemID });
	};

	const handleAddComment = async () => {
		if (!text) return;

		try {
			await postComment();
			setComments([
				...comments,
				{
					author: {
						_id: userinfo!.id,
						name: userinfo!.name,
					},
					date: new Date(),
					text,
					_id: String(Math.random()),
				},
			]);
			setText('');
		} catch (e) {}
	};

	const handleCommentEnter = (k: React.KeyboardEvent<HTMLInputElement>) => {
		if (k.keyCode === 13) {
			handleAddComment();
		}
	};

	useEffect(() => {
		socket.emit('join_room', itemID);

		socket.on('new_comment', (comment) => {
			setComments((prev) => [...prev, comment]);
		});

		return () => {
			socket.emit('leave_room', itemID);
		};
	}, [itemID]);

	return (
		<Stack w="55em" maw="100%">
			<ScrollArea.Autosize
				offsetScrollbars
				viewportRef={viewport}
				scrollbars="y"
				style={{
					height: '11em',
				}}
				className={classes.comments}
			>
				{comments.map((a) => (
					<CommentSingle comment={a} key={a._id} />
				))}
				{comments.length == 0 && (
					<Text className={classes.noComments}>
						{t('itemPage.comment.zeroComments')}
					</Text>
				)}
			</ScrollArea.Autosize>

			<div className="comment-submit-section">
				{userinfo ? (
					<TextInput
						placeholder={t('itemPage.comment.yourCommentPlaceHolder')}
						value={text}
						onChange={(e) => setText(e.currentTarget.value)}
						onKeyDown={handleCommentEnter}
						rightSection={
							<ActionIcon onClick={handleAddComment}>
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
						placeholder={t('itemPage.comment.mustBeLogged')}
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
	);
}
