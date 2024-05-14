import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';

function DialogoNuevo({stateNuevo, setStateNuevo, type, setRE, matriculaValue}) {
    const claseText = (stateNuevo)?"":"oculto";
    const titulo = (type==1)? "Nuevo estudiante" : "Modificar a: " + matriculaValue;

    const [matricula, setMatricula] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apellido_p, setAp] = useState("");
    const [apellido_m, setAm] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [estudiante, setEstudiante] = useState(null);


    function getValue(event){
        return event.target.value;
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        iconColor: '#151515',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    function toast(type,description=null) {
        const icons = {
            "1":"success",
            "2":"warning",
            "3":"error",
            "4":"info"
        };
        Toast.fire({
            icon: icons[type],
            title: description,
        })
    }
    //?Función para añadir
    async function addEstudiante(data=null){
        console.log(data);
        if(data!=null){
            try {
                const response = await axios.post('http://localhost:8080/api/estudiantes', data);
                console.log('Estudiante añadido:', response.data);
                toast(1, "Estudiante añadido");
                setRE(true);
                setStateNuevo(false);
            } catch (error) {
                console.error('Error al añadir el estudiante:', error);
                var errorMessage = "Error al añadir el estudiante"
                if(error.response.data=='error_ae_dk'){
                    errorMessage = "Matricula ya registrada"
                }
                toast(3, errorMessage);
            }
        }else{
            toast(2, "Datos sin completar");
        }
    }
    async function updateEstudiante(data=null, matricula=null){
        if(data!=null && matricula!=null){
            try {
                const response = await axios.put(`http://localhost:8080/api/estudiantes/${matricula}`,data);
                console.log('Estudiante modificado:', response.data);
                toast(1, "Estudiante modificado");
                setRE(true);
                setStateNuevo(false);
            } catch (error) {
                console.error('Error al actualizar el estudiante:', error);
                var errorMessage = "Error al actualizar el estudiante";
                toast(3, errorMessage);
            }
        }else{
            toast(2, "Datos sin completar");
        }
    }
    useEffect(() => {
        const fetchEstudiante = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/estudiantes/${matriculaValue}`);
                setEstudiante(response.data);
                setNombre(response.data.nombre);
                setAp(response.data.apellido_p);
                setAm(response.data.apellido_m);
                setNacimiento(response.data.f_nacimiento);
                setTelefono(response.data.telefono);
                setCorreo(response.data.correo);
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Error al buscar el estudiante',
                })
                console.error('Error fetching data:', error);
            }
        };
        if (type === 2 && stateNuevo) {
            fetchEstudiante();
        }
    }, [type, stateNuevo, matriculaValue]); // <-- Dependencias del efecto


    return (
        <>
            <div id="dialogoFondo" className={claseText}>
                <div className="dialogoCard">
                    <div className="dialogoContenido">
                        <h2>{titulo}</h2>
                        <div className="linea_azulClaro"></div>
                        {
                            (type == 1) && (
                                <div className="cajon column">
                                    <h3>Matrícula</h3>
                                    <div className="input">
                                        <input type="text" value={matricula} onChange={(event)=>{setMatricula(getValue(event))}} />
                                    </div>
                                </div>
                            )
                        }
                        
                        <div className="cajon column">
                            <h3>Nombre del alumno</h3>
                            <div className="input">
                                <input type="text" value={nombre} onChange={(event)=>{setNombre(getValue(event))}}/>
                            </div>
                        </div>

                        <div className="cajon row">
                            <div className="cajon2 column">
                                <h3>A. paterno</h3>
                                <div className="input">
                                    <input type="text" value={apellido_p} onChange={(event)=>{setAp(getValue(event))}} />
                                </div>
                            </div>
                            <div className="cajon2 column">
                                <h3>A. materno</h3>
                                <div className="input">
                                    <input type="text" value={apellido_m} onChange={(event)=>{setAm(getValue(event))}}  />
                                </div>
                            </div>
                        </div>

                        <div className="cajon row">
                            <div className="cajon2 column">
                                <h3>Fecha de nacimiento</h3>
                                <div className="input">
                                    <input type="date" value={nacimiento} onChange={(event)=>{setNacimiento(getValue(event))}} />
                                </div>
                            </div>
                            <div className="cajon2 column">
                                <h3>No. télefono</h3>
                                <div className="input">
                                    <input type="number" value={telefono} onChange={(event)=>{setTelefono(getValue(event))}} />
                                </div>
                            </div>
                        </div>

                        <div className="cajon column">
                            <h3>Correo</h3>
                            <div className="input">
                                <input type="mail" value={correo} onChange={(event)=>{setCorreo(getValue(event))}}/>
                            </div>
                        </div>
                    </div>
                    <div className="dialogoTools">
                        <button className="boton2 boton2_rojo" id="close" onClick={()=>{
                            setAm("");
                            setAp("");
                            setCorreo("");
                            setMatricula("");
                            setNacimiento("");
                            setNombre("");
                            setTelefono("");
                            setStateNuevo(false);
                        }}>
                            <div className="svg-wrapper-1">
                                <div className="svg-wrapper">
                                    <img width="19" height="19" src="https://img.icons8.com/fluency-systems-regular/100/close-window.png" alt="close-window"/>
                                    
                                </div>
                            </div>
                            <span>Cerrar</span>
                        </button>
                        <button className="boton2 boton2_verde" id="apply" onClick={()=>{
                            var data={
                                "nombre": nombre,
                                "apellido_p": apellido_p ,
                                "apellido_m": apellido_m,
                                "f_nacimiento": nacimiento,
                                "telefono": telefono ,
                                "correo": correo
                            }
                            if(type==1){
                                data.matricula=matricula;
                                addEstudiante(data);
                            }else if(type==2){
                                updateEstudiante(data,matriculaValue);
                            }
                            console.log(data)
                            
                        }}>
                            <div className="svg-wrapper-1">
                                <div className="svg-wrapper">
                                    <img width="19" height="19" src="https://img.icons8.com/fluency-systems-regular/90/000000/plus-2-math.png" alt="plus-2-math"/>
                                    
                                </div>
                            </div>
                            <span>Guardar</span>
                        </button>
                        
                    </div>

                </div>
            </div>
        </>
    );
}
export default DialogoNuevo;