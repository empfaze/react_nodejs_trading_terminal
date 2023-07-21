interface LocaleMessage {
  id: string;
  defaultMessage: string;
}

export type Message = LocaleMessage | string;
