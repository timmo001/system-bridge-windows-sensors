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
  path?: string,
  filter?: { [key: string]: boolean }
): Promise<Array<Hardware>> {
  const { stdout, stderr } = await execa(
    join(
      path ? path : __dirname,
      "WindowsSensors",
      "SystemBridgeWindowsSensors.exe"
    ),
    filter ? [JSON.stringify(filter)] : []
  );
  if (stderr) throw new Error(stderr);
  return cleanupData(JSON.parse(stdout));
}

export async function getHardwareById(
  id: string,
  path?: string,
  exact = true,
  multiple = false,
  filter?: { [key: string]: boolean }
): Promise<Hardware | Array<Hardware>> {
  const hardwareData = await getAllHardware(path, filter);
  return hardwareData[multiple ? "filter" : "find"]((hardware: Hardware) =>
    exact ? hardware.id === id : hardware.id.includes(id)
  );
}

export async function getHardwareByName(
  name: string,
  path?: string,
  exact = true,
  multiple = false,
  filter?: { [key: string]: boolean }
): Promise<Hardware | Array<Hardware>> {
  const hardwareData = await getAllHardware(path, filter);
  return hardwareData[multiple ? "filter" : "find"]((hardware: Hardware) =>
    exact ? hardware.name === name : hardware.name.includes(name)
  );
}

export async function getHardwareByType(
  type: string,
  path?: string,
  exact = true,
  multiple = false,
  filter?: { [key: string]: boolean }
): Promise<Hardware | Array<Hardware>> {
  const hardwareData = await getAllHardware(path, filter);
  return hardwareData[multiple ? "filter" : "find"]((hardware: Hardware) =>
    exact ? hardware.type === type : hardware.type.includes(type)
  );
}
