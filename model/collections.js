//CollectionManager holds information about every collection that is in use. 
class CollectionManager{
    // a list of all collections
    collections;
    // last collection in use
    currentCollection;
    // last card in use
    currentCard;
    constructor(){
        this.collections = [];
        this.initializeFromLocalStorage();
    }

    // initialize the apps state from local storage
    initializeFromLocalStorage(){
        if(localStorage.collections){
            const collectionsPlainObjects = JSON.parse(localStorage.collections);
            collectionsPlainObjects.forEach((object) => {
                this.collections.push(new CollectionData(
                    object.name, 
                    object.cards.map(card => new CardsData(card.title, card.text)), 
                    object.currentIndex));
            })
            this.currentCollection = this.collections[0];
            this.currentCard = this.currentCollection.cards[0];
        }
    }

    // Refreshes every change into local storage
    refreshLocalStorage(){
        if(this.collections.length === 0){
            localStorage.clear();
        } else{
            const collectionJson = JSON.stringify(this.collections);
            localStorage.setItem("collections", collectionJson);
        }
    }

    // Add collection to list of collections. Returns true if successfull, false if unsuccesfull.
    addCollection(collection){
        // check if collections name is unique across all collections
        let collision = false;
        if(this.collections.length !== 0){
            this.collections.forEach(element => {
            if(element.name === collection.name){
                collision = true;
                return;
                }
            });
        }
        // if name is unique, add collection to list and return true
        if(!collision){
            this.collections.push(collection);
            this.refreshLocalStorage();
            return true;
        } else{
            return false;
        }
    }

    // removes collection from the list of all collections
    removeCollection(name){
        let index = -1;
        for(let i = 0; i < this.collections.length; i++){
            if(this.collections[i].name === name){
                index = i;
                break;
            }
        }
        if(index >= 0){
            this.collections.splice(index, 1);
            this.refreshLocalStorage();
        }
    }

    get collections(){
        return this.collections;
    }

    // returns collection based on its name. Returns CollectionData if found, false if not.
    getCollection(name){
        let returnC = false;
        if(this.collections.length > 0){
            this.collections.forEach(collection => {
            if(collection.name === name){
                returnC = collection;
                }
            });
        }
        return returnC;
    }
    get currentCollection(){
        return this.currentCollection;
    }
    set currentCollection(collection){
        this.currentCollection = collection;
    }

    get currentCard(){
        return this.currentCard;
    }

    setCurrentCard(title, text){
        let collisionFree = true;
        this.currentCollection.cards.forEach(card => {
            if(card.title === title){
                collisionFree = false;
                return;
            }
        })
        if(collisionFree){
            this.currentCard.title = title;
            this.currentCard.text = text;
        }
        return collisionFree;
    }

}

// Holds information about a single collection.
class CollectionData{
    // name of the collection
    name;
    // A list of cards
    cards;
    // index of last recently used card
    currentIndex;
    constructor(name, cards = [], currentIndex = 0){
        this.name = name;
        this.cards = cards;
        this.currentIndex = currentIndex;
    }
    get name(){
        return this.name;
    }
    set name(newName){
        this.name = newName;
    }

    get cards(){
        return this.cards;
    }

    getNext(){
        if(this.currentIndex >= this.cards.length - 1){
            this.currentIndex = 0;
        } else{
            this.currentIndex += 1;
        }
        return this.cards[this.currentIndex];
    }

    getPrevious(){
        if(this.currentIndex <= 0){
            this.currentIndex = this.cards.length - 1;
        }
        else{
            this.currentIndex -= 1;
        }
        return this.cards[this.currentIndex];
    }
    getCurrent(){
        return this.cards[this.currentIndex];
    }

    // adds a card with unique title to collection. Returns true if succesfull, false if unsuccesfull
    addCard(card){
        let index = this.findCardIndex(card.title);
        if(index === -1){
            this.cards.push(card);
            return true;
        } else{
            return false;
        }
    }

    removeCard(title){
        let index = this.findCardIndex(title);
        if(index !== -1){
            this.cards.splice(index, 1);
        }
    }

    getCard(title){
        const index = this.findCardIndex(title);
        if(index !== -1){
            return this.cards[index];
        }
        return index;
    }

    // Finds card by index. Returns index if found, -1 if not found
    findCardIndex(title){
        let index = -1;
        for(let i = 0; i < this.cards.length; i++){
            if(this.cards[i].title === title){
                index = i;
                break;
            }
        }
        return index;
    }
}

// Holds information about a single card
class CardsData{
    title;
    text;
    audio;
    constructor(title, text, audio){
        this.title = title;
        this.text = text;
        this.audio = audio;
    }

    get title(){
        return this.title;
    }
    set title(newTitle){
        this.title = newTitle;
    }
    get text(){
        return this.text;
    }
    set text(newText){
        this.title = newText;
    }
}

export {CardsData, CollectionData, CollectionManager}