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

async function getPkmnData() {
  const cacheTTL = 5 * 24 * 60 * 60 * 1000;
  const cachedData = localStorage.getItem("pkmnData");
  const cachedTime = localStorage.getItem("cacheTTL");

  if (cachedData && cachedTime) {
    const timestamp = Number(cachedTime);
    if (timestamp + cacheTTL > Date.now()) {
      return JSON.parse(cachedData);
    }
  } else {
    localStorage.removeItem("pkmnData");
    localStorage.removeItem("cacheTTL");

    try {
      return axios.get("https://pokebuildapi.fr/api/v1/pokemon").then((res) => {
        localStorage.setItem("pkmnData", JSON.stringify(res.data));
        localStorage.setItem("cacheTTL", Date.now().toString());
        return res.data;
      });
    } catch (error) {
      console.error(error);
      // TODO: replace all console.error with proper error handling
      return [];
    }
  }
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => getPkmnData(),
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
        path: "/pokemon/:id",
        element: <DetailsPage />,
        loader: ({ params }) => {
          try {
            return axios
              .get(`https://pokebuildapi.fr/api/v1/pokemon/${params.id}`)
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
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
