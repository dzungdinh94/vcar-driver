import User from "./User";
import Home from './Home';
import Transaction from './Transacsion';
import Order from './Order'
import OnApp from './OnApp'
import EnterAddress from './EnterAddress'
import Map from './Map'

const stores = {
  User,
  Home,
  Transaction,
  Order,
  OnApp,
  EnterAddress,
  Map
};

export default {
  ...stores
};
