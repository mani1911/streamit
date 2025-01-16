import Peer from "peerjs";
import { ScanPage, AudioPage } from "../pages";
import { v4 as uuidv4 } from 'uuid';

interface Routes {
	title: string;
	path: `/${string}`;
	description: string;
	element: JSX.Element;
}


const pid = uuidv4().replace(/-/g, "");
const peer = new Peer(pid);


const routes: Routes[] = [
	{
		title: "Home",
		path: "/",
		description: "Home Page",
		element: <AudioPage peer={peer}/>,

	},
	{
		title: "Scan",
		path: "/connect",
		description: "Scan Page",
		element: <ScanPage />,
	},
];

export default routes;