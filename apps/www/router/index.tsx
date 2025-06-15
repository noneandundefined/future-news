import { useEffect } from "react";
import type { CustomRouteConfig } from "./config";

const CustomRoute: React.FC<CustomRouteConfig> = ({
    loginRequired = true,
    redirectIfLogged = true,
    component: Component,
    title,
}) => {
    const location = useLocation();
	const children = <Component />;

    useEffect(() => {
		if (title) {
			document.title = `${title} - Neomatica RC`;
		} else {
			document.title = `Neomatica RC`;
		}
	}, [title]);
}
