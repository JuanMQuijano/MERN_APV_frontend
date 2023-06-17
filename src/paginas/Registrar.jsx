import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

function Registrar() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, passwordConfirm].includes("")) {
            setAlerta({ msg: "Hay campos vacíos", error: true });
            return;
        }

        if (password !== passwordConfirm) {
            setAlerta({ msg: "Los Passwords no son iguales", error: true });
            return;
        }

        if (password.length < 6) {
            setAlerta({ msg: "El password es muy corto", error: true });
            return;
        }

        //Crear el usuario en el backend
        try {
            await clienteAxios.post(`/veterinarios`, {
                nombre, email, password
            })

            setAlerta({
                msg: "Creado Correctamente, Revisa tu Email",
                error: false
            })

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta


    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y Administra tus <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {/* Si en alerta hay algo lo mostramos */}
                {msg &&
                    //Mostramos el componente de alerta pasandole como prop la alerta la cual recive el objeto de alerta que estamos seteando en el state 
                    < Alerta alerta={alerta} />
                }

                <form action="" method='POST' onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="nombre">Nombre</label>
                        <input type="text" placeholder='Ingresa Tu Nombre' name="nombre" id="nombre" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={nombre} onChange={e => setNombre(e.target.value)} />
                    </div>

                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
                        <input type="email" placeholder='Ingresa tu Email' name="email" id="email" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
                        <input type="password" placeholder='Ingresa tu Password' name="password" id="password" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password2">Confirmar Password</label>
                        <input type="password" placeholder='Confirma tu Password' name="password2" id="password2" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes cuenta? Inicia Sesión</Link>
                    <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvidé mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar