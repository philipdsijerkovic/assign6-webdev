"use strict";

(function () {

    window.addEventListener("load", init);

    function init() {
        let deleteButton = qs("button.delete-joke");
        if (deleteButton) {
            deleteButton.addEventListener("click", function (e) {
                deleteJoke(e.currentTarget.getAttribute("id"));
            });
        }
    }

    function deleteJoke(jokeId) {
        console.log("Deleting joke with ID:", jokeId);
        fetch("/jokes/delete/" + jokeId, {
            method: "DELETE"
        })
            .then(checkStatus)
            .then(() => {
                location.replace("/jokebook/all"); 
            })
            .catch(alert);
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

    function qs(cssSelector) {
        return document.querySelector(cssSelector);
    }
})();