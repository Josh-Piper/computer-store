/**
 * The different ItemTypes that can be purchased
 * at the computer store.
 *
 * Stored as an enum to keep track of all types of inventory.
 */
export enum ItemType {
  IPAD = 'ipd',
  MACBOOK_PRO = 'mbp',
  APPLE_TV = 'atv',
  VGA_ADAPTER = 'vga',
}

/**
 * The details of a particular item in the store.
 */
export interface PurchaseDetails {
  name: string;
  price: number;
}

/**
 * The details of each item in the store.
 */
export type PriceCatalogue = {
  [key in ItemType]: PurchaseDetails;
};

/**
 * The details required to calculate the total price of an item
 * during its purchase.
 *
 * Containing the cost and quantity of the particular item.
 */
export interface OrderDetails {
  cost: number;
  quantity: number;
}

/**
 * A pricing rule that can be applied to a particular item.
 */
export type PricingRule = (orderDetails: OrderDetails) => number;

/**
 * The pricing rules that are applied during the checkout process.
 */
export type PricingRules = Map<ItemType, PricingRule>;
