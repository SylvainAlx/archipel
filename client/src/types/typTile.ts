export interface Tile {
  _id: string;
  nationOfficialId: string;
  title: string;
  description?: string;
  value: string | number;
  updatedAt: string;
  isFree: boolean;
}

export const emptyTile: Tile = {
  _id: "",
  nationOfficialId: "",
  title: "",
  description: "",
  value: "",
  updatedAt: "",
  isFree: true,
};
