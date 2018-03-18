# Bitdenver (Etape 2)

Un clone de bittrex dans le cadre du cours de CARA

Avant de continuer, créez un compte et logguez vous dessus pour afficher les composants cachés.

## Objectifs
- Afficher la liste des cryptomonnaies sur la page d'accueil

## C'est parti
En résumé voici comment on va procéder
- On créé les collection Crypto (contenant la liste des cryptomonnaies) et Wallets (contenant les portfeuille des utilisateurs) ainsi que leurs schémas 
- On rempli cette table automatiquement au démarrage du serveur si elle est vide, avec des données sur les cryptomonnaies (en prenant soint de créer un portefeuille par cryptomonnaie + le portefeuille en dollars)
- On publie ces données du côté serveur et on y souscris du côté client
- On créé et on on injecte un composant qui qui va afficher ces données récupérées
- On utilise les helpers pour les passer au composant
- On mange une pomme.

### Les schémas de collection
Comme dans une base de données relationnelles, il est possible de définir un schéma de table pour spécifier quels sont les champs que notre table peut accepter.

Avec les bases NoSQL comme MongoDB vous n'êtes pas obligé mais c'est **vivement** conseillé car ça vous permet de valider les données que vous aller mettre dans votre table. Si les champs et leur type ne sont pas respecté, le schéma lèvera une exception pour vous sans que vous ayez à lever le petit doigt 😺

Vous pouvez aller jeter un coup d'oeil au fichier `/imports/api/crytocurrency/crytocurrency.js`. On y a défini le schéma représentant une cryptomonnaie que l'on a associé à la collection `Crypto`. On vous laisse lire les commentaire même si on pense que vous savez tous ce qu'est un schéma de table..

Nous avons aussi définit un shéma de collection `Wallets` pour le portefeuille d'un utilisateur. Comme vous l'avez compris, l'utilisateur possède **un** portefeuille pour **chaque** cryptomonnaie + un portefeuille en dollars (usdt) qui permet d'acheter des cryptomonnaie.
Donc allez aussi voir le fichier `/imports/api/wallets/wallets.js`.

Remarquez que nous déclarons nos collections dans leurs fichiers respectifs avec
```js
export const Crypto = new Mongo.Collection('crypto');
```
et
```js
export const Wallets = new Mongo.Collection('wallets');
```

### Création des portefeuilles pour un nouvel utilisateur
Quand un utilisateur est créé, il faut initialiser ses portefeuilles.

Dans le fichier `/imports/startup/server/wallets-hook.js` vous pouvez voir que l'on se sert de la fonction `Accounts.onCreateUser` pour intercepter la création d'un utilisateur et que dans le corps de cette fonction on ajoute le portefeuille en dollar et un portefeuille par cryptomonnaie grace à une boucle.

### Affichage des cryptomonnaies
Insérez le template suivant dans le fichier `/imports/ui/pages/list_cryptos/list_crypto.html`
```html
<template name="list_crypto">
    <div class="row">
        <!-- liste des cryptos -->
        {{#each cryptos}}
            {{> crypto}}
        {{/each}}
        <!-- Ordres de ventes -->
    </div>
</template>

<template name="crypto">
    <div class="col s8 m8 offset-s2 offset-m2">
        <div class="card horizontal hoverable">
            <div class="card-image crypto-img">
                <a href="/crypto/{{code}}">
                    <img class="responsive-img" src="/img/cryptos/{{code}}.png"> </a>
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <div class="col s5">
                        <div class="col s12 m12">
                            <h3>
                                <a href="/crypto/{{code}}">{{name}}</a>
                            </h3>
                        </div>
                        {{#if currentUser}}
                        <div class="col s12 m12">
                            <div class="card-action col s6 m6">
                                <a href="/crypto/{{code}}#buy">Acheter</a>
                            </div>
                            <div class="card-action col s6 m6">
                                <a href="/crypto/{{code}}#sell">Vendre</a>
                            </div>
                        </div>
                        {{/if}}
                    </div>
                    <div class="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Volume</th>
                                    <th>Taux</th>
                                    {{#if currentUser}}
                                    <th>Portefeuille</th>
                                    {{/if}}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{volume}}</td>
                                    <td>{{dollarValue}}</td>
                                    {{#if currentUser}}
                                    <td>{{inWallet}} {{code}}</td>
                                    {{/if}}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
```

#### Le block {{# if}}
Comme l'avez deviné tout ce qui est dans un bloc
```
{{#if condition}}
    contenu conditionnel
{{/if}}
```

est affiché si la condition est respectée.
Ainsi on peut voir que l'on se sert de la variable currentUser (importée automatiquement avec le package qui vous a facilité l'authent) pour afficher ou pas certaines partie de la page.
Si un utilisateur n'est pas connecté, certaines informations n'ont pas a être affichée.

#### Le block {{# each}}
Rappel: Nous voulons sur la page d'accueil la liste des cryptomonnaies sous forme de carte contenant certaines informations. Nous devons donc itérer sur chaque cryptomonnaie pour afficher sa description. 

Analysons les templates. 

```
{{#each cryptos}}
    {{> crypto}}
{{/each}}
```

