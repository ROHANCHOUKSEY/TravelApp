import { StrictMode, useEffect } from "react";
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
import EditLocations from "./Component/HostComponent/EditLocations.jsx";
import Login from "./Component/LoginSignUpComponent/Login.jsx";
import SignUp from "./Component/LoginSignUpComponent/SignUp.jsx";
import PageNotFound from "./Component/PageNotFound.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import ViewDetails from "./Component/ViewDetails.jsx";
import StateLocations from "./Component/UserComponent/StateLocations.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Explore />} />
      <Route path="location" element={<ProtectedRoute><TopLocation /></ProtectedRoute>} />
      <Route path="stateLocation" element={<ProtectedRoute><StateLocations /></ProtectedRoute>} />
      <Route path="favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
      <Route path="host" element={<ProtectedRoute><Host /></ProtectedRoute>} />
      <Route path="addLocation" element={<ProtectedRoute><AddLocation /></ProtectedRoute>} />
      <Route path="viewDetails/:id" element={<ProtectedRoute><ViewDetails/></ProtectedRoute>} />
      <Route path="editLocation/:id" element={<ProtectedRoute><EditLocations/></ProtectedRoute>} />
      <Route path="login" element={<Login/>} />
      <Route path="signUp" element={<SignUp/>} />
      <Route path="*" element={<PageNotFound/>} />
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
 