@echo off
echo ========================================
echo   GITHUB PUSH - RELATORIO v3.0
echo ========================================
echo.

:: Verificar se Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git nao encontrado. Instale Git primeiro.
    pause
    exit /b 1
)

echo ✅ Git encontrado
echo.

:: Verificar se temos commit para enviar
git log --oneline -n 1 >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Nenhum commit encontrado. Execute commit primeiro.
    pause
    exit /b 1
)

echo 📦 Commit local encontrado:
git log --oneline -n 1
echo.

:: Tentar fazer push
echo ⬆️ Enviando arquivos para GitHub...
echo.

git push -u origin master

if %errorlevel% neq 0 (
    echo.
    echo ❌ Erro ao fazer push para GitHub!
    echo.
    echo Possiveis causas:
    echo 1. Repositorio nao existe no GitHub
    echo 2. Sem conexao com internet
    echo 3. Problemas de autenticacao
    echo.
    echo Solucao:
    echo 1. Crie o repositorio manualmente em:
    echo    https://github.com/Lucianosolu/relatorio-seguranca-v3
    echo 2. Execute este script novamente
    echo.
    echo Para criar o repositorio:
    echo 1. Acesse: https://github.com/new
    echo 2. Nome: relatorio-seguranca-v3
    echo 3. Deixe publico
    echo 4. NAO adicione README, .gitignore ou license
    echo 5. Click "Create repository"
    echo 6. Execute este script novamente
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Push concluido com sucesso!
echo.
echo 🌐 Seu repositorio esta disponivel em:
echo    https://github.com/Lucianosolu/relatorio-seguranca-v3
echo.
echo 📋 Proximos passos:
echo 1. Ative GitHub Pages em Settings > Pages
echo 2. Aguarde 2-3 minutos
echo 3. Acesse: https://Lucianosolu.github.io/relatorio-seguranca-v3
echo.
echo 🎉 Parabens! Seu projeto esta online!
echo.

:: Perguntar se quer abrir o repositorio
set /p OPEN_REPO=Deseja abrir o repositorio no GitHub? (S/N): 
if /i "%OPEN_REPO%"=="S" (
    echo 🌐 Abrindo repositorio...
    start https://github.com/Lucianosolu/relatorio-seguranca-v3
)

echo.
echo ========================================
echo   PUSH CONCLUIDO COM SUCESSO!
echo ========================================
echo.
pause
