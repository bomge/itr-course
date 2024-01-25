import { Anchor, Card } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Key } from 'react';
import { Link } from 'react-router-dom';

type AddCard_SearchPageProps = {
	page: 'collection' | 'search';
	id?: string;
};

export default function AddCard_SearchPage({
	page,
	id,
}: AddCard_SearchPageProps) {
	return (
		<Anchor
			component={Link}
			to={
				page === 'collection'
					? `/collection/${id}/addItem`
					: '/collection/createNew'
			}
			style={{ width: page == 'search' ? '17em' : 160, alignSelf: 'center' }}
		>
			<Card
				shadow="sm"
				padding="lg"
				pos="relative"
				w={page == 'search' ? '10em' : '8em'}
				style={{ textDecoration: 'none' }}
				withBorder
				radius="lg"
				className="hoverTransform card"
				m="auto"
				// mih='16.5em'
			>
				{' '}
				<IconPlus
					size={page === 'search' ? '100px' : '80px'}
					style={{ margin: 'auto' }}
				/>
			</Card>
		</Anchor>
	);
}
