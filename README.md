# Bitdenver (Etape 3)

Un clone de bittrex dans le cadre du cours de CARA

## Objectifs
- Simuler de l'activité sur notre site pour constater la réactivité
- Faire une nouvelle page et gérer le routing vers celle-ci

## Bébé t'as déjà simulé ?
Que diriez de mettre à jour en temps réel (avec des données random bien sûr) les taux des monnaies affichés sur la page d'acceuil ?

Allez voir le fichier `imports/api/crytocurrency/server/simulator.js`

Vous remarquez que ce fichier est chargé seulement du côté serveur, donc c'est bien le serveur qui met à jour la données dans la bdd.

Que fait ce script ? Il génère tout simplement un nouveaux taux aléatoirement pour chaque cryptomonnaie.
Pour activer le script changer `false` à `true` et aller sur votre [site](localhost:3000).

Vous avez là un exemple de réactivité car si vous  ouvrez à côté un autre navigateur en mode privé (ou votre chrome sur votre portable) et vous verrez que la données se met à jour en temps réel chez tout le monde !

On pourrai très bien remplacer ce code par un appel REST 😊 (Mais nous ne le faisons pas car on a peur des imprévu avec le proxy etc ..).

## Afficher une nouvelle page
Il existe plusieurs librairie de routing pour Meteor sachant qu'il préconise d'utiliser FlowRouter combiné avec BlazeLayout. Nous les avons déjà intégré dans le projet ;) (rapellez vous le gros meteor npm install)

FlowRouter permet de définir des fonctions qui vont être exécutées selon l'url tandis que BlazeLayout va permettre de choisir le composant à afficher à l'endroit ou l'on veut.

Regardez le fichier `imports/startup/client/routes.js`
```js
// Page d'accueil
FlowRouter.route('/', {
  name: 'Crypto.showAll',
  action(params, queryParams) {
    BlazeLayout.render('app', { main: 'list_crypto' });
  },
});
```

Nous avons défini une route `/` vers la page d'accueil (le surnom `Crypto.showAll` ne nous servira pas). A chaque fois que vous afficherez la page d'accueil, la fonction `action` sera appelée.

Regardons de plus près la partie
```js
BlazeLayout.render('app', { main: 'list_crypto' });
```

Cette veut dire "Injecte le template `app` dans le body de mon site et modifie sa partie dynamique que j'ai appelé `main` ici pour y afficher le template `list_crypto`.

De ce fait nous avons du modifier un peu le code HTML pour que cela fonctionne.
Dans le fichier `/imports/ui/layouts/app.html` nous avons enlevé l'injection du template `app` (car BlazeLayout le fait à notre place) et dans le fichier `/imports/ui/components/content/content.html` nous avons ajouté le template dynamique `main` avec

```
{{> Template.dynamic template=main}}
```

Sachez que vous pouvez avoir plusieurs template dynamique dans votre site. Il faut qu'au moment d'y injecter un template avec BlazeLayout, vous ayez spécifié le même nom que celui définit après `template=`.

Enfin nous vous avons concoté un petit template `/imports/ui/pages/crypto_details/crypto_details.html` qui permet de voir le détail d'une cryptomonnaie et d'effectuer des transactions. (Excusez nous pour le mauvais goût en design 🤮).

Créez une route vers cette page !
.

.

.

.

.

.

.

C'est bon ? voici la solution
```js
// Page de détails d'une crypto monnaie
FlowRouter.route('/crypto/:code', {
  name: 'Crypto.show',
  action(params, queryParams) {
    console.log('Détails de ' + params['code'] + '!!');
    BlazeLayout.render('app', { main: 'crypto_details' });
  },
});
```

Vous apercevez dans ce petit bout de code que l'on attend un paramètre `:code` dans l'url. Celui ci est récupérable dans la variable params en faisant
```js
params.code // ou params['code']
```

NB : Le code d'une crypto est son nom abrégé exemple btc, xvg etc ... testez !

Vous pouvez aussi faire passer des paramètre de requete de cette manière `/crypto/:code?sort=:sort` et les récupérer de la même manière grâce à la variable queryParams.

Vous pouvez maintenant cliquer sur l'une des cryptomonnaie de la page d'accueil pour voir votre nouvelle page s'afficher ✨ !

