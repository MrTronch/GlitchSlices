# Validación — 14 de octubre de 2026

## Verificado

- JavaScript y módulos comprobados por Node.
- Tres pruebas de geometría: recorte sin deformación, conversión de coordenadas de índice y permanencia de 900 ms sin repetición.
- Navegador Chromium de Microsoft Edge, con cámara simulada usando una imagen pública de prueba de MediaPipe. La imagen no se distribuye en la aplicación.
- MediaPipe carga y detecta rostro, segmentación de persona, pose y manos. Se comprobaron los modos 1–10 con sus atajos; los modos 2 y 3 produjeron landmarks de pose. Se guardaron capturas de cada modo.
- Cinco anchos: 320, 390, 768, 1024 y 1440 px. Diez botones visibles, ninguna zona menor de 44 px, sin desbordamiento horizontal.
- Desktop, celular vertical/horizontal emulado y pantalla completa en ambas orientaciones. En pantalla completa quedan cámara y selector, sin título, firma, opciones ni botones de acciones.
- La misma cámara, modo y grabación sobreviven al cambio de orientación. La resolución de grabación permanece fija.
- Exportación WebM realizada; archivo reproducible y decodificado con OpenCV. Imagen procesada de 960 × 540 px, sin la matriz de botones ni barra de controles. La grabación no usa el DOM ni el canvas de diagnóstico.
- Gestos: inyección de landmarks de índice en la prueba de navegador, con la detección real ejecutándose. Activación por permanencia en desktop y portrait, sin contar dedos, rearmado al salir del objetivo y límite de cuatro frames.
- Caché temporal: hasta cuatro imágenes de un máximo de 640 px de ancho, sin UI.
- Firma corregida a BY MR TRONCH; glitch de título intermitente y transición breve de botones. Respeta la preferencia de reducir animaciones.

Las capturas y registros se guardaron junto al proyecto en la carpeta `Glitch Slice Web QA`, separada del sitio para evitar publicar videos de prueba.

## Limitaciones y pendientes

- No hubo prueba física en Android/iPhone ni Safari. El tamaño móvil se comprobó en Chromium emulado. Cambiar frontal/trasera, formato MP4 y fullscreen nativo dependen del navegador y hardware.
- La naturalidad del apuntado con manos reales requiere probarse con el usuario. Se verificó la transformación de coordenadas y el controlador; no sustituye la valoración de iluminación, oclusiones o temblor.
- Modelos y WebAssembly se descargan desde recursos externos versionados. La primera entrada y la primera selección de los modos corporales pueden tardar mientras se cargan sus modelos. Hay estados de error y reintento.
- La renderización es una adaptación a Canvas, conservando las composiciones y parámetros originales. No se afirma igualdad píxel a píxel con OpenCV. El cubo es un material fotográfico refractado en planos triangulados.
- Logo PNG pendiente: integración de un segundo más fade out preparada; sin logo no se bloquea la cámara.
- No se publicó ni se creó un repositorio remoto en GitHub. Falta elegir repositorio/cuenta para ese paso.
- La licencia de distribución del código queda a decisión del autor.

## Prueba manual recomendada

1. Activar cámara y recorrer 1–9/0; probar AUTO y ESPEJO.
2. Activar GESTOS y mantener el índice sobre un número alrededor de un segundo; salir del número antes de repetir.
3. En el celular, probar tap y ambas orientaciones.
4. Grabar, girar y entrar en fullscreen; salir y detener. Revisar el video descargado.
5. Confirmar visualmente el cubo de cristal, el centro ocular del modo 9 y el ritmo del slit scan antes de publicar.

## Revisión posterior
Modo 2: recortes limitados al contenido útil, excluyendo bordes casi negros del stream para no amplificarlos. Prueba sintética con márgenes negros: cero píxeles negros en la franja ampliada.
Modo 3: secuencia fija original de NumPy seed 42, en lugar de aleatoriedad por fotograma. Dos renderizados idénticos con la misma pose.
AUTO: slider 4–12 segundos, valor inicial 8. PROFUNDIDAD identificado como MODO 7.
Firma a la derecha y más grande, sin LIVE CAMERA/10 EFFECTS. Glitch de título visible durante 480 ms cada 4–8 segundos, respetando reducir animaciones.
Revisados anchos 320/390/768/1024/1440, slider y activación real del glitch.

## Revisión 14 octubre: composición y controles
Se retiraron AVANZADAS y PROFUNDIDAD. Se mantiene AUTO de 4–12 segundos. Iconos fullscreen: 36 px desktop, 30 px móvil vertical y 28 px horizontal compacto.
Modos 2/3: geometría entera del Python a escala de referencia 1280 px, centrado original y recorte sin reescalar los segmentos que exceden la pantalla. Comparación con imagen sintética y puntos idénticos a 1280x720: error medio 0.0134 y 0.0171 niveles por canal (sobre 255), debido a interpolación Canvas/OpenCV. Prueba de bordes negros y estabilidad del modo 3 aprobada. Interfaz comprobada de 320 a 1440 px.

Ajuste posterior: cuerpo modos 2/3 con hasta seis franjas más altas; ancho del cuerpo reducido al 72% y 65% respectivamente. Cara intacta. Cuadros del pecho modo 1 al 72% del tamaño previo. La comparación literal con Python anterior describe la revisión previa; estos ajustes artísticos son posteriores.

Revisión: ancho progresivo suave del cuerpo modo 2; frente/ojos más anchos. Inicio del cuerpo por debajo de los puntos de boca para evitar recorte parcial; cuello/hombros del modo 3 más estrechos. Glitch del título 1.1 segundos negro/amarillo. Validación navegador local aprobada. iPhone/Android físicos pendientes, no se garantiza rendimiento idéntico.
