import { join } from "path";
import execa from "execa";

import { Hardware } from "./types";

class Sensors {
  constructor() {}

  async getData(debug?: boolean): Promise<Array<Hardware>> {
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
}

export default Sensors;
