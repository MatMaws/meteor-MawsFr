# Cahier des charges
Dans cette partie, nous allons voir ensemble ce que l'on va faire durant ces 2 dernières heures (2 j'ai raison ?).

>Sachez que Meteor est vraiment facile d'utilisation car il propose plein de packages tout fait qui vous rendent **très** productif. Il a été très dur pour nous de vous trouver un sujet qui vous fasse tenir 2h donc désolé si le sujet vous semble pas intéressant (on vous avait pourtant demandé ce qui vous interesserait 😝)
## Contexte globale
Nous voulons créer un site ou l'on va pouvoir acheter et vendre des cryptomonnaies (Crypto).
Les utilisateurs disposeront d'un portefeuille (Wallet) en dollar (qui sera de 76544 usdt (ou dollars) à l'inscription, oui c'est très généreux 💲💲💲) et qui permettra d'acheter des cryptomonnaies. L'utilisateur disposera aussi d'un portefeuille PAR cryptomonnaie qui permettra de stocker ses achat (Sales (même table que les ventes)). Il peut aussi choisir de vendre (Sales) des cryptomonnaie. Pour cela il entre un nombre de coins à vendre. Un coin à une valeur en dollars dont si je vendre 1 bitcoin à 10000 usdt l'acheteur doit disposer d'au moins 10000$. Lorsque l'on pose un ordre de vente, nous somme débité imédiatement des coins mis en vente jusqu'à l'achat par un acheteur, qui nous crédite en dollars (usdt) à l'issue de cette vente. 

Nous aurons donc trois pages
- La page d'accueil avec la liste des cryptomonnaies
- Une page de description de cryptomonnaie permettant d'en voir l'écolution et d'effectuer des transaction
- Une page (facultative) qui liste les ordres de ventes que l'on peut annuler.
  - Cette partie ne sera pas corrigé, vous êtes libre de la faire ou non

