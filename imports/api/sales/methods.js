import { Meteor } from 'meteor/meteor';
import { Sales } from './sales';
import { Wallets } from '../wallets/wallets.js';

// TODO : Insérer vos méthodes

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
  'Sales.buy'(sale) {
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
  }
});
