type Action =
  | 'RELOAD_REQUIRED'
  | 'CODE_EXECUTION_REQUIRED'
  | 'SAVED_CODE_REQUIRED';

export interface Message {
  ok: boolean;
  actionType: Action;
  text: string;
}

export interface MessageFromIframe {
  type: Action;
  payload: string;
}

export enum Actions {
  RELOAD_REQUIRED = 'RELOAD_REQUIRED',
  CODE_EXECUTION_REQUIRED = 'CODE_EXECUTION_REQUIRED',
  SAVED_CODE_REQUIRED = 'SAVED_CODE_REQUIRED',
}
