/* eslint-disable class-methods-use-this */
const sharp = require('sharp');
const fs = require('fs/promises');

class FileService {
  async createImage(imageBuffer) {
    const name = `${Date.now()}.webp`;
    const outputBuffer = await sharp(imageBuffer).webp().toBuffer();
    await fs.writeFile(`./public/${name}`, outputBuffer);
    return name;
  }
}

const fileService = new FileService();

module.exports = fileService;
