var soilMoisturePlot,dhtPlot,waterLevelPlot,pumpPlot,timeoutId;var maxDataPoints=20;var dataTransferRate=5*1000;var sensorCount=0;var haveSensorCount=false;var websocket=new WebSocket('ws://'+location.hostname+'/ws',['arduino']);websocket.onopen=function(event){console.log('connected');websocket.send(JSON.stringify({'com':'getsensorcount'}));};websocket.onclose=function(event){console.log('connection closed');};websocket.onerror=function(error){console.log('WebSocket Error ',error);};websocket.onmessage=function(event){console.log('Server: ',event.data);var data=JSON.parse(event.data);if(!haveSensorCount){if(data.hasOwnProperty('sensorcount')){sensorCount=data.sensorcount;} else{var msg='Sensor count not initialised';console.warn(msg);alert(msg+' - Reload window');} haveSensorCount=true;console.log(sensorCount);init();}else{var today=new Date();var t=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();addData(t,data.soilMoisture,data.soilMoistureAvg,data.temp,data.hum,data.waterLevel,data.pump1,data.pump2);}};function setDataRate(){dataTransferRate=document.getElementById("dataRateSlider").value;document.getElementById("dataRateLabel").innerHTML="Rate: "+dataTransferRate+" seconds";dataTransferRate*=1000;clearInterval(timeoutId);timeoutId=setInterval(sendRequest,dataTransferRate);} function setMaxData(){maxDataPoints=document.getElementById('maxDataSlider').value;document.getElementById("maxDataLabel").innerHTML='Max data points shown: '+maxDataPoints;} function sendRequest(){websocket.send(JSON.stringify({'com':'getsensorvals'}));} function init(){console.log('init');smpDatasets=[{data:[],label:"Average",borderColor:"#3e95cd",fill:false}];for(var i=0;i<sensorCount;i++){smpDatasets.push({data:[],label:'Sensor '+(i+1).toString(),borderColor:'#e66a22',fill:false});} soilMoisturePlot=new Chart(document.getElementById("soil_moisture-chart"),{type:'line',data:{labels:[],datasets:smpDatasets},options:{title:{display:true,text:'Soil Moisture'}}});dhtPlot=new Chart(document.getElementById("dht-chart"),{type:'line',data:{labels:[],datasets:[{data:[],label:"Temperature (C)",borderColor:"#3e95cd",fill:false},{data:[],label:"Humidity (%)",borderColor:"#e66a22",fill:false}]},options:{title:{display:true,text:'DHT Readings'}}});waterLevelPlot=new Chart(document.getElementById("water-chart"),{type:'line',data:{labels:[],datasets:[{data:[],label:"Water Level (%)",borderColor:"#3e95cd",fill:false}]},options:{title:{display:true,text:'Water Sensor Readings'}}});pumpPlot=new Chart(document.getElementById("pump-chart"),{type:'line',data:{labels:[],datasets:[{data:[],label:"Pump 1 (1:on - 2:off)",borderColor:"#3e95cd",fill:false},{data:[],label:"Pump 2 (1:on - 2:off)",borderColor:"#e66a22",fill:false}]},options:{title:{display:true,text:'Pump States'}}});sendRequest();timeoutId=setInterval(sendRequest,dataTransferRate);} function addData(label,sm_array,sm_avg,temp,hum,water_level,pump_state_1,pump_state_2){removeData();soilMoisturePlot.data.labels.push(label);for(var i=1;i<=sm_array.length;i++){soilMoisturePlot.data.datasets[i].data.push(sm_array[i-1]);} dhtPlot.data.labels.push(label);dhtPlot.data.datasets[0].data.push(temp);dhtPlot.data.datasets[1].data.push(hum);waterLevelPlot.data.labels.push(label);waterLevelPlot.data.datasets[0].data.push(water_level);pumpPlot.data.labels.push(label);pumpPlot.data.datasets[0].data.push((pump_state_1?1:0));pumpPlot.data.datasets[1].data.push((pump_state_2?1:0));soilMoisturePlot.update();dhtPlot.update();waterLevelPlot.update();pumpPlot.update();} function removeData(){var toBeRemoved=soilMoisturePlot.data.labels.length-maxDataPoints+1;if(toBeRemoved<=0){return;} soilMoisturePlot.data.labels.splice(0,toBeRemoved);soilMoisturePlot.data.datasets.forEach(element=>{element.data.splice(0,toBeRemoved);});dhtPlot.data.labels.splice(0,toBeRemoved);dhtPlot.data.datasets.forEach(element=>{element.data.splice(0,toBeRemoved);});waterLevelPlot.data.labels.splice(0,toBeRemoved);waterLevelPlot.data.datasets.forEach(element=>{element.data.splice(0,toBeRemoved);});pumpPlot.data.labels.splice(0,toBeRemoved);pumpPlot.data.datasets.forEach(element=>{element.data.splice(0,toBeRemoved);});}
