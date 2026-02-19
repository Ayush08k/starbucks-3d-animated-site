const fs = require('fs');
const path = require('path');

const filesToProcess = [
    path.join(__dirname, 'src', 'data', 'menuData.ts'),
    path.join(__dirname, 'src', 'data', 'galleryData.ts')
];
const outputDir = path.join(__dirname, 'public', 'images', 'coffee');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

filesToProcess.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const base64Regex = /"data:image\/[^;]+;base64,([^"]+)"/g;
    let count = Date.now(); // Use timestamp to avoid collisions

    const newContent = content.replace(base64Regex, (match, base64Data) => {
        const type = match.includes('galleryData') || filePath.includes('galleryData') ? 'gallery' : 'menu';
        const fileName = `${type}_custom_update_${count}.jpg`;
        const fullPath = path.join(outputDir, fileName);
        
        fs.writeFileSync(fullPath, base64Data, { encoding: 'base64' });
        console.log(`Saved ${fileName} from ${path.basename(filePath)}`);
        count++;
        return `"/images/coffee/${fileName}"`;
    });

    fs.writeFileSync(filePath, newContent);
});

console.log('Localization cleanup complete.');
