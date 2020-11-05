import ReportedDevice from "./reportedDevice";

export default class MonitoredDevice extends ReportedDevice {

    constructor(
      public notSeenSince: number,
      public active: boolean,
      public name: string,
      public clientID: string) {
      super(active, name, clientID);
    }
  }