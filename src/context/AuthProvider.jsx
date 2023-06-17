import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";

//Referencia a como se llamará el context de este provider
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                return setCargando(false);
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios("/veterinarios/perfil", config);

                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }

            setCargando(false)
        }

        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {

        const token = localStorage.getItem("token");

        if (!token) {
            return setCargando(false);
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config);

            return {
                msg: "Almacenado Correctamente"
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {

        const token = localStorage.getItem("token");

        if (!token) {
            return setCargando(false);
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put("/veterinarios/actualizar-password", datos, config);

            return { msg: data.msg }
        } catch (error) {
            return { msg: error.response.data.msg, error: true };
        }
    }

    return (
        //Retornamos el context con lo que declaremos en el provider
        <AuthContext.Provider
            //Valores que estarán a disposición
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;