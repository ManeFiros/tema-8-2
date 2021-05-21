import './Mensajes.page.css'
import MensajesHeader from '../../components/MensajesHeader/MensajesHeader.component';
import MensajesTable from '../../components/MensajesTable/MensajesTable.component';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal.component';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { borrarMensaje, crearMensaje, leerMsj, vaciarMensajes } from '../../redux/actions';
import { logOut } from '../../redux/actions';

export default function Mensajes(props){
    const mensajes = useSelector(state => state.mensajes);  // El estado inicial será '[]'
    //const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const [showModal,setShowModal] = useState(false);

    //const isLogged = useSelector(state => state.isLogged);
    
    const setLogOut = () =>{ dispatch(logOut());}

    let controlLoggin = () => {
        return{
          pathname: '/',
          state:{
            mensajes: mensajes,
            isLogged: false
          }
        }
      }

    let nuevoMensaje = (values, {setSubmitting}) => {
        //e.preventDefault();
        setShow();
        let nuevo = {
            "asunto":  `${values.nombre}`,//e.target.getElementsByTagName("input")[0].value,
            "email":   `${values.mail}`,//e.target.getElementsByTagName("input")[1].value,
            "mensaje": `${values.descripcion}`,//e.target.getElementsByTagName("textarea")[0].value,
            "leido":false
        };
        
        dispatch(crearMensaje(nuevo));
        setSubmitting(false);
    };

    let eliminarMensajes = () => { dispatch(vaciarMensajes()); };
      
    let eliminarMensaje = (index) => { dispatch(borrarMensaje(index)); };
    
    let leerMensaje = (index) => { dispatch(leerMsj(index)); };

    let setShow = () => { setShowModal(!showModal); };

    const validaciones = Yup.object().shape({
        nombre: Yup.string()
          .required('Por favor, escribe el asunto.'),
        descripcion: Yup.string()
          .required('Por favor, escribe un mensaje.')
          .min(10, 'Mínimo 10 carácteres.'),
        mail: Yup.string()
          .required("Por favor, incluye el e-mail")
          .email("Introduzca un e-mail válido")
    });
    /*style={(isLogged?{}:{display:"none"})}*/
    return (
        <div className="Mensajes">
            <Modal show={showModal} 
                    handleClose ={setShow} 
                    onSubmit={nuevoMensaje}
                    validaciones={validaciones}/>

            <MensajesHeader show={showModal} setShow={setShow} clickEliminar={eliminarMensajes} setLogOut={setLogOut} controlLoggin={controlLoggin}/>
            <MensajesTable mensajes={mensajes} clickEliminarUno={eliminarMensaje} 
                clickMarcarLeido={leerMensaje}/>
        </div>
    );
}