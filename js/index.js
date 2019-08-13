const list = document.getElementById('list')
const bookURL = "http://localhost:3000/books"
const showPanel = document.getElementById('show-panel')
let booksArray = []
let userOne = {"id":1, "username":"pouros"}

// Fetch data
const fetchBooks = () => {
  fetch(bookURL)
  .then(resp => resp.json())
  .then(books => {
    booksArray = books
    for(const book of books) {
      renderBook(book);
    }
  })
  .catch(error => document.body.innerHTML = error.message)
}

// Display thumbnail, description, list of users on click
const renderBook = (book) => {
  let li = document.createElement('li')
  let h3 = document.createElement('h3')
  let bookImg = document.createElement('img')
  let bookDescription = document.createElement('p')
  let likeButton = document.createElement('button')
  let bookPanel = document.createElement('div')
  let userList = document.createElement('ul')
  let users = book.users

  li.innerText = book.title
  li.style.cursor = "pointer";
  li.style.marginBottom = "40px"
  li.style.fontWeight = "400"
  
  list.appendChild(li)
  list.style.width = "170px"
  
  likeButton.innerText = "Like"

  users.forEach(function(user){
    let userListItem = document.createElement('li')
    userListItem.innerText = user.username
    userList.append(userListItem)
  })
  

  li.addEventListener('click', (event) => {
    list.style.borderRight = "thin solid lightgray";
    if (li.style.fontWeight == "400") {
      li.style.fontWeight = "700"
    } else if (li.style.fontWeight == "700") {
      li.style.fontWeight = "400"
    }

    h3.innerText = book.title
    
    bookImg.src = book.img_url
    bookDescription.innerText = book.description
    
    bookPanel.style.paddingLeft = "40px"
    bookPanel.append(h3, bookImg, bookDescription, likeButton, userList)
    showPanel.innerText = ""
    showPanel.append(bookPanel)
  })

  likeButton.addEventListener('click', (event) => {
    // event.preventDefault()
    let bookUsers = book.users
    bookUsers.push(userOne)
    fetch(`${bookURL}/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        users: bookUsers
      })
    })
    .then(resp => resp.json())
    .then(book => {
      let newLI = document.createElement('li')
      newLI.innerText = userOne.username
      userList.append(newLI)
    // console.log(bookUsers);
    })
  })

}


fetchBooks()