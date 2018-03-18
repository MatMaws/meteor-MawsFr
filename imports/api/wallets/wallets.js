import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// On crée la collection Wallets
export const Wallets = new Mongo.Collection('wallets');

// On interdit les requetes direct sur la bdd depuis le client
Wallets.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

// On créé le schéma
Wallets.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  code: {
    type: String,
    label: 'Le code de la monnaie',
  },
  nbCoins: {
    type: Number,
    label: "Le nombre d'unité",
    min: 0,
  },
  owner: {
    type: String,
    label: "L'id du compte associé au portefeuille",
  },
  username: {
    type: String,
    label: 'Pseudo du possésseur du portefeuille',
  },
});

// On lie la collection au schéma
Wallets.attachSchema(Wallets.schema);