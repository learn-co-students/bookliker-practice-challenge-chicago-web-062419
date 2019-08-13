let bookList = document.getElementById("list")
let bookUrl = "http://localhost:3000/books"
let showPage = document.getElementById("show-panel")
let user = {id: 1, username: "pouros"}

// const addLike = (book, event) => {
//     currentLikes = book.users
//     currentLikes.push(user)
//     fetch(bookUrl + "/" + book.id, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": 'application/json',
//             "Accept": 'application/json'
//         },
//         body: JSON.stringify({
//             users: currentLikes
//         })
//      })
//      .then(res => res.json())
//      .then(book => linkToBook(book))
// }
const patchBook = (book, userList) => {
    fetch(bookUrl + "/" + book.id, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            users: currentLikes
        })
     })
     .then(res => res.json())
     .then(book => linkToBook(book))
}

const addLike = (book, event) => {
    currentLikes = book.users
    currentUsers = book.users.map(user => user.username)
    if (currentUsers.includes(user.username)){
        currentLikes.pop()
        patchBook(book, currentLikes)
    } else {
        currentLikes.push(user)
        patchBook(book, currentLikes)
    }
}



const linkToBook = (book) => {
    showPage.innerHTML = ""
    let bookImage = document.createElement("img")
    bookImage.src = book.img_url
    let bookP = document.createElement("p")
    bookP.innerText = book.description
    let userUl = document.createElement("ul")
    book.users.forEach(user => {
        let userLi = document.createElement("li")
        userLi.innerText = user.username
        userUl.appendChild(userLi)
    })
    let likeButton = document.createElement("button")
    likeButton.innerText = "Like Book"
    likeButton.addEventListener("click", () => addLike(book, event))
    showPage.append(bookImage, likeButton, bookP, userUl)
}

const createBook = (book) => {
    let bookLine = document.createElement("li")
    bookLine.innerText = book.title
    bookLine.addEventListener("click", () => linkToBook(book))
    bookList.appendChild(bookLine)
}

const fetchBooks = () => {
    fetch(bookUrl)
    .then(res => res.json())
    .then(books => {
        for(const book of books){
        createBook(book)
    }
})
}

fetchBooks()