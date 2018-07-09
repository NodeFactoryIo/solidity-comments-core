import * as path from 'path';
import fs from 'fs';
import { Contract } from './contract';

export class ContractFile extends Contract{

  constructor(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${filePath} not found!`);
    }
    super(fs.readFileSync(filePath, 'utf-8').split('\n'));
    this.path = filePath;
    this.fileName = path.basename(filePath);
  }

  getFilename() {
    return this.fileName;
  }

  getPath() {
    return this.path;
  }

  save(path = null) {
    if (!path) {
      path = this.path;
    }
    return new Promise((resolve, reject) => {
      let file = fs.createWriteStream(path);
      file.on('error', function(err) { reject(err); });
      this.lines.forEach((line) => {
        file.write(line + '\n');
      });
      file.end();
      resolve();
    });
  }

}
