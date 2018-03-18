import './sell_panel.html';

import { Template } from 'meteor/templating';
import { Crypto } from '../../../../api/crytocurrency/crytocurrency';
import { Meteor } from 'meteor/meteor';

// TODO Insérer la gestion des évènements

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
    console.log(sale);

    // TODO : Insérer l'appel à la méthode Sales.sell
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
  },
});
