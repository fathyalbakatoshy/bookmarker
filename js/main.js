var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var bookList = [];

if (localStorage.getItem("books") == null) {
  bookList = [];
} else {
  bookList = JSON.parse(localStorage.getItem("books"));
  display(bookList);
}

function addBook() {
  if (validateBookName() && validateBookUrl()) {
    var book = {
      name: siteName.value,
      url: siteUrl.value,
    };

    bookList.push(book);
    localStorage.setItem("books", JSON.stringify(bookList));
    display(bookList);
    clearInput();
    siteName.classList.remove("is-valid")
    siteUrl.classList.remove("is-valid")
  }
}

function clearInput() {
  siteName.value = "",
  siteUrl.value = ""
}

function display(value) {
  let box = ``;
  for (let i = 0; i < value.length; i++) {
    box += `
    <tr>
      <td>${i + 1}</td>
      <td>${value[i].name}</td>
      <td><button class="btn btn-warning" onclick="visitSite('https://${
        value[i].url
      }')"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
      <td><button onclick="deleteBook(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("display").innerHTML = box;
}

function visitSite(URL) {
  window.open(URL);
}

function deleteBook(index) {
  bookList.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(bookList));
  display(bookList);
}

function validateBookName() {
  let regex = /^[a-z]{3,}$/ig;
  if (regex.test(siteName.value)) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function validateBookUrl() {
  let regex =/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._]*)*$/;
  if (regex.test(siteUrl.value)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    return false;
  }
}

