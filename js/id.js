const Id = ( function () {
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    const generate = function () {
        let id = '';

        for ( let i = 0; i < 15; i++ ) {
            let position = Math.floor( Math.random() * words.length );
            id += words[position];
        }

        return id;
    };

    return {
        generate
    };
})();