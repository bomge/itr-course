import {
	Card,
	CardSection,
	ActionIcon,
	Badge,
	Flex,
	useMantineColorScheme,
	Skeleton
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './CollectionCard.module.css';



export default function CollectionCardSkeleton() {

	const { colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const dark = colorScheme === 'dark';

	const tagDiv = [0,0,0].map((_, i) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
		<Skeleton width="20%" radius='55px' height={13} key={i}/>
	));


	return (
		// <Link to={`/collection/${id}`}
		// >
		<Card
			shadow="sm"
			padding="lg"
			pos="relative"
			w="17em"
			style={{ textDecoration: 'none' }}
			withBorder
			radius='lg'
			className='hoverTransform pulse'
		>
			<CardSection>
				<div className={classes.cardSection}>
					<Badge
						color="orange"
						variant={dark ? 'outline' : 'light'}
						style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							zIndex: 1,
						}}
					>
						Collection
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
			<Flex direction="column" mb="5px" mt="12px">
				<Skeleton width='80%' height={17} className={classes.title}/>

				<Skeleton height={11} radius="xl" mt="1.5px" w='35%' style={{alignSelf:'end'}}>

				</Skeleton>
			</Flex>
			<Flex className={classes.tags} mb='22px' mt='4px' direction='row' gap={10}>{tagDiv}</Flex>
			<Skeleton height='10px' width='100%' mb='sm'/>
			<Skeleton height='10px' width='100%' mb='6px'/>
		</Card>
		// </Link>
	);
}
