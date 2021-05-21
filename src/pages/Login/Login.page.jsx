import './Login.page.css'
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import RegisterForm from '../../components/RegisterForm/RegisterFrom.component'; 
import { logOut, logIn } from '../../redux/actions';
import LoginForm from '../../components/LoginForm/LoginForm.component';
import { useState, useEffect } from 'react';

export default function Login(props) {
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const [mensajes,setMensajes] = useState([]);

    useEffect(() => {   
        console.log("useEffect",window.history.state);  
        if(window.history.state!==null)      
          setMensajes(window.history.state.mensajes);
    },[]);

    var mailStr = "";
    
    let registrar = (mail, pass) =>{
      var users = JSON.parse(localStorage.getItem('users'));
      if (users == null) users = [];
      users.push({mail:mail, pass:pass});
      console.log(users);
      localStorage.setItem('users',JSON.stringify(users));
    }

    const setLogOut = () =>{ dispatch(logOut())}
    const setLogIn = () =>{ dispatch(logIn())}

    let nuevoUsuario = (values, {setSubmitting}) => {
        //e.preventDefault();        
        registrar(values.mail,values.pass);
        setSubmitting(false);
    };

    let controlLoggin = () => {
      return{
        pathname: '/mensajes',
        state:{
          mensajes: mensajes,
          isLogged: true
        }
      }
    }

    const validaciones = Yup.object().shape({
        pass: Yup.string()
          .required('Por favor, escribe una contraseña.')
          .min(5, 'Mínimo 5 carácteres.'),
        mail: Yup.string()
          .required("Por favor, incluye el e-mail")
          .email("Introduzca un e-mail válido")
          .test("","Ese e-Mail ya está en uso", value => {
            var users = JSON.parse(localStorage.getItem('users'));
            if (users == null) users = [];  
            var res = []; 
            if(users.length!==0)         
              res = users.filter(user => {
                console.log(user.mail+" - "+value);
                return user.mail===value;
              });
            return res.length===0;
          })
    });

    const validacionesLogIn = Yup.object().shape({
      pass: Yup.string()
        .required('Por favor, escribe una contraseña.')
        .when(["mail"], {
          is: (mail) =>{
            return mail!=null && mail.length>0;
          },
          then: Yup.string()
          .required('Por favor, escribe una contraseña.')
          .min(5, 'Mínimo 5 carácteres.')
          .test("","Usuario/contraseña incorrectos", value => {
            var users = JSON.parse(localStorage.getItem('users'));
            if (users == null) users = [];  
            var res = []; 
            if(users.length!==0) {       
              res = users.filter(user => {
                console.log(user.mail+" "+mailStr);
                return user.mail===mailStr;
              });
              if(res[0]===undefined) res=[{pass:"admin"}];
              console.log("Password",res[0].pass+" "+value);
              if(res[0].pass===value) return true;
            }
            return false;
          })
        }),
      mail: Yup.string()
        .required("Por favor, incluye el e-mail")
        .email("Introduzca un e-mail válido")    
        .test("","", value =>{
          mailStr = value;
          console.log(mailStr);
          return true;
        })    
  });
    
    return (
        <div className="Login">
           
                { isLogged ?
                <button onClick={setLogOut}  className="Vaciar">
                            Cerrar sesión
                </button>
                :
                <section className="modal-main">
                  <LoginForm onSubmit={setLogIn} validaciones={validacionesLogIn} action={controlLoggin}/>{/*action={props.controlLoggin}*/}
                  <br/>
                  <br/>
                  <RegisterForm onSubmit={nuevoUsuario} validaciones={validaciones}/>
                </section>
                }
        </div>
    );
}