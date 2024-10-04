# OneScientifique Study OSS V2 2024 | API Documentation
## Description

Ce projet est une API permettant de gérer des patients, des hospitalisations, des hôpitaux, des utilisateurs, ainsi que des informations liées au personnel médical et non médical. Elle utilise .NET Core avec Entity Framework pour l'accès à la base de données PostgreSQL et JWT pour l'authentification. Ce guide explique les principaux modèles et la configuration du fichier Program.cs.
Technologies Utilisées

- **ASP.NET Core 7.0** : Framework web pour construire l'API.
- **Entity Framework Core** : ORM pour interagir avec une base de données PostgreSQL.
- **PostgreSQL** : Base de données utilisée pour stocker les entités.
- **JWT (JSON Web Tokens)** : Pour la gestion des authentifications via accessToken et refreshToken.
- **CORS (Cross-Origin Resource Sharing)** : Pour permettre l'accès à l'API depuis des domaines spécifiques.
- **Swagger** : Documentation automatique de l'API. Vous pouvez accéder à la documentation Swagger via ce [lien Swagger](http://localhost:5058/index.html).

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

## Documentation Complémentaire

Pour plus de détails, vous pouvez consulter la documentation au format PDF disponible ici : [Documentation PDF](./docs/OSS.drawio.pdf).

### Détails du PDF
Le document PDF est un schéma créé avec **Draw.io** qui explique les tables de la base de données ainsi que leurs relations. Ce schéma illustre comment les différentes entités sont connectées entre elles, fournissant une vue d'ensemble de la structure de la base de données. Cela peut être particulièrement utile pour comprendre la conception et les interactions au sein de l'API.
