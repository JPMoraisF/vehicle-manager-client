import { MaintenanceItem } from "./MaintenanceItem";

export interface Maintenance {
  id?: number;
  maintenanceDate: Date;
  kilometersDriven: number;
  notes?: string;
  isDealershipService: boolean;
  vehicleId: number;
  maintenanceItems?: MaintenanceItem[]
}
