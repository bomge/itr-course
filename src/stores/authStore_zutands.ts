import { create } from 'zustand';
import Cookies from 'js-cookie';

interface UserInfo {
	id: string;
	name: string;
	email: string;
}

interface AuthState {
	isAuthenticated: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	userinfo: UserInfo | null;
}


interface AuthStore {
	isAuthenticated: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	userinfo: UserInfo | null;

	login: (params: {
		accessToken: string;
		refreshToken: string;
		userinfo: UserInfo;
	}) => Promise<void>;

	logout: () => void;
}
//TODO REMOVE NAMES TO .ENV
export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: !!Cookies.get('access_token'),
	accessToken: Cookies.get('access_token'),
	refreshToken: Cookies.get('refresh_token'),
	userinfo:
		Cookies.get('access_token') && localStorage.getItem('userinfo')
			? JSON.parse(localStorage.getItem('userinfo')!)
			: null, //be err if user changes localstore. Ye spaghetti code

	login: async ({ accessToken, refreshToken, userinfo }) => {
		set({
			isAuthenticated: true,
			accessToken,
			refreshToken,
			userinfo,
		});
		Cookies.set('access_token', accessToken);
		Cookies.set('refresh_token', refreshToken);
		localStorage.setItem('userinfo', JSON.stringify(userinfo));
	},

	logout: () => {
		set({
			isAuthenticated: false,
			accessToken: null,
			refreshToken: null,
			userinfo: null,
		});
		Cookies.remove('access_token');
		Cookies.remove('refresh_token');
		localStorage.removeItem('userinfo');
	},
}));
