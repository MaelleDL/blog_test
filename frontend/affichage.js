const dateFormatter = new Intl.DateTimeFormat("fr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const generateHtml = (data) => {
    const artItem=
        `<div><div>${data[i].titre}</div> <div>${data[i].auteur}</div><div>
        ${dateFormatter.format(new Date(data[i].createdAt))}</div></div>`;

        const artdiv = document.querySelector('#test')
    artdiv.innerHTML = artItem};
  
const getArts = async () => {
    const response = await fetch("http://localhost:3000/article");
    const data = await response.json();
    console.log(data);
    generateHtml(data);

};

getArts();





//     const container = document.createElement("ul");
//     container.setAttribute("class", "list-group");
//     print.forEach((article)=>{
//         const artItem =document.createElement("li");

//         artItem.innerHTML=
//         `<div>${article.titre}</div> <div>${article.auteur}</div><div>
//         ${dateFormatter.format(new Date(post.createdAt))}</div>`;

//         container.appendChild(postItem);
//     });
    
//     document.querySelector("#test").appendChild(container);
