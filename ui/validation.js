const checkEmptyValue = (value, errorElement) => {
  if (errorElement) {
    if (!value.trim()) {
      errorElement.textContent = "Trường này không được bỏ trống.";
      return false;
    }
    errorElement.textContent = "";
  } else {
    console.error("Phần tử lỗi không tồn tại.");
  }
  return true;
};

function checkEmailValue(value, errorELe) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const isValid = regexEmail.test(value); // trả về true or false
  if (!isValid) {
    // xử lí tb lỗi
    errorELe.innerHTML = "Vui lòng nhập định dạng email";
    return false;
  } else {
    // xử lí xóa tb lỗi
    errorELe.innerHTML = "";
    return true;
  }
}

function checkScoreValue(value, errorELe) {
  // Kiểm tra xem value có phải là số hay không và có nằm trong khoảng từ 0 đến 10 hay ko
  let regexScore = /^(10|\d(\.\d)?)$/;
  const isValid = regexScore.test(value);
  if (!isValid) {
    errorELe.innerHTML = "Vui lòng nhập số điểm từ 0 đến 10 vào";
    return false;
  } else {
    errorELe.innerHTML = "";
    return true;
  }
}
