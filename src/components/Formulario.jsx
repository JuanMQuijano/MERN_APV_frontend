import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"
import usePacientes from "../hooks/usePacientes";


function Formulario() {

    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [sintomas, setSintomas] = useState("");
    const [fecha, setFecha] = useState("");
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {

        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setSintomas(paciente.sintomas)
            setFecha(paciente.fecha)
            setId(paciente._id);
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, propietario, email, sintomas, fecha].includes("")) {
            return setAlerta({
                msg: "Debes llenar Todos los campos",
                error: true
            })
        }


        guardarPaciente({
            nombre, propietario, email, sintomas, fecha, id
        })

        setAlerta({ msg: "Guardado Correctamente" })
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
        setId("")
    }

    const { msg } = alerta;

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administra tus Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit}>

                {msg &&
                    <Alerta alerta={alerta} />}

                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input type="text" name="nombre" id="nombre" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de la Mascota" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input type="text" name="propietario" id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del Propietario" value={propietario} onChange={(e) => { setPropietario(e.target.value) }} />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Propietario</label>
                    <input type="email" name="email" id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Email del Propietario" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea name="sintomas" id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los Síntomas" value={sintomas} onChange={(e) => { setSintomas(e.target.value) }}></textarea>

                </div>

                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                    <input type="date" name="fecha" id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={(e) => { setFecha(e.target.value) }} />
                </div>

                <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 hover:cursor-pointer transition-colors" />
            </form>
        </>
    )
}

export default Formulario