@echo off
REM Starts a local web server for previewing the site at http://localhost:8000/
REM Needs Python (python.org) or Node.js (nodejs.org). Close this window to stop.
cd /d "%~dp0"
where python >nul 2>nul
if %errorlevel%==0 (
  echo Serving on http://localhost:8000/  ^(press Ctrl+C to stop^)
  start "" http://localhost:8000/
  python -m http.server 8000
  goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
  echo Serving on http://localhost:8000/  ^(press Ctrl+C to stop^)
  start "" http://localhost:8000/
  py -m http.server 8000
  goto :eof
)
where npx >nul 2>nul
if %errorlevel%==0 (
  echo Serving on http://localhost:8000/  ^(press Ctrl+C to stop^)
  start "" http://localhost:8000/
  npx --yes http-server -p 8000 -c-1
  goto :eof
)
echo Neither Python nor Node.js was found.
echo Install Python from https://www.python.org/downloads/ (tick "Add python.exe to PATH"),
echo or see README.md for other ways to preview the site.
pause
