import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";

import AdminLayout from "./layout/AdminLayout";
import AdministrarPacientes from "./paginas/AdministrarPacientes";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";


/*

  Todo debe estar rodeado de BrowserRouter
  Routes -> Es para agrupar diferentes rutas
  Route -> Es para una ruta en especifico

*/

function App() {

  return (
    <BrowserRouter>
      {/* Permitimos que todo lo que este dentro del AuthProvider puedan hacer uso del custom hook */}
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* 

          path -> Ruta
          element -> Hace referencía al elemento padre (Layout)

        */}

            <Route path="/" element={<AuthLayout />} >
              {/* 
            Con index indicamos que esto será lo que se renderizará al entrar a / 
            Con element indicamos el componente que renderizaremos en el padre (LayoutPrincipal)
          */}
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />

              {/* Indicamos que será una url donde su id será dinámico */}
              <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />


            </Route>

            {/* Ruta Protegida */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
