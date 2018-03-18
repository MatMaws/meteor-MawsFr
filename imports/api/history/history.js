import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// On crée la collection History
export const History = new Mongo.Collection('history');

History.deny({
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
History.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  code: {
    type: String,
    label:
      'Les trois ou quatre lettres représentant la monnaie (eg. btc, xlm, ...)',
  },
  dollarValues: {
    type: Array, // Le type est une liste de valeur (les taux à historiser)
    label: 'Les taux historisés',
  },
  'dollarValues.$': {
    // ici on défini de quel type seront les éléments du tableau ci dessus (avant on écrivait [Number] directement dans la déclaration ci dessus)
    type: Number,
  },
});

// On attache le schéma à la collection. De ce fait, lors de l'insertion, une validation automatique des données sera faite selon les contraintes.
History.attachSchema(History.schema);
