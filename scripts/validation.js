const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-save",
  inactiveButtonClass: "modal__form-save_disabled",
  inputErrorClass: "modal__form-error",
  errorClass: "modal__form-error_visible",
};

const showInputError = (formEl, inputEl, errorMsg, x) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(x.errorClass);
};

const hideInputError = (formEl, inputEl, x) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(x.errorClass);
};

const checkInputValidity = (formEl, inputEl, x) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, x);
  } else {
    hideInputError(formEl, inputEl, x);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, x) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, x);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(x.inactiveButtonClass);
  }
};

const disableButton = (buttonEl, x) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(x.inactiveButtonClass);
};

const resetValidation = (formEl, inputList, x) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, x);
  });
};

const setEventListeners = (formEl, x) => {
  const inputList = Array.from(formEl.querySelectorAll(x.inputSelector));
  const buttonEl = formEl.querySelector(x.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, x);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, x);
      toggleButtonState(inputList, buttonEl, x);
    });
  });
};

const enableValidation = (x) => {
  const FormList = document.querySelectorAll(x.formSelector);
  FormList.forEach((formEl) => {
    setEventListeners(formEl, x);
  });
};

enableValidation(settings);
