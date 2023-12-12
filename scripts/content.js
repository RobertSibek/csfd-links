const host = window.location.host;

const vods = {
    hbomax: "play.hbomax.com",
    netflix: "www.netflix.com",
    kviff: "kviff.tv"
}

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key =>
        object[key] === value);
}

const vodProvider = getKeyByValue(vods, host);
console.log('vodProvider', vodProvider);

const cssSelectors = {
    buttonInjectSection: {
        hbomax: ".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-1udbk01",
        netflix: ".fallback-text",
        kviff: ".row.section-film--row>div>h1"
    },
}
const checkClassElementExists = () => {
    const movieTitles = document.querySelectorAll(cssSelectors.buttonInjectSection[vodProvider]);

    if (movieTitles.length > 0) {
        clearInterval(clock);
        console.log("Element found!");
        executeScript(movieTitles);
    }
}

let clock = setInterval(checkClassElementExists, 300);

// var loaded = false;
// document.onreadystatechange = function () {
//     if (document.readyState == "complete" && !loaded) alert("Bad!");
// }
// window.onload = function () {
//     loaded = true;
// }

function executeScript(movieTitles) {

    const openURL = (movieTitle) => {
        // chrome.storage.sync.get(["key"]).then((result) => {
        //     let clicknbuy_provider = result.key;
        //     switch (clicknbuy_provider) {
        //         case "csfd":
        //             provider_url = "https://csfd.cz?addToCart=";
        //             break;
        //         case "kosik":
        //             provider_url = "https://kosik.cz?addToCart=";
        //             break;
        //         case "albert":
        //             provider_url = "https://albert.cz?addToCart=";
        //             break;
        //         case "tesco":
        //             provider_url = "https://itesco.cz?addToCart=";
        //             break;
        //         default:
        //             provider_url = null;
        //             break;
        //     }

        const provider_url = {
            csfd: "https://www.csfd.cz/hledat/?q=",
            imdb: "https://www.imdb.com/find/?q="
        }

        if (provider_url) {
            window.open(provider_url.csfd + movieTitle, '_blank');
        } else {
            console.log("Click&Buy provider not defined.");
        }
    }
    if (!movieTitles) {
        console.log("Movie page not found");
    } else {
        movieTitles.forEach((movie) => {
            console.log("title", movie.innerText);
            const button = document.createElement("button");
            button.classList.add("buttonStyle")
            button.style.backgroundColor = "#BA0305";
            button.style.borderColor = "#5A5A5A";
            button.style.color = "#FFFFFF";
            button.style.borderRadius = "10px";
            button.style.margin = "5px";
            button.style.alignSelf = "center";
            button.style.padding = "5px";
            button.style.width = "50px";
            // button.style.backgroundImage = "../images/logo-white-red.svg";
            button.innerText = "CSFD";
            // const movieTitle = movie.innerText;
            // button.onclick = () => openURL(movieTitle);
            // const movieDetails = moviePage.querySelector(classes.buttonInjectSection["hbomax"]);
            if (vodProvider === "hbomax") {
                const movieTitle = movie.innerText;
                button.onclick = () => openURL(movieTitle);
                movie.parentNode.parentNode.parentNode.parentNodeinsertAdjacentElement("afterend", button);
            } else if (vodProvider === "netflix") {
                const movieTitle = movie.innerText;
                console.log(movieTitle);
                button.onclick = () => openURL(movieTitle);
                movie.parentNode.parentNode.parentNode.insertAdjacentElement("afterend", button);
            } else if (vodProvider === "kviff") {
                button.style.fontSize = "12px";
                // text.replace(/blue/g, "red");
                const movieTitle = movie.innerText.replace(/#/g, "");
                console.log(movieTitle);
                button.onclick = () => openURL(movieTitle);
                movie.insertAdjacentElement("afterend", button);
            }
        });

    }
}
