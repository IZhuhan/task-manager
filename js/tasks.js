// Init Id module
const id = Id;

const Tasks = ( function () {
    let tasks = [];
    let instance;

    const getTasks = function () {
        return tasks;
    };

    const setTasks = async function ( tasksArray ) {
        tasks = tasksArray;

        return tasks;
    };
    
    const addTask = async function ( task ) {
        if ( !task.id || !task.completed ) {
            task.id = id.generate();
            task.completed = false;
        }

        await tasks.push( task );

        return task;
    };

    const deleteTask = async function ( id ) {
        tasks = await tasks.filter( task => task.id !== id );

        return tasks;
    };

    const deleteAll = async function () {
        tasks = [];
    };

    const editTask = async function ( id, fieldName, newValue ) {
        await tasks.forEach( task => {
            if ( task.id === id ) {
                task[ fieldName ] = fieldName === 'taskBody' ? newValue : !task.completed;
            }
        });
    };

    const search = async function ( substring ) {
        return await tasks.filter( task => task.taskBody.toLowerCase().indexOf( substring.toLowerCase() ) !== -1 );
    };

    const createInstance = function () {
        return {
            getTasks,
            setTasks,
            addTask,
            deleteTask,
            deleteAll,
            editTask,
            search
        };
    };

    return {
        getInstance: function () {
            return instance || ( instance = createInstance() );
        }
    };
})();