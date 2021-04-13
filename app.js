const githubForm = document.querySelector("#github-form");
const nameInput = document.querySelector("#githubname");
const clearLastUsersButton = document.querySelector("#clear-last-users");
const lastUsers = document.querySelector("#last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllSearched);
    githubForm.addEventListener("submit",getData);
    clearLastUsersButton.addEventListener("click",clearAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();

    if(username===""){
        ui.showError("Lütfen geçerli bir kullanıcı adı girin.")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı bulunamadı.");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){

}

function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user=> {
        result += `<li class=list-group-item>${user}</li>`;
    });
    lastUsers.innerHTML = result;
}