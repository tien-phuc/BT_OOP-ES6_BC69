const arrPeople = [];

// Hàm đổi input đối tượng
const showConditionalFields = (type) => {
  const allFields = ["studentFields", "employeeFields", "customerFields"];
  allFields.forEach((fieldId) => {
    const element = document.getElementById(fieldId);
    if (element) {
      element.style.display = "none";
    }
  });
  if (type) {
    const fields = document.getElementById(`${type.toLowerCase()}Fields`);
    if (fields) {
      fields.style.display = "block";
    }
  }
};
document.getElementById("type").addEventListener("change", (e) => {
  showConditionalFields(e.target.value);
});

// Hàm render
const render = (person) => {
  const { name, address, idNumber, email, type, additionalInfo } = person;
  const tableBody = document.getElementById("peopleList");
  const row = document.createElement("tr");
  let processedAdditionalInfo = additionalInfo;
  if (type === "Student") {
    const student = new Student(
      name,
      address,
      idNumber,
      email,
      ...extractScores(additionalInfo)
    );
    const averageScore = `Điểm trung bình: ${student.calculateAverage()}`;
    if (!additionalInfo.includes(averageScore)) {
      processedAdditionalInfo += `<p>${averageScore}</p>`;
    }
  }
  row.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
    <td>${idNumber}</td>
    <td>${email}</td>
    <td>${type}</td>
    <td>${processedAdditionalInfo}</td>
    <td>
      <div>
        <button class="btn btn-primary btn-sm edit-button" onclick="editPerson('${idNumber}')">Sửa</button>
        <button class="btn btn-danger btn-sm delete-button" onclick="deletePerson('${idNumber}')">Xóa</button>
      </div>
    </td>
  `;
  tableBody.appendChild(row);
};

// Hàm add đối tượng
const addPerson = () => {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const idNumber = document.getElementById("idNumber").value;
  const email = document.getElementById("email").value;
  const type = document.getElementById("type").value;
  const nameError = document.getElementById("nameError");
  const addressError = document.getElementById("addressError");
  const idNumberError = document.getElementById("idNumberError");
  const emailError = document.getElementById("emailError");

  const isNameValid = checkEmptyValue(name, nameError);
  const isAddressValid = checkEmptyValue(address, addressError);
  const isIdNumberValid = checkEmptyValue(idNumber, idNumberError);
  const isEmailValid = checkEmailValue(email, emailError);

  if (!isNameValid || !isAddressValid || !isIdNumberValid || !isEmailValid) {
    return;
  }

  let additionalInfo = "";
  let isAdditionalInfoValid = true;

  if (type === "Student") {
    const math = document.getElementById("math").value;
    const physics = document.getElementById("physics").value;
    const chemistry = document.getElementById("chemistry").value;
    const mathError = document.getElementById("mathError");
    const physicsError = document.getElementById("physicsError");
    const chemistryError = document.getElementById("chemistryError");

    const isMathValid = checkScoreValue(math, mathError);
    const isPhysicsValid = checkScoreValue(physics, physicsError);
    const isChemistryValid = checkScoreValue(chemistry, chemistryError);

    if (isMathValid && isPhysicsValid && isChemistryValid) {
      additionalInfo = `
        <p>Điểm Toán: ${math}</p>
        <p>Điểm Lý: ${physics}</p>
        <p>Điểm Hóa: ${chemistry}</p>
        <p>Điểm trung bình: ${new Student(
          name,
          address,
          idNumber,
          email,
          math,
          physics,
          chemistry
        ).calculateAverage()}</p>
      `;
    } else {
      isAdditionalInfoValid = false;
    }
  } else if (type === "Employee") {
    const daysWorked = document.getElementById("daysWorked").value;
    const dailySalary = document.getElementById("dailySalary").value;
    const daysWorkedError = document.getElementById("daysWorkedError");
    const dailySalaryError = document.getElementById("dailySalaryError");

    const isDaysWorkedValid = checkEmptyValue(daysWorked, daysWorkedError);
    const isDailySalaryValid = checkEmptyValue(dailySalary, dailySalaryError);

    if (isDaysWorkedValid && isDailySalaryValid) {
      additionalInfo = `
        <p>Số ngày làm việc: ${daysWorked}</p>
        <p>Lương 1 ngày: ${dailySalary}</p>
        <p>Tiền lương: ${new Employee(
          name,
          address,
          idNumber,
          email,
          daysWorked,
          dailySalary
        ).calculateSalary()}</p>
      `;
    } else {
      isAdditionalInfoValid = false;
    }
  } else if (type === "Customer") {
    const companyName = document.getElementById("companyName").value;
    const invoiceValue = document.getElementById("invoiceValue").value;
    const evaluate = document.getElementById("Evaluate").value;
    const companyNameError = document.getElementById("companyNameError");
    const invoiceValueError = document.getElementById("invoiceValueError");
    const evaluateError = document.getElementById("evaluateError");

    const isCompanyNameValid = checkEmptyValue(companyName, companyNameError);
    const isInvoiceValueValid = checkEmptyValue(
      invoiceValue,
      invoiceValueError
    );
    const isEvaluateValid = checkEmptyValue(evaluate, evaluateError);

    if (isCompanyNameValid && isInvoiceValueValid && isEvaluateValid) {
      additionalInfo = `
        <p>Tên công ty: ${companyName}</p>
        <p>Trị giá hóa đơn: ${invoiceValue}</p>
        <p>Đánh giá: ${evaluate}</p>
      `;
    } else {
      isAdditionalInfoValid = false;
    }
  }
  if (!isAdditionalInfoValid) {
    return;
  }
  const person = {
    name,
    address,
    idNumber,
    email,
    type,
    additionalInfo,
  };
  // thêm vào mảng
  arrPeople.push(person);
  render(person);
  document.getElementById("addPersonForm").reset();
  showConditionalFields("");
};

document.getElementById("addPersonButton").addEventListener("click", addPerson);

// Hàm nút xóa
const deletePerson = (idNumber) => {
  const index = arrPeople.findIndex((person) => person.idNumber === idNumber);
  if (index !== -1) {
    arrPeople.splice(index, 1);
    renderPeopleList();
  }
};

// Hàm xử lý sửa đối tượng
const editPerson = (idNumber) => {
  const person = arrPeople.find((item) => item.idNumber === idNumber);
  if (person) {
    document.getElementById("name").value = person.name;
    document.getElementById("address").value = person.address;
    document.getElementById("idNumber").value = person.idNumber;
    document.getElementById("email").value = person.email;
    document.getElementById("type").value = person.type;
    showConditionalFields(person.type);
    // chặn mã
    document.getElementById("idNumber").readOnly = true;
    if (person.type === "Student") {
      const [math, physics, chemistry] = extractScores(person.additionalInfo);
      document.getElementById("math").value = math;
      document.getElementById("physics").value = physics;
      document.getElementById("chemistry").value = chemistry;
    } else if (person.type === "Employee") {
      const [daysWorked, dailySalary] = extractEmployeeInfo(
        person.additionalInfo
      );
      document.getElementById("daysWorked").value = daysWorked;
      document.getElementById("dailySalary").value = dailySalary;
    } else if (person.type === "Customer") {
      const [companyName, invoiceValue, evaluate] = extractCustomerInfo(
        person.additionalInfo
      );
      document.getElementById("companyName").value = companyName;
      document.getElementById("invoiceValue").value = invoiceValue;
      document.getElementById("Evaluate").value = evaluate;
    }
  }
};
const renderPeopleList = () => {
  const tableBody = document.getElementById("peopleList");
  tableBody.innerHTML = "";
  arrPeople.forEach((person) => {
    render(person);
  });
};

// Hàm lấy value riêng từng dối tượng
const extractScores = (additionalInfo) => {
  const math = additionalInfo.match(/Điểm Toán: (\d+(\.\d+)?)/)[1];
  const physics = additionalInfo.match(/Điểm Lý: (\d+(\.\d+)?)/)[1];
  const chemistry = additionalInfo.match(/Điểm Hóa: (\d+(\.\d+)?)/)[1];
  return [math, physics, chemistry];
};
const extractEmployeeInfo = (additionalInfo) => {
  const daysWorked = additionalInfo.match(/Số ngày làm việc: (\d+)/)[1];
  const dailySalary = additionalInfo.match(/Lương 1 ngày: (\d+(\.\d+)?)/)[1];
  return [daysWorked, dailySalary];
};
const stripHtmlTags = (input) => {
  return input.replace(/<\/?[^>]+>/gi, "").trim();
};
const extractCustomerInfo = (additionalInfo) => {
  const companyNameMatch = additionalInfo.match(/Tên công ty:\s*(.+)/);
  const invoiceValueMatch = additionalInfo.match(
    /Trị giá hóa đơn:\s*(\d+(\.\d+)?)/
  );
  const evaluateMatch = additionalInfo.match(/Đánh giá:\s*(.+)/);
  const companyName = companyNameMatch
    ? stripHtmlTags(companyNameMatch[1])
    : "Không có thông tin";
  const invoiceValue = invoiceValueMatch
    ? stripHtmlTags(invoiceValueMatch[1])
    : "Không có thông tin";
  const evaluate = evaluateMatch
    ? stripHtmlTags(evaluateMatch[1])
    : "Không có thông tin";
  return [companyName, invoiceValue, evaluate];
};

// Hàm nút cập nhật
const updatePerson = () => {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const idNumber = document.getElementById("idNumber").value;
  const email = document.getElementById("email").value;
  const type = document.getElementById("type").value;
  const nameError = document.getElementById("nameError");
  const addressError = document.getElementById("addressError");
  const idNumberError = document.getElementById("idNumberError");
  const emailError = document.getElementById("emailError");

  const isNameValid = checkEmptyValue(name, nameError);
  const isAddressValid = checkEmptyValue(address, addressError);
  const isIdNumberValid = checkEmptyValue(idNumber, idNumberError);
  const isEmailValid = checkEmailValue(email, emailError);

  if (!isNameValid || !isAddressValid || !isIdNumberValid || !isEmailValid) {
    return;
  }

  let additionalInfo = "";
  let isAdditionalInfoValid = true;

  if (type === "Student") {
    const math = document.getElementById("math").value;
    const physics = document.getElementById("physics").value;
    const chemistry = document.getElementById("chemistry").value;
    const mathError = document.getElementById("mathError");
    const physicsError = document.getElementById("physicsError");
    const chemistryError = document.getElementById("chemistryError");

    const isMathValid = checkScoreValue(math, mathError);
    const isPhysicsValid = checkScoreValue(physics, physicsError);
    const isChemistryValid = checkScoreValue(chemistry, chemistryError);

    if (isMathValid && isPhysicsValid && isChemistryValid) {
      additionalInfo = `
        <p>Điểm Toán: ${math}</p>
        <p>Điểm Lý: ${physics}</p>
        <p>Điểm Hóa: ${chemistry}</p>
        <p>Điểm trung bình: ${new Student(
          name,
          address,
          idNumber,
          email,
          math,
          physics,
          chemistry
        ).calculateAverage()}</p>
      `;
    } else {
      isAdditionalInfoValid = false;
    }
  } else if (type === "Employee") {
    const daysWorked = document.getElementById("daysWorked").value;
    const dailySalary = document.getElementById("dailySalary").value;
    const daysWorkedError = document.getElementById("daysWorkedError");
    const dailySalaryError = document.getElementById("dailySalaryError");

    const isDaysWorkedValid = checkEmptyValue(daysWorked, daysWorkedError);
    const isDailySalaryValid = checkEmptyValue(dailySalary, dailySalaryError);

    if (isDaysWorkedValid && isDailySalaryValid) {
      additionalInfo = `
        <p>Số ngày làm việc: ${daysWorked}</p>
        <p>Lương 1 ngày: ${dailySalary}</p>
        <p>Tiền lương: ${new Employee(
          name,
          address,
          idNumber,
          email,
          daysWorked,
          dailySalary
        ).calculateSalary()}</p>
      `;
    } else {
      isAdditionalInfoValid = false;
    }
  } else if (type === "Customer") {
    const companyName = document.getElementById("companyName").value;
    const invoiceValue = document.getElementById("invoiceValue").value;
    const evaluate = document.getElementById("Evaluate").value;
    const companyNameError = document.getElementById("companyNameError");
    const invoiceValueError = document.getElementById("invoiceValueError");
    const evaluateError = document.getElementById("evaluateError");

    const isCompanyNameValid = checkEmptyValue(companyName, companyNameError);
    const isInvoiceValueValid = checkEmptyValue(
      invoiceValue,
      invoiceValueError
    );
    const isEvaluateValid = checkEmptyValue(evaluate, evaluateError);

    if (isCompanyNameValid && isInvoiceValueValid && isEvaluateValid) {
      additionalInfo = `
        <p>Tên công ty: ${companyName}</p>
        <p>Trị giá hóa đơn: ${invoiceValue}</p>
        <p>Đánh giá: ${evaluate}</p>
      `;
    } else {
      isAdditionalInfoValid = false;
    }
  }

  if (!isAdditionalInfoValid) {
    return;
  }

  const index = arrPeople.findIndex((person) => person.idNumber === idNumber);

  if (index !== -1) {
    arrPeople[index] = {
      name,
      address,
      idNumber,
      email,
      type,
      additionalInfo,
    };
    renderPeopleList();
  }

  document.getElementById("addPersonForm").reset();
  showConditionalFields("");
  document.getElementById("idNumber").readOnly = false;
};
document.getElementById("edit").addEventListener("click", updatePerson);

// Hàm sắp xếp theo tên
const sortByName = () => {
  arrPeople.sort((a, b) => a.name.localeCompare(b.name));
  renderPeopleList();
};
document.getElementById("sortByName").addEventListener("click", sortByName);

// Hàm lọc người dùng theo loại
const filterByType = () => {
  const filterType = document.getElementById("filterType").value;
  const tableBody = document.getElementById("peopleList");
  tableBody.innerHTML = "";
  const filteredPeople = filterType
    ? arrPeople.filter((person) => person.type === filterType)
    : arrPeople;
  filteredPeople.forEach(render);
};
document.getElementById("filterButton").addEventListener("click", filterByType);
