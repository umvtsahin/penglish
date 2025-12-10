// questions.js
// A2: Simple present, present continuous, basic prepositions, simple past.
const A2_QUESTIONS = [
    { 
        q: "She ___ to school every day.", 
        o: ["go", "goes", "going", "went"], 
        a: "goes", 
        e: "Geniş zamanda (Simple Present Tense) 'She, He, It' özneleriyle fiile '-s' takısı eklenir. Unutma, 'goes' doğru!" 
    },
    { 
        q: "I am ___ TV right now.", 
        o: ["watch", "watching", "watched", "to watch"], 
        a: "watching", 
        e: "'Right now' (Şu anda) present continuous tense demektir. 'Am/is/are' dan sonra fiile '-ing' eklenir." 
    },
    { 
        q: "They ___ a movie yesterday.", 
        o: ["see", "saw", "seen", "seeing"], 
        a: "saw", 
        e: "'Yesterday' (Dün) geçmiş zamandır. 'See' fiilinin geçmiş hali 'saw'dur." 
    },
    { 
        q: "The book is ___ the table.", 
        o: ["at", "on", "in", "to"], 
        a: "on", 
        e: "Nesnelerin bir yüzeyin üzerinde olduğunu belirtmek için 'on' edatını kullanırız." 
    }
];

// B1: Present perfect, passive voice, comparisons, conditional type 1.
const B1_QUESTIONS = [
    { 
        q: "I’ve lived here ___ 2019.", 
        o: ["for", "since", "during", "ago"], 
        a: "since", 
        e: "Belirli bir başlangıç noktasından beri süren eylemler için 'since' (den beri) kullanırız. 'For' ise süre belirtir." 
    },
    { 
        q: "The letter ___ by the secretary.", 
        o: ["writes", "is written", "wrote", "was writing"], 
        a: "is written", 
        e: "Bu pasif yapıdır (edilgen çatı). Mektup kendi kendine yazmaz, yazılır. Geniş zaman pasifi 'am/is/are + V3' şeklindedir." 
    },
    { 
        q: "She is ___ than her brother.", 
        o: ["taller", "tall", "tallest", "more tall"], 
        a: "taller", 
        e: "İki şeyi karşılaştırırken sıfatın sonuna '-er' ekleriz (comparison). 'Than' kelimesi de karşılaştırma ipucudur." 
    },
    { 
        q: "If it rains, we ___ at home.", 
        o: ["stay", "will stay", "would stay", "stayed"], 
        a: "will stay", 
        e: "Type 1 koşul cümlesi: 'If'li kısım Simple Present ('rains'), sonuç kısmı Simple Future ('will stay') olur." 
    }
];

// B2: Modal perfects, reported speech, inversions, complex phrasal verbs.
const B2_QUESTIONS = [
    { 
        q: "Hardly had I arrived ___ it started raining.", 
        o: ["when", "than", "as", "before"], 
        a: "when", 
        e: "Yapısal bir kuraldır: 'Hardly... when' ve 'Scarcely... when' eşleştirmeleri kullanılır. ('No sooner... than' da benzerdir.)" 
    },
    { 
        q: "He said that he ___ the movie the day before.", 
        o: ["sees", "saw", "had seen", "has seen"], 
        a: "had seen", 
        e: "Reported Speech'te (Dolaylı Anlatım), Simple Past genellikle Past Perfect Tense'e ('had seen') dönüşür." 
    },
    { 
        q: "You ___ have told me earlier!", 
        o: ["must", "should", "might", "would"], 
        a: "should", 
        e: "'Should have V3' geçmişte yapılması *gereken* ama yapılmamış şeyler için pişmanlık veya eleştiri belirtir." 
    },
    { 
        q: "I can't ___ what he is saying.", 
        o: ["make out", "make up", "make over", "make for"], 
        a: "make out", 
        e: "'Make out', 'anlamak' veya 'duymakta zorlanmak' anlamına gelen yaygın bir phrasal verb'dür." 
    }
];

// C1: Advanced inversions, mixed conditionals, advanced vocabulary, complex linking words.
const C1_QUESTIONS = [
    { 
        q: "No sooner ___ he finished than he left.", 
        o: ["had", "did", "was", "has"], 
        a: "had", 
        e: "'No sooner' ile başlayan cümlelerde devrik yapı (inversion) kullanılır. Bu durumda Past Perfect Tense ('had' + özne + V3) kullanılır." 
    },
    { 
        q: "___ he is rich, he is unhappy.", 
        o: ["However", "Despite", "Although", "In spite of"], 
        a: "Although", 
        e: "'Although' kendisinden sonra tam cümle (özne+yüklem) alır. 'Despite' ve 'In spite of' ise isim veya V-ing alır." 
    },
    { 
        q: "If you ___ the key, we wouldn't be locked out now.", 
        o: ["didn't lose", "hadn't lost", "wouldn't lose", "don't lose"], 
        a: "hadn't lost", 
        e: "Bu, Mixed Conditional'dır. Geçmişteki bir eylemin ('hadn't lost') şimdiki zamana etkisini anlatır ('wouldn't be locked out now')." 
    },
    { 
        q: "He decided to ___ the new company's offer.", 
        o: ["take up", "turn down", "come across", "get away"], 
        a: "turn down", 
        e: "'Turn down', 'reddetmek' anlamına gelir. Teklif (offer) bağlamında en uygun phrasal verb budur." 
    }
];

// C2: Stylistic inversions, nuanced vocabulary, idiomatic expressions, advanced grammar.
const C2_QUESTIONS = [
    { 
        q: "She speaks as though she ___ everything.", 
        o: ["knows", "knew", "know", "has known"], 
        a: "knew", 
        e: "'As if / As though' (mış gibi) yapıları, gerçek dışı veya varsayımsal bir durumu ifade ederken geçmiş zaman (subjunctive mood) kullanmayı gerektirir. Gerçekte bilmese bile, biliyormuş gibi konuşuyor." 
    },
    { 
        q: "Only by ___ constantly ___ he succeed.", 
        o: ["practicing / did", "practice / had", "practicing / has", "practice / was"], 
        a: "practicing / did", 
        e: "'Only by' ifadesiyle başlayan cümleler devrik yapılır. Vurgu için 'did + özne + V1' (Simple Past Inversion) yapısı kullanılmıştır." 
    },
    { 
        q: "I was caught in a traffic jam, so I was late. ___", 
        o: ["A pity", "A shame", "A travesty", "A nuisance"], 
        a: "A pity", 
        e: "Burada 'ne yazık ki, çok kötü' anlamında kullanılan yaygın bir deyim aranmaktadır. 'A pity' bu bağlamda en yaygın kullanılan ifadedir." 
    },
    { 
        q: "She managed to ___ a few words of French during her short visit.", 
        o: ["pick up", "take on", "make off", "break into"], 
        a: "pick up", 
        e: "'Pick up', bu bağlamda bir şeyi hızlı ve zahmetsizce, tesadüfen 'öğrenmek' anlamına gelir. Bu, C2 seviyesinde yaygın kullanılan bir ifadedir." 
    }
];

const ALL_QUESTIONS = {
    A2: A2_QUESTIONS,
    B1: B1_QUESTIONS,
    B2: B2_QUESTIONS,
    C1: C1_QUESTIONS,
    C2: C2_QUESTIONS,
};