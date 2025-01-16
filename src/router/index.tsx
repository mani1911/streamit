import {Navbar} from "../components";
// import { PageNotFound } from "@pages";
// import { getUser } from "@slices/index";
// import { useAppDispatch } from "@store/hooks";
// import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import protectedRoutes from "./protectedRoutes";
import routes from "./routes.tsx";

const Router = () => {
	// const dispatch = useAppDispatch();
	// useEffect(() => {
	// 	(async () => {
	// 		await dispatch(getUser());
	// 	})();
	// }, []);
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