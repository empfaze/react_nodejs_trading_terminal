import { Instrument } from './Instrument';
import { Status } from './Status';
import { Side } from './Side';

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: Status;
  side: Side;
  price: string;
  amount: string;
  instrument: Instrument;
}
