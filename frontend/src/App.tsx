import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

import { ToastContainer } from 'react-toastify';
import AppWrapper from './components/AppWrapper/AppWrapper';
import i18n from './hooks/i18n';
import { I18nextProvider } from 'react-i18next';

export default function App() {
	return (
		<I18nextProvider i18n={i18n}>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<AppWrapper>
					<ToastContainer autoClose={2500} />
					<Router />
				</AppWrapper>
			</MantineProvider>
		</I18nextProvider>
	);
}
