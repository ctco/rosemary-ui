const e = Element.prototype;
e.closest = e.closest || function closest(css) {
        let node = this;
        while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
        }
        return null;
};
