import { create } from "zustand";

export const useCartStore = create((set) => ({
  // items contains id with the number of element
  // { "carrot-fries": { quantity: 10, item: ... } }
  items: {},
  addItem: (item) => {
    set((state) => {
      const itemId = item.id;
      if (!state.items[itemId]) {
        state.items[itemId] = { quantity: 1, item };
      } else {
        state.items[itemId] = {
          quantity: state.items[itemId].quantity + 1,
          item,
        };
      }

      return {
        items: { ...state.items },
      };
    });
  },
  removeItem: (item) => {
    set((state) => {
      const itemId = item.id;
      if (state.items[itemId]) {
        state.items[itemId] = {
          quantity: state.items[itemId].quantity - 1,
          item,
        };
        if (state.items[itemId].quantity === 0) {
          delete state.items[itemId];
        }
      }
      return {
        items: { ...state.items },
      };
    });
  },
}));

export const useTotalPrice = () => {
  return useCartStore((cart) =>
    Object.values(cart.items).reduce((acc, item) => {
      return acc + item.item.price * item.quantity;
    }, 0)
  );
};

export const useTotalItems = () => {
  return useCartStore((cart) =>
    Object.values(cart.items).reduce((acc, item) => {
      return acc + item.quantity;
    }, 0)
  );
};
