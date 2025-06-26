import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/images/watchdog');
    
    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return NextResponse.json({ error: 'Images directory not found' }, { status: 404 });
    }

    // Read all files in the directory
    const files = fs.readdirSync(imagesDirectory);
    
    // Filter for image files and sort them numerically
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .sort((a, b) => {
        // Extract numbers from filenames for proper sorting
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });

    // Create meme data objects
    const memeData = imageFiles.map((file, index) => {
      const fileNameWithoutExt = path.parse(file).name;
      const id = parseInt(fileNameWithoutExt.match(/\d+/)?.[0] || String(index + 1));
      
      return {
        id,
        src: `/images/watchdog/${file}`,
        alt: `Watchdog Meme ${id}`,
        filename: file
      };
    });

    return NextResponse.json({ memes: memeData });
  } catch (error) {
    console.error('Error reading memes directory:', error);
    return NextResponse.json({ error: 'Failed to load memes' }, { status: 500 });
  }
}
