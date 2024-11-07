# OneScientificStudy OSS V2 2024 | Documentation
## Description

Ce projet est une application permettant de créer une étude scientifique multicentrique sur 6 mois de pendémie a l'hopital. Elle utilise .NET Core pour le Backend, PostgreSQL pour l'accès à la base de données et le Framework React pour le Frontend. Ce guide explique les principaux modèles et la configuration du fichier Program.cs.
Technologies Utilisées

- **ASP.NET Core 7.0** : Framework web pour construire l'API.
- **PostgreSQL** : Base de données utilisée pour stocker les entités.
- **React** : Framework web pour construire l'interface utilisateur.

## Architecture

L'API est construite selon une **architecture en couches** qui favorise une séparation claire des préoccupations, facilitant ainsi la maintenance et l'évolutivité de l'application. Voici les principales couches de l'architecture :

1. **Controllers**
   - Les contrôleurs sont responsables de la gestion des requêtes HTTP. Ils reçoivent les demandes des clients, interagissent avec la couche de services, et renvoient les réponses appropriées.
   - Exemple de route : `GET /patients` pour obtenir la liste des patients.

2. **Services**
   - La couche de services contient la logique métier. Elle interagit avec les repositories pour récupérer ou modifier les données.
   - Les services encapsulent la logique de validation et les règles métier, garantissant que les contrôleurs restent légers et centrés sur la gestion des requêtes.

3. **Repositories**
   - Les repositories sont responsables de l'accès aux données. Ils interagissent avec la base de données via Entity Framework Core pour effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer).
   - Cette couche permet d'isoler les détails d'implémentation de la base de données de la logique métier et des contrôleurs.

### Schéma de l'Architecture

Voici un schéma illustrant l'architecture en couches de l'application :

```plaintext
+-----------------+
|   Controllers   |
|  (API Endpoints)|
+-----------------+
         |
         v
+-----------------+
|    Services     |
|  (Business Logic)|
+-----------------+
         |
         v
+-----------------+
|   Repositories   |
|   (Data Access)  |
+-----------------+
```

## Modèles de Données (Models)

### 1. Hospital
Représente un hôpital, avec ses détails et les relations avec d'autres entités comme les utilisateurs, patients et matériels.

```csharp
public class Hospital
{
    public int Id { get; set; }
    [Required]
    public string? NomHopital { get; set; }
    public string? Ville { get; set; }
    public string? Departement { get; set; }
    public ICollection<User> Users { get; set; }
    public ICollection<Patient> Patients { get; set; }
    public ICollection<PMedical> PMedicals {get; set; }
    public ICollection<PNoMedical> PNoMedicals {get; set; }
    public ICollection<Material> Materials {get; set; }
}
```

Chaque hôpital peut avoir plusieurs utilisateurs, patients, et des informations sur le personnel médical et non médical, ainsi que des matériaux.

### 2. Patient
Un patient est relié à un hôpital, et peut avoir une hospitalisation associée.

```csharp
public class Patient
{
    public int Id { get; set; }
    [Required]
    public string? Genre { get; set; }
    [Required]
    public DateTime? DateDeNaissance { get; set; }
    [Required]
    public int? Taille { get; set; }
    public double SetImc(int? taille, int? poids);
}
```

Le modèle gère aussi des méthodes comme le calcul de l'IMC pour les patients.

### 3. Hospitalisation
Représente une hospitalisation pour un patient, incluant la date, le type de service, et d'autres informations spécifiques.

```csharp
public class Hospitalisation
{
    public int Id { get; set; }
    [Required]
    public DateTime? DateHospitalisation { get; set; }
    [Required]
    public string? HospitalisationRéa { get; set; }
    [Required]
    public DateTime? DateHospitalisationRéa { get; set; }
    [Required]
    public string? TypeDeService { get; set; }
    [Required]
    public string? ModalitéEntrée { get; set; }
    public int PatientId { get; set; }
}
```

### 4. User
Représente un utilisateur avec des informations d'authentification et son rôle dans l'hôpital.

