import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Divider,
	Anchor,
	Stack,
} from '@mantine/core';
import { SetStateAction } from 'react';

type additionalProps = {
	type:'login'|'register', toggle: (value?: SetStateAction<string> | undefined) => void
}

export default function AuthModal(props: PaperProps & additionalProps) {
	const {type, toggle} = props;
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: '',
			terms: true,
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) =>
				val.length <= 6
					? 'Password should include at least 6 characters'
					: null,
		},
	});

	return (
		<Paper radius="md" p="md" {...props}>
			<Text size="lg" fw={500}>
				{type=='login' && 'Welcome back, Please login'}
				{type=='register' && 'New here? Register'}
			</Text>

			<Divider labelPosition="center" my="lg" />

			<form onSubmit={form.onSubmit(() => {})}>
				{/* <FocusTrap active={true}> */}

				<Stack>
					{type === 'register' && (
						<TextInput
							label="Name"
							placeholder="Your name"
							value={form.values.name}
							onChange={(event) =>
								form.setFieldValue('name', event.currentTarget.value)
							}
							radius="md"
							data-autofocus

						/>
					)}

					<TextInput
						required
						label="Email"
						placeholder="hello@gmail.com"
						value={form.values.email}
						onChange={(event) =>
							form.setFieldValue('email', event.currentTarget.value)
						}
						error={form.errors.email && 'Invalid email'}
						radius="md"
						data-autofocus
					/>

					<PasswordInput
						required
						label="Password"
						placeholder="Your password"
						value={form.values.password}
						onChange={(event) =>
							form.setFieldValue('password', event.currentTarget.value)
						}
						error={
							form.errors.password &&
							'Password should include at least 6 characters'
						}
						radius="md"
					/>

				</Stack>

				<Group justify="space-between" mt="xl">
					<Anchor
						component="button"
						type="button"
						c="dimmed"
						onClick={() => toggle()}
						size="xs"
					>
						{type === 'register'
							? 'Already have an account? Login'
							: 'Don\'t have an account? Register'}
					</Anchor>
					<Button type="submit" radius="xl">
						{upperFirst(type)}
					</Button>
				</Group>
				{/* </FocusTrap> */}

			</form>
		</Paper>
	);
}
