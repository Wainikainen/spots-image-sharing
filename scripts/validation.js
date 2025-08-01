const showInputError = (formEl,inputEl, errorMsg) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
errorMsgEl.textContent = errorMsg;
errorMsgEl.classList.add("modal__form-error_visible");
};

const hideInputError = (formEl,inputEl) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
errorMsgEl.textContent = "";
errorMsgEl.classList.remove("modal__form-error_visible");
};

const checkInputValidity = (formEl,inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage)
  } else {
    hideInputError(formEl, inputEl)
  }
};

const setEventListeners = (formEl) => {
const inputList = Array.from(formEl.querySelectorAll(".modal__form-input"));
const buttonEl = formEl.querySelector(".modal__form-save");
inputList.forEach((inputEl) => {
inputEl.addEventListener("input", function () {
  checkInputValidity(formEl,inputEl);
  toggleButtonState(inputList, buttonEl);
});
});
}

const enableValidation = () => {
const FormList= Array.from(document.querySelectorAll(".modal__form"));
FormList.forEach((formEl) => {
  setEventListeners(formEl);
});


};

enableValidation();