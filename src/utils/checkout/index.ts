import { ItemType, PriceCatalogue, PricingRule, PricingRules } from '../types';
import { defaultPrices } from '../config';
import { calculateDefaultTotalPrice } from '../helpers';

/**
 * The Checkout class is responsible for handling all purchases made by the customer
 * regarding the computer.
 */
export class Checkout {
  /**
   * The pricing rules that are applied during the checkout process.
   *
   * For example, a rule could be applied to discount the price of an item
   * if the item is scanned 3 times.
   */
  private pricingRules: PricingRules;

  /**
   * The cart of items that have been scanned.
   */
  private cart: Map<ItemType, number>;

  /**
   * The default prices for all items in the store.
   */
  private prices: PriceCatalogue;

  /**
   * Create a new Checkout object.
   *
   * @param {PricingRules} pricingRules The rules/discounts that are applied during the checkout process.
   * @param {PriceCatalogue} prices The default prices that the cart uses.
   */
  constructor(pricingRules: PricingRules, prices: PriceCatalogue = defaultPrices) {
    this.pricingRules = pricingRules;
    this.prices = prices;

    // Create a new cart keeping track of the number of items per item type for faster lookups.
    this.cart = new Map<ItemType, number>();
  }

  /**
   * Get the total amount of money that needs to be paid for the items scanned.
   *
   * @returns {number} The total amount required for the purchase.
   */
  get total(): number {
    let total = 0;

    // Get total amount of items per item type
    for (const [itemType, quantity] of this.cart) {
      const { price } = this.prices[itemType];
      const itemRule = this.pricingRules.get(itemType);

      // Apply the rule (discount) if one exists.
      if (itemRule) {
        const applyDiscount = itemRule as PricingRule;
        const itemTypeTotalPrice = applyDiscount({ cost: price, quantity });
        total += itemTypeTotalPrice;

        continue;
      }

      total += calculateDefaultTotalPrice(price, quantity);
    }

    return total;
  }

  /**
   * Scan an item into the cart.
   *
   * @param {ItemType} item The item to add to the cart.
   */
  scan(item: ItemType, quantity = 1): void {
    // If the item isn't in the cart, then add it.
    if (!this.cart.has(item)) {
      this.cart.set(item, quantity);
      return;
    }

    const currentTotalQuantity = this.cart.get(item) as number;
    this.cart.set(item, currentTotalQuantity + quantity);
  }

  /**
   * Clear all items from the cart.
   */
  clearItems(): void {
    this.cart.clear();
  }
}
