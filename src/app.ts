import FunboxService from './services/funbox3Service';
import ReportedDevice from './dto/reportedDevice';
import ComparatorService from './services/comperatorService'
import MqttDevicePublsher from './services/mqttDevicePublisher'
import * as config from 'config-yml';


let service = new FunboxService(
    config.funbox3.host,
    config.funbox3.user,
    config.funbox3.password);
let comparator =  new ComparatorService(config['device_list'], config.iteration_to_false);
monitorDevices();

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function monitorDevices() {
    while (1 == 1) {
        try {
            await refreshStatus();
        } catch (error) {
            console.error(error)
            comparator.clearStatuses()
        } finally {
            await timeout(config.interval * 1000);
        }

    }
}

async function refreshStatus() {
    let listOfDevices = await service.getDeviceStatus();
    let devicesWithChangedStatus = comparator.changedStatus(listOfDevices);
    if (devicesWithChangedStatus.length > 0) {
        let publisher = new MqttDevicePublsher(
            config.mqtt.host,
            config.mqtt.user,
            config.mqtt.password,
            config.mqtt.topic);

        await publisher.publishChangedDevices(devicesWithChangedStatus);
    }



}