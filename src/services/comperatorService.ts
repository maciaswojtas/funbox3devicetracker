import ReportedDevice from '../dto/reportedDevice'
export default class ComperatorService {
    private monitoredDevices: ReportedDevice[];
    constructor(devicesToMonitor: any[]) {
        this.monitoredDevices = new Array<ReportedDevice>();
        devicesToMonitor.forEach(deviceToMonitor => {
            this.monitoredDevices.push(new ReportedDevice(null, deviceToMonitor.name, "01:" + deviceToMonitor.mac.toUpperCase()))
        });

    }

    public changedStatus(newReportedDevices: ReportedDevice[]): ReportedDevice[] {
        let retVal: ReportedDevice[] = new Array<ReportedDevice>();

        this.monitoredDevices.forEach(monitoredDevice => {
            let newReportedDevice = newReportedDevices.find
                (newElement => { return monitoredDevice.clientID == newElement.clientID && monitoredDevice.active != newElement.active })
            if (newReportedDevice) {
                console.log("Device with name " + monitoredDevice.name + " changed status from " + monitoredDevice.active + " to " + newReportedDevice.active);
                monitoredDevice.active = newReportedDevice.active;
                retVal.push(monitoredDevice)
            }
        });

        return retVal;

    }

    public clearStatuses() {
        this.monitoredDevices.forEach(device => { device.active = null })
    }

}