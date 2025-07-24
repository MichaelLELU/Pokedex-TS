import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home.tsx";
import App from "./App.tsx";
import "./index.css";
import GenerationPage from "./pages/Generation/GenerationPage.tsx";
import TypePage from "./pages/Type/TypePage.tsx";
import DetailsPage from "./pages/Details/DetailsPage.tsx";
import TeamRandom from "./pages/TeamR/TeamRandom.tsx";
import TeamChosed from "./pages/TeamC/TeamChosed.tsx";

async function getPkmnData() {
  const cacheTTL = 5 * 24 * 60 * 60 * 1000;
  const cachedData = localStorage.getItem("pkmnData");
  const cachedTime = localStorage.getItem("cacheDate");
  const timestamp = Number(cachedTime);

  if (cachedData && cachedTime && timestamp + cacheTTL > Date.now()) {
    return JSON.parse(cachedData);
  } else {
    localStorage.removeItem("pkmnData");
    localStorage.removeItem("cacheDate");

    try {
      return axios.get("https://pokebuildapi.fr/api/v1/pokemon").then((res) => {
        localStorage.setItem("pkmnData", JSON.stringify(res.data));
        localStorage.setItem("cacheDate", Date.now().toString());
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
        path: "/team",
        element: <TeamChosed />,
        loader: () => getPkmnData(),
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
        path: "/generation/:id",
        element: <GenerationPage />,
        loader: ({ params }) => {
          try {
            return axios
              .get(
                `https://pokebuildapi.fr/api/v1/pokemon/generation/${params.id}`
              )
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
  <RouterProvider router={router} />
);
