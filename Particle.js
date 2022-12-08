class Particle {
  static forces = [];
  static default = {};

  constructor(
    positionVector,
    {
      mass,
      size,
      accelerationLimit,
      speedLimit,
      startingVelocity,
    } = Particle.default
  ) {
    this.pos = positionVector ?? createVector();
    this.vel = startingVelocity ?? createVector();
    this.acc = createVector();

    this.forces = [];

    this.mass = mass;
    this.size = size;
    this.accLimit = accelerationLimit;
    this.velLimit = speedLimit;
  }

  get allForces() {
    return [...Particle.forces, ...this.forces];
  }

  get heading() {
    return this.vel.heading();
  }

  applyForce(forceVector) {
    if (typeof forceVector === "function") forceVector = forceVector(this);
    if (this.mass) forceVector.div(this.mass);

    this.acc.add(forceVector);
  }

  update(cb = () => {}) {
    this.allForces.forEach((f) => this.applyForce(f));

    if (this.accLimit) this.acc.limit(this.accLimit);
    this.vel.add(this.acc);
    if (this.velLimit) this.vel.limit(this.velLimit);
    this.pos.add(this.vel);
    this.acc.mult(0);

    cb(this);
  }
}
