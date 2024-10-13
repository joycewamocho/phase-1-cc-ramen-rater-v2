// index.js
let ramenCurrentId = null;
// Callbacks
const handleClick = (ramen) => {
  const placeHolder = document.getElementsByClassName("detail-image")[0]
  
  placeHolder.src =ramen.image

  const name = document.querySelector("#ramen-detail h2")
  const restaurant = document.querySelector("#ramen-detail h3")
  const ratings = document.getElementById("rating-display")
  const comment = document.getElementById("comment-display")
  name.textContent =ramen.name
  restaurant.textContent =ramen.restaurant
  ratings.textContent =ramen.rating
  comment.textContent = ramen.comment 

  ramenCurrentId = ramen.id;

};


const addSubmitListener = () => {
  const form = document.querySelector("#new-ramen")
  form.addEventListener("submit", (event)=>{
    event.preventDefault()
    const newRamen ={
      name:form["new-name"].value,
      restaurant:form["new-restaurant"].value,
      image:form["new-image"].value,
      rating:form["new-rating"].value,
      comment:form["new-comment"].value

      
    }

    fetch("http://localhost:3000/ramens",{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "Accept":"application/json",
      },
      body:JSON.stringify(newRamen)
    })
    .then((response)=> response.json())
    .then((data) =>{
      displayRamens(newRamen)
      form.reset()
    })
  })
}



const displayRamens = () => {
   fetch("http://localhost:3000/ramens")
  .then((response)=> response.json())
  .then((ramens) => {
    let div = document.getElementById("ramen-menu")
    div.innerHTML =" ";
    ramens.forEach((ramen,index) => {
      let img = document.createElement("img")
      img.src = ramen.image;
    img.addEventListener('click', () => handleClick(ramen));
    div.appendChild(img);

    if(index === 0){
      handleClick(ramen)
    }
  });
  })
  .catch((error)=>{
      console.error("cannot display ramens",error)
    })
};

const updateFeatureRamen =()=>{
const formEdit = document.getElementById("edit-ramen")

formEdit.addEventListener("submit",(e)=>{
  e.preventDefault();
  const editRamen ={
    rating:formEdit["new-rating"].value,
    comment:formEdit["new-comment"].value
  }

  fetch(`http://localhost:3000/ramens/${ramenCurrentId}`,{
    method:"PATCH",
    headers:{
      "content-type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify(editRamen)
  })
  .then((response) => response.json())
  .then((data) =>{
    displayRamens()
    formEdit.reset()

  })
})
}

const main = () => {
  document.addEventListener("DOMContentLoaded",()=>{
    displayRamens()
    addSubmitListener()
    updateFeatureRamen()
  })
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
