export interface Tile {
  nationOfficialId: string;
  title: string;
  description?: string;
  value: string | number;
  updatedAt: string;
}

export const emptyTile: Tile = {
  nationOfficialId: "",
  title: "",
  description: "",
  value: "",
  updatedAt: "",
};
