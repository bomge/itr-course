import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { decodeJWT } from '@/utils/util';
import { useAuthStore } from '@/stores/authStore_zutands';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function PrivateRoute({ children }) {
	const navigate = useNavigate();
	const { userinfo } = useAuthStore();
	const { t } = useTranslation();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!userinfo) {
			toast.error(t('api.errors.403'));
			navigate('/');
		}
	}, [userinfo, navigate]);

	return (
		<>
			{userinfo && children}
			{!userinfo && navigate('/')}
		</>
	);
}