```csharp
public class User
{
    public int Id { get; set; }
    [Required]
    public string? Nom { get; set; }
    [Required]
    public string? Prenom { get; set; }
    [Required]
    public string? Role { get; set; }
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
    [Required]
    public string? NomHopital { get; set; }
    public int HospitalId { get; set; }
}
```

Les utilisateurs peuvent avoir des rôles comme médecins, infirmiers, administrateurs, etc.

### 5. PMedical
Représente les informations du personnel médical dans un hôpital.

```csharp
public class PMedical
{
    public int Id { get; set; }
    public int? NbDoctorUniv { get; set; }
    public int? NbDoctorHosp { get; set; }
    public int? NbInternal { get; set; }
    public int? NbDoctor { get; set; }
    public int? NbPersonalAbs { get; set; }
    public int? HospitalId { get; set; }
}
```

Ce modèle permet de suivre les effectifs du personnel médical dans un hôpital donné.

### 6. PNoMedical
Représente les informations du personnel non médical dans un hôpital.

```csharp
public class PNoMedical
{
    public int Id { get; set; }
    public int? NbIdeDay { get; set; }
    public int? NbIdeNight { get; set; }
    public int? NbIdeDayUsc { get; set; }
    public int? NbIdeNightUsc { get; set; }
    public int? NbAsDay { get; set; }
    public int? NbAsNight { get; set; }
    public int? HospitalId { get; set; }
}
```

Ce modèle est similaire au modèle PMedical, mais concerne le personnel non médical.

### 7. Material
Représente le matériel disponible dans un hôpital, comme les lits, moniteurs, etc.

```csharp
public class Material
{
    public int Id { get; set; }
    public int? NbBedRea { get; set; }
    public int? NbBedInRoom { get; set; }
    public int? NbBedMntr { get; set; }
    public int? NbAdmis { get; set; }
    public int? NbPersonalAbs { get; set; }
    public string? Ecmo { get; set; }
    public int? HospitalId { get; set; }
    public List<Device> Devices { get; set; }
}
```

Le modèle Material inclut une liste de devices (appareils).

### 8. Device
Représente un appareil dans le matériel hospitalier.

```csharp
public class Device
{
    public int Id { get; set; }
    public int? Quantity { get; set; }
    public string? Name { get; set; }
    public int MaterialId { get; set; }
}
```

### 9. RefreshToken
Ce modèle gère les refresh tokens pour renouveler les accessToken des utilisateurs.

```csharp
public class RefreshToken
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public int? HospitalId { get; set; }
    public string? Token { get; set; }
    public DateTime Expiration { get; set; }
}
```

### 10. Treatments
Ce modèle représente un traitement médical avec ses détails.

```csharp
public class RefreshToken
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public int? HospitalId { get; set; }
    public string? Token { get; set; }
    public DateTime Expiration { get; set; }
}
```

---
## Configuration du fichier Program.cs

### 1. Connexion à la base de données
L'API utilise Entity Framework Core pour interagir avec la base de données PostgreSQL :

```csharp
builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### 2. CORS (Cross-Origin Resource Sharing)
La politique CORS permet d'autoriser des requêtes venant de domaines spécifiques comme un frontend local :

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
```

