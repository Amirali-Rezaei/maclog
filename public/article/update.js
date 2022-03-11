const actualBtn = document.getElementById("file");
const preview = document.getElementById("picturePreview");
const fileChosen = document.getElementById("file-chosen");
const changeArticlePictureBtn = document.getElementById("changeArticlePicture");
const editPicture = document.getElementById("editPicture");

actualBtn.addEventListener("change", function () {
  fileChosen.textContent = this.files[0].name;
});

actualBtn.onchange = (evt) => {
  const [file] = actualBtn.files;
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
};

tinymce.init({
  selector: "#article_text",
  content_css: "/main.css",
});

changeArticlePictureBtn.addEventListener("click", () => {
  editPicture.classList.remove("d-none");
});
