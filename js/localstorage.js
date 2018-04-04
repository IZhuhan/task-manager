// Init Tasks module
const allTasks = Tasks.getInstance();

const Localstorage = ( function () {
    const update = function () {
        localStorage.setItem( 'tasks', JSON.stringify( allTasks.getTasks() ) );
    };

    const getTasks = function () {
        return JSON.parse( localStorage.getItem( 'tasks' ) );
    };

    return {
        update,
        getTasks
    };
})();