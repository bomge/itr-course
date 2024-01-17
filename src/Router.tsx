import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Suspense } from 'react';
import { HomePage } from './pages/Home/Home.page';
import CollectionPage from './pages/Collection/Collection.page';
import ItemPage from './pages/Item/Item.page';
import SearchPage from './pages/Search/Search.page';

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
			{
				path: '/collection/:collectiID/addItem',
				element: (
					<Suspense fallback="Загрузка...">
						Страница добавления итема
					</Suspense>
				),
			},
			{
				path: '/search',
				element: (
					<Suspense fallback="Загрузка...">
						<SearchPage/>
					</Suspense>
				),
			},
			{
				path: '/user/:authorId',
				element: (
					<Suspense fallback="Загрузка...">
						<SearchPage/>
					</Suspense>
				),
			},
			{
				path: '/collection/createNew',
				element: (
					<Suspense fallback="Загрузка...">
						Страница создания коллекции
					</Suspense>
				),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
