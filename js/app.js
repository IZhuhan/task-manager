// Init Task module
const tasks = Tasks.getInstance();

// Init UI module
const ui = UI;

// Init LocalStorage module
const localstorage = Localstorage;

// Init Notification module
const notification = Notification;

// Init Observers
const addTaskObserver = new EventObserver();
const deleteTaskObserver = new EventObserver();
const clearAllTasksObserver = new EventObserver();
const editTaskObserver = new EventObserver();

// Subscribe on add task event
addTaskObserver.subscribe( localstorage.update );
addTaskObserver.subscribe( notification.show );
addTaskObserver.subscribe( ui.checkState );

deleteTaskObserver.subscribe( localstorage.update );
deleteTaskObserver.subscribe( notification.show );
deleteTaskObserver.subscribe( ui.checkState );

editTaskObserver.subscribe( localstorage.update );
editTaskObserver.subscribe( notification.show );

clearAllTasksObserver.subscribe( localstorage.update );
clearAllTasksObserver.subscribe( notification.show );
clearAllTasksObserver.subscribe( ui.checkState );

// Init elements
const form = document.forms[ 'addTodoItem' ];
const inputText = form.elements[ 'todoText' ];
const ul = document.querySelector( '.list-group' );
const clearBtn = document.querySelector( '.clear-btn' );

window.addEventListener( 'load', function () {
    let ls = localstorage.getTasks() || [];

    if ( ls.length ) {
        ls.forEach( task => {
            tasks.addTask( task )
                .then( oneTask => ui.addTask( oneTask ) );
        });
    }

    ui.checkState();
});

form.addEventListener( 'submit', function ( e ) {
        e.preventDefault();

        if ( !inputText.value ) {
            inputText.classList.add( 'is-invalid' );
        } else {
            inputText.classList.remove( 'is-invalid' );

            tasks.addTask( { taskBody: inputText.value } )
                .then( task => ui.addTask( task ) )
                .then( () => addTaskObserver.fire({
                    class: 'alert-success',
                    timeout: 1000,
                    text: 'Task added success!'
                }));

            form.reset();
        }
    });

inputText.addEventListener( 'keyup', function () {
    if ( inputText.value ) {
        inputText.classList.remove( 'is-invalid' );
    }
});

ul.addEventListener( 'click', function (e) {
    let parent = e.target.closest( 'li' );
    let id = parent.dataset.id;

    if ( e.target.classList.contains( 'delete-item' ) ) {
        tasks.deleteTask( id )
            .then( () => ui.deleteTask( id ) )
            .then( () => deleteTaskObserver.fire({
                class: 'alert-danger',
                timeout: 1000,
                text: 'Task has been removed success!'
            }) );
    } else if ( e.target.classList.contains( 'checkbox' ) ) {
        tasks.editTask( id, 'completed' )
            .then( () => ui.checked( id ) )
            .then( () => editTaskObserver.fire({
                class: 'alert-primary',
                timeout: 1000,
                text: 'Task execution has been changed!'
            }));
    } else if ( e.target.classList.contains( 'edit-item' ) ) {
        e.target.classList.toggle( 'fa-save' );

        let span = parent.querySelector( 'span' );

        if ( e.target.classList.contains( 'fa-save' ) ) {
            span.setAttribute( 'contenteditable', 'true' );
            span.focus();
        } else {
            span.setAttribute( 'contenteditable', 'false' );

            tasks.editTask( id, 'taskBody', span.textContent )
                .then( () => editTaskObserver.fire({
                    class: 'alert-warning',
                    timeout: 1000,
                    text: 'Task has been edited success!'
                }));

            span.blur();
        }
    }
});

clearBtn.addEventListener( 'click', function () {
    tasks.deleteAll()
        .then( () => ui.deleteAll() )
        .then( () => clearAllTasksObserver.fire({
            class: 'alert-danger',
            timeout: 1000,
            text: 'List has been cleared success!'
        }));
});