import { ScanPage, AudioPage } from "../pages";

interface Routes {
	title: string;
	path: `/${string}`;
	description: string;
	element: JSX.Element;
}

const routes: Routes[] = [
	{
		title: "Home",
		path: "/",
		description: "Home Page",
		element: <AudioPage />,
	},
	{
		title: "Scan",
		path: "/connect",
		description: "Scan Page",
		element: <ScanPage />,
	},
];

export default routes;