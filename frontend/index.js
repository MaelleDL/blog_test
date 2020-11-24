//petite fonction très simple permettant de formater la date 
const dateFormatter = new Intl.DateTimeFormat("fr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",});

//construction de la fonction qui permet de récupérer les données dans la bdd
const getArts = async () => {
    //le fetch va chercher les infos d'une base de données, on fetch à l'adresse de notre serveur parce que tout passe par lui
    //quand il reçoit cette requête le serveur passe par sa route 'get'
    const response = await fetch("http://localhost:3000/article");
    //on récupère ces données en json
    const article = await response.json();
    // et on les console.log pour être sure qu'elles sont là (étape de travail, ce n'est pas nécessaire dans un produit fini)
    console.log(article);
    // on appelle la fonction resetPage (aller la voir) elle ne sert pas à la première visite du sommaire mais elle sert après
    resetPage();
    //on appelle la fonction generateHtml appliquée aux données Json qu'on a réccupérer
    generateHtml(article);};

//cette fonction permet de générer du html là où on le voudra dans une div du html
const generateHtml = (data) => {
    //on créer une variable string vide en base de travail
    let html = '';
    //afin d'afficher tous les articles, on créer une boucle for
    //on créer une variable i (convention pour les boucles for), le deuxième élément dans la parenthèse indique que tant que i n'est
    //pas suppérieur au nombre de données, la boucle reprend (donc dans notre cas tant qu'on a pas tout affiché), et i++ indique que
    //tant que la boucle tourne on rajoute 1 à i et que donc pour notre cas, on passe à l'article suivant dans notre base de données)
    for (let i = data.length-1 ; i >0; i--) {
        //on indique le contenu du html que l'on va intégrer à notre page html de base
        //ne pas oublier le [i], ça marche pas sans ;)
        //petit focus sur la dernière ligne (le boutton), on y appelle un fonction au click (onclick) et on lui injecte en argument l'id
        // de l'article qui nous intéresse, ce sera important pour la suite
        html += `<div class="articles">
        <div><h3>${data[i].titre}</h3></div>
        <div>by: ${data[i].auteur}</div>
        <div class="date">${dateFormatter.format(new Date(data[i].createdAt))}</div>
        <button type="button" onclick="getArticle('${data[i]._id}')">AFFICHER</button>
        </div>`

        // je sélectionne l'endroit dans mon fichier html où je vais implémenter tout ça 
        const artdiv = document.querySelector('#test')
        // et je dis à ma fonction de l'injecter quand elle est appelé
        artdiv.innerHTML = html}};

    
//cette fonction permet d'effacer le html qu'on a généré automatiquement
const resetPage = () => {
    //on sélectionne l'endroit qui nous intéresse et on inject un string vide à la place du html généré
    document.querySelector("#test").innerHTML = "";
  };

// cette fonction permet d'aller chercher et de générer l'affichage d'un seul article. 
//on a en argument (entre les parenthèses) l'id de l'article qu'on chercher
const getArticle = async (id) => {
    // pour avoir le bon chemin vers l'article on créer donc une variable qui concatène l'id mis en argument dans l'URL
    let Url=`http://localhost:3000/article/${id}`
    // on va donc "fetcher" les données de cet article exactement de la meme manière que quand on appelle toute la bdd
    const response = await fetch(Url);
    // on demande la chose sous forme de json
    const post = await response.json();
    //on rafraichi la page grace la fonction resetPage
    resetPage();
    // et on génère le html pour l'article spécifique
    generateHtmlArticle (post);}

//fonction qui génère le html d'un article précis
const generateHtmlArticle= (post) =>{
    //c'est exactement le même principe que le premier generate html sauf qu'on a pas besoin de la boucle for
    // c'est donc simple, on dispose nos données dans des balises html (qui peuvent avoir des class et des id et qui seront
    //pris en charge par le css ;) )
    const html= `<div>
    <div class="info"><h1>${post.titre}</h1></div>
    <div class="info">by: ${post.auteur}</div>
    <div class="info">${dateFormatter.format(new Date(post.createdAt))}</div>
    <div id="article">${post.article}</div>
    <button type="button" onclick="getArts()">Retour au Sommaire</button>
    </div>`
    //on sélectionne là où on veut le mettre
    const infodiv = document.querySelector('#test')
    //et on lui injecte
        infodiv.innerHTML = html};


const Accepted=async()=>{
    resetPage();
    const acceptedHtml=`<p>Votre formulaire a été accepté dans notre base de données</p>
    <button onclick="getArts()" >Retour au Sommaire</button>`
    const Accepted = document.querySelector('#test')
        Accepted.innerHTML =acceptedHtml;
}
// je met en route ma fonction getArts
 getArts();