class Employee {
  constructor(name, address, idNumber, email, daysWorked, dailySalary) {
    this.name = name;
    this.address = address;
    this.idNumber = idNumber;
    this.email = email;
    this.daysWorked = daysWorked;
    this.dailySalary = dailySalary;
  }

  calculateSalary() {
    const salary = this.daysWorked * this.dailySalary;
    return salary.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}