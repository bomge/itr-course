import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Suspense } from 'react';
import { HomePage } from './pages/Home.page';
import CollectionPage from './pages/Collection.page';

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
						<CollectionPage/>
					</Suspense>
				),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
