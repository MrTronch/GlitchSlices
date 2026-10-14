@echo off
cd /d "%~dp0"
echo GLITCH SLICES - BY MR TRONCH
echo Abre http://127.0.0.1:4173 en el navegador.
echo Deja esta ventana abierta mientras usas la web.
py -3.11 -m http.server 4173 --bind 127.0.0.1
if errorlevel 1 pause
