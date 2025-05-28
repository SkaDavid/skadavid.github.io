import {Collection, cardForm, newCollectionForm, renderMissingCollection, printCopyMessage} from "./render/render.js";
import {CardsData, CollectionData, CollectionManager} from "./model/collections.js"
import SoundManager from "./sound/sound.js"

// Index init
const dataManager = new CollectionManager();
const soundManager = new SoundManager();

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

refreshSidebar();


const body = document.querySelector("body");
const addCollection = document.getElementById("addCollectionButton");
addCollection.addEventListener('click', ()=>{
    const form = newCollectionForm(clearFormView, sendNewCollectionForm);
    body.append(form);
    document.querySelector("input").focus();
})


// history

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

function openStudyFromHistory(title){
    clearMain();
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    refreshStudyCollectionView();
}

function openEditFromHistory(title){
    clearMain();
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderCards(removeCardFromCollection, editCard, openAddCardForm, dragCard, collection));
}

// Listeners for studyMode
function openStudyCollectionView(e){
    e.stopPropagation();
    clearMain();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    refreshStudyCollectionView();
    history.pushState({"collection": title, "mode": "study"}, "", `?collection=${title}&mode=study`);
}

function refreshStudyCollectionView(){
    clearMain();
    const collection = dataManager.currentCollection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderStudyMode(collection, nextCard, previousCard, turnOver));
}

function nextCard(){
    soundManager.nextCardSound();
    dataManager.currentCollection.getNext();
    refreshStudyCollectionView();
}

function previousCard(){
    soundManager.prevCardSound();
    dataManager.currentCollection.getPrevious();
    refreshStudyCollectionView();
}

function turnOver(e){
    soundManager.turnOverSound();
    const parentSection = e.target.closest("section");
    const card = parentSection.querySelector("#card");
    card.classList.toggle("flipped");
}

// updating dom
function refreshSidebar(){
    clearSidebar()
    const aside = document.querySelector("aside");
    const collections = dataManager.collections;
    if(collections.length !== 0){
        collections.forEach(collection => {
            const collectionArticle = new Collection(collection.name);
            aside.append(collectionArticle.render(deleteCollection, openEditCollectionView, openStudyCollectionView, dropCard));
        })
    } else{
        aside.append(renderMissingCollection());
    }
}

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

function refreshEditCollectionView(){
    const main = document.querySelector("main");
    const currentCollection = dataManager.currentCollection;
    main.append(new Collection(currentCollection.name).renderCards(removeCardFromCollection, editCard, openAddCardForm, dragCard, currentCollection));
}

function clearMain(){
    const main = document.querySelector("main");
    main.replaceChildren();
}

// drag 'n drop functions

function dragCard(e) {
    const card = e.currentTarget;
    const h2 = card.querySelector("h3").innerText; 
    const p = card.querySelector("p").innerText; 
    const cardDto = {
        "title": h2,
        "text": p
    };
    e.dataTransfer.setData("application/json", JSON.stringify(cardDto));
}

function dropCard(e){
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    const collectionName = e.currentTarget.querySelector("h3").innerText;
    
    const collection = dataManager.getCollection(collectionName);
    const success = collection.addCard(new CardsData(data.title, data.text, soundManager.lastRecorderAudio));
    if(success){
        document.querySelector("body").append(printCopyMessage(collection.name, true));
        dataManager.refreshLocalStorage();
    } else {
        document.querySelector("body").append(printCopyMessage(collection.name, false));
    }
}



// listeners functions
function clearFormView(){
    const background = document.getElementById("darkerBackground");
    background.remove();
}

function sendNewCollectionForm(e){
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

function deleteCollection(e){
    e.stopPropagation();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    dataManager.removeCollection(title);
    refreshSidebar();  
    clearMain();
}


function openEditCollectionView(e){
    e.stopPropagation();
    clearMain();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderCards(removeCardFromCollection, editCard, openAddCardForm, dragCard, collection));
    history.pushState({"collection": collection.name, "mode": "edit"}, "", `?collection=${collection.name}&mode=edit`);
}

function openAddCardForm(){
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
        refreshEditCollectionView();
    } else{
        errorMessage.classList.remove("hidden");
    };
}

function removeCardFromCollection(e){
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const currentCollection = dataManager.currentCollection;
    currentCollection.removeCard(title);

    dataManager.refreshLocalStorage();
    clearMain();
    refreshEditCollectionView();
}

function editCard(e){
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const cardData = dataManager.currentCollection.getCard(title);
    dataManager.currentCard = cardData;
    const form = cardForm(clearFormView, sendEditCardForm, soundManager, cardData);
    body.append(form);
    document.querySelector("input").focus();
}

function sendEditCardForm(e){
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[1].value;
    
    const errorMessageNullInput = e.currentTarget.querySelector(".errorMessageNullInput");
    const errorMessage = e.currentTarget.querySelector(".errorMessageTitle");
    errorMessage.classList.add("hidden");
    if(title.length === 0 || text.length === 0){
        errorMessageNullInput.classList.remove("hidden");
        return;
    } else{
        errorMessageNullInput.classList.add("hidden");
    }
    if(dataManager.setCurrentCard(title, text)){
        dataManager.refreshLocalStorage();
        clearFormView();
        clearMain();
        refreshEditCollectionView();
    } else{
        errorMessage.classList.remove("hidden");
    };
}