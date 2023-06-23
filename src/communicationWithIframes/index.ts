import { Message } from './types';

export default function typedPostMessage(
  el: MessageEventSource | null,
  message: Message,
) {
  el?.postMessage(JSON.stringify(message), { targetOrigin: '*' });
}
