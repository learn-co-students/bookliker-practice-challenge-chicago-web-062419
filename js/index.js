const list = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
const myuser = {
    id:1,
    username:"pouros"
    }
const createList = ()=>{
    fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then(books => {
            books.forEach(book => {
                let li = document.createElement("li")
                li.innerHTML = book.title
                li.addEventListener("click", () => {showBook(book)})
                list.appendChild(li)
            })
        })
}

createList()

//create the show for each book
const showBook = (book)=>{
    showPanel.innerHTML = ""
    let usersArray = book.users
    let h2 = document.createElement("h2")
    let img = document.createElement("img")
    let p = document.createElement("p")
    let ul = document.createElement("ul")
    let readButton = document.createElement("button")

    h2.innerHTML = book.title
    img.src = book.img_url
    p.innerHTML = book.description
    readButton.innerHTML = "Read Book"
    readButton.addEventListener("click", ()=> {
        let checknames = usersArray.map(user => user.username)
        if(!checknames.includes(myuser.username)){
            usersArray.push(myuser)
            fetch(`http://localhost:3000/books/${book.id}`,{
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({'users': usersArray})
            })
            .then(res => res.json())
            .then(book => {
                let li = document.createElement("li")
                let userslength = book.users.length
                li.innerHTML = book['users'][userslength - 1].username
                ul.appendChild(li)
            })
        } else {
            usersArray.pop()
            fetch(`http://localhost:3000/books/${book.id}`,{
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({'users': usersArray})
            })
            .then(res => res.json())
            .then(book => {
                showBook(book)
            })
        }
    })


    showPanel.append(h2, img, p, ul)
    usersArray.forEach(user => {
        let li = document.createElement("li")
        li.innerHTML = user.username
        ul.appendChild(li)
    })
    showPanel.appendChild(readButton)
}