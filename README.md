# GLITCH SLICES — BY MR TRONCH

Aplicación de cámara en vivo con diez composiciones, adaptada del proyecto Python. Interfaz amarillo ácido `#F0FF32`, negro `#141512`, carbón `#292B24`, Arial y texto en mayúsculas.

## Ejecutar

Puedes abrir INICIAR_WEB.bat para servirla con Python 3.11, ya disponible en esta computadora. Después abre la dirección que muestra. También puedes usar Node.js; no necesitas instalar paquetes.

```sh
npm start
```

Abre `http://127.0.0.1:4173`. Activa la cámara y concede permiso. La detección carga MediaPipe Tasks Vision 0.10.20 y modelos oficiales desde jsDelivr y Google; necesita conexión a Internet. Las imágenes de cámara se procesan localmente en el navegador y no se envían a un servidor.

También sirve cualquier servidor estático con HTTPS o localhost. Abrir el HTML directamente como archivo no permite iniciar correctamente la cámara y el worker.

## Controles

- Clic o tap: diez botones con número e icono. 1–9 y 0: efectos 1–10.
- AUTO: cambia de modo cada ocho segundos.
- ESPEJO: invierte la cámara. Tecla F.
- GESTOS: punta del índice sobre un botón durante 900 ms; salir del objetivo antes de repetir. No cuenta dedos. Desactivado inicialmente para ahorrar recursos.
- Tecla T: automático. Intervalo ajustable de 4 a 12 segundos.
- Selector de cámara en desktop; cambio frontal/trasera en dispositivos táctiles, cuando está disponible.
- Grabar/detener: descarga WebM o MP4 según compatibilidad. Sin audio, marca, botones, puntos de diagnóstico ni interfaz.
- Pantalla completa o vista inmersiva: solo cámara y selector de efectos. ESC en desktop; doble tap/clic sobre la imagen para salir. Un tap muestra brevemente un botón de salida.

## Diseño responsive

En desktop y horizontal el selector ocupa dos columnas en el lateral derecho. En celular vertical ocupa dos filas de cinco en la parte inferior. Los botones tienen un mínimo de 44 × 44 px.

Girar o entrar en pantalla completa no recrea el stream ni detiene la grabación. Mientras se graba, la resolución del canvas se fija para evitar videos con dimensiones cambiantes; la vista adapta su recorte sin deformar la imagen. El archivo conserva el encuadre con el que comenzó la grabación.

## Logo

Colocar el PNG definitivo en `assets/logo.png`. Al comenzar la experiencia aparece un segundo y se desvanece. Sin ese archivo, la experiencia continúa sin una marca inventada. Está ignorado provisionalmente por Git; quitar esa regla cuando el PNG definitivo esté aprobado para publicarse.

## Motor de efectos

El motor está en `src/effects.js`, separado de controles y cámara. La inferencia corre en `src/vision-worker.js`, fuera del hilo de interfaz. La caché temporal se limita a cuatro frames de hasta 640 px de ancho.

1. Mosaico: cuadrados completos, máscara de persona para elegir fuentes, rasgos solo en rostro y piezas del torso.
2. Pirámide: diez franjas de cuerpo, ocho de cabeza y manos ampliadas con pose.
3. Invertido: franjas corporales de alturas variables, cuatro de cabeza y manos ampliadas (1.2×, como está implementado en el código original).
4. Bandas de ojos: siete franjas altas con fotogramas actuales y anteriores; nariz y boca originales.
5. Multiojos: trece recortes, sin rotación.
6. Collage: composición escalonada de cabello, ojos, nariz, mejillas y labios.
7. Retrato infinito: retratos ovalados anidados que terminan en un ojo.
8. Cubo de cristal: planos fotográficos refractados, reflejos y dispersión cromática, sin líneas blancas.
9. Aros: seis aros con giro lento, fuentes temporales y centro ocular fijo.
10. Slit scan: bandas de ancho / 256, recorrido de tres segundos en la mitad derecha y cámara actual en la izquierda.

Se preservan composición, parámetros y secuencias de la versión de escritorio. Las diferencias de modelos y rasterización Canvas frente a OpenCV requieren valoración visual en cámara real; el cubo usa planos divididos en triángulos y el reflejo se calcula en canvas, no un material 3D con trazado de rayos.

## GitHub Pages

El contenido de esta carpeta es el sitio: subirlo a la raíz de un repositorio y habilitar Pages desde la rama deseada y la carpeta raíz. Todas las rutas del sitio son relativas, incluyendo el worker; admite la URL de un proyecto en GitHub Pages. `.nojekyll` evita que se procesen los archivos como Jekyll.

No se ha publicado ni creado un repositorio remoto. No incluir el entorno Python, backups, videos de prueba ni capturas personales. La carpeta Python y su respaldo permanecen intactos.

## Verificación

```sh
npm test
```

Consulta `docs/VALIDACION.md` para las pruebas del navegador y límites pendientes. El PDF de dirección se conserva como referencia en `docs/brief-interfaz-web.pdf`; prevalece la corrección de autoría a MR TRONCH y el código original cuando un pie de imagen del PDF describe de forma distinta un efecto.

## Recursos

- [MediaPipe Face Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js)
- [MediaPipe Image Segmenter](https://ai.google.dev/edge/mediapipe/solutions/vision/image_segmenter/web_js)

MediaPipe y sus modelos conservan sus licencias originales. La licencia de distribución del código artístico queda a elección del autor; no se añade una licencia abierta sin su decisión.


FILTRO opcional: color más intenso y grano suave, incluido en el video grabado. Activado por defecto solo en móvil; desactivado al iniciar en escritorio. Perfil móvil: captura preferida 640x480, procesamiento máximo 640 px por lado según orientación; cristal calculado a menor resolución. Gestos disponibles en móvil y escritorio.

