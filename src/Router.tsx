import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Suspense } from 'react';
import { HomePage } from './pages/Home/Home.page';
import CollectionPage from './pages/Collection/Collection.page';
import ItemPage from './pages/Item/Item.page';

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
			{
				path: '/item/:itemID',
				element: (
					<Suspense fallback="Загрузка...">
						<ItemPage/>
					</Suspense>
				),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
