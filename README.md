# Bitdenver (Etape 2)

Un clone de bittrex dans le cadre du cours de CARA

## Objectifs
- Afficher la liste des cryptomonnaies sur la page d'accueil

## C'est parti
En réusmé voici comment on va procéder
- On créé le schéma de la collection contenant la liste de cryptomonnaie
- On rempli cette table automatiquement au démarrage du serveur si elle est vide, avec des données sur les cryptomonnaies
- On publie ces données du côté serveur et on y souscris du côté client
- On créé et on on inject un composant qui qui va afficher ces données récupérées
- On utilise les helpers pour les passer au composant
- On mange une pomme.

### Les schéma de collection
Comme dans une base de données relationnel, il est possible de définir un schéma de table pour spécifier quels sont les champs que notre table peut accepter.

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
Quand un utilisateur est créé, il faut initialiser ses portefeuille.

Dans le fichier `/imports/startup/server/wallets-hook.js` vous pouvez voir que l'on se sert de la fonction `Accounts.onCreateUser` pour intercepter la création d'un utilisateur et que dans le corps de cette fonction on ajouter le wallet en dollar et un wallet par cryptomonnaie.

### Affichage des cryptomonnaies
Insérez le template suivant dans le fichier `/imports/pages/list_cryptos/list_crypto.html`
```html
<template name="list_crypto">
    <div class="row">
        <!-- liste des cryptos -->
        {{# each cryptos}}
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