import {Navbar} from "../components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import routes from "./routes.tsx";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{routes.map((route) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={<>{route.element}</>}
							/>
						);
					})}

					{/* {protectedRoutes.map((route) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={<Protected>{route.element}</Protected>}
							/>
						);
					})} */}
					<Route
						path="*"
						element={
							<>
								{/* <PageNotFound /> */}
							</>
						}
					/>
					
				</Routes>
				<Navbar />
			</BrowserRouter>

		</>
	);
};

export default Router;