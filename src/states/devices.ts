import create from "zustand";
import generate from "project-name-generator";

export type Device = {
  robot: string;
  deviceGeneration: string;
  logCount: number;
};

export interface DeviceState {
  devices: {
    [id: string]: Device;
  };
  deviceIds: string[];
  addDevice: () => void;
  removeDevice: (id: string) => void;
  increaseDeviceLogCount: (id: string, count: number) => void;
}

const randomDevice = () => {
  // Generate a random generation of robot : "2-3"
  const deviceGen =
    Math.floor(Math.random() * 99) + "-" + Math.floor(Math.random() * 99);
  return {
    robot: generate({ words: 2 }).dashed,
    deviceGeneration: deviceGen,
    logCount: 0,
  };
};

const initalDevice = randomDevice();

export const DeviceStore = create<DeviceState>((set) => ({
  devices: {
    [initalDevice.robot]: initalDevice,
  },
  deviceIds: [initalDevice.robot],
  addDevice: () => {
    const device = randomDevice();
    set((state) => {
      return {
        devices: {
          ...state.devices,
          [device.robot]: device,
        },
        deviceIds: [...state.deviceIds, device.robot],
      };
    });
  },
  removeDevice: (id: string) => {
    set((state) => {
      const { [id]: _, ...devices } = state.devices;
      return {
        devices,
        deviceIds: state.deviceIds.filter((d) => d !== id),
      };
    });
  },
  increaseDeviceLogCount: (id: string, count: number) => {
    set((state) => ({
      devices: {
        ...state.devices,
        [id]: {
          ...state.devices[id],
          logCount: state.devices[id].logCount + count,
        },
      },
    }));
  },
}));
