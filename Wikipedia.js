let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearchResults(results) {
    let {
        link,
        title,
        description
    } = results;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link_description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let results of searchResults) {
        createAndAppendSearchResults(results);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.remove("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        console.log(searchInput)
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);