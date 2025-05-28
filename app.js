import {Collection, cardForm, newCollectionForm, renderMissingCollections, printCopyMessage} from "./render/render.js";
import {CardsData, CollectionData, CollectionManager} from "./model/collections.js"
import SoundManager from "./sound/sound.js"

// Index initialisation
const dataManager = new CollectionManager();
const soundManager = new SoundManager();

// add listeners to buttons toggling sound and animations
const toggleSoundButton = document.getElementById("soundToggle");
toggleSoundButton.addEventListener("click", ()=>{
    soundManager.toggleSound();
    if(soundManager.getSoundActive()){
        toggleSoundButton.innerText = "Turn sound off";
    } else{
        toggleSoundButton.innerText = "Turn sound on";
    }
});
const toggleAnimationButton = document.getElementById("animationToggle");
toggleAnimationButton.addEventListener("click", ()=>{
    const textSvgs = document.querySelectorAll(".svgText");
    const cardLogos = document.querySelectorAll(".cardLogo");
    textSvgs.forEach(element => {
        element.classList.toggle("animation");
    })
    cardLogos.forEach(element => {
        element.classList.toggle("animation");
    })
    toggleAnimationButton.innerText = toggleAnimationButton.innerText === "Turn animation off" ?
        "Turn animation on" : "Turn animation off";
    
});

const body = document.querySelector("body");
const addCollection = document.getElementById("addCollectionButton");
addCollection.addEventListener('click', ()=>{
    const form = newCollectionForm(clearFormView, validateCollectionForm);
    body.append(form);
    document.querySelector("input").focus();
})
refreshSidebar();

// Study view

    // Opens study view of a collection user selected
function openStudyView(e){
    e.stopPropagation();
    clearMain();
    // finds title of collection user wants to open and renders it
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    refreshStudyView();
    //push to history
    history.pushState({"collection": title, "mode": "study"}, "", `?collection=${title}&mode=study`);
}

    // renders a study page of current card
function refreshStudyView(){
    clearMain();
    const collection = dataManager.currentCollection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderStudyView(collection, nextCard, previousCard, turnOver));
}

    // renders a study page of next card in collection
function nextCard(){
    soundManager.nextCardSound();
    dataManager.currentCollection.getNext();
    refreshStudyView();
}

    // renders a study page of previous card in collection
function previousCard(){
    soundManager.prevCardSound();
    dataManager.currentCollection.getPrevious();
    refreshStudyView();
}

    // turns over a card in study view
function turnOver(e){
    soundManager.turnOverSound();
    const parentSection = e.target.closest("section");
    const card = parentSection.querySelector("#card");
    card.classList.toggle("flipped");
}

// Edit view
    // Refresh edit view after each change
function refreshEditView(){
    const main = document.querySelector("main");
    const currentCollection = dataManager.currentCollection;
    main.append(new Collection(currentCollection.name).renderEditView(removeCardFromCollection, editCard, openCardForm, dragCard, currentCollection));
}

    // Removes selected card from current collection
function removeCardFromCollection(e){
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const currentCollection = dataManager.currentCollection;
    currentCollection.removeCard(title);

    dataManager.refreshLocalStorage();
    clearMain();
    refreshEditView();
}

    // Renders a form based on which card user wants to edit
function editCard(e){
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const cardData = dataManager.currentCollection.getCard(title);
    dataManager.currentCard = cardData;
    const form = cardForm(clearFormView, sendEditCardForm, soundManager, cardData);
    body.append(form);
    document.querySelector("input").focus();
}

// Forms

function clearFormView(){
    const background = document.getElementById("darkerBackground");
    background.remove();
}

function validateCollectionForm(e){
    e.preventDefault();
    const name = e.target[0].value;
    const errorMessageNullInput = e.currentTarget.querySelector(".errorMessageNullInput");
    const errorMessage = e.currentTarget.querySelector(".errorMessageTitle");
    errorMessage.classList.add("hidden");
    if(name.length === 0){
        errorMessageNullInput.classList.remove("hidden");
        return;
    } else{
        errorMessageNullInput.classList.add("hidden");
    }
    const collection = new CollectionData(name);
    if(dataManager.addCollection(collection)){
        clearFormView();
        refreshSidebar();
    } else{
        errorMessage.classList.remove("hidden");
    };
}

function openCardForm(){
    const body = document.querySelector("body");
    body.append(cardForm(clearFormView, sendNewCard, soundManager));
    document.querySelector("input").focus();
}

