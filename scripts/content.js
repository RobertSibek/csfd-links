console.log("In the script");


setTimeout(executeScript, 4000);

// var loaded = false;
// document.onreadystatechange = function () {
//     if (document.readyState == "complete" && !loaded) alert("Bad!");
// }
// window.onload = function () {
//     loaded = true;
// }

function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
        object[key] === value);
}

function executeScript() {
    const host = window.location.host;

    const vods = {
        hbomax: "play.hbomax.com",
        netflix: "www.netflix.com"
    }

    const VODwebSource = getKeyByValue(vods, host);

    const classes = {
        buttonInjectSection: {
            // hbomax: ".css-1rynq56.r-knv0ih"
            hbomax: ".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-1udbk01",
            netflix: "previewModal--player-titleTreatment-logo"
            // hbomax: "css-175oi2r.r-1loqt21.r-1otgn73"
        },
    }
    const moviePage = document.querySelectorAll(classes.buttonInjectSection["netflix"]);
    console.log('moviePage', moviePage);

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

    if (!moviePage) {
        console.log("Movie page not found");
    } else {
        console.log("Movie page found", moviePage);

        moviePage.forEach((movie) => {
            console.log("title", movie.innerText);
            const button = document.createElement("button");
            button.classList.add("buttonStyle")
            button.style.backgroundColor = "#BA0305";
            button.style.borderColor = "#5A5A5A";
            button.style.color = "#FFFFFF";
            button.style.borderRadius = "10px";
            button.style.margin = "1px";
            button.style.padding = "1px";
            button.innerText = "CSFD";
            // const movieTitle = movie.innerText;
            // button.onclick = () => openURL(movieTitle);
            // const movieDetails = moviePage.querySelector(classes.buttonInjectSection["hbomax"]);
            if (VODwebSource === vods.hbomax) {
                const movieTitle = movie.innerText;
                button.onclick = () => openURL(movieTitle);
                movie.parentNode.parentNode.insertAdjacentElement("afterend", button);
            } else if (VODwebSource === vods.netflix) {
                const movieTitle = movie.title;
                button.onclick = () => openURL(movieTitle);
                movie.insertAdjacentElement("afterend", button);
            }
        });

    }
}

// });