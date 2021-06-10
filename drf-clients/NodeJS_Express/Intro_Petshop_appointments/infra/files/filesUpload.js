const fs = require('fs');
const path = require('path');

module.exports = (filePath, petName, callback) => {
  const validTypes = ['.jpg', '.png', '.jpeg'];
  const type = path.extname(filePath);

  if (!validTypes.includes(type)) {
    callback(`Type ${type} is not accepted for this field`);
  }
  else {
    const newPath = `./assets/images/${petName}${type}`;

    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newPath))
      .on('finish', () => callback(null, newPath));
  }
}