import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { lazy, Suspense } from 'react';
import { HomePage } from './pages/Home/Home.page';
// import CollectionPage from './pages/Collection/Collection.page';
// import ItemPage from './pages/Item/Item.page';
import SearchPage from './pages/Search/Search.page';
import PrivateRoute from './components/Auth/PrivateRoute';
import NotFound from './pages/NotFound/NotFound';
import { useTranslation } from 'react-i18next';

const CollectionPage = lazy(() => import('./pages/Collection/Collection.page'));
const ItemPage = lazy(() => import('./pages/Item/Item.page'));


const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback="Loading...">
						<HomePage />
					</Suspense>
				),
			},
			{
				path: '/collection/:collectionID',
				element: (
					<Suspense fallback="Loading...">
						<CollectionPage  />
					</Suspense>
				),
			},
			{
				path: '/item/:itemID',
				element: (
					<Suspense fallback="Loading...">
						<ItemPage />
					</Suspense>
				),
			},
			{
				path: '/collection/:collectionID/addItem',
				element: (
					<PrivateRoute>
						<Suspense fallback="Loading...">
						<ItemPage isCreate/>
						</Suspense>
					</PrivateRoute>
				),
			},
			{
				path: '/collection/createNew',
				element: (
					<PrivateRoute>
						<Suspense fallback="Loading...">
						<CollectionPage isCreate />
						</Suspense>
					</PrivateRoute>
				),
			},
			{
				path: '/search',
				element: (
					<Suspense fallback="Loading...">
						<SearchPage />
					</Suspense>
				),
			},
			{
				path: '/collections/all',
				element: (
					<Suspense fallback="Loading...">
						<SearchPage searchAll/>
					</Suspense>
				),
			},
			{
				path: '/user/:authorId',
				element: (
					<Suspense fallback="Loading...">
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
