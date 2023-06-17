import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            return setAlerta({
                msg: "Debes llenar todos los campos",
                error: true
            })
        }

        try {
            const { data } = await clienteAxios.post("/veterinarios/login", { email, password })
            localStorage.setItem("token", data.token)
            setAuth(data)
            navigate("/admin");

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }


    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Administra tus <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {msg && <Alerta alerta={alerta} />}

                <form action="" method='POST' onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
                        <input type="email" placeholder='Ingresa tu Email de Registro' name="email" id="email" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
                        <input type="password" placeholder='Ingresa tu Password' name="password" id="password" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/registrar" className="block text-center my-5 text-gray-500">¿Aún no tienes cuenta? Regístrate</Link>
                    <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvidé mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login