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

const hasInvalidInput = (inputList) => {
return inputList.some((inputEl) => {
  return !inputEl.validity.valid;
});
};

const toggleButtonState = (inputList, buttonEl) => {
if (hasInvalidInput(inputList)) {
  disableButton(buttonEl);
}else {
 buttonEl.disabled = false;
 buttonEl.classList.remove(".modal__form-save_disabled");
};
};

const disableButton = (buttonEl) => {
buttonEl.disabled = true;
buttonEl.classList.add(".modal__form-save_disabled");
};

const resetValidation = (formEl,inputList) => {
inputList.forEach((input) => {
hideInputError(formEl,input);
})
};

const setEventListeners = (formEl) => {
const inputList = Array.from(formEl.querySelectorAll(".modal__form-input"));
const buttonEl = formEl.querySelector(".modal__form-save");
toggleButtonState (inputList, buttonEl);
inputList.forEach((inputEl) => {
inputEl.addEventListener("input", function () {
  checkInputValidity(formEl,inputEl);
  toggleButtonState(inputList, buttonEl);
});
});
}

const enableValidation = () => {
const FormList= document.querySelectorAll(".modal__form");
FormList.forEach((formEl) => {
  setEventListeners(formEl);
});


};

enableValidation();