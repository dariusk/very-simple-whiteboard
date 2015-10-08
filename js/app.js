// http://www.paulirish.com/demo/multi 
var CanvasDrawr = function (options) {
    var canvas = document.getElementById(options.id),
        ctx = canvas.getContext("2d");
    canvas.style.width = '100%'
    canvas.width = canvas.offsetWidth;
    canvas.style.width = '';
    ctx.lineWidth = options.size || Math.ceil(Math.random() * 35);
    ctx.lineCap = options.lineCap || "round";
    ctx.pX = undefined;
    ctx.pY = undefined;
    var isCleared = true;
    var lines = [, , ];
    var offset = $(canvas).offset();
    var self = {
        init: function () {
            canvas.addEventListener('touchstart', self.preDraw, false);
            canvas.addEventListener('touchmove', self.draw, false);
        },
        preDraw: function (event) {
            $.each(event.touches, function (i, touch) {
                var id = touch.identifier,
                    colors = ['black'],
                    mycolor = colors[Math.floor(Math.random() * colors.length)];
                lines[id] = {
                    x: this.pageX - offset.left,
                    y: this.pageY - offset.top,
                    color: mycolor
                };
            });
            event.preventDefault();
        },
        draw: function (event) {
            // Darius Kazemi rewrote this function to detect a three-touch
            // and do special actions on each
            var e = event,
                hmm = {};
            var numTouches = event.touches.length;
            // is it a three-touch?
            if (numTouches === 3) {
              // calculate the move direction on the X vector
              var touch = event.touches[0];
              var moveX = touch.pageX - offset.left - lines[0].x;
              // are we moving to the left on the first touch?
              if (moveX < 0) {
                // if so, clear the canvas, it's a left three-swipe
                ctx.clearRect(0,0,2000,2000);
                isCleared = true;
              }
              else {
                // if we're moving right, save the canvas, but only if our canvas isn't clear
                if (!isCleared) {
                  var saveCanvas = document.createElement('canvas');
                  saveCanvas.width = canvas.width;
                  saveCanvas.height = canvas.height;
                  saveCanvas.getContext('2d').drawImage(canvas, 0,0);
                  // add a function to the saved canvas so it redraws to the main canvas
                  $(saveCanvas).click(function() {
                    var ctxt = document.getElementById('canvas').getContext('2d');
                    ctx.clearRect(0,0,2000,2000);
                    ctxt.drawImage(this, 0, 0);
                  });
                  $('#saves').append(saveCanvas);
                  ctx.clearRect(0,0,2000,2000);
                  isCleared = true;
                }
              }
            }
            // for a four-touch, we change the size of our pen
            else if (numTouches === 4) {
              // calculate the move direction on the X vector
              var touch = event.touches[0];
              var moveX = touch.pageX - offset.left - lines[0].x;
              if (moveX < -100) {
                ctx.lineWidth = options.size;
              }
              else if (moveX > 100) {
                ctx.lineWidth = options.size * 2;
              }
            }
            else if (numTouches === 2) {
              // if we have two touches, it acts as an eraser proportional in size to the
              // distance between the two touches
              // calculate the move direction on the X vector
              var touch0 = event.touches[0];
              var touch1 = event.touches[1];
              var x0 = touch0.pageX - offset.left;
              var y0 = touch0.pageY - offset.top;
              var x1 = touch1.pageX - offset.left;
              var y1 = touch1.pageY - offset.top;

              ctx.strokeStyle = 'white';
              ctx.lineWidth = 30;

              ctx.beginPath();
              ctx.moveTo(x0, y0);
              ctx.lineTo(x1, y1);
              ctx.stroke();
              ctx.closePath();

              ctx.lineWidth = options.size;
            }
            else if (numTouches === 1) {
              isCleared = false;
              $.each(event.touches, function (i, touch) {
                  var id = touch.identifier,
                      moveX = this.pageX - offset.left - lines[id].x,
                      moveY = this.pageY - offset.top - lines[id].y;
                  var ret = self.move(id, moveX, moveY);
                  lines[id].x = ret.x;
                  lines[id].y = ret.y;
              });
            }
            event.preventDefault();
        },
        move: function (i, changeX, changeY) {
            ctx.strokeStyle = lines[i].color;
            ctx.beginPath();
            ctx.moveTo(lines[i].x, lines[i].y);
            ctx.lineTo(lines[i].x + changeX, lines[i].y + changeY);
            ctx.stroke();
            ctx.closePath();
            return {
                x: lines[i].x + changeX,
                y: lines[i].y + changeY
            };
        }
    };
    return self.init();
};

var surface = new CanvasDrawr({
    id: 'canvas',
    size: 10
});
