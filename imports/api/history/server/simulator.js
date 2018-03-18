import { Crypto } from '../../crytocurrency/crytocurrency.js';
import { History } from '../../history/history.js';

if (false) {
  // Toute les 3 secondes (cf plus bas pour la config du timer)
  Meteor.setInterval(function() {
    // Pour chaque crypto
    Crypto.find({}).forEach(element => {
      // on génère un nouveau taux
      const newDollarValue = Math.floor(Math.random() * 10000 + 1); 

      Crypto.update(
        { _id: element._id },
        { $set: { dollarValue: newDollarValue } }
      );
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
    });
  }, 3000);
}
