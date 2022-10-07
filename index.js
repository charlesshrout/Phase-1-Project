const strainImage = document.querySelector("#strain-image");
const strainName = document.querySelector("#strain-name");
const strainDescription = document.querySelector("#strain-description");
const strainPrice = document.querySelector("#strain-price");
const numberInCart = document.querySelector("#strain-in-cart");
const menu = document.getElementById("strain-items")
const strainLineage = document.getElementById("strain-description")
let currentStrain;
let localArray;

const fetchReq1 = fetch ("http://localhost:3000/data")
.then(res => res.json())
.then(strainArray => {
    strainArray.forEach(strain => {
        buildMenu(strain)
    })
    strainDetails(strainArray[0])
    setupCart()
})


function buildMenu(strain){
    currentStrain = strain 
    const span = document.createElement('span')
    span.addEventListener('click', () => 
    strainDetails(strain))
    span.textContent = strain.name
    menu.append(span)
}

function strainDetails(strain){
    strainName.textContent = strain.name
    strainLineage.textContent = strain.lineage
    strainImage.src = strain.image
    strainPrice.textContent = `$${(strain.price) + " per Oz"}`
}

function setupCart() {
    let addToCartForm = document.querySelector("#cart-form")
    addToCartForm.addEventListener('submit', (event) => {
        event.preventDefault();
        currentStrain.number_in_bag += parseInt(event.target["cart-amount"].value);
        numberInCart.textContent = currentStrain.number_in_bag
        addToCartForm.reset();
    });
}

const reset = function() {
    
        document.getElementById('strain-in-cart').innerHTML = 0;
        currentStrain.number_in_bag = 0;
}

const resetButton = document.querySelector("#clear");

resetButton.addEventListener("click", function() {
    reset();
})

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let apiStrains = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  apiStrains.forEach(weedStrain => {
    const isVisible =
      weedStrain.name.toLowerCase().includes(value) ||
      weedStrain.genetics.toLowerCase().includes(value)
      weedStrain.element.classList.toggle("hide", !isVisible)
  })
})

fetch("http://localhost:3000/data")
  .then(res => res.json())
  .then(data => {
    weedStrain = data.map(strainW => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = strainW.name
      body.textContent = strainW.genetics
      userCardContainer.append(card)
      return  `name: ${strainW.name}`, `genetics: ${strainW.genetics}`, `element: ${card}`})})