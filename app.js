import { elements } from "./js/helpers.js";
import { Github } from "./js/api.js";
import { UI } from "./js/ui.js";

//Creating an instance of the github class
const github = new Github();
// Example of UI class
const ui = new UI();

//! Olay İzleyicileri
elements.searchBtn.addEventListener("click", getInput);

//Methods

//accessing data inside todo input
function getInput() {
  // It works if there is a value in the input
  if (elements.searchInput.value) {
    // sends api request
    github
      .fetchUserData(elements.searchInput.value)
      .then((res) => {
        // if user not found
        if (res.data.message === 'Not Found') {
          ui.showAlert('Aradığınız kullanıcı bulunamadı', 'alert alert-danger')
        } else {
          //if user found
          ui.showAlert('Kullanıcı bulundu', 'alert alert-success')
          ui.renderProfile(res.data)
          ui.renderProjects(res.repos)
        }
      })
      .catch((err) => console.log(err))
    return
  }
  ui.showAlert('Form alanını doldurunuz!', 'alert bg-warning fw-bold text-dark')
}
//todo Enter tuşu ile arama
document.addEventListener("keydown", (e) => {
  //   console.log("key:", e.key);
  if (e.key === 'Enter') {
    getInput()
  }
});
