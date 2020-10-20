import * as restclient from 'node-rest-client-promise';
import ReportedDevice from '../dto/reportedDevice'
export default class FunboxService {
    private client: any;
    constructor(
        host: string,
        login: string,
        password: string,
    ) {
        this.client = new restclient.Client();
        this.client.registerMethodPromise("login", host + "/authenticate?username=" + login + "&password=" + password, "POST");
        this.client.registerMethodPromise("getDevices", host + "/sysbus/Devices:get", "POST");
    }

    public async getDeviceStatus(): Promise<ReportedDevice[]> {
        console.log("Login to Funbox3");
        let loginData = await this.client.methods.login();
        this.checkLoginResponse(loginData);
        console.log("Getting devices from Funbox3");
        let devices = await this.client.methods.getDevices(this.prepareOptionGetDevices(loginData));
        this.checkDeviceResponse(devices);
        return this.extractDevicesData(devices.data)
    }

    private checkLoginResponse(loginData: any) {
        if (loginData.response.statusCode !== 200 || loginData.data.status !== 0) {
            throw ('Unable to login to Funbox3');
        }
    }
    private checkDeviceResponse(devicesData: any) {
        if (devicesData.response.statusCode !== 200 ) {
            throw ('Unable to get devices data from Funbox3');
        }
    }


    private prepareOptionGetDevices(loginData: any) {
        return { headers: { 'X-Context': loginData.data.data.contextID, Cookie: loginData.response.headers['set-cookie'] } };
    }

    private extractDevicesData(data: any) : ReportedDevice[] {
        const body = JSON.parse(data)
        let deviceArray = new Array<ReportedDevice>();
        for (let item of body.status) {
            deviceArray.push(new ReportedDevice(item.Active, item.Name, item.ClientID));
        }
        return deviceArray;
    }
}


