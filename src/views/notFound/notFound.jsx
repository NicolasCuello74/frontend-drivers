import { NavLink } from "react-router-dom";
import Style from '../notFound/notFound.module.css';
const imageURL = "https://img.freepik.com/vector-gratis/error-404-persona-que-busca-ilustracion-concepto_114360-7912.jpg?w=1380&t=st=1704504858~exp=1704505458~hmac=2e9d7932f5239981cbf6822b5e8693b52ba8cd5c3005e3518ad693876222cfd6"

function NotFound() {
  return (
    <div className={Style.Contenedor}>
      <NavLink to="/home" >
        <img className={Style.imga} src={imageURL} alt="NotFound" />
      </NavLink>
    </div>
  )
}

export default NotFound