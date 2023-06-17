//Importamos el Outlet para poder mostrar los hijos dentro del Layout
import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"

function AdminLayout() {

    const { auth, cargando } = useAuth();

    if (cargando) return 'Cargando...'

    return (
        <>
            <Header />

            {auth?._id ? (
                <main className="container mx-auto mt-20">
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}

            <Footer />
        </>
    )
}

export default AdminLayout