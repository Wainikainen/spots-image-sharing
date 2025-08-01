const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");

const profilePostButton = document.querySelector(".profile__post-button");

const editProfileModal = document.querySelector("#edit-profile-modal");

const newPostModal = document.querySelector("#new-post-modal");

const profileExitButton = editProfileModal.querySelector(".modal__exit");

const postExitButton = newPostModal.querySelector(".modal__exit");

const editProfileFormEl = editProfileModal.querySelector(".modal__form");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const profileNameEl = document.querySelector(".profile__name");

const profileDescriptionEl = document.querySelector(".profile__description");

const newPostFormEl = newPostModal.querySelector(".modal__form");

const addLinkInput = newPostModal.querySelector("#image-link-input");

const addCaptionInput = newPostModal.querySelector("#caption-link-input");

const cardTemplateEl = document.querySelector("#card-template");

const cardContainer = document.querySelector(".cards__list");

const modalImage = document.querySelector("#modal-image");

const modalImageEl = modalImage.querySelector(".modal__image");

const imageCaption = modalImage.querySelector(".modal__image-title");

const closeModalImage = modalImage.querySelector(".modal__image-close");

const modalSaveButton = newPostFormEl.querySelector(".modal__form-save");

const allModals = document.querySelectorAll(".modal");

const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeModalEsc);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
};

const closeModalEsc = (event) => {
  if (event.key === "Escape") {
    const openModalEl = document.querySelector(".modal_is-opened");
    if (openModalEl) closeModal(openModalEl);
  }
};

allModals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
      const form = modal.querySelector("form");
      if (form) form.reset();
    }
  });
});

closeModalImage.addEventListener("click", () => closeModal(modalImage));
const getCardElement = (data) => {
  const cardElement = cardTemplateEl.content.cloneNode(true);
  const cardPostEL = cardElement.querySelector(".card");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });
  cardDeleteButton.addEventListener("click", () => cardPostEL.remove());
  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = data.link;
    modalImageEl.alt = data.name;
    imageCaption.textContent = data.name;
    openModal(modalImage);
  });

  return cardElement;
};

initialCards.forEach((card) => {
  const newCardEl = getCardElement(card);
  cardContainer.prepend(newCardEl);
});

profileEditButton.addEventListener("click", () => {
  resetValidation(
    editProfileFormEl,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

profilePostButton.addEventListener("click", () => {
  openModal(newPostModal);
  resetValidation(newPostFormEl, [addCaptionInput, addLinkInput], settings);
});

profileExitButton.addEventListener("click", () => {
  closeModal(editProfileModal);
  editProfileFormEl.reset();
});

postExitButton.addEventListener("click", () => {
  closeModal(newPostModal);
  newPostFormEl.reset();
});

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
  editProfileFormEl.reset();
};

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

const handleNewPostFormSubmit = (evt) => {
  evt.preventDefault();
  const newPost = {
    name: addCaptionInput.value,
    link: addLinkInput.value,
  };
  const newCardEl = getCardElement(newPost);
  cardContainer.prepend(newCardEl);
  disableButton(modalSaveButton, settings);
  closeModal(newPostModal);
  newPostFormEl.reset();
};

newPostFormEl.addEventListener("submit", handleNewPostFormSubmit);
