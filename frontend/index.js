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
    generateHtml(article);};

const generateHtml = (data) => {
    let html = '';
    for (var i = 0; i < data.length; i++) {
        html += `<div>
        <div>${data[i].titre}</div>
        <div>${data[i].auteur}</div>
        <div>${dateFormatter.format(new Date(data[i].createdAt))}</div>
        <button class="voir" data-id = "${data[i]._id}">Voir</button>
        </div>`
        const artdiv = document.querySelector('#test')
        artdiv.innerHTML = html}};

const resetPage = () => {
    document.querySelector("#test").innerHTML = "";};
    
getArts();