import {Collection, newCardForm, newCollectionForm, renderMissingCollection} from "./render/render.js";
import {CardsData, CollectionData, CollectionManager} from "./model/collections.js"

const dataManager = new CollectionManager();
refreshCollections();

const body = document.querySelector("body");
const addCollection = document.getElementById("addCollectionButton");
addCollection.addEventListener('click', ()=>{
    const form = newCollectionForm(clearForm, sendNewCollectionForm);
    body.append(form);
})

function clearForm(){
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
        clearForm();
        refreshCollections();
    }
}

function refreshCollections(){
    clearSidebar()
    const aside = document.querySelector("aside");
    const collections = dataManager.collections;
    if(collections.length !== 0){
        collections.forEach(collection => {
            const collectionArticle = new Collection(collection.name);
            aside.append(collectionArticle.render(deleteCollection, lookAtCollection, openCollection));
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

function clearMain(){
    const main = document.querySelector("main");
    main.replaceChildren();
}

function openCollection(){
    console.log("open");
}

function deleteCollection(e){
    e.stopPropagation();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    dataManager.removeCollection(title);
    refreshCollections();    
}

function lookAtCollection(e){
    e.stopPropagation();
    clearMain();
    const parentArticle = e.target.closest("article");
    const title = parentArticle.querySelector("h3").innerText;
    const collection = dataManager.getCollection(title);
    dataManager.currentCollection = collection;
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderCards(removeCard, editCard, addCard, collection));
}

function addCard(){
    const body = document.querySelector("body");
    body.append(newCardForm(clearForm, sendNewCard));
}

function sendNewCard(e){
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[1].value;
    console.log(title + " " + text);
    const card = new CardsData(title, text);
    const currentCollection = dataManager.currentCollection;
    const successful = currentCollection.addCard(card);
    if(successful === -1){
        alert("nppe");
    } else{
        clearForm();
        clearMain();
        const main = document.querySelector("main");
        main.append(new Collection(currentCollection.name).renderCards(removeCard, editCard, addCard, currentCollection));
    }
}

function removeCard(){
    console.log("removeCard")
}

function editCard(){
    console.log("editCard")
}