### 3. Authentification JWT
L'authentification est gérée par JWT pour sécuriser l'API, et valider les utilisateurs avec des tokens :

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true
    };
});
```

### 4. Swagger
Pour la documentation automatique de l'API :

```csharp
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "API Documentation",
        Description = "API for managing hospitals and patients"
    });
});
```

## Statistiques

### Calcul des Statistiques

Cette section fournit une vue d'ensemble des différentes statistiques disponibles dans l'API pour analyser les traitements et leurs effets sur les patients.

---

#### 1. Patients guéris par un traitement spécifique

- **Description** : Retourne les statistiques des patients guéris grâce à un traitement spécifique.
- **Route** : `GET /statistics/{name}/healed`

---

#### 2. Patients décédés sous un traitement spécifique

- **Description** : Retourne les statistiques des patients décédés sous un traitement spécifique.
- **Route** : `GET /statistics/{name}/deceased`

---

#### 3. Patients actuellement sous un traitement spécifique

- **Description** : Retourne les statistiques des patients actuellement sous un traitement spécifique.
- **Route** : `GET /statistics/{name}/current`

---

#### 4. Pourcentage des patients sous traitement par rapport à l'ensemble

- **Description** : Retourne le pourcentage de patients sous un traitement spécifique comparé à tous les patients.
- **Route** : `GET /statistics/{name}`

---

#### 5. Pourcentage des patients actuellement sous traitement

- **Description** : Retourne le pourcentage de patients actuellement sous traitement comparé à l'ensemble des patients.
- **Route** : `GET /statistics/current`

---

#### 6. Pourcentage des patients guéris

- **Description** : Retourne le pourcentage des patients guéris par rapport à tous les patients.
- **Route** : `GET /statistics/healed`

---

#### 7. Pourcentage des patients décédés

- **Description** : Retourne le pourcentage des patients décédés par rapport à tous les patients.
- **Route** : `GET /statistics/deceased`

---

#### 8. Pourcentage des patients actuellement sous un traitement spécifique

- **Description** : Retourne le pourcentage des patients actuellement sous un traitement spécifique par rapport à tous les patients.
- **Route** : `GET /statistics/current/{name}`

---

#### 9. Pourcentage des patients guéris sous un traitement spécifique

- **Description** : Retourne le pourcentage des patients guéris sous un traitement spécifique par rapport à tous les patients.
- **Route** : `GET /statistics/healed/{name}`

---

#### 10. Pourcentage des patients décédés sous un traitement spécifique

- **Description** : Retourne le pourcentage des patients décédés sous un traitement spécifique par rapport à tous les patients.
- **Route** : `GET /statistics/deceased/{name}`

---

#### 11. Meilleur traitement (par pourcentage de guérison)

- **Description** : Retourne le traitement avec le pourcentage de guérison le plus élevé parmi tous les traitements.
- **Route** : `GET /statistics/bestTreatment`

---

#### 12. Pire traitement (par pourcentage de guérison)

- **Description** : Retourne le traitement avec le pourcentage de guérison le plus bas parmi tous les traitements.
- **Route** : `GET /statistics/leastTreatment`

---

#### 13. Meilleur traitement (par pourcentage de guérison sur une période spécifiée)

- **Description** : Retourne le traitement avec le pourcentage de guérison le plus élevé sur une période de semaines spécifiée.
- **Route** : `GET /statistics/bestTreatment/{week}`

---

#### 14. Pire traitement (par pourcentage de guérison sur une période spécifiée)

- **Description** : Retourne le traitement avec le pourcentage de guérison le plus bas sur une période de semaines spécifiée.
- **Route** : `GET /statistics/leastTreatment/{week}`

---

#### 15. Pourcentage des traitements par nom sur une période spécifiée

- **Description** : Retourne le pourcentage des traitements par nom sur une période de semaines spécifiée.
- **Route** : `GET /statistics/{name}/{week}`

---

#### 16. Pourcentage de guérison par traitement par nom sur une période spécifiée

- **Description** : Retourne le pourcentage de guérison des patients pour un traitement spécifique sur une période de semaines spécifiée.
- **Route** : `GET /statistics/heal/{name}/{week}`

---

#### 17. Pourcentage de décès par traitement par nom sur une période spécifiée

- **Description** : Retourne le pourcentage de décès des patients pour un traitement spécifique sur une période de semaines spécifiée.
- **Route** : `GET /statistics/die/{name}/{week}`


## Documentation Complémentaire

Pour plus de détails, vous pouvez consulter la documentation au format PDF disponible ici : [Documentation PDF](./docs/OSS.drawio.pdf).

### Détails du PDF
Le document PDF est un schéma créé avec **Draw.io** qui explique les tables de la base de données ainsi que leurs relations. Ce schéma illustre comment les différentes entités sont connectées entre elles, fournissant une vue d'ensemble de la structure de la base de données. Cela peut être particulièrement utile pour comprendre la conception et les interactions au sein de l'API.


### Confidential Entreprise MAUNN | Octobre 2024
