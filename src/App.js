import React from "react";
import { RouterProvider } from "react-router-dom";

import OpenContextProvider from "./components/OpenContextProvider/OpenContextProvider";

import router from "./router.js";

function App({ Component, pageProps }) {
    return (
        <OpenContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </OpenContextProvider>
    );
}

export default App;
