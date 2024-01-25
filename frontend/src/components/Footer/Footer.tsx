import { Flex } from '@mantine/core';
import classes from './Footer.module.css';
import { IconHeart } from '@tabler/icons-react';

export function Footer() {
	return (
		<div className={classes.footer}>
			<Flex justify="center" mt="1em">
				{/* <span> */}
				MADE WITH <Heart /> BY B1Emg
				{/* </span> */}
			</Flex>
		</div>
	);
}

function Heart() {
	return <IconHeart fill="#f53d3d" stroke="youtube" />;
	// return <span>♥</span>;
}
