import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import TypePage from "./pages/Type/TypePage.tsx";
import DetailsPage from "./pages/Details/DetailsPage.tsx";
import GenerationPage from "./pages/Generation/GenerationPage.tsx";

import { getAllPokemons } from "./services/pokemon.service";
import { getPokemonById } from "./services/pokemonDetails.service";
import { getGeneration } from "./services/generation.service";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => getAllPokemons(),
      },
      {
        path: "/type/:name",
        element: <TypePage />,
        loader: async ({ params }) => {
          const pokemons = await getAllPokemons();

          return pokemons.filter((pokemon: any) =>
            pokemon.apiTypes.some(
              (type: any) =>
                type.name.toLowerCase() === params.name?.toLowerCase()
            )
          );
        },
      },
      {
        path: "/pokemon/:id",
        element: <DetailsPage />,
        loader: ({ params }) =>
          getPokemonById(params.id ?? ""),
      },
      {
        path: "/generation/:id",
        element: <GenerationPage />,
        loader: ({ params }) =>
          getGeneration(params.id ?? ""),
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