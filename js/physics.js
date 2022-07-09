const Physics = (bodies) => {
  const Runner = Matter.Runner
  const Engine = Matter.Engine
  const Bodies = Matter.Bodies
  const Composite = Matter.Composite
  const Constraint = Matter.Constraint

  const engine = Engine.create()
  const runner = Runner.create({ isFixed: true })
  const initialBodies = bodies(Bodies, Constraint)

  Runner.start(runner, engine)
  Composite.add(engine.world, initialBodies)

  const addBodies = (bodies) => {
    const addedBodies = bodies(Bodies)
    Composite.add(engine.world, addedBodies)
    return addedBodies
  }

  const removeBody = body => {
    Composite.remove(engine.world, body)
  }

  const timeScale = (scale) => {
    engine.timing.timeScale = scale
  }

  return {
    addBodies,
    removeBody,
    timeScale,
    initialBodies
  }
}
