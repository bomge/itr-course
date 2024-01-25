import { Title } from '@mantine/core';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
	const { t } = useTranslation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Title order={1} ta="center">
				{t('api.errors.notFound')}
			</Title>
		</>
	);
}
