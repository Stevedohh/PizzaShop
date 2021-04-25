const initialState = {
  items: [],
  categories: [],
  isLoaded: false,
};

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PIZZAS':
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };

    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      }

    default:
      return state;
  }
};

export default pizzas;
