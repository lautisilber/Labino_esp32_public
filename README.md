# Labino_esp32
Para usar el proyecto en Arduino IDE hay que instalar:
1. El compilador para el esp32
  - seguir el tutorial https://www.youtube.com/watch?v=mBaS3YnqDaU (url -> https://dl.espressif.com/dl/package_esp32_index.json)
2. Las herramientas para usar el sistema de archivos SPIFFS del ESP32
  - En el directorio de proyectos de Arduino (que debería tener una carpeta llamada 'libraries') crear una carpeta llamada 'tools'
  - En la nueva carpeta descomprimir el archivo 'ESP32FS-1.0.zip' que debería contener una carpeta llamada 'ESP32FS'
  - Para comprobar que Arduino detectó la herramienta, reabrir el programa, clickear en 'Herramientas' (en la barra superior) y debería aparecer la opción 'ESP32 Sketch Data Upload' 
3. Las dependencias necesarias
  - En la barra superior ir a 'Programa' > 'Incluir Librería' > 'Añadir biblioteca .ZIP' y agregar las librarías 'AsyncTCP', 'ESPAsyncWebServer', 'NTPClient' y 'thingspeak-arduino'
  - Añadir librerías 'DHT sensor library' de Adafruit y 'ArduinoJson' de Benoit Blanchon a través de 'Administrar Bibliotecas' ('Programa' > 'Incluir Librería' > 'Administrar Bibliotecas')
  
El proyecto principal está en la carpeta 'main'. Una vez abierto en Arduino, para cargarlo al ESP32 hay que cambiar la placa objetivo de Arduino a ESP32 clickeando 'Herramientas' > 'Placa: "Arduino Uno"' > 'ESP32 Arduino' > 'ESP32 Dev Module'. Luego, para cargar los archivos necesarios para la interfaz web hay que clickear en 'ESP32 Sketch Data Upload' (bajo 'Herramientas'). Por último subir el programa al ESP32.

***Observaciones***:
La conexión PC-ESP32 es menos robusta que la del Arduino. Tanto para la carga de los archivos web como para la carga del programa el monitor serie debe estar cerrado. Además es posible que para cargar cualquier cosa haga falta apretar (y mantener apretado hasta que comience a cargar) el botón del ESP32 'boot'. Por otro lado, el programa esptool.py que es responsable de la comunicación PC-ESP32 es un programa de python. Si existiera un error con esptool.py asegurarse de que python está instalado en la computadora
