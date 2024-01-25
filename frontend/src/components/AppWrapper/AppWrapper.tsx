import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useAuthStore } from '@/stores/authStore_zutands';
import { decodeJWT } from '@/utils/util';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function AppWrapper({ children }) {
	const { isAuthenticated, login, logout } = useAuthStore();
	const axiosPrivate = useAxiosPrivate({ noToastError: true });

	const { i18n } = useTranslation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function fetchUserInfo() {
			try {
				const { data } = await axiosPrivate.get('/users/userInfo');
				const { accessToken, refreshToken } = data;
				const decoded = decodeJWT(accessToken);
				login({ accessToken, refreshToken, userinfo: decoded.userInfo });
			} catch (err) {
				logout();
			}
		}
		if (isAuthenticated) fetchUserInfo();

		i18n.on('languageChanged', (newLang) => console.log(newLang));
	}, []);

	return <>{children}</>;
}
