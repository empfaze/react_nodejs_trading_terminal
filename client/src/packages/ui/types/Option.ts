import { Align } from './Align';
import { Message } from './Message';
import { Size } from './Size';

export interface Option {
  value: string | number;
  text: Message;
  align?: Align;
  size?: Size;
}
