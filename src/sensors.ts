import { join } from "path";
import execa from "execa";

import { Hardware, Sensor } from "./types";

const PATH = join(
  __dirname,
  "WindowsSensors",
  "SystemBridgeWindowsSensors.exe"
);

function cleanupData(data: Array<Hardware>): Array<Hardware> {
  return data.map((hardware: Hardware) => {
    hardware.sensors = hardware.sensors.map((sensor: Sensor) => {
      if (sensor.value === "NaN") sensor.value = null;
      return sensor;
    });
    return hardware;
  });
}

export async function getAllHardware(): Promise<Array<Hardware>> {
  const { stdout, stderr } = await execa(PATH);
  if (stderr) throw new Error(stderr);
  return cleanupData(JSON.parse(stdout));
}

export async function getHardwareById(id: string): Promise<Hardware> {
  const hardwareData = await getAllHardware();
  return hardwareData.find((hardware: Hardware) => hardware.id === id);
}

export async function getHardwareByName(name: string): Promise<Hardware> {
  const hardwareData = await getAllHardware();
  return hardwareData.find((hardware: Hardware) => hardware.name === name);
}

export async function getHardwareByType(type: string): Promise<Hardware> {
  const hardwareData = await getAllHardware();
  return hardwareData.find((hardware: Hardware) => hardware.type === type);
}
