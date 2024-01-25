import { Avatar, Box, Text } from '@mantine/core';
import classes from './CommentSingle.module.css';
export interface IComment {
	author: {
		_id: string;
		name: string;
	};
	text: string;
	date: Date | string | number;
	_id: string;
}

type CommentSingleProps = {
	comment: IComment;
};

export default function CommentSingle({ comment }: CommentSingleProps) {
	return (
		<Box
			style={{
				display: 'flex',
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
					{comment.author.name}
				</Text>
				<Text className={classes['comment-text']}>{comment.text}</Text>
			</div>
		</Box>
	);
}
