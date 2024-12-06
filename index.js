const pageDisplay = document.querySelector("body");
const recipeInput = document.getElementById("recipeInput");
const findBtn = document.getElementById("findBtn");
const listOfRecipesDisplay = document.getElementById("listOfRecipesDisplay");
const recipeDisplay = document.getElementById("recipeDisplay");

toggleVisibility(listOfRecipesDisplay, false);
toggleVisibility(recipeDisplay, false);
toggleVisibility(pageHeader, true);
pageDisplay.classList.add("backgroundImages");


findBtn.addEventListener("click", async () => {
    recipeDisplay.innerHTML = "";

    const ingredients = recipeInput.value;

    try{

        if (!ingredients){

            throw new Error("You need to type at least one ingredient!");

        }

        const listOfRecipes = await getRecipes(ingredients);

        if(!listOfRecipes.length){
    
            throw new Error("You've probably typed a non-existing ingredient. Please try again!");

        }

        displayListOfRecipes(listOfRecipes);

    } 
    
    catch(error){
        createElement("h1", {textContent: error}, recipeDisplay);
        toggleVisibility(recipeDisplay, true);
    }
});


document.addEventListener("click", event => {
    const link = event.target;
  
    if (link.classList.contains("recipe-link")) {
        const recipeId = link.dataset.id; 
        showRecipeDescription(recipeId); 
    }
});


async function fetchData(apiUrl){

    try{

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Something is wrong... The service is temporarily down. Please, try again later!");
        }

        return await response.json();

    } catch (error) {

        console.error(error);
        throw error;

    }
}


async function getRecipes(ingredients){

    const apiUrl = `https://recipes-finder-backend.onrender.com/recipes?ingredients=${ingredients}`;

    const fetchedData = fetchData(apiUrl);

    return fetchedData;
}


function displayListOfRecipes(listOfRecipes){

    listOfRecipesDisplay.innerHTML = "";

    const recipeIds = [];

    listOfRecipes.forEach(({ id, title }) => {
        recipeIds.push(id);

        const recipe = createElement("a", {innerHTML: title, href: "#", classList: "recipe-link"}, listOfRecipesDisplay);
        recipe.dataset.id = id;
    });

    toggleVisibility(listOfRecipesDisplay, true);

    pageDisplay.classList.remove("backgroundImages");
    pageDisplay.classList.add("backgroundImage");

    const pageTitle = document.getElementById("pageTitle");
    const pageDescription = document.getElementById("pageDescription");
    toggleVisibility(pageTitle, false);
    toggleVisibility(pageDescription, false);
}


async function showRecipeDescription(recipeId){

    toggleVisibility(listOfRecipesDisplay, false);
    toggleVisibility(pageHeader, false);
    toggleVisibility(recipeDisplay, true);

    recipeDisplay.innerHTML = "";

    const apiUrl = `https://recipes-finder-backend.onrender.com/recipe/${recipeId}`;
    const data = await fetchData(apiUrl);

    const {title, extendedIngredients: ingredients, instructions, image, sourceUrl} = data;


    createElement("h1", {textContent: title}, recipeDisplay);

    const recipeHeader = createElement("div", {id: "recipeHeader"}, recipeDisplay);

    const ingredientsContainer = createElement("div", {id: "ingredientsContainer"}, recipeHeader);
    createElement("h3", {textContent: "List of Ingredients"}, ingredientsContainer);

    const listOfIngredients = createElement("ul", {className: "ingredientsList"}, ingredientsContainer)
    ingredients.forEach(({original}) => {
        createElement("li", {textContent: original}, listOfIngredients)
    });

    const recipeImageContainer = createElement("div", {id: "recipeImageContainer"}, recipeHeader);
    createElement("img", {src: image, className: "recipeImage"}, recipeImageContainer);
    
    const instructionsContainer = createElement("div", {id: "instructionsContainer"}, recipeDisplay);
    createElement("h3", {textContent: "Instructions"}, instructionsContainer)
    createElement("p", {innerHTML: instructions}, instructionsContainer);

    createElement("a", {textContent: "Source", href: sourceUrl}, recipeDisplay);

    const returnBtn = createElement("button", {id: "returnBtn", textContent: "Return"});
    pageDisplay.prepend(returnBtn);
    returnBtn.addEventListener("click", async () => {
        toggleVisibility(listOfRecipesDisplay, true);
        toggleVisibility(pageHeader, true);
        toggleVisibility(recipeDisplay, false);
        returnBtn.remove();
    });
}


function createElement(tag, options = {}, parent = null){

    const element = document.createElement(tag);
    Object.assign(element, options);

    if (parent) parent.appendChild(element);

    return element;
}


function toggleVisibility(element, isVisible) {
    element.classList.toggle("visible", isVisible);
    element.classList.toggle("notVisible", !isVisible);
}
