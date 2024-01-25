import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Suspense } from 'react';
import { HomePage } from './pages/Home/Home.page';
import CollectionPage from './pages/Collection/Collection.page';
import ItemPage from './pages/Item/Item.page';
import SearchPage from './pages/Search/Search.page';
import PrivateRoute from './components/Auth/PrivateRoute';
import NotFound from './pages/NotFound/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback="Загрузка...">
						<HomePage />
					</Suspense>
				),
			},
			{
				path: '/collection/:collectionID',
				element: (
					<Suspense fallback="Загрузка...">
						<CollectionPage  />
					</Suspense>
				),
			},
			{
				path: '/item/:itemID',
				element: (
					<Suspense fallback="Загрузка...">
						<ItemPage />
					</Suspense>
				),
			},
			{
				path: '/collection/:collectionID/addItem',
				element: (
					<PrivateRoute>
						<Suspense fallback="Загрузка...">
						<ItemPage isCreate/>
						</Suspense>
					</PrivateRoute>
				),
			},
			{
				path: '/collection/createNew',
				element: (
					<PrivateRoute>
						<Suspense fallback="Загрузка...">
						<CollectionPage isCreate />
						</Suspense>
					</PrivateRoute>
				),
			},
			{
				path: '/search',
				element: (
					<Suspense fallback="Загрузка...">
						<SearchPage />
					</Suspense>
				),
			},
			{
				path: '/user/:authorId',
				element: (
					<Suspense fallback="Загрузка...">
						<SearchPage />
					</Suspense>
				),
			},
			{
				path: '*',
				element: (
						<NotFound/>
				),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
