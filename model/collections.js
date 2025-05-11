class CollectionManager{
    collections;
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
            delete this.collections[index];
        }
    }

    get collections(){
        return this.collections;
    }

    getCollection(title){
        let returnC = -1;
        if(this.collections.length > 0){
            this.collections.forEach(collection => {
            if(collection.name === title){
                console.log(collection.name);
                returnC = collection;
                }
            });
        }
        return returnC;
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
        this.cards.array.forEach(element => {
            if(element.title === card.title){
                return -1;
            }
        });
        this.cards.push(card);
    }

    removeCard(name){
        let index;
        for(let i = 0; i < this.cards.length; i++){
            if(this.cards[i] === name){
                index = i;
                break;
            }
        }
        if(index){
            delete this.cards[index];
        }
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