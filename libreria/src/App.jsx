import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Contenido from './Contenido';
import DialogoNuevo from './DialogoNuevo';


function App() {
  const [stateNuevo, setStateNuevo] = useState(false);
  const [stateType, setStateType] = useState(1);
  const [error, setError] = useState(false);
  const [reloadEstudiantes, setRE] = useState(false);
  const [matricula, setMatricula] = useState("");

  return (
    <>
      <DialogoNuevo
        stateNuevo={stateNuevo}
        setStateNuevo={setStateNuevo}
        type={stateType}
        setRE={setRE}
        matriculaValue={matricula}
      />
      <div className='contenedor'>
        <Header setShow={setError} />
        <Contenido
         setStateNuevo={setStateNuevo} 
         setStateType={setStateType} 
         error={error}
         reloadEstudiantes={reloadEstudiantes}
         setRE={setRE}
         setMatricula={setMatricula}
         />
        
      </div>
    </>
  );
}

export default App;
