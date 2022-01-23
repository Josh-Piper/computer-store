/**
 * Calculate the default cost of a purchase.
 *
 * Used as a helper method since tax, locale rules etc.
 * might be applied to the default cost of an item.
 *
 * @param cost The cost of the item.
 * @param quantity The number of items.
 * @returns {number} The default cost of the purchase.
 */
export const calculateDefaultTotalPrice = (cost: number, quantity: number) => {
  return cost * quantity;
};
