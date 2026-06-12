const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dirPath = path.join(__dirname, "../public/sequences/coffee");

async function convertJpgToWebp() {
  try {
    const files = fs.readdirSync(dirPath);
    const jpgFiles = files.filter(f => f.endsWith(".jpg"));
    
    console.log(`Found ${jpgFiles.length} JPG files to convert...`);
    
    for (const file of jpgFiles) {
      const inputPath = path.join(dirPath, file);
      const outputPath = path.join(dirPath, file.replace(".jpg", ".webp"));
      
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      // Delete the original JPG file
      fs.unlinkSync(inputPath);
    }
    
    console.log("All JPG files successfully converted to WebP and removed!");
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}

convertJpgToWebp();
