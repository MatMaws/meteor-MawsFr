# Bitdenver

## Un clone de Bittrex dans le cadre du cours de CARA

![logo](public/img/denverlogo.png)

## Introduction

Après Moussbernate, l'équipe MatMaws vous présente la réécriture, non pas d'un framework, mais d'un SITE COMPLET RÉACTIF : Bittrex (prononcez Bit-T-rex pour comprendre la référence à Denver trolol).

Décidément, on ne l'arrête plus ce Mouss 👳

## Installation de Meteor

Bon c'est pas qu'on a pas le temps ... mais on a pas le temps, alors on va procéder à l'installation tout de suite !

### Vous êtes sur le PC de la fac

Vous êtes obligé de travailler sur le PC de la fac ? Pas de panique Piknik, on a aussi pensé à vous 😜

Il suffit de cloner le repo Github de Meteor dans le /local/<ton_nom>.

Tout d'abord lancez un terminal et tapez

```Shell
cd /local/<votre_nom>
```

Puis tapez

```Shell
git clone https://github.com/meteor/meteor.git
```

Et c'est tout 😁

NB : Comme vous n'avez pas les droits d'admin sur votre machine, vous ne pouvez pas rajouter l'executable de meteor dans la variable path ! Si vous le souhaitez vous pouvez toujours créer un alias (dans votre bashrc) sur l'executable dont le chemin complet est

```Shell
/local/<votre_nom>/meteor/meteor
```

ou utiliser le chemin complet à chaque fois (vous ne l'écrirez pas plus de deux fois pomis 🤞 non vraiment (je voulais juste tester le smiley ...))

### Vous êtes sur votre PC perso ?

Vous pouvez aussi cloner le Github de meteor comme dans la partie **PC de la fac** et utiliser le bon executable. Vous pouvez même rajouter le chemin vers l'installation de meteor votre PATH si ça vous chante 👀

Sinon si vous préfèrez les bons vieux installateur je vous invite à aller directement sur [cette page](https://www.meteor.com/install) et de suivre les instructions 😉

NB : Si vous utilisez windows (bouh !), vous devez d'abord installer chocolatery pour pouvoir ensuite télécharger meteor donc on vous conseil la méthode du clone Github qui marche très bien !! 😜

## Création d'un nouveau projet

Nous avons déjà initialisé le projet pour vous avec la commande

```Shell
meteor create bitdenver
```

Simple non ? Après ça vous pouvez commencer à travailler !

La commande `meteor create` créé un projet de base avec les dossiers principaux client et server ainsi que tous les fichiers main.\* .

> Sachez qu'il est possible d'avoir un dossier avec une architecture plus complète en éxécutant la commande
> `Shell meteor create bitdenver --full`.
> Essayez dans un autre dossier pour voir la différence !

Bon comme vous avez cloné un repo Github, il va falloir faire un

```Shell
meteor npm install
```

C'est l'équivalent du `npm install` sauf qu'il va aussi chercher les dépendances depuis AtmosphereJS donc ne l'oubliez pas 😃

## Lancement du serveur

Pour lancer le serveur, tapez

```Shell
meteor
```

ou

```Shell
/local/<votre_nom>/meteor/meteor
```

dans le dossier de votre projet et puis c'est tout ! Vous n'aurez jamais besoin d'arrêter votre serveur ! Plus jamais ! Même si vous installez ou désinstallez des dépendances.
Seulement lorsque vous toucherez à votre base à la main et encore, vous verrez ...

Finiii on passe à la [suite](FEATURES.md) !
