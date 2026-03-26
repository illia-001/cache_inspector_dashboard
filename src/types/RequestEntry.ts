import type { Status } from './Status';

export interface RequestEntry {
  time: number;
  status: Status;
  delay: number;
}
