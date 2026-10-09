# Visoriz

Site vitrine de pré-lancement de l'agence Visoriz — « Votre ambition, notre création. »

## Pages
- `index.html` : présentation de l'agence, tarifs, prise de contact en préparation.
- `demos/fleuriste.html`, `demos/boulangerie.html`, `demos/coiffure.html`, `demos/artisan.html` : démonstrations fictives navigables.

## Tester
Ouvrir `index.html` dans un navigateur, ou déployer le dossier sur un hébergeur statique tel que Cloudflare Pages.

## Avant la commercialisation
- Renseigner l'adresse dans `const email='';` en bas de `index.html` pour activer la préparation du message via le logiciel de messagerie du visiteur. Une adresse vide bloque volontairement l'envoi.
- Prévoir une vraie réception de formulaire (backend ou prestataire), politique de confidentialité et mentions légales.
- Vérifier la marque Visoriz, enregistrer le domaine et définir les contrats, les frais de domaine/hébergement et les limites de prestation.
- Vérifier les liens, l'accessibilité et les usages commerciaux de l'hébergement.
- La formule boutique partenaire est une proposition, sans paiement intégré ni contrat actif.

## Déploiement gratuit de test
Sur Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect Git, sélectionner ce dépôt et choisir la branche main. Projet statique sans commande de build, répertoire de sortie racine du dépôt.
