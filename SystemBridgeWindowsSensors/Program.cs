using System;
using LibreHardwareMonitor.Hardware;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SystemBridgeWindowsSensors
{
    class Program
    {
        static void Main(string[] args)
        {
            Computer computer = new Computer
            {
                IsCpuEnabled = true,
                IsGpuEnabled = true,
                IsMemoryEnabled = true,
                IsMotherboardEnabled = true,
                IsControllerEnabled = true,
                IsNetworkEnabled = true,
                IsStorageEnabled = true
            };

            computer.Open();
            computer.Accept(new UpdateVisitor());


            JArray arrRoot = new JArray();

            foreach (IHardware hardware in computer.Hardware)
            {
                JObject objHardware = new JObject
                {
                    ["id"] = hardware.Identifier.ToString(),
                    ["name"] = hardware.Name,
                    ["type"] = hardware.HardwareType.ToString(),
                };

                JArray arrSubHardware = new JArray();

                foreach (IHardware subhardware in hardware.SubHardware)
                {
                    JObject objSubHardware = new JObject
                    {
                        ["id"] = hardware.Identifier.ToString(),
                        ["name"] = hardware.Name,
                        ["type"] = hardware.HardwareType.ToString(),
                    };

                    JArray arrSubHardwareSensors = new JArray();

                    foreach (ISensor sensor in subhardware.Sensors)
                    {
                        arrSubHardwareSensors.Add(new JObject
                        {
                            ["id"] = sensor.Identifier.ToString(),
                            ["name"] = sensor.Name,
                            ["type"] = sensor.SensorType.ToString(),
                            ["value"] = sensor.Value,
                        });
                    }
                    objSubHardware["sensors"] = arrSubHardwareSensors;
                    arrSubHardware.Add(objSubHardware);
                }

                objHardware["subhardware"] = arrSubHardware;

                JArray arrSensors = new JArray();

                foreach (ISensor sensor in hardware.Sensors)
                {
                    arrSensors.Add(new JObject
                    {
                        ["id"] = sensor.Identifier.ToString(),
                        ["name"] = sensor.Name,
                        ["type"] = sensor.SensorType.ToString(),
                        ["value"] = sensor.Value,
                    });
                }

                objHardware["sensors"] = arrSensors;

                arrRoot.Add(objHardware);
            }

            Console.WriteLine(arrRoot.ToString(Formatting.None));
        }
    }
}
