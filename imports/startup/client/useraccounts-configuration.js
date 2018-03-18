import { Accounts } from 'meteor/accounts-base';
// TODO : Injecter le code pour l'authent

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY', // un pseudo au lieu d'un email pour l'authentification
});
