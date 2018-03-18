# Bitdenver (Etape 4 BONUS)

Un clone de bittrex dans le cadre du cours de CARA

## Objectifs

* Ajouter un beau graphique gardant l'historique des 10 derniers taux de la monnaie en cours d'affichage
* Afficher la valeur en dollar de la saisie

## Utiliser des package NPM c'est aussi possible !
Comme nous vous l'avons dis pendant la prez', il est possible d'utiliser des package npm. Nous allons afficher un graphique permettant de voir l'évolution du cours de la monnaie.

Nous avons importer pour vous la librairie Chart JS qui permet de faire des graphique avec la commande

```
npm install chart.js --save
```
Il suffit maintenant d'utiliser la librairie comme vous le feriez dans n'importe quel autre projet js.

Insérez ce code dans le fichier `/imports/ui/pages/crypto_details/history/history.html`

```html
<template name="history">
    <canvas style="width: 512px; height: 100px;" id="historyChart"></canvas>
</template>
```

puis dans le fichier `/imports/ui/pages/crypto_details/history/history.html`


## Et voilà, it just works !

Alors c'est pas plaisant de coder avec ce framework avouez ?

Ça a vraiment été pensé pour que vous n'ayez pas à coder les routines que l'on connais tous à base de promise et de callbacks. Tous est géré par Meteor et `it just works` 🌻

Si vous avez fini avant tous le monde, vous êtes génial. Si vous voulez vous pouvez aussi réaliser les tâches suivantes:
- Coder la page "Mes ordres de vente" (pas de correction vous êtes des pros maintenant)
    - La page doit afficher tous VOS ordres de ventes auquels aucun acheteur n'a encore répondu et de proposer un bouton "Annuler l'ordre" à droite de chacun pour être remboursé
- Vous pouvez vous amuser à aller chercher les vrais Volume et Taux grâce à des requetes ajax (cf diapo), et les afficher en temps réel sur votre magnifique site 😃
- On ne sais pas vraiment quand un ordre de vente à trouvé un acheteur. Peut-etre afficher un Toast materialize lorsque l'on vent de la cryptomonnaie ?
- Paginer la section transations ?

Sinon si ça vous dit sachez que vous pouvez aussi coder des jeux en temps réel avec Phaser et Meteor. Essayez de faire un Mario multijoueur (en reprenant les exemple de Phaser bien sûr).

Sinon lisez la [dernière partie](PRODUCTION.md) du tuto même si vous n'allez plus coder à partir de maintenant. On vous y montre comment sécuriser votre application contre les gentils utilisateurs qui voudraient se faire un virement de 1000 BTC de votre compte au leur 😎.
