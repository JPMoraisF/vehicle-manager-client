export interface MaintenanceItem {
  id?: number;
  description: string;
  unitCost: number;
  quantity: number;
  totalCost?: number;
  maintenanceId?: number;
  totalAmount?: number;
}
