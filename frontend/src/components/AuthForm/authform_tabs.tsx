import { useForm } from '@mantine/form';
import {
	Tabs,
	Paper,
	TextInput,
	PasswordInput,
	Text,
	Button,
	Anchor,
	Stack,
	Group,
} from '@mantine/core';
import { SetStateAction, useState } from 'react';
import { FormType } from '../Header/Header';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
interface AuthModalProps {
	toggle: (value?: SetStateAction<FormType> | undefined) => void;
	activeTab: string;
	closeModal: () => void;
	openDrawer: () => void;
}

import axios_ from 'axios';

import axiosPublic from '../../api/axios';
import { decodeJWT } from '@/utils/util';
import { useAuthStore } from '@/stores/authStore_zutands';
import { useTranslation } from 'react-i18next';

export default function AuthModal_tabs({
	toggle,
	activeTab,
	closeModal,
	openDrawer,
}: AuthModalProps) {
	const { t } = useTranslation();
	const mobile = useMediaQuery('(max-width:48em)');
	const [error, setError] = useState<null | string>(null);
	const loginForm = useForm({
		initialValues: { email: '', password: '' },
	});
	const registerForm = useForm({
		initialValues: { name: '', email: '', password: '' },
		validate: {
			email: (val) =>
				/^\S+@\S+$/.test(val) ? null : t('authForm.invalidEmail'),
			password: (val) =>
				val.length < 6
					? t('authForm.passLowLengthErr', { length: 6 })
					: null,
		},
	});
	const navigate = useNavigate();

	const { login } = useAuthStore();

	const handleToggle = (e) => {
		console.log(e);
		setError(null);
		if (activeTab !== e) toggle();
	};

	const handleLoginSubmit = async () => {
		try {
			const result = await axiosPublic.post('/auth/login', loginForm.values);
			const { accessToken, refreshToken } = result.data;
			const decoded = decodeJWT(accessToken);

			login({ accessToken, refreshToken, userinfo: decoded.userInfo });
			// * temp fix before using normal store
			//   navigate('/refresh');
			// navigate(-1);
			closeModal();
			if (mobile) openDrawer();
		} catch (err) {
			console.log(err);
			if (axios_.isAxiosError(err) && err.response?.data?.message) {
				setError(err.response?.data?.message);
			} else {
				setError(t('api.errors.idk'));
			}
		}
	};

	const handleRegisterSubmit = async () => {
		setError(null);
		try {
			const result = await axiosPublic.post(
				'/auth/register',
				registerForm.values,
			);
			const { accessToken, refreshToken } = result.data;
			const decoded = decodeJWT(accessToken);

			login({ accessToken, refreshToken, userinfo: decoded.userInfo });
			closeModal();
			if (mobile) openDrawer();
		} catch (err) {
			console.log(err);
			if (axios_.isAxiosError(err) && err.response?.data?.message) {
				setError(err.response?.data?.message);
			} else {
				setError(t('api.errors.idk'));
			}
		}
	};

	return (
		<Paper radius="md" p="md">
			<Tabs defaultValue="login" value={activeTab} onChange={handleToggle}>
				<Tabs.List>
					<Tabs.Tab value="login">{t('authForm.login')}</Tabs.Tab>
					<Tabs.Tab value="register">
						{t('authForm.register')}
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="login">
					<Text size="lg" mt="1em" mb="10px" fw={500}>
						{t('authForm.loginGreet')}
					</Text>

					{/* <Divider labelPosition="center" my="sm" /> */}
					{/* <form onSubmit={form.onSubmit(() => {})}> */}
					<form onSubmit={loginForm.onSubmit(handleLoginSubmit)}>
						<Stack>
							<TextInput
								required
								label="Email"
								placeholder="hello@gmail.com"
								value={loginForm.values.email}
								onChange={(event) =>
									loginForm.setFieldValue('email', event.currentTarget.value)
								}
								error={loginForm.errors.email}
								radius="md"
								data-autofocus
								name="email"
							/>

							<PasswordInput
								required
								label="Password"
								placeholder={t('authForm.urPassPlaceholder')}
								value={loginForm.values.password}
								onChange={(event) =>
									loginForm.setFieldValue('password', event.currentTarget.value)
								}
								error={loginForm.errors.password}
								radius="md"
							/>
							{error && (
								<Text
									style={{
										color: 'red',
										textAlign: 'center',
									}}
								>
									{error}
								</Text>
							)}
						</Stack>
						<Group justify="space-between" mt="1.2em">
							<Anchor
								component="button"
								type="button"
								c="dimmed"
								onClick={() => toggle('register')}
								size="xs"
							>
								{t('authForm.dontHaveAcc')}
							</Anchor>
							<Button type="submit" radius="xl">
								{t('authForm.login')}
							</Button>
						</Group>
					</form>
				</Tabs.Panel>

				<Tabs.Panel value="register">
					<Text size="lg" mt="1em" mb="10px" fw={500}>
						{t('authForm.registerGreet')}
					</Text>
					<form onSubmit={registerForm.onSubmit(handleRegisterSubmit)}>
						<Stack>
							<TextInput
								label="Name"
								placeholder={t('authForm.urNamePlaceholder')}
								value={registerForm.values.name}
								onChange={(event) =>
									registerForm.setFieldValue('name', event.currentTarget.value)
								}
								radius="md"
								data-autofocus
							/>
							<TextInput
								required
								label="Email"
								placeholder="hello@gmail.com"
								value={registerForm.values.email}
								onChange={(event) =>
									registerForm.setFieldValue('email', event.currentTarget.value)
								}
								error={registerForm.errors.email}
								radius="md"
							/>
							<PasswordInput
								required
								label="Password"
								placeholder={t('authForm.urPassPlaceholder')}
								value={registerForm.values.password}
								onChange={(event) =>
									registerForm.setFieldValue(
										'password',
										event.currentTarget.value,
									)
								}
								error={registerForm.errors.password}
								radius="md"
							/>
							{error && (
								<Text
									style={{
										color: 'red',
										textAlign: 'center',
									}}
								>
									{error}
								</Text>
							)}
						</Stack>
						<Group justify="space-between" mt="1.2em">
							<Anchor
								component="button"
								type="button"
								c="dimmed"
								onClick={() => toggle('login')}
								size="xs"
							>
								{t('authForm.haveAnAcc')}
							</Anchor>
							<Button type="submit" radius="xl">
								{t('authForm.register')}
							</Button>
						</Group>
					</form>
				</Tabs.Panel>
			</Tabs>
		</Paper>
	);
}
