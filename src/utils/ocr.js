import { createWorker } from 'tesseract.js';

export const processImage = async (imageFile, onProgress) => {
    const worker = await createWorker({
        logger: m => {
            if (m.status === 'recognizing' && onProgress) {
                onProgress(Math.floor(m.progress * 100));
            }
        }
    });

    await worker.loadLanguage('kor+eng');
    await worker.initialize('kor+eng');

    // Set parameters for better dot print recognition if possible
    // Tesseract is a bit limited in tuning through the simple API

    const { data: { text } } = await worker.recognize(imageFile);
    await worker.terminate();

    return text;
};

export const parseAttendanceText = (text) => {
    // Logic to parse the extracted text into structured data
    // This needs to be robust as OCR from dot prints can be messy
    const lines = text.split('\n');
    const records = [];

    // Example regex for "Date StartTime EndTime Subtotal"
    // Based on the card format: Day(1-31) Start(HH:MM) End(HH:MM) Sub(N)
    // Dot print extraction might result in symbols like '±', 'ㄷ', etc.

    lines.forEach(line => {
        // Attempt to match line pattern
        // This is a simplified regex, real world will need more heuristics
        const timeMatch = line.match(/(\d{1,2})[\s\S]+?(\d{1,2}[:;.]\d{2})[\s\S]+?(\d{1,2}[:;.]\d{2})[\s\S]+?(\d{1,2}(?:\.\d)?)/);

        if (timeMatch) {
            records.push({
                date: parseInt(timeMatch[1]),
                start: timeMatch[2].replace(/[;.]/g, ':'),
                end: timeMatch[3].replace(/[;.]/g, ':'),
                subtotal: parseFloat(timeMatch[4])
            });
        }
    });

    return records;
};
