const passwordChangeBtn = document.querySelector("#passwordChange") || null;
const passwordSubmitBtn = document.querySelector("#passwordSubmit");
const newPassword = document.querySelector("#newPassword");
const photoEdit = document.querySelector("#photoEdit");
const photoEditBtn = document.querySelector("#photoEditBtn");
const photo_file = document.querySelector("#photo_file");
const editBtn = document.querySelector("#editBtn") || null;
const inputs = document.querySelectorAll('input[type="text"]');
const saveBtn = document.querySelector("#saveBtn");

editBtn?.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.removeAttribute("disabled");
  });

  saveBtn.classList.remove("d-none");
});

passwordChangeBtn?.addEventListener("click", () => {
  newPassword.removeAttribute("hidden");

  passwordSubmitBtn.classList.remove("d-none");
});

photoEdit.addEventListener("click", () => {
  photo_file.removeAttribute("hidden");
  photoEditBtn.classList.remove("d-none");
});
