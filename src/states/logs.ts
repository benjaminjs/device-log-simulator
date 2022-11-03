import create from "zustand";
import { Device, DeviceStore } from "./devices";

export const logsPerTick = 20;

const API_URL = "https://shield-logging.onrender.com";

export type LogRequestParams = {
  minDuration?: string;
  deviceGeneration?: string;
  from?: string;
  to?: string;
};

export interface DeviceLog {
  robot: string;
  deviceGeneration: string;
  lat: number;
  lng: number;
  startTime: string;
  endTime: string;
}

export interface DeviceLogResponse extends DeviceLog {
  id: number;
  duration: number;
}

export interface LogState {
  totalLogs: number;
  logs: DeviceLogResponse[];
  sendLogs: (device: Device) => Promise<void>;
  lastQueryTime: Date | null;
  getRecentLogs: (options: LogRequestParams) => Promise<void>;
}

const randomDeviceLog = (device: Device): DeviceLog => {
  const lat = Math.random() * 180 - 90;
  const lng = Math.random() * 360 - 180;
  const startTime = new Date().toISOString();

  const newEndTime = new Date();
  newEndTime.setMinutes(
    newEndTime.getMinutes() + Math.floor(Math.random() * 30)
  );

  const endTime = newEndTime.toISOString();

  return {
    robot: device.robot,
    deviceGeneration: device.deviceGeneration,
    lat,
    lng,
    startTime,
    endTime,
  };
};

export const LogStore = create<LogState>((set) => ({
  totalLogs: 0,
  logs: [],
  lastQueryTime: null,
  sendLogs: async (device) => {
    // send random logs to the server
    const logs = Array.from({ length: logsPerTick }, () =>
      randomDeviceLog(device)
    );
    try {
      // TODO: switch to env variable
      await fetch(`${API_URL}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logs),
      });

      set((state) => ({
        totalLogs: state.totalLogs + logsPerTick,
      }));
      if (DeviceStore.getState().devices[device.robot]) {
        DeviceStore.getState().increaseDeviceLogCount(
          device.robot,
          logsPerTick
        );
      }
    } catch (e) {
      console.error(e);
    }
  },
  getRecentLogs: async (options) => {
    // get recent logs from server
    const params: LogRequestParams = {};

    if (options.minDuration && options.minDuration !== "0") {
      params["minDuration"] = options.minDuration;
    }
    if (options.deviceGeneration) {
      params["deviceGeneration"] = options.deviceGeneration;
    }
    if (options.from) {
      params["from"] = new Date(options.from).toISOString();
    }
    if (options.to) {
      params["to"] = new Date(options.to).toISOString();
    }

    try {
      const res = await fetch(
        `${API_URL}/logs?${new URLSearchParams({
          ...params,
          limit: "100",
        })}`
      );
      const logs = await res.json();
      set((state) => ({
        logs,
        lastQueryTime: new Date(),
      }));
    } catch (e) {
      console.error(e);
    }
  },
}));
