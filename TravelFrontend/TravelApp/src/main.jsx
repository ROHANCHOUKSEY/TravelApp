import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Explore from "./Component/Explore.jsx";
import TopLocation from "./Component/UserComponent/TopLocation.jsx";
import Favourites from "./Component/UserComponent/Favourites.jsx";
import AddLocation from "./Component/HostComponent/AddLocation.jsx";
import Host from "./Component/HostComponent/Host.jsx";
import {ContextProvider } from "./CreateContext/Context.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Explore />} />
      <Route path="location" element={<TopLocation />} />
      <Route path="favourites" element={<Favourites />} />
      <Route path="host" element={<Host />} />
      <Route path="addLocation" element={<AddLocation />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
