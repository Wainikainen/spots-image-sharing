import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation";
import Api from "../scripts/api";

/*const initialCards = [
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
];*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "75e9bfca-7947-47ee-85a7-3709ecf46b79",
    "Content-Type": "application/json",
  },
});

api
  .getSiteInfo()
  .then(({ userInfo, cards }) => {
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profilePicEl.src = userInfo.avatar;
    cards.forEach((card) => {
      const newCardEl = getCardElement(card);
      cardContainer.prepend(newCardEl);
    });
  })
  .catch(console.error);

const profilePicEl = document.querySelector(".profile__pic");

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

const deleteModal = document.getElementById("delete-modal");

const ModalDeleteCancel = document.getElementById("cancel-button");

const ModalDeleteForm = document.getElementById("delete-form");

const avatarModal = document.getElementById("avatar-modal");

const profilePicBtn = document.querySelector(".profile__pic-btn");

const avatarFormEl = document.getElementById("avatar-form");

const avatarLinkInput = document.getElementById("avatar-link");

const avatarModalExit = avatarModal.querySelector(".modal__exit");

const avatarFileInput = document.getElementById("avatar-file-input");

const avatarFileBtn = avatarFormEl.querySelector(".modal__file-button");

const avatarSaveBtn = avatarFormEl.querySelector(".modal__form-save");

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

let chosenCard;
let chosenCardId;
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
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      api
        .removeLike(data._id)
        .then(() => {
          cardLikeButton.classList.remove("card__like-button_is-active");
        })
        .catch(console.error);
    } else {
      api
        .addLike(data._id)
        .then(() => {
          cardLikeButton.classList.add("card__like-button_is-active");
        })
        .catch(console.error);
    }
  });

  cardDeleteButton.addEventListener("click", () => {
    chosenCard = cardPostEL;
    chosenCardId = data._id;
    openModal(deleteModal);
  });

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();
    api
      .deleteCard(chosenCardId)
      .then(() => {
        chosenCard.remove();
        closeModal(deleteModal);
      })
      .catch(console.error);
  };

  ModalDeleteForm.addEventListener("submit", handleDeleteSubmit);
  ModalDeleteCancel.addEventListener("click", () => closeModal(deleteModal));

  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = data.link;
    modalImageEl.alt = data.name;
    imageCaption.textContent = data.name;
    openModal(modalImage);
  });

  return cardElement;
};

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

profilePicBtn.addEventListener("click", () => {
  openModal(avatarModal);
  avatarSaveBtn.disabled = true;
  resetValidation(avatarFormEl, [avatarLinkInput], settings);
});

avatarModalExit.addEventListener("click", () => {
  closeModal(avatarModal);
  avatarFormEl.reset();
});

avatarFileBtn.addEventListener("click", () => {
  avatarFileInput.click();
});

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  avatarSaveBtn.disabled = true;
  const file = avatarFileInput.files[0];
  const avatar = avatarLinkInput.value;
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      api
        .editUserAvatar({ avatar: base64Image })
        .then((data) => {
          profilePicEl.src = data.avatar;
          closeModal(avatarModal);
          avatarFormEl.reset();
        })
        .catch(console.error);
    };
    reader.readAsDataURL(file);
  } else if (avatar) {
    api
      .editUserAvatar({ avatar })
      .then((data) => {
        profilePicEl.src = data.avatar;
        closeModal(avatarModal);
        avatarFormEl.reset();
        avatarSaveBtn.disabled = false;
      })
      .catch(console.error);
  }
};

avatarFormEl.addEventListener("submit", handleAvatarFormSubmit);

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const name = editProfileNameInput.value;
  const about = editProfileDescriptionInput.value;

  api
    .editUserInfo({ name, about })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
      editProfileFormEl.reset();
    })
    .catch(console.error);
};

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

const handleNewPostFormSubmit = (evt) => {
  evt.preventDefault();
  const name = addCaptionInput.value;
  const link = addLinkInput.value;
  api
    .createCard({ name, link })
    .then((newCard) => {
      const newCardEl = getCardElement(newCard);
      cardContainer.prepend(newCardEl);
      newPostFormEl.reset();
      disableButton(modalSaveButton, settings);
      closeModal(newPostModal);
    })
    .catch(console.error);
};

newPostFormEl.addEventListener("submit", handleNewPostFormSubmit);

enableValidation(settings);
