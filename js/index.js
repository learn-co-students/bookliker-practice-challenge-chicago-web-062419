
document.addEventListener("DOMContentLoaded", function() {
  return fetch("http://localhost:3000/books")
  .then(res => res.json()).then( books => {
    books.forEach ( el => {
      const ul = document.getElementById('list');
      let li = document.createElement('li');
      ul.appendChild(li);
      let l = document.createElement('a');
      li.appendChild(l);
      var linkText = document.createTextNode(el['title']);
      l.appendChild(linkText);
      l.style.color = "blue"
      l.style.fontSize = '18px'
      li.addEventListener('click', function() {
        let info = document.getElementById('show-panel')
        info.innerHTML = ''
        getBook(el)
      })
    })
  })
});


function getBook (item) {
  const a = document.createElement('h2')
  const b = document.createElement('img')
  const c = document.createElement('ul')
  const e = document.createElement('p')
  const but = document.createElement('button')
  const book = document.getElementById('show-panel')
  a.innerText = item['title']
  b.src = item['img_url']
  e.innerText = item['description']
  but.innerText = 'Like'
  book.appendChild(a)
  book.appendChild(e)
  book.appendChild(b)
  book.appendChild(c)
  book.appendChild(but)
  
  item['users'].forEach(user => {
    const d = document.createElement('li')
      d.innerText = user['username']
      c.appendChild(d)
  })


  but.addEventListener('click', () => { likeBook(item)});
}

function likeBook(elem) {
 

  let users = elem.users 
  users.push({
    "id": 1,
    "username": "pouros"
  })

    return fetch(`http://localhost:3000/books/${elem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "users": users
      })
    })
    .then(resp => resp.json())
    .then( book => {
      let info = document.getElementById('show-panel')
      info.innerHTML = ''
      getBook(book)
    })
}
