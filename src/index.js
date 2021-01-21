//Globals & Calls
const dogURL = "http://localhost:3000/pups"


fetchAllDogs();

//Data

function fetchAllDogs(){
  fetch(dogURL)
  .then(res => res.json())
  .then(dogs => dogs.forEach(dog => populateDogBar(dog)))
}

function toggleGoodDog(dog){
  let isGoodEle = document.getElementById("dog-info").querySelector('button')
  let goodOrBad = isGoodEle.textContent.split(" ")[0]
  let isGood = ""

  if (goodOrBad === "Good") {
    isGood = false
  } else {
    isGood = true
  }

  fetch(dogURL + `/${dog.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog : isGood
    })
    })
    .then(res => res.json())
    .then(dog => showDog(dog))
    .catch(error => console.log(error.message))
}

//DOM
function populateDogBar(dog){
  const dogBar = document.getElementById("dog-bar")
  let span = document.createElement('span')
  span.textContent = dog.name

  span.addEventListener("click", () => showDog(dog))
 
  dogBar.appendChild(span)
}

function showDog(dog){
  const dogDiv = document.getElementById("dog-info")

  let image = document.createElement('img')
  let name = document.createElement('h2')
  let goodBtn = document.createElement('button')

  image.src = dog.image
  name.textContent = dog.name
  
  if (dog.isGoodDog == true) {
    goodBtn.textContent = "Good Dog!"
  } else {
    goodBtn.textContent = "Bad Dog!"
  }

  goodBtn.addEventListener("click", () => toggleGoodDog(dog))

  dogDiv.innerHTML = ""
  dogDiv.append(image, name, goodBtn)
}
