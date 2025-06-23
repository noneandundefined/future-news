import { lazy } from 'react';
import Signin from '../pages/signin';

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
		path: '/signin',
		title: 'signin',
		loginRequired: false,
		redirectIfLogged: true,
		component: Signin,
	},
];

export default config;
