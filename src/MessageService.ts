import { IMessageService } from './IMessageService';

export class MessageService implements IMessageService {
  send(message: string): void {
    console.log(message);
  }
}
