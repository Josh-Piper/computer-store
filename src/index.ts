import { Checkout } from './utils/checkout';
import { bulkDiscountAt499, discount3ForThePriceOf2 } from './utils/discounts';
import { ItemType, PricingRule, PricingRules } from './utils/types';

// Define the price rules for the application.
// Each rule is defined in a map for O(N) lookups and to allow
// flexibility for adding multiple rules per ItemType.
const pricingRules: PricingRules = new Map<ItemType, PricingRule>();

pricingRules.set(ItemType.APPLE_TV, discount3ForThePriceOf2);
pricingRules.set(ItemType.IPAD, bulkDiscountAt499);

// Create the Checkout object. Our default Checkout will use the
// default prices defined in the config file.
const myCheckout = new Checkout(pricingRules);

// Conduct the tests ensuring the purchase is correct.
myCheckout.scan(ItemType.APPLE_TV, 3);
myCheckout.scan(ItemType.VGA_ADAPTER);

const firstTestActualResult = myCheckout.total;
console.log('First test passed', firstTestActualResult === 249.0);

myCheckout.clearItems();

myCheckout.scan(ItemType.APPLE_TV);
myCheckout.scan(ItemType.APPLE_TV);
myCheckout.scan(ItemType.IPAD, 5);

console.log('Second test passed', myCheckout.total === 2718.95);
