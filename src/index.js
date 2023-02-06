// ADD TOY DROPDOWN //
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// OUR CODE //

// get toy collection div that we want to append
const toyCollection = document.querySelector('#toy-collection')

fetch('http://localhost:3000/toys')
  .then( response => response.json() )
  .then( data => {
    data.forEach( toy => addToyElement(toy) )
  } )

function addToyElement(toy) {
  // create a new div that holds the toy info
  const toyDiv = document.createElement( 'div' )
  toyDiv.className = "card"
  // add information from json file to the div
  // create the elements we'll need
  const toyName = document.createElement( 'h2' )
  const toyImage = document.createElement( 'img' )
  const toyLikes = document.createElement( 'p' )
  const toyButton = document.createElement( 'button' )
  // set attributes for variables
  // toyName.setAttribute('textContent', "sup")
  toyName.textContent = toy.name
  toyImage.src = toy.image
  toyImage.className = "toy-avatar"
  toyLikes.textContent = `${toy.likes} Likes`
  toyButton.className = "like-btn"
  toyButton.id = toy.id
  // append the things
  toyDiv.append(toyName, toyImage, toyLikes, toyButton)
  toyCollection.appendChild(toyDiv)
}

// FORM //

const form = document.querySelector(".add-toy-form")
// add event listener to the form
form.addEventListener('submit', event => {
  event.preventDefault()
  const newToyName =  document.getElementsByClassName("input-text")[0].value
  const newToyImage =  document.getElementsByClassName("input-text")[1].value

  const newToy = {
    name: newToyName,
    image: newToyImage,
    likes: 0
  }

  fetch('http://localhost:3000/toys', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToy)
  })
    .then( res => res.json() )
    .then( newToyData => addToyElement(newToyData) )

} )