import { React, useSyncExternalStore } from 'react';
import Earnings from './Earnings';
import Orders from './Orders';
import navabarButtonStore from '../../stores/navbarButtonStore';

export default function Content() {
  const button = useSyncExternalStore(
    navabarButtonStore.subscribe,
    navabarButtonStore.getButton
  );

  console.log(button);
  return <main>{button === 'earnings' ? <Earnings /> : <Orders />}</main>;
}
