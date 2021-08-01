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

export async function getAllHardware(pkg?: boolean): Promise<Array<Hardware>> {
  const { stdout, stderr } = await execa(
    join(
      pkg ? process.cwd() : __dirname,
      "WindowsSensors",
      "SystemBridgeWindowsSensors.exe"
    )
  );
  if (stderr) throw new Error(stderr);
  return cleanupData(JSON.parse(stdout));
}

export async function getHardwareById(
  id: string,
  pkg?: boolean,
  exact = true
): Promise<Hardware> {
  const hardwareData = await getAllHardware(pkg);
  return hardwareData.find((hardware: Hardware) =>
    exact ? hardware.id === id : hardware.id.includes(id)
  );
}

export async function getHardwareByName(
  name: string,
  pkg?: boolean,
  exact = true
): Promise<Hardware> {
  const hardwareData = await getAllHardware(pkg);
  return hardwareData.find((hardware: Hardware) =>
    exact ? hardware.name === name : hardware.name.includes(name)
  );
}

export async function getHardwareByType(
  type: string,
  pkg?: boolean,
  exact = true
): Promise<Hardware> {
  const hardwareData = await getAllHardware(pkg);
  return hardwareData.find((hardware: Hardware) =>
    exact ? hardware.type === type : hardware.type.includes(type)
  );
}
