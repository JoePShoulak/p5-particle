class Particle {
  static globalForces = [];
  static default = {};

  constructor(
    positionVector,
    { mass, accelerationLimit, speedLimit } = Particle.default
  ) {
    this.pos = positionVector;
    this.vel = createVector();
    this.acc = createVector();

    this.mass = mass;
    this.accLimit = accelerationLimit;
    this.velLimit = speedLimit;
  }

  applyForce(forceVector) {
    if (this.mass) forceVector.div(this.mass);
    this.acc.add(forceVector);
  }

  update(cb = () => {}) {
    Particle.globalForces.forEach((f) =>
      this.applyForce(typeof f === "function" ? f(this) : f)
    );

    if (this.accLimit) this.acc.limit(this.accLimit);
    this.vel.add(this.acc);
    if (this.velLimit) this.vel.limit(this.velLimit);
    this.pos.add(this.vel);
    this.acc.mult(0);

    cb(this);
  }
}
