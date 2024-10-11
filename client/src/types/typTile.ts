export interface Tile {
  _id: string;
  nationOfficialId: string;
  title: string;
  description?: string;
  value: string | number;
  updatedAt: string;
}

export const emptyTile: Tile = {
  _id: "",
  nationOfficialId: "",
  title: "",
  description: "",
  value: "",
  updatedAt: "",
};
