import { Anchor, Card } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Key } from 'react';
import { Link } from 'react-router-dom';

type AddCard_SearchPageProps = {
	key: Key | null | undefined
	page: 'collection' | 'search'
}

export default function AddCard_SearchPage({key, page}: AddCard_SearchPageProps){
	return (
		<Anchor component={Link} to={'/collection/createNew'} key={key} style={{margin:'auto', alignSelf:'center'}}>
			<Card
				shadow="sm"
				padding="lg"
				pos="relative"
				// w="17em"
				style={{ textDecoration: 'none' }}
				withBorder
				radius='lg'
				className='hoverTransform card'
				// m="auto"
				// mih='16.5em'
			>
				{' '}
				<IconPlus size={page==='search'?'100px' : '80px'}style={{ margin: 'auto' }} />
			</Card>
		</Anchor>
	);
}