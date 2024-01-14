import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import AuthProvider from 'react-auth-kit';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import './styles.css';
import authStore from './stores/authStore';


export default function App() {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			 <AuthProvider store={authStore}>
				<Router />
			 </AuthProvider>
		</MantineProvider>
	);
}
