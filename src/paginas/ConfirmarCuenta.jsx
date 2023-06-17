import { useEffect, useState } from "react"
import clienteAxios from "../../config/axios";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";

function ConfirmarCuenta() {
    //Extraemos el token de la url
    const params = useParams();
    const { token } = params;

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        const confimarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${token}`;
                const { data } = await clienteAxios(url);

                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg,
                    error: false
                })

            } catch (error) {
                setAlerta({ msg: error.response.data.msg, error: true });
            }

            setCargando(false);
        }

        confimarCuenta();
    }, [])

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu Cuenta y Comienza a Administrar <span className='text-black'>tus Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {!cargando &&
                    <Alerta alerta={alerta} />
                }

                {cuentaConfirmada && (
                    <Link to="/">Iniciar Sesión</Link>
                )}

            </div>
        </>
    )
}

export default ConfirmarCuenta