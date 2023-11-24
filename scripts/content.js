const ingredients = document.querySelector(".s-recipe__ingredients");
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
    let clicknbuy_provider = "";
    chrome.storage.sync.get(["key"]).then((result) => {
        clicknbuy_provider = result.key;
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
    const items = ingredients.querySelectorAll(".s-recipe__ingredients-item:not(.s-recipe__ingredients-item--subtitle)");
    items.forEach((i) => {
        const ingredient = {
            name: i.querySelector(".s-recipe__ingredients-name") ? i.querySelector(".s-recipe__ingredients-name").innerText : "",
            amount: i.querySelector(".s-recipe__ingredients-quantity") ? i.querySelector(".s-recipe__ingredients-quantity").innerText : "",
            unit: i.querySelector(".s-recipe__ingredients-unit") ? i.querySelector(".s-recipe__ingredients-unit").innerText : "",
        }
        iItems.push(ingredient);
    })
    const json = JSON.stringify(iItems);
    const encodedJSON = bytesToBase64(new TextEncoder().encode(json));
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    const da = new Date();
    badge.textContent = `⏱️ ${da} min read`;
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
    const ingredientsList = ingredients.querySelector(".s-recipe__ingredients-items");
    ingredientsList.insertAdjacentElement("afterend", button);
}

