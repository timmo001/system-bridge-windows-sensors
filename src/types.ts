export interface Sensor {
  id: string;
  name: string;
  type: string;
  value: boolean | number | string;
}

export interface Hardware {
  id: string;
  name: string;
  type: string;
  subHardware: Hardware[];
  sensors: Sensor[];
}
