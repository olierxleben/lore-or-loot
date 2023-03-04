import { atom, map } from "nanostores";

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
};

export type WealthItem = {
  id: string;
  quantity: number;
};

type InventoryDisplayInfo = Pick<InventoryItem, "id" | "name">;
type WealthDisplayInfo = Pick<WealthItem, "id" | "quantity">;
export const inventory = map<Record<string, InventoryItem>>({});
export const wealth = map<Record<string, WealthItem>>({
  coins: { id: "coins", quantity: 10 },
});

/** adds an item to the inventory. */
export function addInventoryItem({ id, name }: InventoryDisplayInfo) {
  const existingEntry = inventory.get()[id];
  if (existingEntry) {
    inventory.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    inventory.setKey(id, { id, name, quantity: 1 });
  }
}

/** update the wealth store */
export function substractWealth({ id, quantity }: WealthDisplayInfo) {
  const existingEntry = wealth.get()[id];
  if (!existingEntry) {
    //TODO: add error handling
    console.error("this wealth does not exist does not exist");
    return null;
  } else {
    const newQuantity = existingEntry.quantity - quantity;
    wealth.setKey(id, {
      ...existingEntry,
      quantity: newQuantity,
    });

    return newQuantity;
  }
}
