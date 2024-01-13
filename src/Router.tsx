import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Suspense } from 'react';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback="Загрузка...">
						<HomePage/>
					</Suspense>
				),
			},
			{
				path: '/collection/:collectiID',
				element: (
					<Suspense fallback="Загрузка...">
						Cтраница коллекции
					</Suspense>
				),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
