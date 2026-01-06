export interface BusLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'pickup' | 'destination' | 'both';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBusLocationDTO {
  name: string;
  latitude: number;
  longitude: number;
  type: 'pickup' | 'destination' | 'both';
  isActive?: boolean;
}

export interface UpdateBusLocationDTO {
  id: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  type?: 'pickup' | 'destination' | 'both';
  isActive?: boolean;
}
