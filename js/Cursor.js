const {
  RingGeometry,
  MeshBasicMaterial,
  Mesh,
  Clock,
  Vector3,
  Raycaster
} = THREE

function createCursorRing () {
  const geometry = new RingGeometry(0.0075, 0.01, 32)
  const material = new MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide
  })

  const ring = new Mesh(geometry, material)
  ring.material.transparent = true
  ring.material.opacity = 0.5
  ring.position.z = -0.3
  return ring
}

function Cursor (camera, fuzeTimeout, cursor) {
  this.state = {
    fuzed: false,
    fuzeTarget: null,
    fuzeTime: 0,
    fuzing: false,
    lastCollisionTime: 0,
    clock: new Clock(true)
  }

  this.props = {
    fuzeTimeout: fuzeTimeout || 2
  }

  this.collidableItems = []
  this.camera = camera
  this.camera.add(cursor || createCursorRing())
  this.raycast = new Raycaster()

  this.update = this.update.bind(this)
  this.handleCollision = this.handleCollision.bind(this)
  this.fuseController = this.fuseController.bind(this)
  this.handleStartFuse = this.handleStartFuse.bind(this)
  this.handleFusing = this.handleFusing.bind(this)
  this.handleFuseEnd = this.handleFuseEnd.bind(this)
}

Cursor.prototype.setState = function (updateFn, cb) {
  const prevState = _.cloneDeep(this.state)
  const nextState = updateFn(prevState, this.props)

  Object.keys(nextState).forEach((key) => {
    this.state[key] = nextState[key]
  })

  if (cb instanceof Function) { cb(this.state) }
}

Cursor.prototype.addItem = function (mesh) {
  this.collidableItems.push(mesh)
}

Cursor.prototype.removeItem = function (mesh) {
  this.collidableItems = this.collidableItems.filter(item => item.uuid !== mesh.uuid)
}

Cursor.prototype.update = function () {
  this.updateRaycaster()
  this.handleCollision()
}

Cursor.prototype.updateRaycaster = function () {
  const vector = new Vector3(-0.0012499999999999734, -0.0053859964093356805, 0.5)
  vector.unproject(this.camera)
  this.raycast.set(this.camera.position, vector.sub(this.camera.position).normalize())
}

Cursor.prototype.handleCollision = function () {
  const {fuzeTarget, lastCollisionTime, fuzeTime, clock} = this.state
  const {camera, raycast, fuseController, handleFuseEnd, collidableItems} = this
  const intersects = raycast.intersectObjects(collidableItems)

  if (intersects.length) {
    const firstCollision = intersects[0].object

    this.setState(() => {
      return {
        lastCollisionTime: clock.getElapsedTime()
      }
    }, () => {
      if (firstCollision) {
        fuseController(firstCollision)
      }
    })
  } else {
    if (fuzeTarget) {
      handleFuseEnd()
    }
  }
}

Cursor.prototype.fuseController = function (mesh) {
  const {fuzeTarget} = this.state
  const {handleStartFuse, handleFusing, handleFuseEnd} = this

  if (!fuzeTarget) {
    handleStartFuse(mesh)
  } else if (fuzeTarget === mesh) {
    handleFusing()
  } else {
    handleFuseEnd()
  }
}

Cursor.prototype.handleStartFuse = function (mesh) {
  const {lastCollisionTime} = this.state

  this.setState(() => {
    return {
      fuzeTarget: mesh,
      fuzeTime: lastCollisionTime
    }
  }, (newState) => {
    if (newState.fuzeTarget.onFusing instanceof Function) {
      newState.fuzeTarget.onFusing()
    }
  })
}

Cursor.prototype.handleFusing = function () {
  const {lastCollisionTime, fuzeTime, fuzeTarget} = this.state
  const {fuzeTimeout} = this.props

  // Fuse time has exceeded the timeout
  if ((lastCollisionTime - fuzeTime) >= fuzeTimeout) {
    if (fuzeTarget.onFused instanceof Function) {
      fuzeTarget.onFused()
    }
  } else {
    fuzeTarget.onFusing()
  }

  this.setState(() => {
    return {
      fuzeTime: lastCollisionTime
    }
  })
};

Cursor.prototype.handleFuseEnd = function () {
  const {fuzeTarget} = this.state
  if (fuzeTarget && fuzeTarget.onFuseEnd instanceof Function) {
    fuzeTarget.onFuseEnd()
  }

  this.setState(() => {
    return {
      lastCollisionTime: 0,
      fuzeTime: 0,
      fuzeTarget: null
    }
  })
}
