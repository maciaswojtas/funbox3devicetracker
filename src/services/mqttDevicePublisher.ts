import ReportedDevice from '../dto/reportedDevice'
import * as  MQTT from "async-mqtt";
export default class MqttDevicePublisher {
    private client: MQTT.AsyncClient;
    constructor(
        private host: string,
        private username: string,
        private password: string,
        private topic: string) {
        console.log("Connecting to MQTT broker")
        this.client = MQTT.connect(this.host, { password: this.password, username: this.username });
    }
    public async publishChangedDevices(devicesToReport: ReportedDevice[]) {

        for (const device of devicesToReport) {
            await this.client.publish(this.topic + device.name, String(device.active));
            console.log("Publishing event for to topic " + this.topic + device.name + " with value " + String(device.active))
        }
        await this.client.end();

    }


}