## Clic clic !
Pour l'instant le bouton "Valider" ne permet pas de créer un ordre de vente.
Vous pourriez utiliser JQuery (bah oui, ca reste du JS avant tout !) mais il y'a mieux. Vous avez utilisé les helpers tout à l'heure, et bien vous avez la même chose avec les events !

Voici le code du template "Vendre" qui se trouve dans le fichier `/imports/ui/pages/crypto_details/sell_panel/index.js`

```html 
<template name="sell_panel">
    <div class="col s6 m6">
        <h2 id="sell">Vendre</h2>
        <form id="sellForm" class="col s12">
            <div class="row">
                <div class="input-field col s3 m4">
                    <input placeholder="ex: 1" min="0" step="any" id="nbCoins" name="nbCoins" type="number" class="validate" required/>
                    <label for="first_name">Nombre de {{infos.code}}</label>
                </div>
                <div class="input-field col s4">
                    <label>Total en $ : {{totalDollar}}</label>
                </div>
                <input class="input-field col s2 btn waves-effect waves-light" type="submit" name="sell" value="Vendre" />
                <input class="input-field col s2 btn waves-effect waves-light red" id="reset" type="reset" value="Effacer" />
            </div>
        </form>
    </div>
</template>
```

Ce qu'il faut remarquer c'est que nous avons un formulaire d'id `sellForm`, un input avec l'attribut name de valeur `nbCoins`, un label qui sera censé affiché la valeur en dollar de ce que vous tapez et un bouton pour valider la vente et un pour remettre à zéro la saisie.

Nous avons aussi créé pour vous une nouvelle collection du doux nom de Sales qui contiendra les ordres de vendres (en vente et vendu). La règle de gestion est que si le champs `buyerId` est vide c'est qu'il n'y a pas eu d'achat sinon c'est qu'il y a eu une réponse à l'ordre de vente.
```
buyerId = "" => En cours de vente
buyerId = "<l'id de lacheteur>" => Vendu
```

Allez dans le fichier `/imports/ui/pages/crypto_details/sell_panel/index.js` et observez y le code suivant

```
Template.sell_panel.events({
  'submit #sellForm'(event) {
    event.preventDefault(); // pour éviter de rafraichir la page au moment du clic
    // On créé notre objet en récupérant les bonne valeurs
    let sale = {
      code: FlowRouter.getParam('code'), // on récupère le code de la monnaie depuis l'url
      nbCoins: event.target.nbCoins.value, // on récupère la valeur saisie dans le champs qui à l'attribut name = à nbCoins
      dollarValue: Crypto.findOne({ code: FlowRouter.getParam('code') })
        .dollarValue, // on va chercher le taux en dollar de la monnaie
      owner: Meteor.userId(), // On récupère l'id du user actuel
      username: Meteor.user().username, // On récupère le pseudo du user actuel
    };
    console.log (sale);

    // Insérer l'appel à la méthode Sales.sell
  },
});
```

Les commentaires parlent d'eux même. Le plus important ici est d'utiliser l'objet sale généré par nos soins pour l'insérer en base du côté serveur. Mais comment faire ? Si vous avez écoutez la présentation, vous avez dû entendre parler des Méthodes !

### Insérer en base avec les méthodes
Une méthode est une fonction définit du côté client **ET** serveur. Cette fonction nous rapelle un peu les webservice que l'on code: Le serveur expose des webservices et le client les appelles.

Pour déclarer une méthode qui permet d'insérer un objet sale dans la pase collection Sales, insérer le code suivant dans le fichier `/imports/api/sales/methods.js`

```js
Meteor.methods({
  // Permet de vendre de la monnaie
  'Sales.sell'(sale) {
      Sales.insert(sale); // ajout de la vente
    }
  }
});
```

Voila comment on déclare des méthodes. Mais ATTENDEZ NE CLIQUEZ SUR RIEN ! Sinon vous allez insérer des données non cohérentes. Il faut quand même vérifier si le portefeuille de l'utilisateur permet cette transaction. Voici une version un peu plus complète
```js
Meteor.methods({
  // Permet de vendre de la monnaie
  'Sales.sell'(sale) {
    // le nombre de coins à vendre
    const nbCoins = sale.nbCoins;

    // le portefeuille du vendeur pour la monnaie spécifique
    const wallet = Wallets.findOne({
      $and: [{ code: sale.code }, { owner: sale.owner }],
    });

    if (wallet.nbCoins < nbCoins) {
      // Si le le vendeur veut vendre plus que ce qu'il ne possède, on le fouette généreusement d'une erreur assaisonée
      throw new Meteor.Error(
        'not-enough-money',
        "Vous n'avez pas assez de coins"
      );
    } else {
      // sinon on lui prend la thunes en attendant un acheteur
      Wallets.update({ _id: wallet._id }, { $inc: { nbCoins: -nbCoins } }); // baisse de la valeur du portefeuille
      Sales.insert(sale); // ajout de la vente
    }
  },

});
```

