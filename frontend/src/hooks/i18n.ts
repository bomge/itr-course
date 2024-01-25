import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import en from '../tranlastions/en/en.global.js';
import pl from '../tranlastions/pl/pl.global.json';

i18n
	.use(initReactI18next)
	.init({
		debug: true,
		lng: JSON.parse(localStorage.getItem('lang') || '""')?.label || 'EN',
		resources: {
			EN: {
				translation: en,
			},
			PL: {
				translation: pl,
			},
		},
	});
export default i18n;
