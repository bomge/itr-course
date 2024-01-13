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
import { SetStateAction } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

interface AuthModalProps {
  toggle: (value?: SetStateAction<string> | undefined) => void;
  activeTab: string;
  setUser: unknown,
  closeModal: () => void
}

export default function AuthModal_tabs({ toggle, activeTab, setUser, closeModal }: AuthModalProps) {
	
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: '',
		},
		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) =>
				val.length <= 6 ? 'Password should include at least 6 characters' : null,
		},
	});

	const signIn = useSignIn();
	

	  const handleSubmit = () => {
		console.log('Form values:', form.values);
		signIn({
			auth: {
				  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
			},
			userState: {name: form.values.name, email: form.values.email}
		  });
		{/* @ts-expect-error  prost*/}
		  setUser({name: form.values.name, email: form.values.email});
		  closeModal();
	  };

	return (
		<Paper radius="md" p="md">
			{/* @ts-expect-error  prost*/}
			<Tabs defaultValue='login' value={activeTab} onChange={toggle}> 
				<Tabs.List>
					<Tabs.Tab value="login">
          					Login
					</Tabs.Tab>
					<Tabs.Tab value="register">
          					Register
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="login">
					<Text size="lg" mt='1em' mb='10px' fw={500}>Welcome back, Please login</Text>
					{/* <Divider labelPosition="center" my="sm" /> */}
					{/* <form onSubmit={form.onSubmit(() => {})}> */}
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<Stack>

							<TextInput
								required
								label="Email"
								placeholder="hello@gmail.com"
								value={form.values.email}
								onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
								error={form.errors.email && 'Invalid email'}
								radius="md"
								data-autofocus
								name='email'
							/>

							<PasswordInput
								required
								label="Password"
								placeholder="Your password"
								value={form.values.password}
								onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
								error={
									form.errors.password && 'Password should include at least 6 characters'
								}
								radius="md"
							/>
						</Stack>
						<Group justify="space-between" mt="1.2em">
							<Anchor component="button" type="button" c="dimmed" onClick={() => toggle('register')} size="xs">
                  Don't have an account? Register
							</Anchor>
							<Button type="submit" radius="xl">Login</Button>
						</Group>
					</form>
				
				</Tabs.Panel>

				<Tabs.Panel value="register">
					<Text size="lg" mt='1em' mb='10px' fw={500}>New here? Register</Text>
					<form onSubmit={form.onSubmit(() => {})}>
						<Stack>
							<TextInput
								label="Name"
								placeholder="Your name"
								value={form.values.name}
								onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
								radius="md"
								data-autofocus
							/>
							<TextInput
								required
								label="Email"
								placeholder="hello@gmail.com"
								value={form.values.email}
								onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
								error={form.errors.email && 'Invalid email'}
								radius="md"
							/>
							<PasswordInput
								required
								label="Password"
								placeholder="Your password"
								value={form.values.password}
								onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
								error={
									form.errors.password && 'Password shouldinclude at least 6 characters'
								}
								radius="md"
			  />
						</Stack>
						<Group justify="space-between" mt="1.2em">
			  <Anchor component="button" type="button" c="dimmed" onClick={() => toggle('login')} size="xs">
				Already have an account? Login
			  </Anchor>
			  <Button type="submit" radius="xl">Register</Button>
						</Group>
		  </form>
				</Tabs.Panel>
			</Tabs>
		</Paper>
	);
}