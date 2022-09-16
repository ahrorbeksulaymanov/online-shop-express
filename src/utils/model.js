import fs from 'fs';
import path from 'path';

function read(fileName){
    const data = fs.readFileSync(path.join(process.cwd(), "src", "database", fileName + ".json"));
    return JSON.parse(data)
}

function write (fileName, data) {
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', fileName + '.json'), JSON.stringify(data, null, 4))
    return true
}

export {
    read, write
}