On vous laisse lire les commentaire 😇

Ensuite pour appeler cette méthode du côté client il suffit d'écrire
```js
Meteor.call('Sales.sell', sale);
```

de la même manière voici une version plus complète à mettre à l'emplacement du TODO dans `/imports/ui/pages/crypto_details/sell_panel/index.js`:

```js
Meteor.call('Sales.sell', sale, (err, res) => {
    if (err) {
    Materialize.toast(err.reason, 4000, 'rounded');
    } else {
    Materialize.toast(
        "Ordre de vente validé, en attente d'achat!",
        4000,
        'rounded'
    );
    event.target.nbCoins.value = '';
    }
});
```

## Exercice
Bon on vous a assez guidé pour la création de template donc on va vous faire bosser un tout petit peu :) (Vous aurez la correction dans la branche suivante mais pas de triche hein !)

Vous allez implémenter dans le dossier `/imports/ui/pages/crypto_details` la partie "Acheter" qui est réprésenté par le dossier du template `sale_orders`

### Consigne

Affichez la liste des ordres de ventes (sauf celle de l'utilisateur connecté) avec un bouton acheter qui permet de répondre à un ordre de vente.

### Indications
Pour vous aider, vous aurez besoin de :
- Meteor.userId() permet de récupérer du côté client **MAIS AUSSI** serveur l'id de l'utilisateur connecté et qui à fait l'action
- La publication et la souscription de la collection Sales à déjà été faite pour vous donc vous pouvez utiliser la collection du côté client pour faire des requête dessus.
    - D'ailleurs la souscription à été faite dans le template parent `crypto_details` qui transmet à tout les template enfants dont `saleOrders`
- Vous devez utiliser un helper pour récupérer les ordres de ventes de la consigne
- Vous devez créer un event qui répondra au clic du bouton "Acheter".
    - Utilisez l'évenement 'click .buyButton'
- Vous devez créer une Méthode 'Sales.buy' et l'apeller
    - Le code d'un achat est le suivant:
```js
const wallet = Wallets.findOne({
      $and: [{ code: sale.code }, { owner: Meteor.userId() }],
    });
    const USDTwallet = Wallets.findOne({
      $and: [{ code: 'usdt' }, { owner: Meteor.userId() }],
    });
    const nbCoins = sale.nbCoins;
    const total = sale.nbCoins * sale.dollarValue;

    // on vérifie si on peut acheter avec l'usdt (portefeuille en dollar $)
    if (USDTwallet.nbCoins < total) {
      throw new Meteor.Error(
        'not-enough-money',
        "Vous n'avez pas assez d'argent en $"
      );
    } else {
      // Si c'est bon on vend à l'acheteur !
      Sales.update(
        { _id: sale._id, buyerId: '' },
        {
          $set: {
            buyerId: Meteor.userId(),
            buyerUsername: Meteor.user().username,
          },
        }
      );
      // on décrémente le compte USDT de l'acheteur
      Wallets.update({ _id: USDTwallet._id }, { $inc: { nbCoins: -total } });
      // on incrémente le compte USDT du vendeur au taux acheté
      Wallets.update(
        { owner: sale.owner, code: 'usdt' },
        { $inc: { nbCoins: total } }
      );
      // on incrémente le nbCoins de l'acheteur
      Wallets.update({ _id: wallet._id }, { $inc: { nbCoins: nbCoins } });
    }
```

Si vous avez des questions n'hésitez pas !

## Debriefing
Alors pas trop dur n'est ce pas ? Meteor est la pour vous simplifier la récupération et l'affichage de données pendant que vous vous concentrez sur le fonctionnel de votre application.

Vous pouvez maintenant commit vos changements, `git checkout etape_4` et lire le **README.md** de cette branche.

La partie prochaine est pour ceux qui auraient fini avant tout le monde donc vous pressez pas prenez une petite pause 🥛🍞