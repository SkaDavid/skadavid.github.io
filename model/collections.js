class CollectionManager{
    collections;
    currentCollection;
    currentCard;
    constructor(){
        this.collections = [];
        this.initializeFromLocalStorage();
    }

    initializeFromLocalStorage(){
        if(localStorage.collections){
            console.log(localStorage.collections)
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

    refreshLocalStorage(){
        if(this.collections.length === 0){
            localStorage.clear();
        } else{
            const collectionJson = JSON.stringify(this.collections);
            localStorage.setItem("collections", collectionJson);
        }
    }

    addCollection(collection){
        let collision = false;
        if(this.collections.length !== 0){
            this.collections.forEach(element => {
            if(element.name === collection.name){
                collision = true;
                return;
                }
            });
        }
        if(!collision){
            this.collections.push(collection);
            this.refreshLocalStorage();
        } else{
            return -1;
        }
    }

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

    getCollection(name){
        let returnC = -1;
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
        this.currentCard.title = title;
        this.currentCard.text = text;
    }

}

class CollectionData{
    name;
    cards;
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

    addCard(card){
        let index = this.findCardIndex(card.title);
        if(index === -1){
            this.cards.push(card);
        } else{
            return -1;
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

class CardsData{
    title;
    text;
    constructor(title, text){
        this.title = title;
        this.text = text;
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