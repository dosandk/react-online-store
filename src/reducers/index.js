import { products } from './products.js'
import { counter } from './counter.js';
import { loader } from './loader.js';

import { transformReducers } from './transform-reducers.js'

export default transformReducers({
  products,
  counter,
  loader
})

