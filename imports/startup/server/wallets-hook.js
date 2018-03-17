import { Accounts } from 'meteor/accounts-base';

import { Crypto } from '../../api/crytocurrency/crytocurrency.js';
import { Wallets } from '../../api/wallets/wallets.js';

// Les action dans cette fonction seront executées à la création d'un user
Accounts.onCreateUser((options, user) => {
  // On se met du flouze en dollar à volonté pour acheter du kebab par palette
  Wallets.insert({
    code: 'usdt',
    nbCoins: 76544,
    owner: user._id,
    username: user.username,
  });
  //Puis on créé chaque portefeuille
  // $ne = not equal
  Crypto.find({ code: { $ne: 'usdt' } }).forEach(crypto => {
    Wallets.insert({
      code: crypto.code,
      nbCoins: Math.floor(Math.random() * 1000 + 1),
      owner: user._id,
      username: user.username,
    });
  });
  return user;
});
