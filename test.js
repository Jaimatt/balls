var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

var mouse = {
    x: undefined,
    y: undefined,
}

class Circle {
    constructor(x, y, dx, dy, radius, colour) {
        this.givenRadius = radius
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.colour = colour    
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.colour
        c.fillStyle = this.colour
        c.fill()
        c.shadowColor = this.colour
        c.stroke()
    }

    update() {
        if (this.x + this.radius > innerWidth || this.x + this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius > innerHeight || this.y + this.radius < 0) {
            this.dy = -this.dy
        }

        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30 && this.radius < 30) {
            this.radius += 6
        } else if (this.radius >= this.givenRadius) {
            this.radius -= 0.3
        }

        this.x += this.dx
        this.y += this.dy

        this.draw()
    }
}

circleArray = []

for (i = 0; i < 2000; i++) {
    // colour = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')'
    colourRandom = Math.random()*255
    colour = 'rgb(0,'+colourRandom+','+colourRandom+')'
    dx = (Math.random() - 0.5) * 4
    dy = (Math.random() - 0.5) * 4
    circleArray.push(new Circle(Math.random() * innerWidth, Math.random() * innerHeight, dx, dy, Math.random() * 3 + 1, colour))
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
    c.textAlign = 'center'
    c.font = "35px Trebuchet MS"; 
    c.fillStyle = "white"
    c.color = 'white'
    c.fillText("HTML Canvas!",innerWidth/2,innerHeight/2)

}

animate()

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
})