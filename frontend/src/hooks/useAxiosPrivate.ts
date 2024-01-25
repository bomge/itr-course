import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useRefreshAccessToken from './useRefreshAccessToken';

import { Routes, Route, Navigate } from 'react-router-dom';
import { decodeJWT } from '@/utils/util';
import { Bounce, toast } from 'react-toastify';
import { useAuthStore } from '@/stores/authStore_zutands';
import axios from 'axios';

const useAxiosPrivate = ({ noToastError = false } = {}) => {
	const { accessToken, login, logout } = useAuthStore();
	const getNewToken = useRefreshAccessToken();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				const newConfig = config;
				if (!config.headers.Authorization && accessToken) {
					newConfig.headers.Authorization = `Bearer ${accessToken}`;
				}
				return newConfig;
			},
			(error) => {
				Promise.reject(error);
			},
		);
		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;

				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;

					const { data } = prevRequest; // keep request data

					const resultNewTkns = await getNewToken();
					if (!resultNewTkns) {
						logout();
						throw new Error('can get new access token');
					}
					const { accessToken, refreshToken } = resultNewTkns;
					const decoded = decodeJWT(accessToken);

					login({ accessToken, refreshToken, userinfo: decoded.userInfo });
					prevRequest.headers.Authorization = `Bearer ${accessToken}`;

					prevRequest.data = data; // restore original request data

					await new Promise((resolve) => setTimeout(resolve, 500));

					return axiosPrivate(prevRequest);
				}

				let err: string;
				if (axios.isAxiosError(error) && error.response?.data?.message) {
					err = error.response?.data?.message;
				} else {
					err = 'Something went wrong';
				}

				if (!noToastError)
					toast.error(err, {
						autoClose: 3000,
						closeOnClick: true,
						theme: 'light',
						transition: Bounce,
					});

				throw error;
				// window.location = '/login';
				// return <Navigate to="/login" />;
				// return Promise.reject(error);
			},
		);
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [accessToken, getNewToken]);

	return axiosPrivate;
};
export default useAxiosPrivate;
