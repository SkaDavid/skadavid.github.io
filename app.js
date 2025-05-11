import {Collection, newCollectionForm, renderMissingCollection} from "./render/render.js";
import {CardsData, CollectionData, CollectionManager} from "./model/collections.js"

const dataManager = new CollectionManager();
refreshCollections();

const body = document.querySelector("body");
const addCollection = document.getElementById("addCollectionButton");
addCollection.addEventListener('click', ()=>{
    const form = newCollectionForm(
    ()=>{
        const background = document.getElementById("darkerBackground");
        background.remove();
    }, (e)=>{
        e.preventDefault();
        const name = e.target[0].value;
        const collection = new CollectionData(name);
        const successfull = dataManager.addCollection(collection);
        if(successfull === -1){
            alert("nope");
        } else{
            const background = document.getElementById("darkerBackground");
            background.remove();
            refreshCollections();
        }
    
    });
    body.append(form);
})

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

function refreshCollectionView(){

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
    const main = document.querySelector("main");
    main.append(new Collection(collection.name).renderCards(removeCard, editCard, addCard, collection));
}

function addCard(){
    console.log("addCard")
}

function removeCard(){
    console.log("removeCard")
}

function editCard(){
    console.log("editCard")
}