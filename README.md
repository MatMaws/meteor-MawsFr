# Bitdenver
Un clone de bittrex dans le cadre du cours de CARA
---
![logo](public/img/denverlogo.png)
## Introduction
Après Moussbernate, l'équipe MatMaws vous présente la réécriture, non pas d'un framework, mais d'un SITE COMPLET RÉACTIF : Bittrex (prononcez Bit-T-rex pour comprendre la référence à Denver trolol). 

Décidément, on ne l'arrête plus ce Mouss 👳

## Installation de Meteor
Bon c'est pas qu'on a pas le temps ... mais on a pas le temps, alors on va procéder à l'installation tout de suite !

### Tu es sur le PC de la fac

Tu es obligé de travailler sur le PC de la fac ? Pas de panique Piknik, on a aussi pensé à toi 😜

Il suffit de cloner le repo Github de Meteor dans le /local/<ton_nom>.

Tout d'abord lance un terminal et tape
```Shell
cd /local/<ton_nom>
```
Puis tape
```Shell
git clone https://github.com/meteor/meteor.git
```

Et c'est tout 😁

NB : Comme tu n'a pas les droits d'admin sur ta machine, tu ne peux pas rajouter l'executable de meteor dans la variable path !

Tu va donc devoir à chaque fois taper le chemin complet vers l'executable pour utiliser meteor (même si tu n'aura pas à le faire souvent).

Pour lancer l'executable il suffira de taper
```
/local/<ton_nom>/meteor/meteor
```

[TODO : VOIR SI ON PEUT PAS CRER UN ALIAS PLUTOT]

### Tu es sur ton PC perso ?

Tu peux aussi cloner le Github de meteor comme dans la partie **PC de la fac** et utiliser le bon executable. Tu peux même rajouter le chemin vers l'installation de meteor si ça te chante 👀

Sinon si tu préfère les bons vieux installateur je t'invite à aller directement sur [cette page](https://www.meteor.com/install) et de suivre les instructions 😉

NB : Si tu utilise windows (bouh !), tu dois d'abord installer chocolatery pour pouvoir ensuite télécharger meteor donc on te conseil la méthode du clone Github 😜

## Création d'un nouveau projet
Nous avons déjà initialisé le projet pour vous avec la commande
```
meteor create bitdenver
```

Simple non ? Après ça vous pouvez commencer à travailler !

La commande créé un projet de base avec les dossiers principaux client et server ainsi que tous les fichiers main.* .


> Sachez qu'il est possible d'avoir un dossier avec > une architecture plus complète en éxécutant la commande
> ``
> meteor create bitdenver --full
> ``.
>Essayez dans un autre dossier pour voir la différence !

Bon comme vous avez cloné un repo Github, il va falloir faire un 
```
npm install
```

Finiii on passe à la [suite]() !