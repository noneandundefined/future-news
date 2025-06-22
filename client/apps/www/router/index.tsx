import config from './config';
import { useEffect } from 'react';
import type { CustomRouteConfig } from './config';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getAuthState } from '../private-route';

const CustomRoute: React.FC<CustomRouteConfig> = ({
	loginRequired = true,
	redirectIfLogged = true,
	component: Component,
	title,
}) => {
	const isLoggedIn = getAuthState();
	const location = useLocation();
	const children = <Component />;

	useEffect(() => {
		if (title) {
			document.title = `${title} - the future news official`;
		} else {
			document.title = `the future news official`;
		}
	}, [title]);

	if (loginRequired) {
		if (isLoggedIn) {
			return children;
		} else {
			return <Navigate to="/signin" state={{ from: location }} replace />;
		}
	} else {
		return isLoggedIn && redirectIfLogged ? (
			<Navigate to="/" replace />
		) : (
			children
		);
	}
};

export default () => {
	return (
		<Routes>
			{config.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={<CustomRoute {...route} />}
				/>
			))}
		</Routes>
	);
};
