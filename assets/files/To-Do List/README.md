# To-Do List Application

Cette application est une solution complète pour gérer une liste de tâches. Elle offre des options avancées de filtrage, modification et suppression de tâches, ainsi qu'un mode sombre pour une expérience utilisateur optimale. Les tâches sont persistées dans le navigateur via localStorage, garantissant leur sauvegarde même après un rafraîchissement de la page.

## Fonctionnalités

- **Ajout de tâches**  
  - Ajoute une tâche avec une description, une catégorie et une priorité.
  - Possibilité de créer une nouvelle catégorie si celle souhaitée n'est pas disponible.

- **Filtres dynamiques**  
  - Filtre les tâches par catégorie et par priorité.
  - Les filtres se mettent à jour automatiquement pour refléter les catégories actuellement utilisées (les anciens noms sont remplacés lors des modifications).

- **Modification des tâches**  
  - Permet d'éditer directement le texte et la catégorie d'une tâche.
  - La priorité reste figée pour garantir la cohérence.
  - Les champs éditables sont mis en évidence (avec des styles adaptés en mode clair et sombre) pour faciliter la modification.

- **Suppression des tâches**  
  - Supprime une tâche de la liste en un clic.
  
- **Mode sombre/clair**  
  - Permet de basculer facilement entre un mode sombre et un mode clair via un bouton.
  - Les préférences de mode sont sauvegardées dans le navigateur.

- **Animations et transitions**  
  - Des animations subtiles sont intégrées (apparition des tâches, survol des boutons) pour une interface moderne et agréable.
  
- **Persistance des données**  
  - Les tâches sont enregistrées dans le localStorage, ce qui permet de les retrouver après un rafraîchissement de la page.

## Installation

1. Clonez ce dépôt ou téléchargez les fichiers.
2. Ouvrez le fichier `index.html` dans votre navigateur.

## Fonctionnement

- **Ajout de tâche** :  
  Remplissez le formulaire en entrant la description de la tâche, en choisissant une catégorie (ou en créant une nouvelle catégorie si nécessaire) et en sélectionnant une priorité. Cliquez sur le bouton "Ajouter une tâche" pour ajouter la tâche à la liste.

- **Modification** :  
  Pour modifier une tâche, cliquez sur le bouton "✏️ Modifier" à côté de la tâche. Les champs de texte et de catégorie deviennent éditables et sont mis en évidence. Après modification, cliquez sur "💾 Enregistrer" pour sauvegarder les changements. La priorité reste inchangée.

- **Suppression** :  
  Cliquez sur le bouton "❌ Supprimer" pour retirer une tâche de la liste.

- **Filtres** :  
  Utilisez les menus déroulants dans la section "Filtres" pour afficher uniquement les tâches correspondant à une catégorie ou une priorité spécifique. Les filtres se mettent à jour automatiquement pour refléter les catégories actuelles.

- **Mode sombre/clair** :  
  Cliquez sur le bouton en haut à droite pour basculer entre le mode sombre et le mode clair. Votre préférence est sauvegardée et appliquée lors de vos prochaines visites.

## Technologies utilisées

- **HTML** : Structure et contenu de la page.
- **CSS** : Mise en forme, animations et responsive design.
- **JavaScript** : Logique d'interaction, gestion du localStorage, et fonctionnalités dynamiques.
