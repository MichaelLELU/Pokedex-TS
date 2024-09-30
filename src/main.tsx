import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import App from "./App.tsx";
import "./index.css";
import TypePage from "./pages/Type/TypePage.tsx";
import DetailsPage from "./pages/Details/DetailsPage.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`https://pokebuildapi.fr/api/v1/pokemon`),
      },
      {
        path: "/type/:name",
        element: <TypePage />,
        loader: ({ params }) =>
          fetch(`https://pokebuildapi.fr/api/v1/pokemon/type/${params.name}`),
      },
      {
        path: "/pokemon/:name",
        element: <DetailsPage />,
        loader: ({ params }) =>
          fetch(`https://pokebuildapi.fr/api/v1/pokemon/${params.name}`),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
