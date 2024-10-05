const newTitle = document.getElementById("title");
const blogContant = document.getElementById("textBlog");
const addBtn = document.getElementById("addBtn");
const blogData = document.querySelector(".contant");
const form = document.getElementById('addNewBlog')
let userData = [];
let edit_id = null;

let getSavedData = JSON.parse(localStorage.getItem("Users"))||[];
userData = getSavedData;
DisplayData();

addBtn.onclick = () => {
  let title = newTitle.value;
  let artical = blogContant.value;
  if (edit_id != null) {
    userData.splice(edit_id, 1, { title: title, contant: artical });
    edit_id = null;
  } else {
    userData.push({ title: title, contant: artical });
  }

  if(title,artical){
    saveData(userData);
    newTitle.value = "";
    blogContant.value = "";
    DisplayData();
    addBtn.innerText = "Add";
  }else{
    alert("Please add your text")
  }
  
};

function saveData(userData) {
  localStorage.setItem("Users", JSON.stringify(userData));
}

function DisplayData() {
  let statement = "";
  userData.forEach((item, id) => {
    statement += `<div class="card" id="cards" style="width: 18rem"> 
   <h5 class="card-title">${item.title}</h5>
       <img src="/assets/artical1.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <p class="card-text">
            ${item.contant}
          </p>
          <button type="button" class="btn btn-primary"  onClick = "EditBlog(${id})">Update</button>
          <button type="button" class="btn btn-danger" onClick = "DeleteBlog(${id})">Delete</button>

        </div>
      </div>
`;
  });
  blogData.innerHTML = statement;
}

function EditBlog(id) {
  edit_id = id;
  newTitle.value = userData[id].title;
  blogContant.value = userData[id].contant;
  addBtn.innerText = "Save changes";
}

function DeleteBlog(id) {
  userData.splice(id, 1);
  saveData(userData);
  DisplayData();
}

const searchFeild = document.querySelector('#search');

searchFeild.addEventListener('input', function() {
const searchValue = searchFeild.value.toUpperCase();

const blogs = document.querySelector('.card h5');
blogs.forEach((el)=>{
  const text = el.textContent.toUpperCase();
  el.style.display = text.includes(searchValue)? ' ':"none";
});
})

  