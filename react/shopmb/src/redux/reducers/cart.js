const initState = {
    cartItems: [],
    totalPrice: 0,
};

const cart = (state = initState, action) => {
    switch (action.type) {
        case 'add_cart':
            const productInCart = state.cartItems.find((item) => {
                return (
                    item.idProduct === action.payload.idProduct &&
                    item.color === action.payload.color &&
                    item.ver === action.payload.ver &&
                    item.sale === action.payload.sale
                );
            });
            if (productInCart) {
                const newcCartItems = [...state.cartItems];
                const ojIndex = newcCartItems.findIndex((item) => {
                    return (
                        item.idProduct === action.payload.idProduct &&
                        item.color === action.payload.color &&
                        item.ver === action.payload.ver &&
                        item.sale === action.payload.sale
                    );
                });
                newcCartItems[ojIndex] = {
                    ...newcCartItems[ojIndex],
                    qty: newcCartItems[ojIndex].qty + action.payload.qty,
                };
                const newCart = {
                    ...state,
                    cartItems: [...newcCartItems],
                    totalPrice:
                        state.totalPrice +
                        action.payload.qty *
                            (action.payload.price - action.payload.price * (action.payload.sale / 100)),
                };
                return newCart;
            } else {
                const newCart = {
                    ...state,
                    cartItems: [
                        {
                            id: action.payload.id,
                            idProduct: action.payload.idProduct,
                            name: action.payload.name,
                            price: action.payload.price,
                            sale: action.payload.sale,
                            img: action.payload.img,
                            ver: action.payload.ver,
                            color: action.payload.color,
                            qty: action.payload.qty,
                        },
                        ...state.cartItems,
                    ],
                    totalPrice:
                        state.totalPrice +
                        action.payload.qty *
                            (action.payload.price - action.payload.price * (action.payload.sale / 100)),
                };
                return newCart;
            }
        case 'update_cart':
            const product = state.cartItems.find((item) => {
                return item.id === action.payload.id;
            });
            if (product) {
                const newCartItems = [...state.cartItems];
                const ojIndex = newCartItems.findIndex((item) => {
                    return item.id === action.payload.id;
                });
                newCartItems[ojIndex] = { ...newCartItems[ojIndex], qty: action.payload.qty };
                const newCart = {
                    ...state,
                    cartItems: newCartItems,
                    totalPrice:
                        product.qty > action.payload.qty
                            ? state.totalPrice -
                              (product.qty - action.payload.qty) *
                                  (product.price - product.price * (product.sale / 100))
                            : state.totalPrice +
                              (action.payload.qty - product.qty) *
                                  (product.price - product.price * (product.sale / 100)),
                };
                return newCart;
            } else {
                return state;
            }
        case 'delete_cart':
            const _productInCart = state.cartItems.find((item) => {
                return item.id === action.payload.id;
            });
            if (_productInCart) {
                const newCartItems = state.cartItems.filter((item) => {
                    return item.id !== action.payload.id;
                });
                const newCart = {
                    ...state,
                    cartItems: newCartItems,
                    totalPrice:
                        state.totalPrice -
                        _productInCart.qty *
                            (_productInCart.price - _productInCart.price * (_productInCart.sale / 100)),
                };
                return newCart;
            } else {
                return state;
            }
        case 'delete_all':
            return {
                cartItems: [],
                totalPrice: 0,
            };
        default:
            return state;
    }
};

export default cart;
