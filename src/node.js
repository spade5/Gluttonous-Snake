const SIZE = 10;

function Node(container, x, y, cls) {
    this.container = container;
    this.x = x;
    this.y = y;
    this.cls = cls;
    this.init();
    this.prev = this.next = null;
}

Node.prototype = {
    init() {
        var left = this.x * SIZE;
        var top = this.y * SIZE;
        var elem = document.createElement('div');
        elem.className = 'node ' + this.cls;
        elem.style = 'top:' + top + 'px;left:' + left + 'px;';
        this.container.append(elem);
        this.elem = elem;
    },
    refresh(x, y) {
        this.x = x;
        this.y = y;
        var left = this.x * SIZE;
        var top = this.y * SIZE;
        this.elem.style = 'top:' + top + 'px;left:' + left + 'px;';
    },
    delete() {
        this.elem.remove();
    }
};

export default Node;