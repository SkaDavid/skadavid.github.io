class Collection{
    title
    constructor(title){
        this.title = title;
    }

    render(){
        const article = document.createElement("article");
        article.classList.add("aside");
        const header = document.createElement("h3");
        header.innerText = this.title;
        const div = document.createElement("div");
        div.classList.add("svgDivide");
        div.innerHTML = svgRepo.eye + svgRepo.bin;
        article.append(header, div);
        return article;
    }
}

function renderMissingCollection (){
    const p = document.createElement("p");
    p.innerText = "It seems like you have no collections yet. Click on the plus sign to create one!";
    return p;
}

export {Collection, renderMissingCollection}

const svgRepo = {
    eye: `<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg width="25px" height="25px" viewBox="0 0 24 24" class="eye" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#1C274C" stroke-width="1.5"/>
                </svg>`,
    bin: ` <!-- bin -->
                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg fill="#FFFFF" width="25px" height="20px" class="bin" viewBox="0 0 48 48" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/>
                    <path d="M42,3H28a2,2,0,0,0-2-2H22a2,2,0,0,0-2,2H6A2,2,0,0,0,6,7H42a2,2,0,0,0,0-4Z"/><path d="M39,9a2,2,0,0,0-2,2V43H11V11a2,2,0,0,0-4,0V45a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V11A2,2,0,0,0,39,9Z"/>
                    <path d="M21,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/><path d="M31,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/>
                </svg>`
}


