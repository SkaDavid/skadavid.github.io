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
            aside.append(collectionArticle.render());
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