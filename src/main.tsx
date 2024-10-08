import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home.tsx";
import App from "./App.tsx";
import "./index.css";
import TypePage from "./pages/Type/TypePage.tsx";
import DetailsPage from "./pages/Details/DetailsPage.tsx";
import TeamRandom from "./pages/TeamR/TeamRandom.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => {
          try {
            return axios
              .get("https://pokebuildapi.fr/api/v1/pokemon")
              .then((res) => res.data);
          } catch (error) {
            console.error(error);
            return [];
          }
        },
      },
      {
        path: "/type/:name",
        element: <TypePage />,
        loader: ({ params }) => {
          try {
            return axios
              .get(`https://pokebuildapi.fr/api/v1/pokemon/type/${params.name}`)
              .then((res) => res.data);
          } catch (error) {
            console.error(error);
            return [];
          }
        },
      },
      {
        path: "/pokemon/:name",
        element: <DetailsPage />,
        loader: ({ params }) => {
          try {
            return axios
              .get(`https://pokebuildapi.fr/api/v1/pokemon/${params.name}`)
              .then((res) => res.data);
          } catch (error) {
            console.error(error);
            return [];
          }
        },
      },
      {
        path: "/teambuilder",
        element: <TeamRandom />,
        loader: () => {
          try {
            return axios
              .get(`https://pokebuildapi.fr/api/v1/random/team/suggest`)
              .then((res) => res.data);
          } catch (error) {
            console.error(error);
            return [];
          }
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
