import { createContext, useState, useEffect } from "react"
import clienteAxios from "../../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const mostrarPacientes = async () => {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios("/pacientes", config);

            setPacientes(data);
        }

        mostrarPacientes();
    }, [auth]);


    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                console.log(paciente);
                const pacientesActualizado = pacientes.map(pacienteState =>
                    pacienteState._id === data._id ? data : pacienteState
                )

                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                const { data } = await clienteAxios.post("/pacientes", paciente, config)

                //Extramos los valores no deseados y guardamos una copia con la información que si queremos 
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm("Quieres eliminar este paciente?");

        if (confirmar) {
            try {
                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                await clienteAxios.delete(`/pacientes/${id}`, config)

                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export { PacientesProvider }

export default PacientesContext