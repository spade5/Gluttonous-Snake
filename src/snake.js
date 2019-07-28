var SIZE = 10;
var COLUMN = 60;
var ROW = 60;

function Snake(container, countNode) {
    this.container = container;
    this.countNode = countNode;
    this.createFood();
}

Snake.prototype = {
    foodList: [],
    createFood: function() {
        var left = Math.floor(Math.random() * COLUMN) * SIZE;
        var top = Math.floor(Math.random() * ROW) *SIZE;
        var food = document.createElement('div');
        food.className = 'food';
        food.style = 'top:' + top + 'px;left:' + left + 'px;';
        this.container.append(food);
        setTimeout(this.createFood.bind(this), 10);
    }
}

export default Snake;