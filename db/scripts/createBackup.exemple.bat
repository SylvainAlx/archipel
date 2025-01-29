@echo off
setlocal

:: Définir les variables
set NOM_BASE_PROD="[NAME]"
set NOM_BASE_DEV="[NAME]"
set URL_PROD="[URI]/%NOM_BASE_PROD%?retryWrites=true&w=majority"
set DOSSIER_BACKUP= "[PATH-TO-FOLDER]"

:: Création d'un dossier de backup local
if not exist %DOSSIER_BACKUP% (
    mkdir %DOSSIER_BACKUP%
)

:: Dump de la base MongoDB en production
echo Démarrage de l'export de la base de données...
mongodump --uri %URL_PROD% --db %NOM_BASE_PROD% --out %DOSSIER_BACKUP%

:: Vérifier si le dump a réussi
if %errorlevel% neq 0 (
    echo "Erreur lors de l'exportation de la base de données."
    exit /b %errorlevel%
)

:: Compression du dossier de backup
echo Compression du backup...
tar -czvf %DOSSIER_BACKUP%\%NOM_BASE_PROD%.tar.gz -C %DOSSIER_BACKUP% %NOM_BASE_PROD%
if %errorlevel% neq 0 (
    echo "Erreur lors de la compression du backup."
    exit /b %errorlevel%
)

:: Vérification des chemins
if not exist "%DOSSIER_BACKUP%\%NOM_BASE_PROD%" (
    echo "Erreur : Le dossier de backup spécifié n'existe pas (%DOSSIER_BACKUP%\%NOM_BASE_PROD%)."
    exit /b 1
)

:: Restauration de la base MongoDB en local
echo Démarrage de la restauration en local...
mongorestore --nsInclude=%NOM_BASE_PROD%.* --nsFrom=%NOM_BASE_PROD%.* --nsTo=%NOM_BASE_DEV%.* "%DOSSIER_BACKUP%\%NOM_BASE_PROD%"

:: Vérifier si la restauration a réussi
if %errorlevel% neq 0 (
    echo "Erreur lors de la restauration de la base de données."
    exit /b %errorlevel%
)

echo "Backup et restauration terminés avec succès !"
pause
endlocal