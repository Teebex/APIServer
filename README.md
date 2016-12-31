# APIServer
L'exploitation des données d'un IPX800 V4 est un bon prétexte pour découvrir node.js, git et github.
Je ne développe plus depuis 10 ans, ce projet est donc sans prétention.

##Configuration utilisée

**Un IPX800 V4** 
Il push actuellement 2 natures d'information :
- la consommation électrique : à chaque impulsion, un push est réalisé avec la valeur cumulée de la consommation
- la position des volets roulants : à chaque fin de mouvement, chaque volet (identifié par un ID) publie sa position
Je viens d'acquérir une extension X-THL, je compte tracer les évolutions de température, hygrométrie et luminosité très prochainement.


**Un NAS Synology avec une base MariaDB**


**Un PI 2 :** je n'ai pas été capable d'installer une version autre que 0.10 sur le DS209, j'ai donc choisi la solution de facilité pour héberger mon serveur.

##Evolutions
Actuellement le projet ne fait que capturer l'information. 
Les prochaines évolutions seront :
 - exporter les données en fichier csv (en vue de leur exploitation dans un tableur)
 - calculer / exposer la consommation électrique courante
 - proposer une représentation graphique des données
