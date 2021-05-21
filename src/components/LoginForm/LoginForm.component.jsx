import { Formik } from 'formik';
import MensajeValidacion from '../MensajeValidacion/MensajeValidacion.component';
//import { Link } from 'react-router-dom';
import {LinkPropio} from '../LinkPropio/LinkPropio.component'

export default function LoginForm  ({children, onSubmit, validaciones, action}){
    let initialValues = { mail: '', pass: '' };
    var isValid = false;
    const login = (values) =>{
        console.log(values);
        validaciones
            .validate(values)
            .then(function(){
                isValid = true;
            }).catch(function(){
                isValid = false;
            });
    };
    return(<div>
        {children}
        <Formik validationSchema={validaciones} initialValues={initialValues} onSubmit={onSubmit}>
            {({values, handleChange, handleSubmit, isSubmitting, errors})=>(
                <form onSubmit={handleSubmit} className="formulario" autoComplete="false">
                    <strong>Acceso</strong>
                    <div className="firstLine">               
                        <div className="botonera">
                            <input className="Elemento" placeholder="Introduce el mail..." type="text"
                                    name="mail" 
                                    onChange={handleChange} 
                                    value={values.mail} />                                
                            <input className="Elemento" placeholder="Introduce la contraseña..." type="text"
                                    name="pass" 
                                    onChange={handleChange} 
                                    value={values.pass} />
                            <LinkPropio href={action} onClick2={isValid}>
                                <button className="Nuevo" type="submit" onClick={login(values)} disabled={isSubmitting}>Iniciar sesión</button>
                            </LinkPropio>
                            {/*<Link to={action}>
                                <button className="Nuevo" type="submit" onClick={ isValid?onSubmit:login(values)} disabled={isSubmitting}>Iniciar sesión</button>
                            </Link>*/}
                        </div>
                    </div>
                    <div className="firstLine">               
                        <div className="botonera2">
                            {errors.mail ? (<MensajeValidacion msg={errors.mail}/>) : null}
                            {errors.pass ? (<MensajeValidacion msg={errors.pass}/>) : null}
                        </div>
                    </div>
                </form>
            )}
        </Formik>
        </div>
    );
}