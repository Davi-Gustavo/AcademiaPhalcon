
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import Home from "./Home/home.jsx";
import Login from "./Login/login.jsx";
import Cadastro from "./Cadastro/cadastro.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import GerenciarAlunos from "./Alunos/gerenciarAlunos.jsx";
import GerenciarPlanos from "./Planos/gerenciarPlanos.jsx";
import GerenciarMatriculas from "./Matriculas/gerenciarMatriculas.jsx";
import GerenciarPagamentos from "./Pagamentos/gerenciarPagamentos.jsx";
import GerenciarFuncionarios from "./Funcionarios/gerenciarFuncionarios.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/academia",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "alunos",
        element: <GerenciarAlunos />
      },
      {
        path: "planos",
        element: <GerenciarPlanos />
      },
      {
        path: "matriculas",
        element: <GerenciarMatriculas />
      },
      {
        path: "pagamentos",
        element: <GerenciarPagamentos />
      },
      {
        path: "funcionarios",
        element: <GerenciarFuncionarios />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
