export interface Sensor {
  id: string;
  name: string;
  type: string;
  value: boolean | number | string | null;
}

export interface Hardware {
  id: string;
  name: string;
  type: string;
  subHardware: Array<Hardware>;
  sensors: Array<Sensor>;
}

export enum SensorType {
  Voltage = 0,
  Clock = 1,
  Temperature = 2,
  Load = 3,
  Frequency = 4,
  Fan = 5,
  Flow = 6,
  Control = 7,
  Level = 8,
  Factor = 9,
  Power = 10,
  Data = 11,
  SmallData = 12,
  Throughput = 13,
}
