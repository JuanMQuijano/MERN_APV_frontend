import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";
import { Link } from "react-router-dom";

function OlvidePassword() {

    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || email.length < 6) {
            return setAlerta({
                msg: "Debes ingresar un email",
                error: true
            });
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });

            setAlerta({
                msg: data.msg,
                error: false
            })

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
                <h1 className='text-indigo-600 font-black text-6xl'>Recupera tu Acceso y no Pierdas tus <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {msg && <Alerta alerta={alerta} />}

                <form method='POST' onSubmit={handleSubmit}>

                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
                        <input type="email" placeholder='Ingresa tu Email de Registro' name="email" id="email" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <input type="submit" value="Recibir Instrucciones" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes cuenta? Inicia Sesión</Link>
                    <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvidé mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword