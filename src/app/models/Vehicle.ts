import { Maintenance } from "./Maintenance";

export interface Vehicle {
  id: number;
  make: string;
  modelName: string;
  kilometersDriven: number;
  modelYear: number;
  vin: string;
  image: string;
  licensePlate: string;
  color: string;
  notes: string; 
  dateAdded: Date;
  dateUpdated: Date;
  userId: string;
  maintenanceList: Maintenance[];
}
