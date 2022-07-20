import { cart } from './cart.js'
import { wishList } from './wish-list.js'

import { transformReducers } from './transform-reducers.js'

export default transformReducers({
  cart,
  wishList
})

