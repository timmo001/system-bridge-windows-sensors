import { join } from "path";
import execa from "execa";

import { Hardware } from "./types";

export async function getAllData(debug?: boolean): Promise<Array<Hardware>> {
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

export async function getDataByType(
  type: string,
  debug?: boolean
): Promise<Hardware> {
  const hardwareData = await getAllData(debug);
  return hardwareData.find((hardware: Hardware) => hardware.type === type);
}
