class Student {
  constructor(name, address, idNumber, email, math, physics, chemistry) {
    this.name = name;
    this.address = address;
    this.idNumber = idNumber;
    this.email = email;
    this.math = parseFloat(math);
    this.physics = parseFloat(physics);
    this.chemistry = parseFloat(chemistry);
  }

  calculateAverage() {
    return ((this.math + this.physics + this.chemistry) / 3).toFixed(1);
  }
}
