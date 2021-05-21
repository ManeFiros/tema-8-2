import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
export const RoutePropio = ({ path, component: Component, children }) => {
    const isLogged = useSelector(state => state.isLogged);
      // Vamos a enlazar la URL al estado de la ruta, para forzar
      // un re-renderizado del componente cada vez que detectemos
      // un cambio (Esto lo haremos en el useEffect).
      const [currentPath, setCurrentPath] = useState(window.location.pathname); 
      useEffect(() => {
        console.log(isLogged);
        if(!isLogged && window.location.pathname!=="/") window.location.pathname="/";
        // Función que modificará el estado
        const onLocationChange = () => {
          console.log('La propiedad location ha cambiado');
          setCurrentPath(window.location.pathname);
        }    
        // Agregamos una escucha al evento 'cambioDeRuta' para lanzar la función.
        window.addEventListener('cambioDeRuta', onLocationChange);    
        // Eliminaremos el evento cuando ya no sea necesario
        return () => { window.removeEventListener('cambioDeRuta', onLocationChange); }
      }, [isLogged])    
      // Vamos a renderizar el componente que recibimos como prop
      return currentPath === path ? children : null;
    /*return ( props => {
        if(currentPath === path) return children;
        else return null;
    })*/
}