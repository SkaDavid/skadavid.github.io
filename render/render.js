import { CardsData } from "../model/collections.js";

class Collection{
    title;
    constructor(title){
        this.title = title;
    }

    render(deleteFunction, lookFunction, openFunction){
        const article = document.createElement("article");
        article.classList.add("aside");
        const header = document.createElement("h3");
        header.innerText = this.title;
        const div = document.createElement("div");
        div.classList.add("svgDivide");

        const binSvg = getSVG("bin");
        binSvg.addEventListener('click', deleteFunction, false);

        const eyeSvg = getSVG("eye");
        eyeSvg.addEventListener("click", lookFunction, false);
        
        div.append(binSvg, eyeSvg);
        article.append(header, div);
        article.addEventListener("click", openFunction, false);
        return article;
    }

    renderCards(deleteCard, editCard, addCard, collectionData){
        const section = document.createElement("section");
        section.classList.add("cardsContainer");

        const div = document.createElement("div");
        div.classList.add("cardsHeader");

        const h2 = document.createElement("h2");
        h2.innerText = collectionData.name;
        const plus = getSVG("plus");
        plus.addEventListener('click', addCard);
        
        div.append(h2, plus);
        section.append(div);

        if(collectionData.cards.length === 0){
            section.append(renderMissingCards());
            return section;
        }

        collectionData.cards.forEach(card => {
            const article = document.createElement("article");
            article.classList.add("cards");

            const h3 = document.createElement("h3");
            h3.innerText = card.title;
            const p = document.createElement("p");
            p.innerText = card.text;
            const svgContainer = document.createElement("div");
            svgContainer.classList.add("svgContainer");

            const pencil = getSVG("pencil");
            pencil.addEventListener("click", editCard);

            const bin = getSVG("bin");
            bin.addEventListener("click", deleteCard);

            svgContainer.append(pencil, bin);
            article.append(h3, p, svgContainer);
            section.append(article);    
        });
        return section;
    }
}

function renderMissingCollection(){
    const p = document.createElement("p");
    p.innerText = "It seems like you have no collections yet. Click on the plus sign to create one!";
    return p;
}

function renderMissingCards(){
        const p = document.createElement("p");
        p.innerText = "It seems there are no cards in this collection. Add some by clicking the plus sign";
        return p;
}

function newCollectionForm(closeFunction, sendFunction){
    const background = document.createElement('div');
    background.setAttribute("id", "darkerBackground");

    const form = document.createElement("form");
    form.setAttribute("id", "collectionForm");
    form.addEventListener('submit', sendFunction);
    
    const cross = getSVG("cross");
    cross.addEventListener('click', closeFunction);

    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.value = "Create!";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.key = "name";

    const text = document.createElement("p");
    text.innerText = "Select a name for your collection:";

    form.append(cross, text, nameInput, submit);
    background.append(form);
    return background;
}

function cardForm(closeFunction, sendFunction, cardData = new CardsData("", "")){
    const background = document.createElement('div');
    background.setAttribute("id", "darkerBackground");

    const form = document.createElement("form");
    form.setAttribute("id", "cardForm");
    form.addEventListener('submit', sendFunction);
    
    const cross = getSVG("cross");
    cross.addEventListener('click', closeFunction);

    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    if(cardData.title === ""){
        submit.value = "Create!"
    } else{
        submit.value = "Edit!";
    }

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.key = "title";
    nameInput.value = cardData.title;

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.key = "cardText";
    textInput.value = cardData.text;

    const text = document.createElement("p");
    text.innerText = "Select title and text of your card:";

    form.append(cross, text, nameInput, textInput, submit);
    background.append(form);
    return background;
}

export {Collection, renderMissingCollection, cardForm, newCollectionForm}

function getSVG(name){
    const svg = svgRepo[name];
    const div = document.createElement("div");
    div.innerHTML = svg;
    return div.firstChild;
}

const svgRepo = {
    eye: `<svg width="25px" height="25px" viewBox="0 0 24 24" class="eye" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#1C274C" stroke-width="1.5"/>
                </svg>`,
    bin: `<svg fill="#FFFFF" width="25px" height="20px" class="bin" viewBox="0 0 48 48" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/>
                    <path class="bin" d="M42,3H28a2,2,0,0,0-2-2H22a2,2,0,0,0-2,2H6A2,2,0,0,0,6,7H42a2,2,0,0,0,0-4Z"/><path d="M39,9a2,2,0,0,0-2,2V43H11V11a2,2,0,0,0-4,0V45a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V11A2,2,0,0,0,39,9Z"/>
                    <path class="bin" d="M21,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/><path d="M31,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/>
                </svg>`,
    cross: `<svg width="35px" height="35px" id="cross" viewBox="0 0 100 100">
                <circle rx"48" cx="50" cy="50" fill="none" stroke="black" stroke-width="5"></circle>
                <line x1="30" y1="30" x2="70" y2="70" stroke="black" stroke-width="5px"></line>
                <line x1="30" y1="70" x2="70" y2="30" stroke="black" stroke-width="5px"></line>
            </svg>`,
    plus: `<svg width="35px" height="35px" id="addCollectionButton" viewBox="0 0 100 100">
                <circle r="48" cx="50" cy="50" fill="none" stroke="black" stroke-width="5"></circle>
                <line x1="14" y1="50" x2="86" y2="50" stroke="black" stroke-width="5px"></line>
                <line x1="50" y1="14" x2="50" y2="86" stroke="black" stroke-width="5px"></line>
            </svg>`,
    pencil: `<svg width="50px" height="50px" viewBox="2 2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z" fill="#000000"/>
            </svg>`
}

