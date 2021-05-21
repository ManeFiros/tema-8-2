import { LinkPropio } from '../LinkPropio/LinkPropio.component';
import './MensajesHeader.component.scss';

export default function MensajesHeader(props) {
  return (
    <div className="MensajesHeader">
      <button onClick={props.setShow} className="Nuevo">Nuevo</button>
      <button onClick={props.clickEliminar} className="Vaciar">Vaciar</button>  
      <LinkPropio href={props.controlLoggin} onClick2={true}><button onClick={props.setLogOut} className="Vaciar" style={{position: "absolute",right: "5px"}}>Cerrar sesión</button></LinkPropio>
    </div> 
  );
}