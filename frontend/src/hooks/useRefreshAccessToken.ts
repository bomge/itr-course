import axios from '../api/axios';
import Cookies from 'js-cookie';

type Tokens = {
	accessToken: string;
	refreshToken: string;
};

const useRefreshAccessToken = () => {
	const getNewToken: () => Promise<null | Tokens> = async () => {
		let tokens = null;
		await axios
			.get('/auth/refresh', {
				withCredentials: true,
				headers: {
					// biome-ignore lint/style/useTemplate: <explanation>
					Authorization: 'Bearer ' + Cookies?.get('refresh_token'),
				},
			})
			.then((response) => {
				tokens = response.data;
			})
			.catch((err) => {
				tokens = null;
			});
		return tokens;
	};
	return getNewToken;
};
export default useRefreshAccessToken;
