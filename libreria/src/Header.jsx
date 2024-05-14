import unachLogo from "../public/Logo_unach_bl.png"
import "./Header.css"
function Header({setShow}){
    return(
        <>
            <nav>
                <div className="logoBox">
                    <img src={unachLogo} alt="LogoUnach" className="logo"/>
                </div>
                <div className="titulo">
                    <h1>Estudiantes</h1>
                </div>
                <div className="botones">
                    <button type="button" className="option" id="estudiantesBoton" onClick={()=>{
                        setShow(true)
                        console.log("Se debe de mostrar la alerta...");
                    }}>
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/100/FFFFFF/user--v1.png" alt="user--v1"/>
                    </button>
                    <button type="button" className="option" id="librosBoton">
                        <img width="30" height="30" src="https://img.icons8.com/ios-filled/100/FFFFFF/books.png" alt="books"/>
                    </button>
                    <button type="button" className="option" id="comprasBoton">
                        <img width="30" height="30" src="https://img.icons8.com/material-rounded/100/FFFFFF/shopping-cart.png" alt="shopping-cart"/>
                    </button>
                </div>
            </nav>
        </>
    )
     /*
                            
                            */
}
export default Header