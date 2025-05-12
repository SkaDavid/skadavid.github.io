class CollectionManager{
    collections;
    currentCollection;
    currentCard;
    constructor(){
        this.collections = [];
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
    constructor(name){
        this.name = name;
        this.cards = [];
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