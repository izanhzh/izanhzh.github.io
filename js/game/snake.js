(function () {
    function play(speed) {
        var speed = speed ? speed : 3;
        var time = 1000 / speed;
        var width = 32, height = 24;
        var applePoint = {
            x: null,
            y: null,
            set: function () {
                do {
                    var x = parseInt(Math.random() * width);
                    var y = parseInt(Math.random() * width);
                } while (checkBound(x, y));
                this.x = x;
                this.y = y;
            }
        }
        var snake = [];
        snake.push({
            x: parseInt(width / 2),
            y: parseInt(height / 2)
        });
        var direction = 'top';
        function snakeGo() {
            var head = snake[0];
            var newHead = {
                x: head.x,
                y: head.y
            };
            if (direction == 'top') {
                newHead.y--;
            } else if (direction == 'left') {
                newHead.x--;
            } else if (direction == 'right') {
                newHead.x++;
            } else {
                newHead.y++;

            }
            if (!checkBound(newHead.x, newHead.y) && !checkSnake(newHead.x, newHead.y)) {
                snake.unshift(newHead);
                if (newHead.x == applePoint.x && newHead.y == applePoint.y) {
                    applePoint.set();
                } else {
                    snake.pop();
                }
                paint();
                setTimeout(snakeGo, time);
            } else {
                console.log('%cGame Over，您得了' + (snake.length - 1) + '分。', 'color:red;font-weight:bold;');
                window.removeEventListener('keydown', keyDown, false);
            }
        }
        function checkBound(x, y) {
            if (x < 0 || x >= width || y < 0 || y >= height) {
                return true;
            }
            return false;
        }
        function checkSnake(x, y) {
            for (var i = 0; i < snake.length; i++) {
                if (snake[i].x == x && snake[i].y == y) {
                    return true;
                }
            }
            return false;
        }
        function paint() {
            str = '\n';
            for (var i = 0; i < height + 2; i++) {
                for (var j = 0; j < width + 2; j++) {
                    var x = j - 1;
                    var y = i - 1;
                    if (x == applePoint.x && y == applePoint.y) {
                        str = str + '❤';
                    } else if (checkBound(x, y)) {
                        str = str + '※';
                    }
                    else if (checkSnake(x, y)) {
                        str = str + '〓';
                    }
                    else {
                        str = str + '　';
                    }
                }
                str = str + '\n';
            }
            console.clear();
            console.log(str);

        }
        var readyTime = 10;
        (function () {
            console.log('准备好，倒计时：' + readyTime + '...');
            if (readyTime) {
                readyTime--;
                setTimeout(arguments.callee, 1000);
            } else {
                applePoint.set();
                snakeGo();
            }
        })();
        var keyMap = {
            38: 'top',
            39: 'right',
            40: 'bottom',
            37: 'left'
        }
        function keyDown(e) {
            e.preventDefault();
            var dir = keyMap[e.keyCode];
            if (snake.length > 1 && (dir == 'top' && (snake[0].y - snake[1].y == 1) ||
                dir == 'left' && (snake[0].x - snake[1].x == 1) ||
                dir == 'right' && (snake[0].x - snake[1].x == -1) ||
                dir == 'bottom' && (snake[0].y - snake[1].y == -1))) {
                return;
            } else {
                direction = dir;
            }
        }
        window.addEventListener('keydown', keyDown, false);
    }
    window.console = window.console || {};
    window.console.log = window.console.log || function () { };
    console.log('在控制台中输入play，开始一个小游戏吧。');

    Object.defineProperty(window, 'play', {
        get: function () {
            console.log('先把控制台拉高点。\n%c然后用鼠标点击博客页面，让鼠标焦点离开控制台移动到博客页面中。\n用键盘的上下左右操作，别动鼠标！', 'color:red;font-weight:bold;');
            play()
        }
    })
})()