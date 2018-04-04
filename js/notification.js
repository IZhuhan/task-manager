const Notification = ( function () {
    const container = document.querySelector( '.tasks-wrap .container');
    let timeout;

    const show = function ( settings ) {
        hide();
        clearTimeout( timeout );

        const alert = document.createElement('div');

        alert.textContent = settings.text;
        alert.className = `notification alert ${ settings.class }`;

        container.appendChild( alert );

        timeout = setTimeout( () => hide(), settings.timeout );
    };

    const  hide = function () {
        const currentAlerts = document.querySelectorAll( '.notification' );

        if ( currentAlerts ) {
            currentAlerts.forEach( alert => alert.classList.add( 'opacity' ) );

            currentAlerts.forEach( alert => alert.addEventListener( 'transitionend', () => alert.remove() ) );
        }
    };

    return {
        show
    };
})();