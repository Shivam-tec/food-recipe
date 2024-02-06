const searchBox=document.querySelector('#searchbar');
const searchBtn=document.querySelector('#searchbtn'); 
const main = document.querySelector('.main'); 
const recipeDetails = document.querySelector('.recipe-details-content');
const recipeClose = document.querySelector('.recipe-closebtn');


const fetchIngredents=(element)=>{
      let ingredentsList="";
      for(let i=1;i<=20;i++){
        const ingredents=element[`strIngredient${i}`];
        if(ingredents){
          const measure=element[`strMeasure${i}`];
          ingredentsList+=`<li>${measure} ${ingredents} </li>`
        }
        else{
          break;
        }
  }
 return ingredentsList;
     
}
const openRecipePopup=(element) => {
 
  recipeDetails.innerHTML = `
  <h2 class="recipeName">${element.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredentList">${fetchIngredents(element)}</ul>
  <div class="recipeInstruction">
  <h3>Instructions:</h3>
  <p>${element.strInstructions}</p>
  </div>
  `
  recipeDetails.parentElement.style.display = "block";
 
  
} 

const fetchData= async (query)=>{
 
  try {
    main.innerHTML="<h2>Fetching Recipes....</h2>";
   const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response =  await data.json();
  main.innerHTML="";
 response.meals.forEach(element => {
    const reciepeDiv=document.createElement('div');
    reciepeDiv.classList.add('box');
    reciepeDiv.innerHTML=`
    <img src="${element.strMealThumb}" alt="" srcset="">
    <h1>${element.strMeal}</h1>
    <p>${element.strArea}<span> Dish</span></p>
    <p>${element.strCategory}<span> Category</span></p>
    `
    const Button=document.createElement('button')
    Button.classList.add('view');
    Button.innerHTML="View Recipe";
   reciepeDiv.appendChild(Button);
   Button.addEventListener('click', () => {
    
     openRecipePopup(element);
   })
      main.appendChild(reciepeDiv);
 });
 }
 catch(error){
  main.innerHTML="<h2>Result Not Found!</h2>";
 }
 
}


searchBtn.addEventListener('click',(e)=>{
  e.preventDefault();
const inputValue=searchBox.value.trim();
if(!inputValue){
  main.innerHTML="<h2>Please! Enter Your Meal</h2>";
  return;
}
fetchData(inputValue);
})
recipeClose.addEventListener('click',()=>{
  recipeDetails.parentElement.style.display = "none";
})
