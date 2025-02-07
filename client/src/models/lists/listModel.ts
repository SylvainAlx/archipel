export class ListModel {
  protected items!: any[];
  sorting!: number;
  constructor() {
    this.items = [];
    this.sorting = 0;
  }

  getItems() {
    return this.items;
  }
  getByOfficialId(officialId: string) {
    return this.items.find((item) => item.officialId === officialId);
  }
  updateItemByOfficialId(element: any) {
    const itemUpdated = this.items.find(
      (item) => item.officialId === element.officialId,
    );
    itemUpdated.updateFields(element);
    return this;
  }

  removeByBaseId(baseId: string): any {
    this.items = this.items.filter((i) => i._id !== baseId);
    return this.items;
  }

  removeByOfficialId(officialId: string): any {
    this.items = this.items.filter((i) => i.officialId !== officialId);
    return this.items;
  }
}
