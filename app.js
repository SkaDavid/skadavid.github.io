import {Collection, cardForm, newCollectionForm, renderMissingCollection} from "./render/render.js";
import {CardsData, CollectionData, CollectionManager} from "./model/collections.js"

// Index init
const dataManager = new CollectionManager();
refreshSidebar();

const body = document.querySelector("body");
const addCollection = document.getElementById("addCollectionButton");
addCollection.addEventListener('click', ()=>{
    const form = newCollectionForm(clearFormView, sendNewCollectionForm);
    body.append(form);
})


// Listeners for studyMode
function openStudyCollectionView(e){
    e.stopPropagation();
    clearMain();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    refreshStudyCollectionView();
}

function refreshStudyCollectionView(){
    clearMain();
    const collection = dataManager.currentCollection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderStudyMode(collection, nextCard, previousCard, turnOver));
}

function nextCard(){
    dataManager.currentCollection.getNext();
    refreshStudyCollectionView();
}

function previousCard(){
    dataManager.currentCollection.getPrevious();
    refreshStudyCollectionView();
}

function turnOver(e){
    const parentSection = e.target.closest("section");
    const p = parentSection.querySelector("p");
    const h3 = parentSection.querySelector("h3");
    p.classList.toggle("invisible");
    h3.classList.toggle("invisible");
}

// updating dom
function refreshSidebar(){
    clearSidebar()
    const aside = document.querySelector("aside");
    const collections = dataManager.collections;
    if(collections.length !== 0){
        collections.forEach(collection => {
            const collectionArticle = new Collection(collection.name);
            aside.append(collectionArticle.render(deleteCollection, openEditCollectionView, openStudyCollectionView));
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
    main.append(new Collection(currentCollection.name).renderCards(removeCardFromCollection, editCard, openAddCardForm, currentCollection));
}

function clearMain(){
    const main = document.querySelector("main");
    main.replaceChildren();
}


// listeners functions
function clearFormView(){
    const background = document.getElementById("darkerBackground");
    background.remove();
}

function sendNewCollectionForm(e){
    e.preventDefault();
    const name = e.target[0].value;
    const collection = new CollectionData(name);
    const successfull = dataManager.addCollection(collection);
    if(successfull === -1){
        alert("nope");
    } else{
        clearFormView();
        refreshSidebar();
    }
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
    main.append(new Collection(collection.name).renderCards(removeCardFromCollection, editCard, openAddCardForm, collection));
}

function openAddCardForm(){
    const body = document.querySelector("body");
    body.append(cardForm(clearFormView, sendNewCard));
}

function sendNewCard(e){
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[1].value;
    const card = new CardsData(title, text);
    const currentCollection = dataManager.currentCollection;
    const successful = currentCollection.addCard(card);
    if(successful === -1){
        alert("nppe");
    } else{
        clearFormView();
        clearMain();
        refreshEditCollectionView()
    }
}

function removeCardFromCollection(e){
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const currentCollection = dataManager.currentCollection;
    currentCollection.removeCard(title);

    clearMain();
    refreshEditCollectionView();
}

function editCard(e){
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const cardData = dataManager.currentCollection.getCard(title);
    dataManager.currentCard = cardData;
    console.log(cardData.text); 
    const form = cardForm(clearFormView, sendEditCardForm, cardData);
    body.append(form);
}

function sendEditCardForm(e){
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[1].value;
    const currentCollection = dataManager.currentCollection;
    dataManager.setCurrentCard(title, text);

    clearFormView();
    clearMain();
    refreshEditCollectionView();
}