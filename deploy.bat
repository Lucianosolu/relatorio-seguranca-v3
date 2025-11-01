@echo off
echo ========================================
echo   DEPLOY AUTOMATICO - RELATORIO v3.0
echo ========================================
echo.

:: Verificar se Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git nao encontrado. Instale Git primeiro.
    echo    Download: https://git-scm.com/download/win
    pause
    exit /b 1
)

:: Configurar variáveis
set REPO_NAME=relatorio-seguranca-v3
set SOURCE_FILE=relatorio_v3_deploy.html
set TARGET_FILE=index.html

echo 📁 Verificando arquivos...
if not exist "%SOURCE_FILE%" (
    echo ❌ Arquivo %SOURCE_FILE% nao encontrado!
    echo    Execute este script na pasta correta.
    pause
    exit /b 1
)

echo ✅ Arquivo %SOURCE_FILE% encontrado

:: Perguntar pelo usuário GitHub
set /p GITHUB_USER=Digite seu usuario do GitHub: 

if "%GITHUB_USER%"=="" (
    echo ❌ Usuario do GitHub nao pode ser vazio!
    pause
    exit /b 1
)

echo.
echo 🚀 Iniciando deploy para GitHub Pages...
echo.

:: Criar pasta temporária
set TEMP_DIR=%TEMP%\%REPO_NAME%
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

:: Copiar arquivo para pasta temporária
copy "%SOURCE_FILE%" "%TEMP_DIR%\%TARGET_FILE%" >nul
echo ✅ Arquivo copiado para pasta temporária

:: Entrar na pasta temporária
cd /d "%TEMP_DIR%"

:: Inicializar repositório Git
echo 📦 Inicializando repositório Git...
git init >nul 2>&1
git add %TARGET_FILE% >nul 2>&1
git commit -m "Adicionar Relatorio de Seguranca v3.0" >nul 2>&1

:: Adicionar remote (se não existir)
echo 🔗 Conectando ao GitHub...
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git 2>nul
git branch -M main >nul 2>&1

:: Push para GitHub
echo ⬆️ Enviando arquivos para GitHub...
git push -f origin main >nul 2>&1

if %errorlevel% neq 0 (
    echo.
    echo ❌ Erro ao fazer push para GitHub!
    echo.
    echo Possiveis causas:
    echo 1. Repositorio nao existe no GitHub
    echo 2. Credenciais incorretas
    echo 3. Sem conexao com internet
    echo.
    echo Solucao:
    echo 1. Crie o repositorio manualmente em:
    echo    https://github.com/%GITHUB_USER%/%REPO_NAME%
    echo 2. Execute o script novamente
    echo.
    pause
    exit /b 1
)

:: Voltar para pasta original
cd /d "%~dp0"

:: Limpar pasta temporária
rmdir /s /q "%TEMP_DIR%" >nul 2>&1

echo.
echo ✅ Deploy concluido com sucesso!
echo.
echo 🌐 Seu site esta disponivel em:
echo    https://%GITHUB_USER%.github.io/%REPO_NAME%
echo.
echo 📋 Proximos passos:
echo 1. Acesse o link acima (pode demorar 2-3 minutos)
echo 2. Ative GitHub Pages nas configuracoes do repositorio
echo    - Settings > Pages > Source: Deploy from a branch
echo    - Branch: main / folder: / (root)
echo    - Click Save
echo.
echo 🎉 Parabens! Seu relatorio esta online!
echo.

:: Perguntar se quer abrir o site
set /p OPEN_SITE=Deseja abrir o site agora? (S/N): 
if /i "%OPEN_SITE%"=="S" (
    echo 🌐 Abrindo site...
    start https://%GITHUB_USER%.github.io/%REPO_NAME%
)

echo.
echo ========================================
echo   DEPLOY CONCLUIDO COM SUCESSO!
echo ========================================
echo.
pause
