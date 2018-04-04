const UI = ( function () {
    const ul = document.querySelector( '.list-group' );
    const emptyAlert = document.querySelector( '.empty-notification' );
    
    const listTemplate = function ( task ) {
        return `<li class="list-group-item d-flex align-items-center${ task.completed ? ' bg-success' : '' }" data-id=${ task.id }>
                    <input class="checkbox" type="checkbox" id="completed-${ task.id }" ${ task.completed ? 'checked' : '' }>
                    <div class="d-flex align-self-center checkbox mb-0">
                        <span class="checkbox">${ task.taskBody }</span>
                    </div>
                    <i class="fas fa-edit edit-item ml-auto"></i>
                    <i class="fas fa-trash-alt delete-item ml-4"></i>
                </li>`;
    };

    const addTask = function ( task ) {
        ul.insertAdjacentHTML( 'afterbegin', listTemplate( task ) );
    };

    const deleteTask = function ( id ) {
        const li = ul.querySelector( `[data-id="${ id }"]` );

        li.remove();
    };

    const checked = function ( id ) {
        const li = ul.querySelector( `[data-id="${ id }"]` );
        const input = li.querySelector( 'input' );

        li.classList.toggle( 'bg-success' );
        input.checked = !input.checked;
    };
    
    const checkState = function () {
        if ( !tasks.getTasks().length ) {
            emptyAlert.style.display = 'block';
        } else {
            emptyAlert.style.display = 'none';
        }
    };

    const deleteAll = function () {
        ul.innerHTML = '';
    };

    return {
        addTask,
        deleteTask,
        checkState,
        deleteAll,
        checked
    };
})();