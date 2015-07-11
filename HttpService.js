var HTTP = {
    get: function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(xhr.responseText);
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    },
    post: function() {
        //TODO
    },
    delete: function() {
        //TODO
    },
    put: function() {
        //TODO
    }
};

export default HTTP;
