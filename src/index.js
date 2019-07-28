import './index.scss';
import Snake from './snake';

var app = document.createElement('div');
document.body.append(app);
app.innerHTML = `<div class="app">
    <div class="header">
        <p class="text">Score: <span class="count">0</span></p>
    </div>
    <div class="body">
    </div>
</div>`;

new Snake(document.querySelector('.app .body'), document.querySelector('.app .header .text .count'));