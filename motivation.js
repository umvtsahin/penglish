// motivation.js
// Motivasyon ve geri bildirim diyalogları (Seviye Bazlı)

const MOTIVATION_DIALOGUES = {
    // Seviye A2 ve altındaki skorlar için genel cesaretlendirme
    A2: [
        { title: "Harika Bir Başlangıç!", message: "Temellerin sağlam, bu çok önemli. Küçük adımlarla büyük ilerleme kaydedeceksin. Devam!", emoji: "🌱" },
        { title: "İyi Gidiyorsun!", message: "Henüz yolun başındayız. Her yanlış cevap bir öğrenme fırsatıdır. Bir sonraki soruya odaklan.", emoji: "👍" },
        { title: "Motivasyon Yüksek!", message: "Çözdüğün her soru seni hedefine yaklaştırıyor. Bir sonraki seviye için biraz daha gayret!", emoji: "🚀" }
    ],

    // Seviye B1 civarındaki skorlar için cesaretlendirme
    B1: [
        { title: "Orta Düzeydesin!", message: "Tebrikler! Artık günlük konuşmaları anlayıp kendin ifade edebiliyorsun. Gramer detaylarına yoğunlaşma zamanı.", emoji: "🌟" },
        { title: "Dengeyi Koru!", message: "B1, en çok zorlanılan seviyedir. Pratik yapmaya devam et, sabırla B2'ye geçeceksin.", emoji: "📚" },
        { title: "Zor Soruları Sev!", message: "Beynin yeni bilgileri sindiriyor. Küçük hatalar yaptığında vazgeçme, bu geliştiğin anlamına gelir.", emoji: "🧠" }
    ],

    // Seviye B2 ve üzerindeki skorlar için takdir ve hedef odaklı mesajlar
    B2: [
        { title: "İleri Seviyeye Yakınsın!", message: "Akıcı konuşmaya çok az kaldı. Daha karmaşık yapıları ve deyimleri öğrenerek aradaki farkı kapat.", emoji: "🎯" },
        { title: "Mükemmel Yolda!", message: "B2 demek, İngilizceyi iş ve akademik ortamlarda kullanabilmek demek. C1 için sadece ufak nüanslar kaldı.", emoji: "🥇" },
        { title: "Ustalık Zamanı!", message: "Zorluk seviyesini yükselt. Özellikle Phrasal Verb'ler ve resmi dil kullanımlarına odaklan.", emoji: "💡" }
    ],
    
    // C1 ve C2 için özel mesajlar
    C1: [
         { title: "Ustalık Sınıfı!", message: "C1 seviyesi neredeyse anadiline yakın anlamına gelir. Hedefin mükemmellik ve ince nüanslar olmalı.", emoji: "👑" },
    ],
    C2: [
         { title: "Zirvedesin!", message: "İngilizceyi her alanda, tam akıcılıkla kullanıyorsun. Şimdi öğrendiklerini pekiştirme zamanı!", emoji: "💎" },
    ],

    // Varsayılan diyalog (hata durumunda veya genel kullanımda)
    Default: [
        { title: "Başarı Yolda!", message: "Öğrenme sürecin devam ediyor. Her çözüm bir deneyimdir. Hadi, devam edelim!", emoji: "✨" }
    ]
};
