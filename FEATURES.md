# Cahier des charges

Dans cette partie, nous allons voir ensemble ce que l'on va faire durant ces 2 dernières heures (j'ai raison ?).

> Sachez que Meteor est vraiment facile d'utilisation car il propose plein de packages tout fait qui vous rendent **très** productif. Il a été très dur pour nous de vous trouver un sujet qui vous fasse tenir 2h donc désolé si le sujet vous semble pas intéressant (on vous avait pourtant demandé ce qui >vous interesserait 😝)

## Résumé des fonctionnalités

Voici ce l'application doit faire au final :

* Afficher une liste des cryptomonnaies
* Pouvoir cliquer sur l'une d'elle pour afficher sa fiche et son évolution en **temps réel** grâce à un graphique
* Pouvoir gérer des utilisateurs (avec Meteor c'est 2 à 5 lignes dont un import selon vos envie de configuration !!)
* Pouvoir poser un ordre de vente
* Pouvoir répondre à un ordre de vente

Vous êtes vraiment libre d'ajouter n'importe quelle fonctionnalité. Gardez à l'esprit que Meteor possède une [librairie de 10000 packages](https://atmospherejs.com/) donc avant de coder quoi que ce soit, allez y faire un tour pour voir si ce que vous souhaitez n'existe pas déjà. Vous pouvez bien entendu créer vos propres packages et les publier sur AtmosphereJS si l'envie vous prend 😃

## Rendu de l'application final

Comme vous devez vous en doutez, vous êtes seul ...

Voila je vous laisse sur çà aurevoir.

Plus sérieusement, votre application va tourner sur votre PC à vous et personne d'autre n'y aura accès donc pour tester c'est un peu pauvre. A moins de réussir à accéder au PC des autres par leur ip local vous serez seul à tester sa réactivité (sur plusieurs navigateurs en même temps par exemple oui bien vu Jean Maxime !)

Nous avons donc hébergé l'appli final sur heroku pour que vous puissiez tester.

Essayez là afin de bien comprendre le besoin !!!

* [ ] Mettre le lien vers l'appli

## 1) Les bases déjà posées

### Objectifs

* Afficher le menu
* Afficher le contenu (vide pour l'instant)
* Afficher le pied de page
* Ajouter l'authentification

### C'est parti

Comme nous l'avons dis pendant la présentation, nous allons utiliser le moteur de template Blaze créé pour Meteor.

#### Comment il fonctionne ?

En gros, vous allez créer des composants HTML appelés `template` qui sont les briques visuels de votre application, par exemple "un menu", "un footer", "un panneau personalisé qui clignote" etc. Vous allez assembler ces templates pour créer des pages et ainsi votre site web. Ils permettent surtout de découper votre code en composant afin de ne pas avoir des gros morceau de page HTML dégeu. Il faut donc savoir comment découper votre site web.
Dans notre cas nous avons choisi d'avoir

* Un menu en haut
* Un pied de page en bas
* Et un contenu dynamique au milieu qui change selon la page que l'on veut afficher (Accueil, détails d'une cryptomonnaie).

### Votre premier template !

Le fichier `client/main.html` contient le body de votre application. Insérez entre les balises body

```
{{> app}}
```

Allez dans le fichier `imports/startup/ui/layouts/app.html` et observez le code suivant

```html
<template name="app">
    <!-- TODO : Injectez la navbar, le content et le footer ici-->
    Hello world !
</template>
```

Rendez vous maintenant sur votre [site](localhost:3000) et observez. Vous venez d'injecter un template du nom de `app` dans le body. Entre les balise `template` vous pouvez mettre tout le code HTML que vous voulez et même injecter d'autres templates !

Et faire du templating avec Blaze ce n'est que ça, injecter des template et y afficher des données.

Vous pouvez maintenant injecter votre menu, votre contenu vide et votre pied de page à l'emplacement du TODO.

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
Allez dans le fichier `/imports/ui/navbar/index.js` et écrivez

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

Vous observez

```
Portefeuille: 9876 $
```

#### Explication

La variable Template permet de recupérer n'importe quel template par son nom, ici `navbar`.
La fonction `helpers` permet de faire passer un objet au template. Cet objet peut contenir toutes les données que vous voulez ! Et pour afficher les données vous l'avez fait avec {{nom_de_variable}} ou {{nom_de_fonction}}.

<!-- ### Les points d'entrés -->

<!-- Si vous regardez dans les dossier `client` et `server` à la racine du projet, vous pouvez apercevoir deux fichiers qui contiennent chacun des imports qui pointent sur les fichiers **index.js** des sous-répertoires du dossier `/imports/startup`. Rapellez vous que les fichier main.\* sont chargés en dernier, donc le code des fichiers importés est executé avant. -->

## Et voilà, it just works !

Alors c'est pas plaisant de coder avec ce framework avouez ?

Ça a vraiment été pensé pour que vous n'ayez pas à coder les routines que l'on connais tous à base de promise et de callbacks. Tous est géré par Meteor.

Si vous avez fini avant tous le monde, vous êtes génial.
Si ça vous dit vous pouvez vous amuser à coder un jeu en temps réel avec Phaser et Meteor.

Sinon lisez la [dernière partie](PRODUCTION.md) du tuto même si vous n'allez plus coder à partir de maintenant.
