//Importamos el Outlet para poder mostrar los hijos dentro del Layout
import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <>

            <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center ">
                {/* Donde está el Outlet será en donde se renderizarán los componentes hijos */}
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout