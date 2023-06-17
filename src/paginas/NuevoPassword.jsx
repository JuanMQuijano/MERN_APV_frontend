import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Alerta from "../components/Alerta";


function NuevoPassword() {

    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordActualizado, setPasswordActualizado] = useState(false);

    const { token } = useParams();

    useEffect(() => {

        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);

                setAlerta({
                    msg: "Ingresa tu Nuevo Password",
                })

                setTokenValido(true);

            } catch (error) {
                setAlerta({
                    msg: "Hubo un error con el enlace",
                    error: true
                })
            }
        }

        comprobarToken();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password < 6) {
            return setAlerta({
                msg: "El password debe tener 6 caracteres",
                error: true
            })
        }

        try {
            const { data } = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, { password })

            setPasswordActualizado(true);

            setAlerta({ msg: data.msg });

        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }
    }

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Reestablece tu password y no pierdas acceso a tus <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {msg && <Alerta alerta={alerta} />}

                {tokenValido && (
                    <>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className='my-5'>
                                <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Nuevo Password</label>
                                <input type="password" placeholder='Ingresa tu nuevo Password' name="password" id="password" className='border w-full p-3 mt-3 bg-gray-200 rounded-xl' value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <input type="submit" value="Reestablecer Password" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
                        </form>

                        {passwordActualizado &&
                            <Link to="/" className="block text-center my-5 text-gray-500">Inicia Sesión</Link>
                        }
                    </>
                )}

            </div>
        </>
    )
}

export default NuevoPassword