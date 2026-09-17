@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title CFL PWA - GITHUB PUSH
cls
echo ============================================================
echo CFL DATA ENTRY PWA - GITHUB PUSH
echo ============================================================
echo This folder contains ONLY the GitHub Pages PWA shell.
echo Apps Script backend is NOT uploaded by this script.
echo.
where git >nul 2>&1
if errorlevel 1 (
  echo ERROR: Git is not installed or not in PATH.
  echo Install Git for Windows, then run this file again.
  goto :end
)
git --version
echo.
set /p REPO=Paste your GitHub repository HTTPS URL: 
if "%REPO%"=="" goto :end
if not exist .git git init
git branch -M main
git add index.html styles.css app.js manifest.webmanifest sw.js offline.html .nojekyll icons README_GITHUB_PWA_HINDI.txt
if exist .git\HEAD (
  git commit -m "CFL Data Entry PWA" 2>nul || echo Nothing new to commit.
)
git remote remove origin 2>nul
git remote add origin %REPO%
echo.
echo Pushing to GitHub...
git push -u origin main
echo.
echo After push: GitHub repo Settings ^> Pages ^> Deploy from branch ^> main / root.
:end
echo.
pause
