import './LinkPropio.component.scss'

export const LinkPropio = ({ className, href, onClick2, children }) => {
    const ref = href.call();
    // Evitamos que la página se actualize y así no perder el estado.
    const onClick = (event) => {
        event.preventDefault();
        if(!onClick2)return;
        // Si quemos pasarle datos a la ruta, será en el primer
        // argumento en lugar de pasarle un objeto vacio {}.
        window.history.pushState(ref.state, "", ref.pathname);
    
        console.log(href);
        // Enviamos el cambio de ruta con un nuevo evento.
        const navEvent = new PopStateEvent('cambioDeRuta');
        window.dispatchEvent(navEvent);
        /*event.preventDefault(); 
        console.log(isLogged);
        console.log(onClick2);
        var res = href.call();
        if(!onClick2)return;
        setLogIn();
        // Si quemos pasarle datos a la ruta, será en el primer
        // argumento en lugar de pasarle un objeto vacio {}.
        window.history.pushState(res.state, "", res.pathname);
        console.log(res);
        // Enviamos el cambio de ruta con un nuevo evento.
        const navEvent = new PopStateEvent('cambioDeRuta');
        window.dispatchEvent(navEvent); */
    };
    return (
        <a className={className} href={ref.pathname} onClick={onClick}>
        {children}
        </a>
    );
};