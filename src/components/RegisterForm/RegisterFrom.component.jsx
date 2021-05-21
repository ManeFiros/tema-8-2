import { Formik } from 'formik';
import MensajeValidacion from '../MensajeValidacion/MensajeValidacion.component';

export default function RegisterForm  ({children, onSubmit, validaciones}){
    let initialValues = { mail: '', pass: '' };
    return(<div>
        {children}
        <Formik validationSchema={validaciones} initialValues={initialValues} onSubmit={onSubmit}>
            {({values, handleChange, handleSubmit, isSubmitting, errors})=>(
                <form onSubmit={handleSubmit} className="formulario" autoComplete="false">
                    <strong>Registro</strong>
                    <div className="firstLine">               
                        <div className="botonera">
                            <input className="Elemento" placeholder="Introduce el mail..." type="text"
                                    name="mail" 
                                    onChange={handleChange} 
                                    value={values.mail} 
                            />                                
                            <input className="Elemento" placeholder="Introduce la contraseña..." type="text"
                                    name="pass" 
                                    onChange={handleChange} 
                                    value={values.pass} />
                            <button className="Nuevo" type="submit" disabled={isSubmitting}>Registrarse</button>
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