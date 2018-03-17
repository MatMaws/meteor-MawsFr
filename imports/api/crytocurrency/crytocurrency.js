import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// On crée la collection Crypto
export const Crypto = new Mongo.Collection('crypto');

// On interdit les requetes direct sur la bdd depuis le client car on utilise les Méthodes pour le faire
Crypto.deny({
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
Crypto.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "l'id de la cryptomonnaie",
  },
  code: {
    type: String,
    label:
      'Les trois ou quatre lettres représentant la monnaie (eg. btc, xlm, ...)',
  },
  name: {
    type: String,
    label: 'Le nom de la monnaie',
  },
  volume: {
    type: Number,
    label: 'Le capital que possède Bitdenver en cette monnaie',
    min: 0,
  },
  dollarValue: {
    type: Number,
    label: "La valeur en dollar d'une unité de la monnaie",
    min: 0,
  },
});

// On attache le schéma à la collection. De ce fait, lors de l'insertion, une validation automatique des données sera faite selon les contraintes.
Crypto.attachSchema(Crypto.schema);
