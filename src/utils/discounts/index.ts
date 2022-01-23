import { calculateDefaultTotalPrice } from '../helpers';
import { OrderDetails } from '../types';

/**
 * When the quantity of an item is greater or equal to 3, than apply a discount
 * for 3 for the price of 2.
 *
 * For example, an order containing 3 iPads will be discounted to the total price of 2.
 *
 * @param {OrderDetails} itemOrderDetails The quantity and price of the item.
 * @returns {number} The total price for the order of a particular item type.
 */
export const discount3ForThePriceOf2 = (itemOrderDetails: OrderDetails): number => {
  const { cost, quantity } = itemOrderDetails;
  const defaultTotalPrice = calculateDefaultTotalPrice(cost, quantity);

  // Calculate the total price discounted for the item.
  const discount = Math.floor(quantity / 3) * cost;

  return defaultTotalPrice - discount;
};

/**
 * When a bulk sale is made (more than 4 items of the same type), then apply a discount
 * where each item costs AU$499.99.
 *
 * @param {OrderDetails} itemOrderDetails The quantity and price of the item.
 * @returns {number} The total price for the order of a particular item type.
 */
export const bulkDiscountAt499 = (itemOrderDetails: OrderDetails): number => {
  const { cost, quantity } = itemOrderDetails;

  // When a bulk discount is not made, then this rule does not apply.
  if (quantity < 5) {
    return calculateDefaultTotalPrice(cost, quantity);
  }

  return 499.99 * quantity;
};
