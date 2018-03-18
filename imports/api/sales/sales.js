import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// On crée la collection Sales
export const Sales = new Mongo.Collection('sales');

// On interdit les requetes direct sur la bdd depuis le client car on utilise les Méthodes pour le faire
Sales.deny({
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
Sales.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  code: {
    type: String,
    label: "Le code de la monnaie à laquelle appartient l'achat",
  },
  nbCoins: {
    type: Number,
    label: "Le nombre d'unité de la monnaie acheté (ex 1 BTC)",
  },
  dollarValue: {
    type: Number,
    label: "Le taux en dollar auquel l'achat à été fait",
    min: 0,
  },
  buyerId: {
    type: String,
    label: "L'id de l'acheteur",
    defaultValue: '',
    required: false,
  },
  buyerUsername: {
    type: String,
    label: "Pseudo de l'acheteur",
    defaultValue: '',
    required: false,
  },
  owner: {
    type: String,
    label: "L'id du vendeur",
  },
  username: {
    type: String,
    label: 'Pseudo du vendeur',
  },
});

// On lie la collection au schéma
Sales.attachSchema(Sales.schema);
