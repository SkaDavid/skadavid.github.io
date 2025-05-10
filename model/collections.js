class CollectionManager{
    collections;
    constructor(){
        this.collections = [];
    }

    addCollection(collection){
        this.collections.array.forEach(element => {
            if(element.name === collections.name){
                return -1;
            }
        });
        this.collections.push(collection);
    }

    removeCollection(name){
        let index;
        for(let i = 0; i < this.collections.length; i++){
            if(this.collections[i] === name){
                index = i;
                break;
            }
        }
        if(index){
            delete this.collections[index];
        }
    }

}

class CollectionData{
    name;
    cards;
    contructor(name){
        this.name = this.name;
        this.cards = [];
    }
    get name(){
        return this.title;
    }
    set name(newName){
        this.name = newName;
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