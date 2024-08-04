class Customer extends Person {
  constructor(
    name,
    address,
    idNumber,
    email,
    companyName,
    invoiceValue,
    Evaluate
  ) {
    super(name, address, idNumber, email, "Customer");
    this.companyName = companyName;
    this.invoiceValue = invoiceValue;
    this.Evaluate = Evaluate;
  }
}
