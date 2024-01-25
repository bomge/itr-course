import { Card, CardSection, Badge, Skeleton, ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './ItemCard.module.css';

export default function ItemCardSkeleton() {
	return (
		<>
			<Card
				shadow="sm"
				padding="lg"
				pos="relative"
				w="17em"
				style={{ textDecoration: 'none' }}
				withBorder
				// m="auto"
				radius="lg"
				className="hoverTransform pulse"
			>
				<CardSection>
					<div className={classes.cardSection}>
						<Badge
							color="pink"
							variant="light"
							style={{
								position: 'absolute',
								top: '10px',
								right: '10px',
								zIndex: 1,
							}}
						>
							Item
						</Badge>

						<Skeleton height={160} />

						<ActionIcon
							className={classes['cardSection-icon']}
							variant="transparent"
							// style={{
							// 	color: '#ff6b6b'
							// }}
							color="gray"
						>
							<IconHeart
								size={24}
								// color="white"
								// fill='#f0f0f0'
							/>
						</ActionIcon>
					</div>
				</CardSection>

				<Skeleton width="60%" height={10} mb={5} mt={15} />
				<Skeleton width="30%" height={10} mb={22} />
				<Skeleton width="80%" height={10} mb={5} />
			</Card>
		</>
	);
}
