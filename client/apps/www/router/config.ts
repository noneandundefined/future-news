import { lazy } from 'react';
import Signin from '../pages/signin';
import Gallery from '../pages/gallery';
import Signup from '../pages/signup';

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
		redirectIfLogged: false,
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
		path: '/signup',
		title: 'signup',
		loginRequired: false,
		redirectIfLogged: true,
		component: Signup,
	},
	{
		path: '/gallery',
		title: 'gallery for stream',
		loginRequired: true, // true
		component: Gallery,
	},
];

export default config;
