@echo off
setlocal enabledelayedexpansion

:: Chemins de fichiers et configurations
set LOCAL_DB_NAME="[NAME]"
set EXTRACTED_DB="[PATH-TO-FOLDER]"
set LOCAL_MONGO_URL="[URI]"


:: Restaurer la base de données dans MongoDB local
echo "Restauration de la base de données MongoDB locale..."
mongorestore --uri="%LOCAL_MONGO_URL%" --drop --db %LOCAL_DB_NAME% "%EXTRACTED_DB%"

if %ERRORLEVEL% equ 0 (
    echo "Restauration réussie !"
) else (
    echo "Échec de la restauration !"
    exit /b 1
)

:: Attendre une action de l'utilisateur pour fermer
echo "Processus terminé avec succès. Appuyez sur une touche pour fermer."
pause
endlocal
