
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import './Contenido.css'

function Contenido({setStateNuevo,setStateType,reloadEstudiantes, setRE, setMatricula}){
    const [dataEstudiantes, setDataEstudiantes] = useState(null);
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
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/estudiantes');
            setDataEstudiantes(response.data);
            
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Conexión fallida',
            })
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
        Toast.fire({
            icon: 'info',
            title: 'Conexión realizada',
        })
    }, []);
    if(reloadEstudiantes){
        fetchData();
        setRE(false);
    }


   
    return(

        <main>
            <div className='box1'>
                <div className='contenidoTabla'>
                    <table>
                        <thead>
                            <tr>
                                <th>Matrícula</th>
                                <th>Nombre</th>
                                <th>A. Paterno</th>
                                <th>A. Materno</th>
                                <th>F. Nacimiento</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataEstudiantes ? (
                                    
                                    dataEstudiantes.map(item=>(
                                        <tr key={item.matricula}>
                                            <td>{item.matricula}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.apellido_p}</td>
                                            <td>{item.apellido_m}</td>
                                            <td>{item.f_nacimiento}</td>
                                            <td>{item.telefono}</td>
                                            <td>{item.correo}</td>
                                            <td>
                                                <div className='opciones'>
                                                    <button 
                                                        type="button" 
                                                        className='boton1 botonAzul'
                                                        onClick={() => {
                                                            setStateNuevo(true);
                                                            setStateType(2);
                                                            setMatricula(item.matricula)
                                                        }}
                                                    >
                                                        <img width="19" height="19" src="https://img.icons8.com/pastel-glyph/100/000000/create-new--v2.png" alt="create-new--v2"/>
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className='boton1 botonRojo' 
                                                        onClick={ ()=>{
                                                            Swal.fire({
                                                                title: `Quiere eliminar a ${item.matricula}?`,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#80eeef",
                                                                cancelButtonColor: "#f63f7c ",
                                                                confirmButtonText: "Eliminar"
                                                              }).then(async (result) => {
                                                                if (result.isConfirmed) {
                                                                    try {
                                                                        const response = await axios.delete(`http://localhost:8080/api/estudiantes/${item.matricula}`);
                                                                        console.log(response);
                                                                        Toast.fire({
                                                                            icon: 'success',
                                                                            title: `Se eliminó a ${item.matricula}`,
                                                                        });
        
                                                                        setRE(true);
                                                                        
                                                                    } catch (error) {
                                                                        Toast.fire({
                                                                            icon: 'error',
                                                                            title: 'Conexión fallida',
                                                                        })
                                                                        console.error('Error fetching data:', error);
                                                                    }
                                                                }
                                                              });
                                                           
                                                        }}
                                                    >
                                                        <img width="19" height="19" src="https://img.icons8.com/pastel-glyph/64/000000/trash.png" alt="trash"/>
                                                    </button>
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    
                                ):(
                                    
                                    <div className="vistaLoader">
                                        <div className="loader"></div>
                                    </div>
                                
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='tools'>
                    <button className="boton2 boton2_azul" id="applyModificar" onClick={()=>{
                        setStateNuevo(true);
                        setStateType(1);
                    }}>
                        <div className="svg-wrapper-1">
                            <div className="svg-wrapper">
                                <img width="19" height="19" src="https://img.icons8.com/fluency-systems-regular/90/000000/plus-2-math.png" alt="plus-2-math"/>
                                
                            </div>
                        </div>
                        <span>Nuevo</span>
                    </button>
                </div>
            </div>
        </main>
    )
}
export default Contenido;