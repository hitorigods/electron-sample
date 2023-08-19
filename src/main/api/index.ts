import { ipcMain } from 'electron';

ipcMain.on('clickCount', (_event, count) => {
  console.log('count', count);
});
