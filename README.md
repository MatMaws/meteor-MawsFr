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

### L'historique des taux ?
A chaque fois qu'un taux est généré, il faut le sauvegarder dans une liste de taux en base. Pour cela nous avons créé une collection History (et son schéma) qui stock pour chaque code de cryptomonnaie une liste des taux de celle-ci.

Vous pouvez retrouver le tout dans `/imports/api/history/history.js`

Lisez les commentaires ;)

Nous avons aussi mis à jour le simulateur pour sauvegarder les taux au fur et à mesure qu'ils sont généré en ajoutant cette partie dans le fichier `/imports/api/crytocurrency/server/simulator.js`
```js
History.update(
  { code: element.code },
  {
    // Ajout d'une valeur
    $push: {
      // à ce tableau :
      dollarValues: {
        $each: newDollarValue, // la nouvelle valeur à ajouter
        $slice: -10, // on ne garde que les 10 dernières entrées
      },
    },
  }
);
```

Insérez ce code dans le fichier `/imports/ui/pages/crypto_details/history/history.html`

```html
<template name="history">
    <canvas style="width: 512px; height: 100px;" id="historyChart"></canvas>
</template>
```

puis dans le fichier `/imports/ui/pages/crypto_details/history/history.js`
```js
Template.history.onCreated(function() {
  this.getListId = () => FlowRouter.getParam('code');
  this.renderChart = () => this.chart.update(0); // fonction qui permet de mettre à jour l'affichage du graphique
  const instance = this;

  this.autorun(() => {
    // on n'oublie pas la petite souscription à la collection History
    this.subscribe('History.code', { code: this.getListId() });
  });
  History.find({ code: FlowRouter.getParam('code') }).observeChanges({
    // A chaque mise à jour des taux cette fonction est appelée
    changed(id, fields) {
      // On rafraichit le graphique
      instance.renderChart(instance);
    },
  });
});

Template.history.onRendered(function() {
  this.autorun(() => {
    if (this.subscriptionsReady()) { // Une fois que les données sont disponibles, on peut les utiliser dans notre composant
      var ctx = document.getElementById('historyChart').getContext('2d');
      this.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: History.findOne({ code: FlowRouter.getParam('code') })
            .dollarValues,
          datasets: [
            {
              label: 'Historique des taux',
              backgroundColor: 'rgb(84, 173, 200)',
              borderColor: 'rgb(70, 130, 150)',
              data: History.findOne({ code: FlowRouter.getParam('code') }) // données récupérées de la base
                .dollarValues,
              borderWidth: 3,
            },
          ],
        },

        // Configuration options go here
        options: {
          showXLabels: 10,
          responsive: true,
          events: [],
          showTooltips: true,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                },
                ticks: {
                  // max: 10,
                  stepSize: 10,
                  autoSkip: true,
                  maxTicksLimit: 10,
                  fixedStepSize: 10,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  max: 10000,
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Taux ($)',
                },
              },
            ],
          },
        },
      });
      this.renderChart();
    }
  });
});
```

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
