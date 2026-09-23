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

    this.frame = 0

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
        this.frame += 1

        this.x += this.velocity * Math.cos(this.direction)
        this.y += this.velocity * Math.sin(this.direction)

        this.y += (this.frame/4)

        this.radius -= 0.2
        if (this.radius < 0) {
            this.radius = 0
        }

        this.draw()
    }
}

circleArray = []

function animate() {
    // requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
        if (circleArray[i].x < -10 || circleArray[i].x > innerWidth+10 || circleArray[i].y < -10 || circleArray[i].y > innerHeight+10) {
            circleArray.splice(i,1)
        }
    }
    document.getElementById('p').innerText = "Object Count: " + circleArray.length
}

function birth(iteration,r,g,b) {
    if (r == undefined) {
        r = Math.random()*150 + 50
        g = Math.random()*150 + 50
        b = Math.random()*150 + 50
        console.log(1)
    } else {
        r = 255-r + 50
        g = 255-g + 50
        b = 255-b + 50
    }
    
    
    x = mouse.x
    y = mouse.y
    
    for (i=0;i<100;i++) {
        n = Math.random() + 0.5
        circleArray.push(new Circle(x, y, Math.random() * Math.PI * 2, (Math.random()*5)+2, Math.random()*10, r*n, g*n, b*n,))
    }
    if (iteration < 1) {
        birth(iteration + 1,r,g,b)
    }
}

function rc(input) {
    con = (Math.random()*2/3) + 0.67
    input = con * input
    return input    
}

setInterval(animate, 16);

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

        }, 400);
        toggle = 'on'
    }
}



window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
})
