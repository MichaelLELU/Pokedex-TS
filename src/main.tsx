import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home.tsx";
import App from "./App.tsx";
import "./index.css";
import GenerationPage from "./pages/Generation/GenerationPage.tsx";
import TypePage from "./pages/Type/TypePage.tsx";
import DetailsPage from "./pages/Details/DetailsPage.tsx";

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
      return axios.get("https://tyradex.app/api/v1/pokemon").then((res) => {
        const formattedData = res.data
          .filter((pokemon: any) => pokemon.pokedex_id && pokemon.name?.fr)
          .map((pokemon: any) => ({
            id: pokemon.pokedex_id,
            pokedexId: pokemon.pokedex_id,
            name: pokemon.name.fr,
            image: pokemon.sprites?.regular || "",
            apiTypes:
              pokemon.types?.map((type: any) => ({
                name: type.name,
                image: type.image,
              })) || [],
            apiGeneration: pokemon.generation,
          }));

        localStorage.setItem("pkmnData", JSON.stringify(formattedData));
        localStorage.setItem("cacheDate", Date.now().toString());

        return formattedData;
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
        loader: async ({ params }) => {
          const pokemons = await getPkmnData();

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
        loader: ({ params }) => {
          return axios
            .get(`https://tyradex.app/api/v1/pokemon/${params.id}`)
            .then((res) => {
              const pokemon = res.data;

              return {
                name: pokemon.name.fr,
                pokedexId: pokemon.pokedex_id,
                image: pokemon.sprites?.regular || "",
                shinyImage: pokemon.sprites?.shiny || "",
                apiGeneration: pokemon.generation,
                apiTypes:
                  pokemon.types?.map((type: any) => ({
                    name: type.name,
                    image: type.image,
                  })) || [],
                apiEvolutions:
                  pokemon.evolution?.next?.map((evo: any) => ({
                    name: evo.name,
                    pokedexId: evo.pokedex_id,
                  })) || [],
                apiPreEvolution: pokemon.evolution?.pre?.[0]
                  ? {
                      name: pokemon.evolution.pre[0].name,
                      pokedexId: pokemon.evolution.pre[0].pokedex_id,
                    }
                  : "none",
                stats: pokemon.stats,
              };
            });
        },
      },
          {
            path: "/generation/:id",
            element: <GenerationPage />,
            loader: ({ params }) => {
              return axios
                .get(`https://tyradex.app/api/v1/gen/${params.id}`)
                .then((res) => {
                  return res.data.map((pokemon: any) => ({
                    id: pokemon.pokedex_id,
                    pokedexId: pokemon.pokedex_id,
                    name: pokemon.name.fr,
                    image: pokemon.sprites?.regular || "",
                    apiTypes:
                      pokemon.types?.map((type: any) => ({
                        name: type.name,
                        image: type.image,
                      })) || [],
                    apiGeneration: pokemon.generation,
                  }));
                });
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
