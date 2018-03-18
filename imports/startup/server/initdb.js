import { Meteor } from 'meteor/meteor';
import { Crypto } from '../../api/crytocurrency/crytocurrency.js';

// Si la collection Crypto est vide au démarrage, on la rempli avec les données sur les crypto monnaie
Meteor.startup(() => {
  if (Crypto.find().count() === 0) {
    console.log(
      'Premier lancement, insertion de données dans la collection Crypto'
    );
    const cryptos = [
      {
        code: 'btc',
        name: 'Bitcoin',
        volume: 1000000,
        dollarValue: 10000,
      },
      {
        code: 'bcc',
        name: 'Bitcoin Cash',
        volume: 1000000,
        dollarValue: 1000,
      },
      {
        code: 'eth',
        name: 'Ethereum',
        volume: 1000000,
        dollarValue: 650,
      },
      {
        code: 'ltc',
        name: 'Litecoin',
        volume: 1000000,
        dollarValue: 166,
      },
      {
        code: 'xlm',
        name: 'Stellar Lumen',
        volume: 1000000,
        dollarValue: 0.3,
      },
      {
        code: 'xmr',
        name: 'Monero',
        volume: 1000000,
        dollarValue: 230,
      },
      {
        code: 'xrp',
        name: 'Ripple',
        volume: 1000000,
        dollarValue: 0.7,
      },
      {
        code: 'xvg',
        name: 'Verge',
        volume: 1000000,
        dollarValue: 0.03,
      },
    ];

    cryptos.forEach(crypto => {
      console.log('Insertion de ' + crypto.name);
      Crypto.insert({
        code: crypto.code,
        name: crypto.name,
        volume: crypto.volume,
        dollarValue: crypto.dollarValue,
      });
    });
  }
});
