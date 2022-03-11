const searchBtn = document.querySelector("#searchBtn");
console.log(searchBtn);
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchParameter = document.querySelector("#search").value;
  console.log(searchParameter);
  window.location.href = `/searchArticle/${searchParameter}`;
});
