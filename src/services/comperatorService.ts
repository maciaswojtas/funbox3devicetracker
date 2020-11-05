import ReportedDevice from '../dto/reportedDevice'
import MonitoredDevice from '../dto/monitoredDevice'
export default class ComperatorService {
    private monitoredDevices: MonitoredDevice[];
    private iterationToFalse: Number;
    constructor(devicesToMonitor: any[], iterationToFalse: number) {
        this.monitoredDevices = new Array<MonitoredDevice>();
        this.iterationToFalse = iterationToFalse;
        devicesToMonitor.forEach(deviceToMonitor => {
            this.monitoredDevices.push(new MonitoredDevice(0, null, deviceToMonitor.name, "01:" + deviceToMonitor.mac.toUpperCase()))
        });

    }

    public changedStatus(newReportedDevices: ReportedDevice[]): ReportedDevice[] {
        let retVal: ReportedDevice[] = new Array<ReportedDevice>();

        this.monitoredDevices.forEach(monitoredDevice => {
            let newReportedDevice = newReportedDevices.find
                (newElement => { return monitoredDevice.clientID == newElement.clientID && monitoredDevice.active != newElement.active })
            if (newReportedDevice) {
                console.log("Device with name " + monitoredDevice.name + " changed status from " + monitoredDevice.active + " to " + newReportedDevice.active);
                if (!newReportedDevice.active) {
                    if (this.iterationToFalse > monitoredDevice.notSeenSince) {
                        monitoredDevice.notSeenSince++;
                        console.log ("Device " +monitoredDevice.name+" not seen since " + monitoredDevice.notSeenSince + " NOT reporting");
                    } else {
                        monitoredDevice.active = false;
                        retVal.push(monitoredDevice)
                        console.log ("Device " +monitoredDevice.name+" reporting as not active");
                        monitoredDevice.notSeenSince = 0;
                    }    
                }
                else {
                    monitoredDevice.active = true;    
                    monitoredDevice.notSeenSince = 0;
                    retVal.push(monitoredDevice)
                    console.log ("Device " +monitoredDevice.name+" become active reporting");
                    
                }
                
                
            }
        });

        return retVal;

    }

    public clearStatuses() {
        this.monitoredDevices.forEach(device => { device.active = null })
    }

}