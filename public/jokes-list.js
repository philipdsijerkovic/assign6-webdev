"use strict";
(function () {

    window.addEventListener("load", init);

    function init() {
        let newButton = id("new-joke-btn");
        newButton.addEventListener("click", function () {
            id("form-popup").style.display = "block";
        });

        let saveButton = id("save-joke");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        let closeButton = id("cancel-btn");
        closeButton.addEventListener("click", function () {
            id("form-container").reset();
            id("form-popup").style.display = "none";
        });

        let deleteButtons = qsa(".delete-joke");
        for (let button of deleteButtons) {
            button.addEventListener("click", function (e) {
                let jokeId = e.currentTarget.getAttribute("id");
                deleteJoke(jokeId);
            });
        }
    }

    function submitForm() {
        let params = new FormData(id("form-container")); 
        let jsonBody = JSON.stringify(Object.fromEntries(params));
        fetch("/joke/add", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(checkStatus)
            .then(reload)
            .catch(alert);
    }

    function reload() {
        location.reload();
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    function id(idName) {
        return document.getElementById(idName);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Example function for loading jokes dynamically (if needed).
     */
    function loadJokes() {
        let jokesDiv = id("items-container");
        fetch("/jokes/all")
            .then(checkStatus)
            .then((response) => response.json())
            .then((jokes) => {
                for (const joke of jokes) {
                    addJoke(jokesDiv, joke);
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    function addJoke(jokesDiv, jokeObject) {
        let article = document.createElement("article");
        let itemDiv = document.createElement("div");

        let heading = document.createElement("h3");
        heading.appendChild(document.createTextNode(jokeObject.id + ": " + jokeObject.setup));

        let delivery = document.createElement("p");
        delivery.appendChild(document.createTextNode("Delivery: " + jokeObject.delivery));

        let category = document.createElement("p");
        category.appendChild(document.createTextNode("Category: "));

        let categoryLink = document.createElement("a");
        categoryLink.href = "/jokebook/categories/" + jokeObject.category_id;
        categoryLink.textContent = jokeObject.category;

        let jokeDetailsLink = document.createElement("a");
        jokeDetailsLink.href = "/jokebook/joke/" + jokeObject.id;
        jokeDetailsLink.textContent = "View Details";

        category.appendChild(categoryLink);

        itemDiv.appendChild(heading);
        itemDiv.appendChild(delivery);
        itemDiv.appendChild(category);
        itemDiv.appendChild(jokeDetailsLink);

        itemDiv.classList.add("text");
        article.classList.add("item");

        article.appendChild(itemDiv);
        jokesDiv.appendChild(article);
    }
})();