const dateFormatter = new Intl.DateTimeFormat("fr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",});
  
const getArts = async () => {
    const response = await fetch("http://localhost:3000/article");
    const article = await response.json();
    console.log(article);
    resetPage();
    generateHtml(article);};

const generateHtml = (data) => {
    let html = '';
    for (var i = 0; i <= data.length; i++) {
        html += `<div>
        <div>${data[i].titre}</div>
        <div>${data[i].auteur}</div>
        <div>${dateFormatter.format(new Date(data[i].createdAt))}</div>
        <button type="button" onclick="getArticle('${data[i]._id}')">afficher</button>
        </div>`
        const artdiv = document.querySelector('#test')
        artdiv.innerHTML = html}};
    
getArts();

const resetPage = () => {
    document.querySelector("#test").innerHTML = "";
  };

const getArticle = async (id) => {
    let Url=`http://localhost:3000/article/${id}`
    const response = await fetch(Url);
    const post = await response.json();
    resetPage();
    generateHtmlArticle (post);}

const generateHtmlArticle= (post) =>{
    const html= `<div>
    <div>${post.titre}</div>
    <div>${post.auteur}</div>
    <div>${dateFormatter.format(new Date(post.createdAt))}</div>
    <div>${post.article}</div>
    <button type="button" onclick="getArts()">Sommaire</button>
    </div>`
    const infodiv = document.querySelector('#test')
        infodiv.innerHTML = html};

