import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente";


function ListadoPacientes() {

    const { pacientes } = usePacientes();

    return (
        <>
            {pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
                    <p className="text-xl text-center mt-5 mb-10">Administra tus pacientes <span className="text-indigo-600 font-bold">y citas</span> </p>

                    {pacientes.map(paciente => (
                        <Paciente key={paciente._id} paciente={paciente} />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
                    <p className="text-xl text-center mt-5 mb-10">Comienza agregando pacientes <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span> </p>
                </>
            )}
        </>
    )
}

export default ListadoPacientes