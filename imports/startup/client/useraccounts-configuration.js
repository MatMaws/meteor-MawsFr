import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY', // un pseudo au lieu d'un email pour l'authentification
});
