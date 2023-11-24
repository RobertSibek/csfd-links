const recipeWebSource = "apetitOnline";

const classes = {
    buttonInjectSection: {
        apetitOnline: ".s-recipe__ingredients-items"
    },
    ingredientsSection: {
        apetitOnline: ".s-recipe__ingredients"
    },
    ingredientName: {
        apetitOnline: ".s-recipe__ingredients-name"
    },
    ingredientQuantity: {
        apetitOnline: ".s-recipe__ingredients-quantity"
    },
    ingredientUnit: {
        apetitOnline: ".s-recipe__ingredients-unit"
    },
    ingredientsItems: {
        apetitOnline: ".s-recipe__ingredients-item:not(.s-recipe__ingredients-item--subtitle)"
    }
}

const ingredients = document.querySelector(classes.ingredientsSection[recipeWebSource]);
let iItems = [];

function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

const changeURL = (order_json) => {
    chrome.storage.sync.get(["key"]).then((result) => {
        let clicknbuy_provider = result.key;
        switch (clicknbuy_provider) {
            case "rohlik":
                provider_url = "https://rohlik.cz?addToCart=";
                break;
            case "kosik":
                provider_url = "https://kosik.cz?addToCart=";
                break;
            case "albert":
                provider_url = "https://albert.cz?addToCart=";
                break;
            case "tesco":
                provider_url = "https://itesco.cz?addToCart=";
                break;
            default:
                provider_url = null;
                break;
        }

        if (provider_url) {
            window.open(provider_url + order_json, '_blank');
        } else {
            console.log("Click&Buy provider not defined.");
        }
    });
}

if (ingredients) {
    const items = ingredients.querySelectorAll(classes.ingredientsItems[recipeWebSource]);
    items.forEach((i) => {
        const ingredient = {
            name: i.querySelector(classes.ingredientName[recipeWebSource]) ? i.querySelector(classes.ingredientName[recipeWebSource]).innerText : "",
            amount: i.querySelector(classes.ingredientQuantity[recipeWebSource]) ? i.querySelector(classes.ingredientQuantity[recipeWebSource]).innerText : "",
            unit: i.querySelector(classes.ingredientUnit[recipeWebSource]) ? i.querySelector(classes.ingredientUnit[recipeWebSource]).innerText : "",
        }
        iItems.push(ingredient);
    })
    const json = JSON.stringify(iItems);
    const encodedJSON = bytesToBase64(new TextEncoder().encode(json));
    const button = document.createElement("button");
    button.classList.add("buttonStyle")
    button.style.backgroundColor = "#FF653F";
    button.style.borderColor = "#FFF6D5";
    button.style.color = "#FFF6D5";
    button.style.borderRadius = "10px";
    button.style.margin = "10px";
    button.style.padding = "10px";
    button.innerText = "Click&Buy";
    button.onclick = () => changeURL(encodedJSON);
    const ingredientsList = ingredients.querySelector(classes.buttonInjectSection[recipeWebSource]);
    ingredientsList.insertAdjacentElement("afterend", button);
}

