import { Footer } from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

import classes from './Layout.module.css';
export function Layout() {
	return (
		<>
			<div className={classes.content}>
				<Header />
				<div className={classes.content}>
					<Outlet />
				</div>
			</div>
			<div className={classes.footer}>
				<Footer />
			</div>
		</>
	);
}
