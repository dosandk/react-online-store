import { cart } from './cart.js'
import { wishList } from './wish-list.js'
import { counter } from './counter.js';
import { loader } from './loader.js';

import { transformReducers } from './transform-reducers.js'

export default transformReducers({
  cart,
  wishList,
  counter,
  loader
})

