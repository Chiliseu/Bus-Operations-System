export interface Bus {
  busId: string;
  //route: string;
  type: string;
  capacity: number;
  image: string | null;
  license_plate?: string;
}