
let apiUrl = `http://localhost:3000/article`
    fetch(apiUrl)
        .then( (data) => data.json())
        .then ( (article) => generateHtml(article));

const generateHtml = (data) =>{
    const Properties= `<div id="titre"></div>
    <div id="auteur"></div>
    <div id="date"></div>
    <div id="article"></div>`;
    const test=document.querySelector('#test')
    test.innerHTML= Properties;
}