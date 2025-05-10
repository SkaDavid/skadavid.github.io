import {Collection, renderMissingCollection} from "./render/render.js";


const aside = document.querySelector("aside");

/* const article = new Collection("OMO cards");
const article2 = new Collection("KAJ cards");
const article3 = new Collection("EAR cards");
aside.append(article.render(), article2.render(), article3.render()); */

aside.append(renderMissingCollection());