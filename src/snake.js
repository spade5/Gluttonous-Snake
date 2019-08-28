import Node from './node';

var COLUMN = 60;
var ROW = 60;
var INIT_LEN = 5;
var SPEED = 100;
var LEFT = -2;
var RIGHT = -1;
var UP = 1;
var DOWN = 2;

function Snake(container, countNode) {
    this.container = container;
    this.countNode = countNode;
    this.score = 0;
    this.init();
}

Snake.prototype = {
    foodList: [],
    init() {
        this.dir = RIGHT;
        this.createFood();
        this.createBody();
        this.start();
    },
    start() {
        this.timer = setTimeout(this.move.bind(this), SPEED);
        document.addEventListener('keydown', (function(evt) {
            var dir = 0;
            switch(evt.keyCode) {
                case 37: dir = LEFT; break;
                case 38: dir = UP; break;
                case 39: dir = RIGHT; break;
                case 40: dir = DOWN; break;
                default:;
            }
            this.move(dir);
        }).bind(this));
    },
    move(dir) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (dir && dir * this.dir < 0 ) {
            this.dir = dir;
        }
        var headX = this.head.x;
        var headY = this.head.y;
        switch(this.dir) {
            case RIGHT: 
                headX++;
                break;
            case LEFT:
                headX--;
                break;
            case UP:
                headY--;
                break;
            case DOWN:
                headY++;
                break;
            default:;
        }
        //TODO: check crash
        if (!this.checkFood(headX, headY)) {
            this.head.prev = this.tail;
            this.tail.next = this.head;
            this.head = this.tail;
            this.tail.prev.next = null;
            this.tail.refresh(headX, headY);
            this.tail = this.tail.prev;
            this.head.prev = null;
        } 
        this.timer = setTimeout(this.move.bind(this), SPEED);
    },
    checkFood(x, y) {
        if (x === this.food.x && y === this.food.y) {
            var newHead = new Node(this.container, x, y, 'head');
            this.head.prev = newHead;
            newHead.next = this.head;
            this.head = newHead;
            this.food.delete();
            this.createFood();
            this.incScore();
            return true;
        }
        return false;
    },
    createFood() {
        var left = Math.floor(Math.random() * COLUMN);
        var top = Math.floor(Math.random() * ROW);
        this.food = new Node(this.container, left, top, 'food');
    },
    createBody() {
        var temp1 = this.head = new Node(this.container, COLUMN/2, ROW/2, 'head');
        var temp2 = null;
        for (var i = 1; i < INIT_LEN; i++) {
            temp2 = new Node(this.container, COLUMN/2 - i, ROW/2);
            temp1.next = temp2;
            temp2.prev = temp1;
            temp1 = temp2;
        }
        this.tail = temp2;
    },
    incScore() {
        this.score++;
        this.countNode.innerText = this.score;
    }
}

export default Snake;