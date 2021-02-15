---
layout: default
title: Labino ESP32
---

## Introduction
Labino ESP32 helps you control your plants in the lab. With an ESP32 you can now measure and log soil moisture levels, air humidity and temperature, control watering cycles. All this data is accessible thanks to the integration with [ThingSpeak](https://thingspeak.com/)! Labino ESP32 also offers a convenient web interface to tweak parameters and watch a live feed of your measurements.

### Requirements
- An ESP32 microcontroller
- A PC to program it (only Arduino IDE officially supported so far)
- Soil Moisture Sensors and a DHT22 (DHT11 is supported but code needs to be changed appropriately)
- SD card module and an SD card
- Combination of pumps and valves to control water flow
- Internet connection is highly recommended

## Installation
In order to use this project with the Arduino IDE first you have to install:
1. The ESP32 compiler
    - follow [this](https://www.youtube.com/watch?v=mBaS3YnqDaU) YoutTube tutorial (url -> https://dl.espressif.com/dl/package_esp32_index.json)
2. The SPIFFS file system tools
    - in the Arduino projects directory (where the 'libraries' folder should exist) create a new folder named 'tools'
    - in the new folder decompress the .zip file named 'ESP32FS-1.0.zip' (that contains the 'ESP32FS' folder)
    - In order to check that everything was correctly set up, reopen the IDE and click 'Tools' on the top menu and if there is an option named 'ESP32 Sketch Data Upload' it means everything is ok
3. The necessary dependencies
    - on the top menu go to 'Sketch' > 'Include Library' > 'Add .ZIP Library' and add the 'AsyncTCP', 'ESPAsyncWebServer', 'NTPClient' and 'thingspeak-arduino' libraries
    - add 'DHT sensor library' by Adafruit and 'ArduinoJson' by Benoit Blanchon through Library Manager ('Sketch' > 'Include Library' > 'Library Manager')

Now you can open 'main' in the Arduino IDE. Before you do anything be sure that the target board is set to an ESP32 board and not an Arduino Uno (if you don't know exactly which ESP32 board you have, 'ESP32 Dev Module' should work just fine). Next, you have to load the web files to the ESP32. To do so go to 'Tools' > 'ESP32 Sketch Data Upload' and the files will start copying to the board. Now you can finally upload the program to the ESP32

***Observations***:
It's recommended that the Arduino IDE's serial monitor is closed during any upload to the ESP32. Moreover it's possible that in order to load files to the board you need to press the 'boot' button in your ESP32 dev board

## Configuration
To configure wifi credentials you can either write a file to the sd card named 'config.txt' with the `{"ssid": "YOUR_SSID", "password": "YOUR_PASSWORD"}` json string or type your ssid and password directly into the source code in lines 81 and 82:
```markdown
const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";
```

## ThingSpeak
The project currently supports 7 ThingSpeak fields:
1. Soil Moisture Average
2. Ambient Temperature
3. Ambient Humidity
4. Water Level
5. Pump 1 State
6. Pump 2 State
7. Error Codes

In order to set up your own ThingSpeak channel you need to create a ThingSpeak account and then create a channel. Then, in channel settings enable fields 1 through 7. Finally copy your channel ID and Write API Key (under 'API Keys') and copy them to the projects in lines 90 and 91:
```markdown
const uint16_t channelID = 1234567;
const char* channelApiKey = "ABCDEFGHIJKLMNOPQ";
```

## Contact
If you have any questions regarding how something works, how to upload the code to the ESP32, have any suggestions for improvement or spotted a bug don't hesitate to contact me through my email _lautisilbergleit@gmail.com_
