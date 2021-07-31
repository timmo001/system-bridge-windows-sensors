import { join } from "path";
import execa from "execa";

import { Hardware } from "./types";

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
  return JSON.parse(stdout);
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
