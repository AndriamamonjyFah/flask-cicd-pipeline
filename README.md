# Flask CI/CD Pipeline — Application Flask avec déploiement automatisé

Application web développée avec Flask intégrant une pipeline CI/CD complète avec Docker, GitHub Actions et déploiement automatique sur VPS via SSH.

---

# Table des matières

- Présentation
- Stack technique
- Prérequis
- Installation
- Configuration
- Lancer l'application
- Exécution avec Docker
- Tests
- Pipeline CI/CD
- Secrets GitHub Actions
- Endpoints
- Architecture du projet
- Résolution de problèmes connus

---

# Présentation

Flask CI/CD Pipeline est une application Flask minimaliste conçue pour démontrer un workflow DevOps moderne avec automatisation complète du déploiement.

Chaque `git push` sur la branche `main` déclenche automatiquement :

- Les tests avec pytest
- Le build Docker
- Le push de l'image sur Docker Hub
- Le déploiement automatique sur un VPS via SSH

Workflow automatisé :

```bash
git push → pytest → docker build → docker push → déploiement VPS 🚀
```

---

# Screenshots

## Home
<img src="docs/Home.webm" alt="Home" width="100%" />

## About
<img src="docs/About.png" alt="About" width="100%" />

## Health
<img src="docs/Health.png" alt="Health" width="100%" />

---

# Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Backend | Python | 3.11 |
| Framework | Flask | 3.x |
| Variables d'environnement | python-dotenv | 1.x |
| Serveur WSGI | Gunicorn | latest |
| Tests | pytest | latest |
| Conteneurisation | Docker | latest |
| CI/CD | GitHub Actions | latest |
| Registry Docker | Docker Hub | — |
| Déploiement | VPS Linux via SSH | — |

---

# Prérequis

Avant d’installer le projet, assurez-vous d’avoir :

- Python >= 3.11
- pip >= 25.x
- Git
- Docker 
- Un VPS Linux pour le déploiement
- Un compte Docker Hub

Testé sur Ubuntu 25.04 avec Python 3.13.

---

# Installation

## 1. Cloner le projet

```bash
git clone https://github.com/AndriamamonjyFah/flask-cicd-pipeline.git

cd flask-cicd-pipeline
```

---

## 2. Créer un environnement virtuel

```bash
python3 -m venv venv
```

---

## 3. Activer l’environnement virtuel

### Linux / Ubuntu

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

---

## 4. Installer les dépendances

```bash
pip install -r requirements.txt
```

---

# Configuration

Créer un fichier `.env` à la racine du projet :

```env
APP_NAME=Flask CI/CD Pipeline
APP_VERSION=1.0.0
BUILD_DATE=2026-05-26
```

---

# Lancer l'application

Depuis la racine du projet :

```bash
flask --app app:create_app run
```

Application accessible sur :

```bash
http://127.0.0.1:5000
```

---

# Exécution avec Docker

## Construire l'image

```bash
docker build -t flask-app .
```

## Lancer le conteneur

```bash
docker run -p 5000:5000 flask-app
```

Application accessible sur :

```bash
http://localhost:5000
```

---

# Tests

Lancer tous les tests :

```bash
pytest tests/ -v
```

---

# Pipeline CI/CD

Le workflow GitHub Actions effectue automatiquement :

1. Installation des dépendances
2. Exécution des tests pytest
3. Build de l’image Docker
4. Push sur Docker Hub
5. Déploiement automatique sur VPS

Pipeline :

```text
Push vers main
    │
    ▼
┌─────────┐
│  Tests  │
│ pytest  │
└────┬────┘
     ▼
┌──────────────┐
│ Docker Build │
│ + Push Hub   │
└────┬─────────┘
     ▼
┌─────────────┐
│ Déploiement │
│ SSH + VPS   │
└─────────────┘
```

Le déploiement s'exécute uniquement après validation des tests.

---

# Secrets GitHub Actions

Dans le dépôt GitHub :

```text
Settings → Secrets and variables → Actions
```

Ajouter les secrets suivants :

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Nom d'utilisateur Docker Hub |
| `DOCKERHUB_TOKEN` | Token Docker Hub |
| `VPS_HOST` | Adresse IP ou domaine du VPS |
| `VPS_USER` | Utilisateur SSH |
| `VPS_SSH_KEY` | Clé privée SSH |

---

# Endpoints

| Route | Description |
|---|---|
| `GET /` | Page d'accueil |
| `GET /about` | Informations du projet |
| `GET /health` | État du serveur |

---

# Architecture du projet

```bash
flask-cicd-pipeline/
├── app/
│   ├── __init__.py        # Factory Flask + config dotenv
│   ├── routes.py          # Routes Flask
│   ├── templates/
│   │   ├── base.html
│   │   ├── index.html
│   │   ├── about.html
│   │   └── health.html
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── main.js
├── tests/
│   └── test_app.py
├── .github/
│   └── workflows/
│       └── ci-cd.yml      # Workflow GitHub Actions
├── Dockerfile
├── requirements.txt
├── .env
└── README.md
```

---

# Résolution de problèmes connus

## Erreur : externally-managed-environment

Ubuntu récent bloque les installations pip globales.

Solution :

```bash
python3 -m venv venv
source venv/bin/activate
```

Puis :

```bash
pip install -r requirements.txt
```

---

## Erreur : flask command not found

Flask n'est pas installé dans l’environnement virtuel.

Solution :

```bash
pip install flask
```

---

## Erreur : Could not import 'app.app'

Cause :
mauvais dossier ou mauvaise syntaxe Flask.

Depuis la racine du projet :

```bash
flask --app app:create_app run
```

---

## Port 5000 déjà utilisé

Trouver le processus :

```bash
sudo lsof -i :5000
```

Tuer le processus :

```bash
kill -9 PID
```

---

## Arrêter Flask

Dans le terminal :

```bash
CTRL + C
```

---

<div align="center">

### Développé avec Flask · Docker · GitHub Actions 

</div>