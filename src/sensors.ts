import { join } from "path";
import execa from "execa";

import { Hardware, Sensor } from "./types";

function cleanupData(data: Array<Hardware>): Array<Hardware> {
  return data.map((hardware: Hardware) => {
    hardware.sensors = hardware.sensors.map((sensor: Sensor) => {
      if (sensor.value === "NaN") sensor.value = null;
      return sensor;
    });
    return hardware;
  });
}

export async function getAllHardware(
  debug?: boolean
): Promise<Array<Hardware>> {
  const { stdout, stderr } = await execa(
    join(
      __dirname,
      "../SystemBridgeWindowsSensors/bin",
      debug ? "Debug" : "Release",
      "SystemBridgeWindowsSensors.exe"
    )
  );
  if (stderr) throw new Error(stderr);
  return cleanupData(JSON.parse(stdout));
}

export async function getHardwareById(
  id: string,
  debug?: boolean
): Promise<Hardware> {
  const hardwareData = await getAllHardware(debug);
  return hardwareData.find((hardware: Hardware) => hardware.id === id);
}

export async function getHardwareByName(
  name: string,
  debug?: boolean
): Promise<Hardware> {
  const hardwareData = await getAllHardware(debug);
  return hardwareData.find((hardware: Hardware) => hardware.name === name);
}

export async function getHardwareByType(
  type: string,
  debug?: boolean
): Promise<Hardware> {
  const hardwareData = await getAllHardware(debug);
  return hardwareData.find((hardware: Hardware) => hardware.type === type);
}
