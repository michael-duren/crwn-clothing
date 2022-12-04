import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItemType } from './cart.types';
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

const addCartItem = (
  cartItems: CartItemType[],
  productToAdd: CategoryItem
): CartItemType[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItemType[],
  productToRemove: CartItemType
): CartItemType[] => {
  const removeItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (removeItem && removeItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeSingleItem = (
  cartItems: CartItemType[],
  productToRemove: CartItemType
): CartItemType[] => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItemType[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const setCartItems = withMatcher(
  (cartItems: CartItemType[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItemType[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItemType[],
  cartItemToRemove: CartItemType
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const removeSingleItemFromCart = (
  cartItems: CartItemType[],
  cartItemToRemove: CartItemType
) => {
  const newCartItems = removeSingleItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};
