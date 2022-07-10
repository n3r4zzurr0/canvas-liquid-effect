const Controls = {

  staticFilterToggle: true,
  particlesFilterToggle: true,
  timeScales: [0.2, 1, 1.5],
  timeScaleIndex: 1,

  set: function () {
    this.staticCanvas = document.querySelector('#static')
    this.particlesCanvas = document.querySelector('#particles')
    this.values = document.querySelectorAll('.value')
    this.action = document.querySelectorAll('.controls .action')

    Array.from(this.action).forEach((a, i) => {
      const button = a.querySelector('button')
      switch (i) {
        case 0:
          button.onclick = () => {
            this.staticFilterToggle = !this.staticFilterToggle
            this.staticCanvas.style.filter = this.staticFilterToggle ? '' : 'none'
            button.style.opacity = this.staticFilterToggle ? '' : 0.3
            this.values[0].innerText = this.staticFilterToggle ? 'enabled' : 'disabled'
          }
          break
        case 1:
          button.onclick = () => {
            this.particlesFilterToggle = !this.particlesFilterToggle
            this.particlesCanvas.style.filter = this.particlesFilterToggle ? '' : 'none'
            button.style.opacity = this.particlesFilterToggle ? '' : 0.3
            this.values[1].innerText = this.particlesFilterToggle ? 'enabled' : 'disabled'
          }
          break
        case 2:
          button.onclick = () => {
            this.timeScaleIndex++
            if (this.timeScaleIndex >= this.timeScales.length) { this.timeScaleIndex = 0 }
            this.values[2].innerText = this.timeScales[this.timeScaleIndex]
            Canvas.physics.timeScale(this.timeScales[this.timeScaleIndex])
          }
          break
      }
    })
  }
}
