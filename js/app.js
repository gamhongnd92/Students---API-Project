function updateAlert(text, className) {
    alertDiv = document.createElement("div");
    alertDiv.classList.add(className);
    alertText = document.createTextNode(text);

    // attach the text node to the alert div
    alertDiv.appendChild(alertText);

    // attach the alert div to the content div
    galleryDiv = document.getElementById("gallery").prepend(alertDiv);
}


let url = "https://randomuser.me/api/?page=1&results=12#"
fetch(url)
    .then(response => {
        console.log(response)
        if (response.ok) {
            updateAlert("Great success!", "alert-warning");
        } else {
            updateAlert("There was a problem fetching the data", "alert-warning");
        }
        return response.json()
    })
    .then(data => printUsers(data.results))
    .catch(err => updateAlert("An error has occurred: " + err, "alert-danger"))

var galleryDiv = "";
var modalContainer = "";

function printUsers(userData) {
    galleryDiv = document.getElementById("gallery");


    // go through each user
    for (var i = 0; i < userData.length; i++) {
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        var card_img_container = document.createElement("div");
        card_img_container.classList.add("card-img-container");
        cardDiv.appendChild(card_img_container);


        var image = document.createElement("img");
        image.classList.add("card-img");
        image.setAttribute("src", userData[i].picture.large);
        card_img_container.appendChild(image);

        var card_info_container = document.createElement("div");
        card_info_container.classList.add("card-info-container");
        var h3Name = document.createElement("h3");
        h3Name.classList.add("card-name");
        h3NameText = document.createTextNode(userData[i].name.first + " " + userData[i].name.last);
        h3Name.appendChild(h3NameText);
        card_info_container.appendChild(h3Name);


        var pEmail = document.createElement("p");
        pEmail.classList.add("card-text");
        pEmailText = document.createTextNode(userData[i].email);

        pEmail.appendChild(pEmailText);
        card_info_container.appendChild(pEmail);


        var pLocation = document.createElement("p");
        pLocation.classList.add("card-text-location");
        pLocationText = document.createTextNode(userData[i].location.city + ", " + userData[i].location.state);

        pLocation.appendChild(pLocationText);
        card_info_container.appendChild(pLocation);


        cardDiv.appendChild(card_info_container);

        galleryDiv.appendChild(cardDiv);

    }

    // create modal on click of employee card
    modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    for (var i = 0; i < cards.length; i++) {
        const currentCard = (card[i].closest('.card'))
        cards[i].addEventListener('click', () => {
            modalContainer.style.display = 'block';
            // var usersArray = Array.from(cards);
            display(currentCard);
        })
    }

}

function display(card) {

    var cardImage = card.querySelector('.card-img').src;
    var cardName = card.querySelector('.card-name').textContent;
    var cardEmail = card.querySelector('.card-text').textContent;
    var cardLocation = card.querySelector('.card-text-location').textContent;

    var modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${cardImage}" alt="profile picture">
                    <h3 id="name" class="modal-name">${cardName}</h3>
                    <p class="modal-text">${cardEmail}</p>
                    <p class="modal-text">${cardLocation}</p>
                </div>
            </div>
        </div>
    `;

    modalContainer.innerHTML = modalHTML;
    galleryDiv.parentNode.insertBefore(modalContainer, galleryDiv);


    // close modal on click 'X' close button
    var modalClose = document.getElementById("modal-close-btn");
    modalClose.addEventListener('click', () => {
        modalContainer.style.display = "none";
    })

}