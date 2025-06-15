import { lazy } from 'react';

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
];

export default config;
