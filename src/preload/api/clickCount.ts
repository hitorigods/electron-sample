import { ipcRenderer } from 'electron';

export const clickCount = (count: number): void => {
  ipcRenderer.send('clickCount', count);
};
