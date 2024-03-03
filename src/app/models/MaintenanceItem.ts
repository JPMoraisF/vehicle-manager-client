export interface MaintenanceItem {
  id?: string;
  description: string;
  unitCost: number;
  quantity: number;
  totalCost?: number;
  maintenanceId?: number;
  totalAmount?: number;
}
