class EventObserver {
    constructor() {
        // Subscribers array
        this.observers = [];
    }

    // subscribe on event
    subscribe( fn ) {
        this.observers.push( fn );
    }

    // unsubscribe off of event
    unsubscribe( fn ) {
        this.observers = this.observers.filter( item => {
            if ( item !== fn ) return item;
        });
    }

    fire( args ) {
        this.observers.forEach( fn => fn.call( null, args ) );
    }
}