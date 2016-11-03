const e = Element.prototype;

e.matches || (e.matches = e.matchesSelector || function(selector) {
        let matches = document.querySelectorAll(selector), th = this;
        return Array.prototype.some.call(matches, function(e) {
            return e === th;
        });
    });