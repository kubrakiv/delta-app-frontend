import React from "react";
import { RouterProvider } from "react-router-dom";

import OpenContextProvider from "./components/OpenContextProvider/OpenContextProvider.jsx";

import router from "./router.jsx";

function App({ Component, pageProps }) {
  return (
    <OpenContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </OpenContextProvider>
  );
}

export default App;
