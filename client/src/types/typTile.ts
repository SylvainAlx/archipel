export interface Tile {
  nationOfficialId: string;
  title: string;
  description?: string;
  value: string | number;
  updatedAt?: Date;
}

export const emptyTile: Tile = {
  nationOfficialId: "",
  title: "",
  description: "",
  value: "",
  updatedAt: new Date(),
};
