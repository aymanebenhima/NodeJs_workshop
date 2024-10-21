# Checkpoint : Manipulation de la base de données avec Mongoose

## Objectif

Dans ce checkpoint, vous allez suivre une série d'instructions guidées pour manipuler et gérer votre base de données à l'aide de **Mongoose**.

**Note** : N'oubliez pas de commenter votre code avant de le soumettre.

## Instructions

### 1. Installation et configuration de Mongoose

- **Étape 1** : Ajoutez MongoDB et Mongoose au fichier `package.json` de votre projet.
  
- **Étape 2** : Stockez l'URI de votre base de données MongoDB Atlas dans le fichier `.env` en tant que variable privée `MONGO_URI`. Entourez l'URI de guillemets simples ou doubles, et assurez-vous qu'il n'y ait pas d'espace entre la variable et le signe `=`.

- **Exemple** : 

  ```bash
  MONGO_URI='votre_chaine_de_connexion_mongodb'
  ```

- **Étape 3** : Connectez-vous à la base de données avec la syntaxe suivante :

  ```javascript
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  ```

### 2. Création d'un schéma pour le modèle "Person"

Créez un schéma `Person` avec la structure suivante :

- **Prototype de Personne :**

  - `name`: chaîne de caractères [obligatoire]
  - `age`: nombre
  - `favoriteFoods`: tableau de chaînes de caractères

Utilisez les types de schéma de base de **Mongoose**. Vous pouvez également ajouter d'autres champs ou utiliser des validateurs simples comme `required` ou `unique`. Consultez la [documentation de Mongoose](https://mongoosejs.com/docs/guide.html) pour plus de détails.

### 3. Créer et enregistrer un document avec un modèle

- **Étape 1** : Créez une instance du modèle `Person` en utilisant le constructeur que vous avez défini.

- **Étape 2** : Passez à ce constructeur un objet contenant les champs `name`, `age`, et `favoriteFoods` dont les types doivent correspondre au schéma.

- **Étape 3** : Enregistrez l'instance en appelant la méthode `save()`, avec une fonction de callback suivant la convention Node.js.

- **Exemple** :

  ```javascript
  const person = new Person({ name: 'John', age: 30, favoriteFoods: ['Pizza', 'Pasta'] });
  
  person.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data);
  });
  ```

### 4. Créer plusieurs documents avec `model.create()`

- Utilisez la méthode `Model.create()` pour créer plusieurs documents en une seule opération. Passez un tableau d'objets à la méthode.

- **Exemple** :

  ```javascript
  Person.create([{ name: 'Alice', age: 25, favoriteFoods: ['Salade'] }, { name: 'Bob', age: 35, favoriteFoods: ['Sushi'] }], function(err, people) {
    if (err) return console.error(err);
    console.log(people);
  });
  ```

### 5. Rechercher des documents avec `model.find()`

Recherchez toutes les personnes ayant un nom spécifique en utilisant `Model.find()`.

- **Exemple** :

  ```javascript
  Person.find({ name: 'John' }, function(err, people) {
    if (err) return console.error(err);
    console.log(people);
  });
  ```

### 6. Utiliser `model.findOne()` pour retourner un document unique

Trouvez une seule personne dont un aliment préféré correspond à un aliment donné avec `Model.findOne()`.

- **Exemple** :

  ```javascript
  Person.findOne({ favoriteFoods: 'Pizza' }, function(err, person) {
    if (err) return console.error(err);
    console.log(person);
  });
  ```

### 7. Rechercher par `_id` avec `model.findById()`

Trouvez une personne à partir de son `_id` avec `Model.findById()`.

- **Exemple** :

  ```javascript
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    console.log(person);
  });
  ```

### 8. Mettre à jour un document : Trouver, Modifier, puis Sauvegarder

- Trouvez une personne par `_id`, ajoutez `"hamburger"` à la liste de ses `favoriteFoods` (utilisez `Array.push()`), puis sauvegardez le document mis à jour.

- **Exemple** :

  ```javascript
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    person.favoriteFoods.push('hamburger');
    person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      console.log(updatedPerson);
    });
  });
  ```

### 9. Mise à jour avec `model.findOneAndUpdate()`

Trouvez une personne par nom et définissez son âge à 20 ans avec `Model.findOneAndUpdate()`.

- **Exemple** :

  ```javascript
  Person.findOneAndUpdate({ name: 'John' }, { age: 20 }, { new: true }, function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log(updatedPerson);
  });
  ```

### 10. Supprimer un document avec `model.findByIdAndRemove()`

Supprimez une personne par son `_id` avec `Model.findByIdAndRemove()`.

- **Exemple** :

  ```javascript
  Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) return console.error(err);
    console.log(removedPerson);
  });
  ```

### 11. Supprimer plusieurs documents avec `model.remove()`

Supprimez toutes les personnes ayant pour nom "Mary" avec `Model.remove()`.

- **Exemple** :

  ```javascript
  Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) return console.error(err);
    console.log(result);
  });
  ```

### 12. Chaîner les requêtes pour affiner les résultats

Trouvez des personnes qui aiment les burritos, triez-les par nom, limitez les résultats à deux documents, et masquez leur âge.

- **Exemple** :

  ```javascript
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec(function(err, people) {
      if (err) return console.error(err);
      console.log(people);
    });
  ```