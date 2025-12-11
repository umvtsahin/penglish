// config.js

const LEVEL_RULES = [
    // A2'den B1'e geçiş kuralı: 10 sorunun 8'i doğruysa B1'e geç
    { level: 'B1', minCorrect: 8 },
    // B1'den B2'ye geçiş kuralı
    { level: 'B2', minCorrect: 8 },
    // B2'den C1'e geçiş kuralı
    { level: 'C1', minCorrect: 8 },
    // C1'den C2'ye geçiş kuralı
    { level: 'C2', minCorrect: 8 }
];