function sendNewCard(e){
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[1].value;
    const card = new CardsData(title, text, soundManager.lastRecorderAudio);
    const currentCollection = dataManager.currentCollection;

    //check for empty inputs
    const errorMessageNullInput = e.currentTarget.querySelector(".errorMessageNullInput");
    const errorMessage = e.currentTarget.querySelector(".errorMessageTitle");
    errorMessage.classList.add("hidden");
    if(title.length === 0 || text.length === 0){
        errorMessageNullInput.classList.remove("hidden");
        return;
    } else{
        errorMessageNullInput.classList.add("hidden");
    }
    // Check for non unique title
    if(currentCollection.addCard(card)){
        dataManager.refreshLocalStorage();
        clearFormView();
        clearMain();
        refreshEditView();
    } else{
        errorMessage.classList.remove("hidden");
    };
}

function sendEditCardForm(e){
    e.preventDefault();
    // get both title and text
    const title = e.target[0].value;
    const text = e.target[1].value;
    
    // select both hidden error messages
    const errorMessageNullInput = e.currentTarget.querySelector(".errorMessageNullInput");
    const errorMessage = e.currentTarget.querySelector(".errorMessageTitle");
    errorMessage.classList.add("hidden");
    //validate if both title and text are not empty
    if(title.length === 0 || text.length === 0){
        errorMessageNullInput.classList.remove("hidden");
        return;
    } else{
        errorMessageNullInput.classList.add("hidden");
    }
    // check if a card with the same title doesnt exist in the collection
    if(dataManager.setCurrentCard(title, text)){
        dataManager.refreshLocalStorage();
        clearFormView();
        clearMain();
        refreshEditView();
    } else{
        errorMessage.classList.remove("hidden");
    };
}

// Aside
    // Delete collection from dataManager
function deleteCollection(e){
    e.stopPropagation();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    dataManager.removeCollection(title);
    refreshSidebar();  
    clearMain();
}

// Opens edit view based on collection user selected
function openEditView(e){
    e.stopPropagation();
    clearMain();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderEditView(removeCardFromCollection, editCard, openCardForm, dragCard, collection));
    // push to history
    history.pushState({"collection": collection.name, "mode": "edit"}, "", `?collection=${collection.name}&mode=edit`);
}


// updating dom
    // refreshes aside after each change
function refreshSidebar(){
    clearSidebar()
    const aside = document.querySelector("aside");
    // check if there are collections to render, else render a missing collection warning
    const collections = dataManager.collections;
    if(collections.length !== 0){
        collections.forEach(collection => {
            const collectionArticle = new Collection(collection.name);
            aside.append(collectionArticle.renderAsideCollections(deleteCollection, openEditView, openStudyView, dropCard));
        })
    } else{
        aside.append(renderMissingCollections());
    }
}

// Clears sidebar before the sidebar is rendered after each change
function clearSidebar(){
    const aside = document.querySelector("aside");
    const oldAlert = aside.querySelector("p");
    if(oldAlert){
        oldAlert.remove();
    }

    const articles = aside.querySelectorAll("article");
    if(articles.length > 0){
        articles.forEach(article => article.remove());
    }
}

    // clears main before anything new is rendered there
function clearMain(){
    const main = document.querySelector("main");
    main.replaceChildren();
}


// drag 'n drop listeners
    // user can copy a card into different collection by draging it into the sidebar
function dragCard(e) {
    const card = e.currentTarget;
    // remember title and text to copy
    const h2 = card.querySelector("h3").innerText; 
    const p = card.querySelector("p").innerText; 
    const cardDto = {
        "title": h2,
        "text": p
    };
    // Make string from json
    e.dataTransfer.setData("application/json", JSON.stringify(cardDto));
}

    // listener for collections in the sidebar
function dropCard(e){
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    const collectionName = e.currentTarget.querySelector("h3").innerText;
    
    // copy card to selected collection
    const collection = dataManager.getCollection(collectionName);
    const success = collection.addCard(new CardsData(data.title, data.text, soundManager.lastRecorderAudio));
    //check if a card with the same title exists in selected collection
    if(success){
        document.querySelector("body").append(printCopyMessage(collection.name, true));
        dataManager.refreshLocalStorage();
    } else {
        document.querySelector("body").append(printCopyMessage(collection.name, false));
    }
}


// history
    // Open last page if user clicks page before / after
window.addEventListener("popstate", e => {
    const state = e.state;
    console.log(state);
    if(state !== null){
        if(state.mode === "edit"){
            openEditFromHistory(state.collection);
        } else if(state.mode === "study"){
            openStudyFromHistory(state.collection);
        } else{
            clearMain();
        }
        
    } 
})

    // opens study view after user clicks back / forward in history
function openStudyFromHistory(title){
    clearMain();
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    refreshStudyView();
}

    // opens edit view after user clicks back / forward in history
function openEditFromHistory(title){
    clearMain();
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderEditView(removeCardFromCollection, editCard, openCardForm, dragCard, collection));
}