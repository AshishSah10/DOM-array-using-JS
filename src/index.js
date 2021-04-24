//import "./styles.css";

const api = "https://randomuser.me/api/";
const btnElem = document.getElementById("add-user-btn");
const userListElem = document.getElementById("user-list");
const userList = [];
const searchInputElem = document.getElementById("search-input");
const sortAscBtnElem = document.getElementById("sort-btn-asc");
const sortDescBtnElem = document.getElementById("sort-btn-desc");

class UserClass{
  constructor(title, firstName, lastName, userName="",gender, email){
    this.title = title;
    this.name = `${userName ? userName : `${firstName} ${lastName}`}`;
    this.gender = gender;
    this.email = email;
  }
  // constructor(title, userName, gender, email){
  //   this.title = title;
  //   this.name = `${userName}`;
  //   this.gender = gender;
  //   this.email = email;
  // }
}
btnElem.addEventListener("click", async function () {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userDataJson = await userData.json();
  const user = userDataJson.results[0];
  const userObject = new UserClass(user.name.title, user.name.first, user.name.last, null, user.gender, user.email)
  userList.push(userObject)
  //console.log(user, userObject)
  renderUserList(userList)
});

function renderUserList(requiredUserList){
    userListElem.innerHTML = null;
    requiredUserList.forEach(userObj => {
      const userElem = document.createElement("div");
      userElem.innerHTML = `<div class="user-class">
        <lable>Name: <span class="user-title">${userObj.title} </span> <span class="user-name">${userObj.name}</span></lable>
        <ol>
          <li>Email: <span class="user-email">${userObj.email}</span></li>
          <li>gender: <span class="user-gender">${userObj.gender}</span></li>
        </ol>
      </div>`;
      userListElem.appendChild(userElem);
    })
}

searchInputElem.addEventListener("keyup", (e) => {
  const filterdUserList = userList.filter(userObj => userObj.name.toLowerCase().includes(searchInputElem.value.toLowerCase()))
  renderUserList(filterdUserList)
})

sortAscBtnElem.addEventListener("click", () => {
       const userElem = userListElem.getElementsByClassName("user-class")
       const ascSortUserList = []
       for(let i = 0; i < userElem.length; i++){
         const title = userElem[i].getElementsByClassName("user-title")[0].innerText;
         const userName = userElem[i].getElementsByClassName("user-name")[0].innerText;
         //const [firstName, lastName] = userElem[i].getElementsByClassName("user-name")[0].innerText.split(" ");
         const gender = userElem[i].getElementsByClassName("user-gender")[0].innerText;
         const email = userElem[i].getElementsByClassName("user-email")[0].innerText;
         ascSortUserList.push(new UserClass(title, null, null, userName, gender, email));
       }
       ascSortUserList.sort((a, b) => a.name > b.name ? 1: -1)
       renderUserList(ascSortUserList)
})
sortDescBtnElem.addEventListener("click", () => {
  const userElem = userListElem.getElementsByClassName("user-class")
  const descSortUserList = []
  for(let i = 0; i < userElem.length; i++){
    const title = userElem[i].getElementsByClassName("user-title")[0].innerText;
    const userName = userElem[i].getElementsByClassName("user-name")[0].innerText;
    //const [firstName, lastName] = userElem[i].getElementsByClassName("user-name")[0].innerText.split(" ");
    const gender = userElem[i].getElementsByClassName("user-gender")[0].innerText;
    const email = userElem[i].getElementsByClassName("user-email")[0].innerText;
    descSortUserList.push(new UserClass(title, null, null, userName, gender, email));
  }
  descSortUserList.sort((a, b) => a.name > b.name ? -1: 1)
  renderUserList(descSortUserList)
})