## Résumé des fonctionnalités
Voici ce l'application doit faire au final :
- Afficher une liste des cryptomonnaies
- Pouvoir cliquer sur l'une d'elle pour afficher sa fiche et son évolution en **temps réel** grâce à un graphique
- Pouvoir gérer l'inscription et l'authentification (avec Meteor c'est 2 à 5 lignes dont un import selon vos envie de configuration !!)
- Pouvoir poser un ordre d'achat
- Pouvoir répondre à un ordre d'achat
- Voir la liste des transactions effectuées

Rien que ça 😜

Vous êtes vraiment libre d'ajouter n'importe quelle fonctionnalité. Gardez à l'esprit que Meteor possède une [librairie de 10000 packages](https://atmospherejs.com/) donc avant de coder quoi que ce soit, allez y faire un tour pour voir si ce que vous souhaitez n'existe pas déjà. 
Vous pouvez aussi importer n'importe quel package npm grâce à la commande ``meteor npm install <nom_du_package_npm``> et l'importer à la main dans votre fichier Js (prenez exemple sur Chart JS utilisé dans ce tp).
Enfin, Vous pouvez bien entendu créer vos propres packages et les publier sur AtmosphereJS si l'envie vous prend 😃

## Rendu de l'application final

Comme vous devez vous en doutez, vous êtes seul ...

Voila je vous laisse sur çà aurevoir.

Plus sérieusement, votre application va tourner sur votre PC à vous et personne d'autre n'y aura accès donc pour tester c'est un peu pauvre. A moins de réussir à accéder au PC des autres par leur ip local vous serez seul à tester sa réactivité ...

Nous avons donc hébergé l'appli final pour que vous puissiez tester. Sinon vous pouvez la tester avec deux navigateur ou un navigateur en mode privé et un autre en mode normal, ça fonctionne aussi ;)

[PAR ICI](http://vps475963.ovh.net:3012/)

### Objectifs

* Afficher le menu
* Afficher le contenu (vide pour l'instant)
* Afficher le pied de page
* Ajouter l'authentification

### C'est parti

Comme nous l'avons dis pendant la présentation, nous allons utiliser le moteur de template Blaze créé pour Meteor.

#### Comment il fonctionne ?

En gros, vous allez créer des composants HTML appelés `template` qui sont les briques visuelles de votre application, par exemple "un menu", "un footer", "un panneau personalisé qui clignote" etc. Vous allez assembler ces templates pour créer des pages et ainsi votre site web. Ils permettent surtout de découper votre code en composant afin de ne pas avoir des gros morceau de page HTML dégeu. Il faut donc savoir comment bien découper votre site web.
Dans notre cas nous avons choisi d'avoir

* Un menu en haut
* Un pied de page en bas
* Et un contenu dynamique au milieu qui change selon la page que l'on veut afficher (Accueil, détails d'une cryptomonnaie).

### Votre premier template !

Le fichier `client/main.html` contient le body de votre application. Insérez entre les balises body

```
{{> app}}
```

Allez dans le fichier `imports/ui/layouts/app.html` et observez le code suivant

```html
<template name="app">
    <!-- TODO : Injectez la navbar, le content et le footer ici-->
    Hello world !
</template>
```

Rendez vous maintenant sur votre [site](localhost:3000) et observez. Vous venez d'injecter un template du nom de `app` dans le body. Entre les balise `template` vous pouvez mettre tout le code HTML que vous voulez et même injecter d'autres templates !

Et faire du templating avec Blaze ce n'est que ça, injecter des template et y afficher des données.

Vous pouvez maintenant injecter votre menu, votre contenu vide et votre pied de page à la place du Hello World.

```html
<template name="app">
    {{> navbar}}
    {{> content}}
    {{> footer}}
</template>
```

Simple non ?

### Afficher des données

Nous allons maintenant afficher une données récupérée depuis le JS. Cela vous sera très utile pour afficher des données de la base de données.
Allez dans le fichier `/imports/ui/components/navbar/index.js` et écrivez y (à la suite)

```js
Template.navbar.helpers({
  dollarWallet() {
    return 9876;
  },
  currency: 'dollars',
});
```

puis allez dans le fichier navbar.html et remplacer

```
Portefeuille: 0 $
```

par

```
Portefeuille: {{dollarWallet}} {{currency}}
```

Vous observez que le menu à changé pour

```
Portefeuille: 9876 dollars
```

#### Explication

La variable Template permet de recupérer n'importe quel template par son nom, ici `navbar`.
La fonction `helpers` permet de faire passer un objet au template. Cet objet peut contenir toutes les données que vous voulez (objet json ou fonction retournant un objet json) ! Et pour afficher les données vous l'avez fait avec {{nom_de_variable}} ou {{nom_de_fonction}}.

## Ajouter l'authentification
Vous êtes peut être en train de vous dire
> Et zut je vais encore devoir mettre en place l'authentification 😧

Allez dans le fichier `navbar.html` et modifiez comme ceci :
```html
<li>
    <!-- TODO : Injectez le bouton d'authentification -->
    {{> loginButtons}}
</li>
```
Et voila une authentification toute faite ! Votre site web s'est rafraichit tout seul, allez voir 😉

Vous préférez taper un pseudo au lieu d'une addesse pour vous connecter ?
Mettez ceci dans le fichier `/imports/startup/client/useraccounts-configuration.js`

```js
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY', // un pseudo au lieu d'un email pour l'authentification
});
```

Retournez sur votre site et voila 💘

Vous pouvez créer des comptes sur votre site maintenant ! (Faites en aux moins deux pour les tests).

## Et voilà, it just works !

Excusez nous des problèmes de CSS, on a pas eu le temps de les corriger 😰 #jeSuisPEPIT. Après bon on vous a évité une authent fastidieuse vous pouvez pas nous en vouloir :3.

Vous n'aurez jamais de merge à faire dans ce tutoriel, nous vous donnons à chaque fois la correction donc vous pouvez maintenant commit vos changements (`git add .` et `git commit -m "fini"` ou `git stash`) et faire un `git checkout etape_2` et lire le fichier **README.md** de cette branche.