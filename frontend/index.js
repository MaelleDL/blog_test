const dateFormatter = new Intl.DateTimeFormat("fr", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const getArts = async () => {
  const response = await fetch("http://localhost:3000/article");

  const article = await response.json();

  console.log(article);

  resetPage();

  generateHtml(article);
};

const generateHtml = (data) => {
  let title = `<h1>Sommaire</h1>`;
  const titlediv = document.querySelector("#title");
  titlediv.innerHTML = title;

  let html = "";

  for (let i = data.length - 1; i >= 0; i--) {
    html += `
    <div class="articles">
        <div><h3>${data[i].titre}</h3></div>
        <div>Par: ${data[i].auteur}</div>
        <div class="date">${dateFormatter.format(
          new Date(data[i].createdAt)
        )}</div>
        <button type="button" onclick="getArticle('${
          data[i]._id
        }')">AFFICHER</button>
        </div>`;

    const artdiv = document.querySelector("#corps");

    artdiv.innerHTML = html;
  }
};

const resetPage = () => {
  document.querySelector("#title").innerHTML = "";
  document.querySelector("#corps").innerHTML = "";
};

const getArticle = async (id) => {
  let Url = `http://localhost:3000/article/${id}`;

  const response = await fetch(Url);

  const post = await response.json();

  resetPage();

  generateHtmlArticle(post);
};

const generateHtmlArticle = (post) => {
  const html = `<div class="articles solo">
    <div class="info"><h2>${post.titre}</h2></div>
    <div class="info">Par: ${post.auteur}</div>
    <div class="info">${dateFormatter.format(new Date(post.createdAt))}</div>
    <div id="article-main">${post.article}</div>
    <button type="button" onclick="getArts()">Retour au Sommaire</button>
    </div>`;

  const infodiv = document.querySelector("#corps");

  infodiv.innerHTML = html;
};

const Accepted = async () => {
  resetPage();
  const acceptedHtml = `<p>Votre formulaire a été accepté dans notre base de données</p>
    <button onclick="getArts()" >Retour au Sommaire</button>`;
  const Accepted = document.querySelector("#test");
  Accepted.innerHTML = acceptedHtml;
};

const Post = () => {
  resetPage();
  let title = `<h1>Poster un article</h1>`;
  const titlediv = document.querySelector("#title");
  titlediv.innerHTML = title;

  html = `
            <form id="form1" method="post" action="http://localhost:3000/article">
                <div class="label">
                    <label for="titre">Titre de l'article :</label>
                    <input type="text" name="titre" id="titre" placeholder="Titre de l'article" required/>
                </div>
                <div class="label">
                    <label for="auteur">Nom de l'auteur:</label>
                    <input type="text" name="auteur" id="auteur" placeholder="Nom de l'auteur"required/>
                </div>
                <div class="label">
                    <label for="article">Votre article :</label>
                    <textarea name="article" id="article" rows="10" cols="50" placeholder="Parlez nous de votre ressource" required></textarea>
                </div>
                <div>
                <input class="button-primary" type="submit" value="Envoyer">
                </div>
            </form>`;
  const form = document.querySelector("#corps");
  form.innerHTML = html;
};

getArts();
