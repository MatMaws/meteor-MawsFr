# Bitdenver
Un clone de bittrex dans le cadre du cours de CARA
---
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
cd /local/<ton_nom>
```
Puis tapez
```Shell
git clone https://github.com/meteor/meteor.git
```

Et c'est tout 😁

NB : Comme vous n'avez pas les droits d'admin sur votre machine, vous ne pouvez pas rajouter l'executable de meteor dans la variable path !

Vous allez donc à chaque fois devoir taper le chemin complet vers l'executable pour utiliser meteor (même si vous n'aurez pas à le faire souvent).

Pour lancer l'executable il suffira de taper
```Shell
/local/<ton_nom>/meteor/meteor
```

[TODO : VOIR SI ON PEUT PAS CRER UN ALIAS PLUTOT]

### Vous êtes sur votre PC perso ?

Vous pouvez aussi cloner le Github de meteor comme dans la partie **PC de la fac** et utiliser le bon executable. Vous pouvez même rajouter le chemin vers l'installation de meteor si ça vous chante 👀

Sinon si vous préfèrez les bons vieux installateur je vous invite à aller directement sur [cette page](https://www.meteor.com/install) et de suivre les instructions 😉

NB : Si vous utilisez windows (bouh !), vous devez d'abord installer chocolatery pour pouvoir ensuite télécharger meteor donc on vous conseil la méthode du clone Github 😜

## Création d'un nouveau projet
Nous avons déjà initialisé le projet pour vous avec la commande
```Shell
meteor create bitdenver
```

Simple non ? Après ça vous pouvez commencer à travailler !

La commande créé un projet de base avec les dossiers principaux client et server ainsi que tous les fichiers main.* .

> Sachez qu'il est possible d'avoir un dossier avec > une architecture plus complète en éxécutant la commande
> ``Shell
> meteor create bitdenver --full
> ``.
>Essayez dans un autre dossier pour voir la différence !

Bon comme vous avez cloné un repo Github, il va falloir faire un 
```Shell
npm install
```

## Lancement du serveur
 Pour lancer le serveur, tapez
 ```Shell
meteor
 ```
 dans le dossier de votre projet et attendez que ça vous et puis c'est tout ! Vous n'aurez jamais besoin d'arrêter votre serveur !


Finiii on passe à la [suite](FEATURES.md) !