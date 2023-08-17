import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = PizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId

      //find the item
      const pizza = state.cart.find((item) => item.pizzaId === action.payload);

      //mutate the item
      pizza.quantity += 1;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaId

      //find the item
      const pizza = state.cart.find((item) => item.pizzaId === action.payload);

      //mutate the item
      pizza.quantity -= 1;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;

      //Delete item if the quantity === 0
      if (pizza.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getUsername = (state) => state.user.username;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;


export default cartSlice.reducer;
