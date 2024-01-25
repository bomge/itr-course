import axios from '../api/axios';

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
