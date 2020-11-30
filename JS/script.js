$(document).ready(function() {

    let ingredientsArr = [];
    localStorage.setItem("ingredients-list", JSON.stringify(ingredientsArr));

    // Function to search for a recipe using the user input
    function searchRecipe(input) {
        let apiKey = "180a86cfb935bc89c556dfbb06e5ffda";
        let recipeURL = "https://edamam-recipe-search.p.rapidapi.com/search?q=" + input + "&rapidapi-key=" + apiKey;

        $.ajax({
            url: recipeURL,
            method: "GET"
        }).then(function(response) {
            // Switches to results page
            location.href = "./Pages/results.html";

            console.log(response);
            console.log(response.hits);

            // Set results to local storage
            localStorage.setItem("recipes-list", JSON.stringify(response.hits.splice(0, 10)));
        })
    };

    // Function for x buttons to delete ingredient items. //
    function deleteIngredient() {
        let clearIngred = JSON.parse(localStorage.getItem("ingredients-list") || []);
        let searchTitle = $(this).parent().attr("data-label");
        
        for (let i=0; i < clearIngred.length; i++) {
            if (searchTitle === clearIngred[i]) {
                clearIngred.splice(i, 1);
                localStorage.setItem("ingredients-list", JSON.stringify(clearIngred));
                console.log(clearIngred);
                console.log("Hello");
                $(this).parent().remove();  

            }
        }  
    };

    // Takes user input ingredient and puts it into an unordered list
    $("#add-button").on("click", function(event) {
        if ($("#form-input").val() === "") {
           $(".search").effect( "shake", {times:4}, 1000 );
        }

        else {
        let ingredientsArr = JSON.parse(localStorage.getItem("ingredients-list"));
        event.preventDefault() || [];
        
        let addedIngredient = $("#form-input").val();
        let ingredientListEl = $("#ingredient-list");
        let ingredientLiEl = $("<li>").text(addedIngredient);
        ingredientLiEl.attr("data-label",addedIngredient);
        // Adds an x to the li and delete function
        let spanEl = $("<span>").text("x");
        spanEl.addClass("close");
        spanEl.on("click", deleteIngredient);
        ingredientLiEl.append(spanEl);

        ingredientListEl.append(ingredientLiEl);

        // Will push each ingredient into the ingredientsArr
        ingredientsArr.push(addedIngredient);
        // Will set ingredientsArr (the user's list) into localstorage
        localStorage.setItem("ingredients-list", JSON.stringify(ingredientsArr));

        console.log(ingredientsArr);

        // Clears search bar 
        $("#form-input").val("");
        }

    });

    $(".switch-input").on("change", function(event) {

        let ingredientsArr = JSON.parse(localStorage.getItem("ingredients-list")) || [];
        // Will show true or false
        let userChoice = $(this)[0].checked;
        console.log(userChoice);

        // Takes the id of the switch
        let dietaryChoice = $(this).attr("id");
        console.log(dietaryChoice);

        // If user chooses Yes
        if (userChoice) {
            console.log("yes");

            // // Adds id to the ingredientsArr
            ingredientsArr.push(dietaryChoice);

            // // Will set ingredientsArr (the user's list) into localstorage
            localStorage.setItem("ingredients-list", JSON.stringify(ingredientsArr));

            console.log(ingredientsArr);

        // If user chooses No
        } else {
            console.log("no");

            // Takes the array out of local storage
            let clearIngred = JSON.parse(localStorage.getItem("ingredients-list") || []);
            
            // Looks for the id of the switch and removes and resets local storage
            for (let i=0; i < clearIngred.length; i++) {
                if (dietaryChoice === clearIngred[i]) {
                    clearIngred.splice(i,1);
                    localStorage.setItem("ingredients-list", JSON.stringify(clearIngred));
                    console.log(clearIngred);
                    console.log("Hello");
                }
            }  
        }
    });
   
    // on click to take ingredient list set to local storage than pull that out to run in the searchRecipe function?
    $("#search-button").on("click", function() {
        let ingredientSearch = localStorage.getItem("ingredients-list");
        console.log(ingredientSearch);

        // Run searchRecipe function for items in ingredients list
        searchRecipe(ingredientSearch);

    });

    // On click to find random "taco tuesday" recipe using the searchRecipe function
    $("#taco-button").on("click", function(){
        let tacoArr = ["tacos", "quesadilla", "enchilada", "tostada", "horchata", "huevos rancheros", "churros", "tamales", "mole", "barbacoa", "carnitas", "poblano", "fajitas", "burritos", "nachos", "taquito"];
        let randomTacoIndex = tacoArr[Math.floor(Math.random()*tacoArr.length)];
        tacoArr[randomTacoIndex];
        searchRecipe(randomTacoIndex);
        
        console.log(randomTacoIndex);
    });

    // On click to find random recipe using the searchRecipe function
    $("#dice-button").on("click", function() {
        let ranArr = ["chicken", "pork", "potatoes", "asparagus", "beef", "shrimp", "seafood", "pasta", "fruit", "vegetables", "fish", "apples", "rice", "vegetarian", "vegan", "greens", "eggs"];
        let randomIndex = ranArr[Math.floor(Math.random()*ranArr.length)];
        ranArr[randomIndex];
        searchRecipe(randomIndex);
        
        console.log(randomIndex);
    });
})