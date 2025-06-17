const Canvas = {
  // Colors for the particles to be set in sequential order
  colors: ['#ffbf00', '#dc143c', '#8e2de2', '#2196f3', '#39ff14'],
  colorIndex: -1,

  // For calculating FPS
  times: [],
  fps: 0,

  init: function () {
    this.staticCanvas = document.querySelector('#static')
    this.particlesCanvas = document.querySelector('#particles')
    this.staticContext = this.staticCanvas.getContext('2d')
    this.particlesContext = this.particlesCanvas.getContext('2d')

    this.staticContext.canvas.width = Config.canvasSize
    this.staticContext.canvas.height = Config.canvasSize
    this.particlesContext.canvas.width = Config.canvasSize
    this.particlesContext.canvas.height = Config.canvasSize

    this.fpsCounter = document.querySelectorAll('.value')[3]

    // Initializing the Matter.js Physics Engine using a custom wrapper
    // Matter.Bodies: https://brm.io/matter-js/docs/classes/Bodies.html
    // Matter.Constraint: https://brm.io/matter-js/docs/classes/Constraint.html
    this.physics = Physics((Bodies, Constraint) => {
      const COS = Math.cos(Config.slantRectAngle * Math.PI / 180)
      const SIN = Math.sin(Config.slantRectAngle * Math.PI / 180)

      const leftVerticalRect = Bodies.rectangle(
        this.staticCanvas.width / 2 - Config.slantRectDeltaX - Config.slantRectWidth * COS / 2,
        this.staticCanvas.height / 2 - Config.slantRectDeltaY - Config.slantRectWidth * SIN / 2 - Config.verticalRectHeight / 2,
        Config.rectThickness,
        Config.verticalRectHeight,
        { isStatic: true }
      )

      const rightVerticalRect = Bodies.rectangle(
        this.staticCanvas.width / 2 + Config.slantRectDeltaX + Config.slantRectWidth * COS / 2,
        this.staticCanvas.height / 2 + Config.slantRectDeltaY - Config.slantRectWidth * SIN / 2 - Config.verticalRectHeight / 2,
        Config.rectThickness,
        Config.verticalRectHeight,
        { isStatic: true }
      )

      const topSlantRect = Bodies.rectangle(
        this.staticCanvas.width / 2 - Config.slantRectDeltaX,
        this.staticCanvas.height / 2 - Config.slantRectDeltaY,
        Config.slantRectWidth,
        Config.rectThickness,
        { isStatic: true, angle: Config.slantRectAngle * Math.PI / 180 }
      )

      const bottomSlantRect = Bodies.rectangle(
        this.staticCanvas.width / 2 + Config.slantRectDeltaX,
        this.staticCanvas.height / 2 + Config.slantRectDeltaY,
        Config.slantRectWidth,
        Config.rectThickness,
        { isStatic: true, angle: -Config.slantRectAngle * Math.PI / 180 }
      )

      const largeCircle = Bodies.circle(
        this.staticCanvas.width / 2 - Config.slantRectDeltaX + Config.slantRectWidth * COS / 2,
        this.staticCanvas.height / 2 - Config.slantRectDeltaY + Config.slantRectWidth * SIN / 2 - Config.largeCircleRadius + Config.rectThickness * SIN,
        Config.largeCircleRadius,
        { isStatic: true }
      )

      const turbine = Bodies.rectangle(
        this.staticCanvas.width / 2 + Config.slantRectDeltaX - Config.slantRectWidth * COS / 4,
        this.staticCanvas.height / 2 + Config.slantRectDeltaY + Config.slantRectWidth * SIN / 4 - Config.verticalRectHeight / 2 + Config.rectThickness * SIN,
        Config.verticalRectHeight,
        Config.rectThickness,
        { friction: 0, restitution: 1, mass: 0.25, angle: 90 * Math.PI / 180 }
      )

      const hinge = Constraint.create({
        pointA: {
          x: this.staticCanvas.width / 2 + Config.slantRectDeltaX - Config.slantRectWidth * COS / 4,
          y: this.staticCanvas.height / 2 + Config.slantRectDeltaY + Config.slantRectWidth * SIN / 4 - Config.verticalRectHeight / 2 - Config.rectThickness * SIN * 2
        },
        bodyB: turbine,
        length: 0
      })

      const smallCircle = Bodies.circle(
        this.staticCanvas.width / 2 + Config.slantRectDeltaX - (Config.slantRectWidth / 2 + Config.smallCircleDistance) * COS,
        this.staticCanvas.height / 2 + Config.slantRectDeltaY + (Config.slantRectWidth / 2 + Config.smallCircleDistance) * SIN,
        Config.smallCircleRadius,
        { isStatic: true }
      )

      return [
        leftVerticalRect,
        topSlantRect,
        largeCircle,
        rightVerticalRect,
        bottomSlantRect,
        turbine,
        hinge,
        smallCircle
      ]
    })

    this.staticBodies = this.physics.initialBodies
    this.particles = []
    this.addParticles()
  },

  addParticles: function () {
    this.colorIndex++
    if (this.colorIndex >= this.colors.length) { this.colorIndex = 0 }
    const fillStyle = this.colors[this.colorIndex]

    for (let i = 0; i < Config.particleCount; i++) {
      this.physics.addBodies((Bodies) => {
        return [
          Bodies.circle(
            this.particlesCanvas.width / 2 - Config.slantRectDeltaX - Config.slantRectWidth * Math.cos(Config.slantRectAngle * Math.PI / 180) / 2 + ~~(Math.random() * Config.particlesStreamInitialWidth) + Config.particlesStreamInitialWidth + ((i + 1) % 10) * Config.particleRadius,
            -~~((Config.particleCount + 1) / 10) * Config.particleRadius + ~~((i + 1) / 10) * Config.particleRadius,
            Config.particleRadius,
            { restitution: 0.2, friction: 0 }
          )
        ]
      }).forEach(body => {
        this.particles.push({ body, fillStyle })
      })
    }
  },

  draw: function () {
    this.staticContext.clearRect(0, 0, this.staticCanvas.width, this.staticCanvas.height)
    this.particlesContext.clearRect(0, 0, this.particlesCanvas.width, this.particlesCanvas.height)

    this.staticBodies.forEach(s => {
      this.staticContext.beginPath()
      if (s.label === 'Rectangle Body') {
        this.staticContext.fillStyle = '#fff'
        this.staticContext.moveTo(s.vertices[0].x, s.vertices[0].y)
        this.staticContext.lineTo(s.vertices[1].x, s.vertices[1].y)
        this.staticContext.lineTo(s.vertices[2].x, s.vertices[2].y)
        this.staticContext.lineTo(s.vertices[3].x, s.vertices[3].y)
      }
      if (s.label === 'Circle Body') {
        this.staticContext.fillStyle = '#fff'
        this.staticContext.arc(s.position.x, s.position.y, s.circleRadius, 0, 2 * Math.PI)
      }
      if (s.label === 'Constraint') {
        this.staticContext.fillStyle = '#000'
        this.staticContext.arc(s.pointA.x, s.pointA.y, 4, 0, 2 * Math.PI)
      }
      this.staticContext.closePath()
      this.staticContext.fill()
    })

    for (let i = 0; i < this.particles.length; i++) {
      const position = this.particles[i].body.position

      this.particlesContext.fillStyle = this.particles[i].fillStyle
      this.particlesContext.beginPath()
      this.particlesContext.arc(position.x, position.y, Config.particleRadius, 0, 2 * Math.PI)
      this.particlesContext.closePath()
      this.particlesContext.fill()

      // Remove the particle when it goes off the visual viewport
      if (position.y > this.particlesCanvas.height + Config.particleRadius) {
        this.physics.removeBody(this.particles[i].body)
        this.particles.splice(i, 1)
        i--
      }
      // Initiate the next stream of particles when the current count is less than 75% of the initial count
      if (this.particles.length < Config.particleCount * 0.75) { this.addParticles() }
    }

    const now = performance.now()
    while (this.times.length > 0 && this.times[0] <= now - 1000) { this.times.shift() }
    this.times.push(now)
    this.fps = this.times.length

    this.fpsCounter.innerText = this.fps

    window.requestAnimationFrame(() => { this.draw() })
  }
}
