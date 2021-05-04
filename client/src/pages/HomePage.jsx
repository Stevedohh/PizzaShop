import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, PizzaBlock, PizzaLoadingBlock } from '../components';

import {fetchCategories, fetchPizzas, fetchPizzasByCategory} from '../redux/actions/pizzasActions';
import {setCategory} from "../redux/actions/filtersActions";

function HomePage() {
  const dispatch = useDispatch();
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  const categories = useSelector(({ pizzas }) => pizzas.categories);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const category = useSelector(({ filters }) => filters.category);


  React.useEffect(() => {
    dispatch(fetchPizzas());
    dispatch(fetchCategories())
  }, []);

  const onSelectCategory = React.useCallback((categoryName) => {
    if (categoryName === null) {
      dispatch(fetchPizzas());
    }

    dispatch(setCategory(categoryName))
    dispatch(fetchPizzasByCategory(categoryName))
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };

  return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories
              activeCategory={category}
              onClickCategory={onSelectCategory}
              items={categories}
            />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoaded
              ? pizzas.map((pizza) => (
                  <PizzaBlock
                    onClickAddPizza={handleAddPizzaToCart}
                    key={pizza.id}
                    addedCount={cartItems[pizza.id] && cartItems[pizza.id].items.length}
                    {...pizza}
                  />
                ))
              : Array(8)
                  .fill(0)
                  .map((_, index) => <PizzaLoadingBlock key={index} />)}
          </div>
        </div>
      </div>
  );
}

export default HomePage;
