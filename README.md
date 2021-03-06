# funbox3devicetracker
Device tracker monitors status of devices connected to Orange Funbox 3 wifi router. Status of device is published over MQTT

# Install
npm install

# Start
npm start

# Config
Config should be placed in config.yml file. Sample configuration in sample_config.yml

Configuration of MQTT broker
``` yaml
mqtt: 
  host: mqtt://192.168.0.1:1883
  user: admin
  password: changeMe
  topic: /device/tracker/
```
Funbox params
``` yaml
funbox3:
  host: http://192.168.0.1
  user: admin
  password: changeMe
```  
Time in seconds how often device list is queried from Funbox3.
``` yaml
interval: 10
```
Device list to monitor. Mac is used to find device, name is used as last part of topic
``` yaml
device_list: 
  - mac: "11:22:33:44:55:66"
    name: "mobile"
  - mac : "22:33:44:55:66:77"
    name : "laptop"
```
Number of iteration after device will reported as inactive to MQTT after it was reported inactive by router. 
``` yaml
iteration_to_false: 3
```

Sample configuration file in sample_config.yml

# Docker
To run with Docker execute as below. Currently image is build only for arm (raspberry pi 3)
``` 
docker run -v <path_to_your_config_file>/config.yml:/usr/src/app/config.yml  maciaswojtas/funbox3devicetracer
``` 

