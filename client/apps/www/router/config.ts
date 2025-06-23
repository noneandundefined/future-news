import { lazy } from 'react';
import Signin from '../pages/signin';
import Gallery from '../pages/gallery';

const Home = lazy(() => import('@/www/pages/home'));

export interface CustomRouteConfig {
	path: string;
	title?: string;
	loginRequired?: boolean;
	redirectIfLogged?: boolean;
	component: any;
}

const config: CustomRouteConfig[] = [
	{
		path: '/',
		loginRequired: false,
		component: Home,
	},
	{
		path: '/signin',
		title: 'signin',
		loginRequired: false,
		redirectIfLogged: true,
		component: Signin,
	},
	{
		path: '/gallery',
		title: 'gallery for stream',
		loginRequired: true,
		component: Gallery,
	},
];

export default config;
