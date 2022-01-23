import { PriceCatalogue } from '../types';

/**
 * The default prices for all items in the store.
 *
 * Stored in a configuration file in case we have more
 * defaults that need to be referenced. Allows us to
 * keep everything in one place.
 */
export const defaultPrices: PriceCatalogue = {
  ipd: {
    name: 'Super iPad',
    price: 549.99,
  },
  mbp: {
    name: 'MacBook Pro',
    price: 1399.99,
  },
  atv: {
    name: 'Apple TV',
    price: 109.5,
  },
  vga: {
    name: 'VGA adapter',
    price: 30.0,
  },
};
