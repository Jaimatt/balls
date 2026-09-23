var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

var mouse = {
    x: undefined,
    y: undefined,
}

function Circle(x, y, direction, velocity, radius, distort) {
    this.x = x
    this.y = y

    this.direction = direction
    this.velocity = velocity

    this.radius = radius

    this.distort = distort
    this.colour = rgb(this.distort,(this.x/innerWidth)/2)

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.colour
        c.fillStyle = this.colour
        c.fill()
        c.stroke()
    }  

    this.update = function() {
        this.x += this.velocity * Math.cos(this.direction)
        this.y += this.velocity * Math.sin(this.direction)

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.direction = Math.PI - this.direction
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.direction = -this.direction
        }

        if ((this.x - mouse.x)**2 + (this.y - mouse.y)**2 < 50**2 && this.radius <= 30) {
            this.radius += 5
        } else if (this.radius > 1) {
            this.radius -= 0.4
        }
        if (this.radius < 0) {
            this.radius = 0
        }
        
        this.colour = rgb(this.distort,(this.x/innerWidth)/2)

        this.draw()
    }
}

circleArray = []

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
        if (circleArray[i].x == NaN || circleArray[i].y == NaN) {
            circleArray.splice(i,1)
        }
        if (circleArray[i].x < -10 || circleArray[i].x > innerWidth+10 || circleArray[i].y < -10 || circleArray[i].y > innerHeight+10) {
            circleArray.splice(i,1)
        }
    }
    document.getElementById('p').innerText = "Object Count: " + circleArray.length
    sColour += speed
}

function birth() {
    d = Math.random()*150 + 100
    circleArray.push(new Circle(Math.random()*innerWidth, Math.random()*innerHeight, Math.random() * Math.PI * 2, 2, 1, d))
}

speed = 0.0005
sColour = 0
function rgb(dfactor,adjust) {
    spColour = (sColour+adjust)%1

    if (spColour <= 1/3) {
        r = ((1/3) - spColour%(1/3))*4*dfactor
        g = (spColour%(1/3))*4*dfactor
        b = 0
    } else if (spColour <= 2/3) {
        r = 0
        g = ((1/3) - spColour%(1/3))*4*dfactor
        b = (spColour%(1/3))*4*dfactor
    } else if (spColour <= 1) {
        r = (spColour%(1/3))*4*dfactor
        g = 0
        b = ((1/3) - spColour%(1/3))*4*dfactor
    }
    
    // r = r*dfactor
    // g = g*dfactor
    // b = b*dfactor

    return 'rgb('+r+','+g+','+b+')'
}

for (i=0;i<2000;i++) {
    birth()
}

setInterval(animate, 16);

toggle = 'off'
function fast() {
    if (toggle == 'on') {
        speed = 0.0005
        toggle = 'off'
    } else {
        speed = 0.01
        toggle = 'on'
    }
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
})