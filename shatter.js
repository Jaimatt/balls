var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

var mouse = {
    x: undefined,
    y: undefined,
}

function Circle(x, y, direction, velocity, radius, r, g, b) {
    this.x = x
    this.y = y
    this.direction = direction
    this.velocity = velocity
    this.radius = radius
    this.r = r
    this.g = g
    this.b = b

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'rgb('+this.r+','+this.g+','+this.b+')'
        c.fillStyle = 'rgb('+this.r+','+this.g+','+this.b+')'
        c.fill()
        c.stroke()
    }  

    this.update = function() {
        this.x += this.velocity * Math.cos(this.direction)
        this.y += this.velocity * Math.sin(this.direction)

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.direction = Math.PI - this.direction
            this.radius = this.radius / 2

            circleArray.push(new Circle(this.x, this.y, -this.direction, this.velocity + Math.random()*4, this.radius, rc(this.r), rc(this.g), rc(this.b)))
            
            this.direction = rc(this.direction)

            this.r = rc(this.r)
            this.g = rc(this.g)
            this.b = rc(this.b)
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.direction = -this.direction
            this.radius = this.radius / 2

            circleArray.push(new Circle(this.x, this.y, Math.PI - this.direction, this.velocity + Math.random()*4, this.radius, rc(this.r), rc(this.g), rc(this.b)))

            this.r = rc(this.r)
            this.g = rc(this.g)
            this.b = rc(this.b)
        }
        
        this.draw()
    }
}

circleArray = []

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
        if (circleArray[i].radius < 1 || circleArray[i].x == NaN || circleArray[i].y == NaN) {
            circleArray.splice(i,1)
        }
        if (circleArray[i].x < -10 || circleArray[i].x > innerWidth+10 || circleArray[i].y < -10 || circleArray[i].y > innerHeight+10) {
            circleArray.splice(i,1)
        }
        // if (circleArray.length > 100000) {
        //     circleArray = circleArray.slice(0, 300)
        //     // circleArray = []
        //     // birth()
        // }
    }
    document.getElementById('p').innerText = "Object Count: " + circleArray.length
}

function birth() {
    colour = 'rgb('+Math.random()*200+55+','+Math.random()*200+55+','+Math.random()*200+55+')'
    for (i=0;i<1;i++) {
        circleArray.push(new Circle(mouse.x, mouse.y, Math.random() * Math.PI * 2, (Math.random()*2)+5, 50, Math.random()*255, Math.random()*255, Math.random()*255,))        
    }
}

function rc(input) {
    con = (Math.random()*2/3) + 0.67
    input = con * input
    return input    
}

animate()

toggle = 'off'
function auto() {
    if (toggle == 'on') {
        clearInterval(autonomous)
        toggle = 'off'
    } else {
        autonomous = setInterval(function () {

            mouse.x = window.innerWidth * ( 0.8 * Math.random() + 0.1)
            mouse.y = window.innerHeight * ( 0.8 * Math.random() + 0.1)
            birth(0)

        }, 1000);
        toggle = 'on'
    }
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
})