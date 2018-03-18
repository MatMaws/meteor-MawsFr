import { Crypto } from '../crytocurrency.js';

if (true) {
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
    });
  }, 3000);
}
