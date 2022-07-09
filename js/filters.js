const Filters = {

  staticBlur: [2, 3, 4, 5, 6, 7, 7, 8, 9],
  staticMatrix: ['6 -1', '8 -2', '10 -3', '12 -4', '15 -6', '18 -7', '18 -7', '21 -9', '27 -10'],
  particlesBlur: [2, 2, 3, 4, 5, 6, 6, 8, 11],
  particlesMatrix: ['7 -2', '7 -3', '9 -3', '12 -3', '15 -4', '18 -6', '18 -6', '22 -9', '25 -12'],

  set: function () {
    this.staticCanvas = document.querySelector('#static')
    this.staticFilterBlur = document.querySelector('#static-filter feGaussianBlur')
    this.staticFilterMatrix = document.querySelector('#static-filter feColorMatrix')
    this.particlesFilterBlur = document.querySelector('#particles-filter feGaussianBlur')
    this.particlesFilterMatrix = document.querySelector('#particles-filter feColorMatrix')

    this.update()

    window.onresize = () => {
      this.update()
    }
  },
  update: function () {
    const canvasSize = this.staticCanvas.clientWidth
    let filterIndex = 0

    if (canvasSize < 450) {
      filterIndex = 0
    } else if (canvasSize < 540) {
      filterIndex = 1
    } else if (canvasSize < 600) {
      filterIndex = 2
    } else if (canvasSize < 750) {
      filterIndex = 3
    } else if (canvasSize < 900) {
      filterIndex = 4
    } else if (canvasSize < 1200) {
      filterIndex = 5
    } else if (canvasSize < 1500) {
      filterIndex = 6
    } else if (canvasSize < 2200) {
      filterIndex = 7
    } else {
      filterIndex = 8
    }

    this.staticFilterBlur.setAttribute('stdDeviation', this.staticBlur[filterIndex])
    this.staticFilterMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ' + this.staticMatrix[filterIndex])
    this.particlesFilterBlur.setAttribute('stdDeviation', this.particlesBlur[filterIndex])
    this.particlesFilterMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ' + this.particlesMatrix[filterIndex])
  }
}
