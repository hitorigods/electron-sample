import fs from 'fs';
import { is } from '@electron-toolkit/utils';
import { join } from 'path';

process.env.RESOURCES = process.env['ELECTRON_RENDERER_URL'] ? join(__dirname, '../../resources') : process.resourcesPath + '/app/';
const resourcesPath = process.env.RESOURCES;

const fileName = 'window.save.json';
const fileDir = './';
const devToolsWidth = 570;

const defaultSetting = {
  x: 0,
  y: 0,
  width: 1280,
  height: 800,
};

// ウィンドウのサイズを保存するファイル名
const srcFileDir = join(resourcesPath, fileDir);
const srcFileName = srcFileDir + fileName;

const windowSaveConfig = {
  x: defaultSetting.x,
  y: defaultSetting.y,
  width: is.dev ? defaultSetting.width + devToolsWidth : defaultSetting.width,
  height: defaultSetting.height,
};

// jsonファイルを読み込み結果を返す
const LoadWindowSize = (): typeof windowSaveConfig => {
  if (!fs.existsSync(srcFileName)) {
    return { ...windowSaveConfig };
  }
  const fileContent = fs.readFileSync(srcFileName, 'utf-8');

  try {
    return JSON.parse(fileContent);
  } catch (error) {
    return { ...windowSaveConfig };
  }
};

const windowSaveHandler = (window: Electron.BrowserWindow): void => {
  // サイズ情報を読み込む
  const setSize = LoadWindowSize();

  // サイズ情報があれば、設定する
  if (Object.entries(setSize).length != 0) {
    window.setPosition(setSize.x, setSize.y);
    window.setSize(setSize.width, setSize.height);
  }

  // アプリ終了時に画面情報を保存するよう設定
  window.on('close', () => {
    const windowSizes = window ? window.getSize() : [defaultSetting.width, defaultSetting.height];
    const windowPositions = window ? window.getPosition() : [defaultSetting.x, defaultSetting.y];
    const fileContents = {
      x: windowPositions[0],
      y: windowPositions[1],
      width: windowSizes[0],
      height: windowSizes[1],
    };

    // ディレクトリの存在を確認
    if (!fs.existsSync(srcFileName)) {
      try {
        // ディレクトリを作成
        fs.mkdirSync(srcFileDir, { recursive: true });
        console.log('ディレクトリが作成されました');
      } catch (error) {
        console.error('ディレクトリの作成中にエラーが発生しました:', error);
      }
    } else {
      console.log('ディレクトリは既に存在します');
    }

    fs.writeFile(srcFileName, JSON.stringify(fileContents), (error) => {
      if (error) {
        console.log('error', error);
      } else {
        console.log('データを保存しました');
      }
    });
  });
};

export { windowSaveConfig, windowSaveHandler };