Le template `list_crypto` permet d'itérer sur un tableau de cryptomonnaies passé dans le helper (que nous ferons juste après) et d'afficher pour chacune des cryptomonnaies le template `crypto`. Ce dernier va se contenter d'afficher les informations de la cryptomonnaie en cours d'itération.
Ce bloc peut aussi s'écrire sous une forme plus explicite

```
{{#each cryptomonnaie in cryptos}}
    {{> crypto}}
{{/each}}
```
La variable cryptomonnaie est implicitement déclarée et passée au template `crypto`.

Insérez ensuite dans `imports/ui/components/content/content.html`
```
{{> list_crypto}}
```

Vous ne voyez rien ? c'est normal nous n'avons encore rien inséré dans la collection des cryptomonnaie 😅

### Affichons les données
Cette partie regroupe trois gros concepts: les publications, les souscriptions et les helpers. Vous connaissez déjà l'un des trois, reste à voir les deux autres.

Comme nous l'avons présenté, pour que les clients accèdent aux données de la base du serveur, il faut que celui-ci les en autorise. Pour cela il doit publier des parties (ou toute) de la base de données.
Nous devons donc publier les données de la collections Crypto et Wallets.

Dans un premier temps, insérez ceci dans le fichier `/imports/api/crytocurrency/server/publications.js`
```js
Meteor.publish('crypto', () => {
  return Crypto.find({});
});
```
Et voila vous venez de publier "toutes les cryptomonnaies" au monde entier 🌍️ Le nom du flux est au choix, nous avons choisi de mettre `crypto` mais vous pouvez très mettre `crypto.getAll` ou `jmleskebab` 🥪 

Reste maintenant à faire en sorte que tous les clients qui affichent la page y accèdent (en temps réel je vous le rapelle). Pour cela il faut souscrire au flux de publication "crypto".
Insérez dans le fichier `/imports/ui/pages/list_cryptos/index.js`

```js
Template.list_crypto.onCreated(function() {
    this.subscribe('crypto');
});
```

Que fait ce code ? Tout simplement il demande à l'instance du template `list_crypto`, à sa création, de souscrire à la publication déclarée précédemment. Je dis "instance" car il est possible d'avoir plusieurs instance de votre template (bah oui tout l'interêt des templates c'est de pouvoir être réutilisable à plusieurs endroits de votre code et donc à chaque fois que vous insérer le template dans une page html avec la balise {{> list_crypto}}, une instance est créé). On peut se référer à l'instance en cours grâce à `this`.

> Attention à ne pas utiliser la notation lambda de javascript `() => {}` et de bien laisser `function` ! Sinon `this` ne pointera pas sur le template

Ayez bien en tête que chaque client qui souscris à une publication reçoit les même infos que les autres et que dès qu'un changement opère sur les données, les clients sont notifiés et téléchargent les nouvelles données et les synchronisent avec leur base locale (le cache MiniMongo). C'est ce qui permet la réactivité de votre site web ✈️

On aurait aussi pu écrire
```js
Meteor.subscribe('crypto');
```

Mais adoptez la première version avec `this` pour être habitué car elle permet d'ajouter implicitement à votre template des fonctions liées aux souscriptions notamment la fonction this.subscriptionsReady() qui permet de savoir si les données ont été récupéres afin d'être affichées (pour éviter les nullpointer lorsque la données n'est pas encore disponible au chargement d'une page par exemple).

> NB: Si parfois vous avez des problèmes d'affichage c'est que vous n'attendez pas que les données soit chargées pour les afficher. Si ca vous arrive utilisez la condition 
```js
if(this.subscriptionsReady) {
    // afficher les données
}
```
Ca n'arrive que lorsque vous utilisez des composants non réactifs (non fait pour le temps réel) en d'autres termes tous les composants non produits par Meteor ou installés depuis npm (ChartJs que nous utiliserons).

##### Bon on les affiche ces données ?
On se calme 💣️

Il faut maintenant implémenter le helper qui va envoyer les données souscrits vers le template.

Je vous laisse faire.

.

.

.

.

.

.

.

C'est bon ?
Voici la solution

Dans `/imports/ui/pages/list_cryptos/index.js`
```
Template.list_crypto.helpers({
  cryptos() {
    return Crypto.find();
  },
});

Template.crypto.helpers({
  inWallet() {
    return Wallets.findOne({
      $and: [{ code: this.code }, { owner: Meteor.userId() }],
    }).nbCoins;
  },
});
```

Il reste maintenant à faire la même chose pour Wallets.
Vous êtes grand.

### Insertion de données d'exemple
Vous pourriez faire des appels REST sur coinmarketcap pour récupérer la liste des cryptomonnaie mais ce n'est pas l'objet ici. On vous a donc concocté un script `/imports/startup/server/initdb.js` qui s'execute au démarrage de votre serveur et qui vérifie que la collections Crypto n'est pas vide sinon il la rempli avec des données d'exemple. Celui ci devrait s'executer si vous redémarrez votre serveur.

Et voila une belle page d'accueil !

## Debriefing
En général vous ne ferait que ça, publier des données, souscrire à des publications et vous servir des helpers pour transférer ces données au template que vous affichez.

Vous pouvez maintenant commit vos changements, `git checkout etape_3` et lire le **README.md** de cette branche.




