// app.js

// DOM Elementleri
const intro = document.getElementById("intro");
const loader = document.getElementById("loader");
const loadingFill = document.getElementById("loadingFill");
const speech = document.getElementById("speech");
const speechText = document.getElementById("speechText");
const skipIntroBtn = document.getElementById("skipIntroBtn"); // YENİ BUTON TANIMI

const placement = document.getElementById("placement");
const placementSpeech = document.getElementById("placementSpeech");
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const explanationBox = document.getElementById("explanationBox");
const explanationText = document.getElementById("explanationText");
const understoodBtn = document.getElementById("understoodBtn");
const motivationArea = document.getElementById("motivationArea"); 
const finishScreen = document.getElementById("finishScreen"); 
const questionArea = document.getElementById("questionArea"); 
const questionCounter = document.getElementById("questionCounter"); 

// INTRO MANTIKLARI 
const dialogues = [
    "Merhaba! Ben Penglish 🐧",
    "İngilizce öğrenme yolculuğunda sana yardımcı olacağım.",
    "Ama önce küçük bir şey yapalım 🙂",
    "Kısa bir seviye testiyle seviyeni ölçelim."
];

let dialogueIndex = 0;
let charTimer = null;

// Loading bar animasyonu
let load = 0;
const loadInterval = setInterval(() => {
    // loadingFill DOM'da yoksa durdur ve devam et
    if (!loadingFill) {
        clearInterval(loadInterval);
        console.error("HATA: loadingFill elementi bulunamadı. Intro atlanıyor.");
        if (loader) loader.classList.add("hidden");
        if (speech) speech.classList.remove("hidden");
        // İntro atlandığı için konuşma başlasın ve buton gösterilsin
        if (skipIntroBtn) skipIntroBtn.classList.remove("hidden"); 
        typeText(dialogues[0]);
        return;
    }

    load += 10;
    loadingFill.style.width = load + "%";

    if (load >= 100) {
        clearInterval(loadInterval);
        if (loader) loader.classList.add("hidden");
        if (speech) speech.classList.remove("hidden");
        typeText(dialogues[0]);
        // Yükleme bittikten ve konuşma başladıktan sonra butonu göster
        if (skipIntroBtn) skipIntroBtn.classList.remove("hidden"); 
    }
}, 120);

// Harf harf yazma fonksiyonu
function typeText(text) {
    if (!speechText) return; // speechText'in varlığını kontrol et
    speechText.textContent = "";
    let i = 0;
    if (charTimer) clearInterval(charTimer);

    charTimer = setInterval(() => {
        if (!text || !text[i]) {
             clearInterval(charTimer);
             charTimer = null;
             return;
        }
        speechText.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(charTimer);
            charTimer = null;
        }
    }, 32);
}

// İntroyu atlama fonksiyonu
function skipIntro() {
    if (charTimer) clearInterval(charTimer); 
    if (intro) intro.classList.add("hidden"); 
    startPlacement();
}

// Intro tıklama olayı
if (intro) {
    intro.addEventListener("click", () => {
        // Tıklandığında butonu gizle
        if (skipIntroBtn) skipIntroBtn.classList.add("hidden"); 
        
        if (charTimer) return;

        dialogueIndex++;
        if (dialogueIndex < dialogues.length) {
            typeText(dialogues[dialogueIndex]);
        } else {
            // Son diyalog da tıklandıysa teste başla
            if (intro) intro.classList.add("hidden"); 
            startPlacement();
        }
    });
}


// YENİ: İntroyu Geç butonuna tıklama olayı
if (skipIntroBtn) {
    skipIntroBtn.addEventListener("click", skipIntro);
}


// PLACEMENT TEST MANTIKLARI

// Test Değişkenleri
let currentLevel = "A2";
let streak = 0; 
let count = 0; 
const TOTAL_QUESTIONS = 10; 
const QUESTION_POOL = ALL_QUESTIONS; 
let currentQuestion = null;
let currentQuestionIndexKey = null; 
let testLocked = false; 
let usedQuestions = []; 
let isRepeatingQuestion = false; 

const levels = ["A2", "B1", "B2", "C1", "C2"];

// Motivasyon Ekranları
const motivationDialogues = [
    "Harikasın! Bu tempoyla devam et 🚀",
    "Mola verme zamanı! Beynine biraz oksijen gönder 💪",
    "İngilizce öğrenmek bir maratondur, hızını kaybetme! 🧠",
    "Süper gidiyorsun! Hadi bir sonraki zorluğa geçelim 🔥"
];

function startPlacement() {
    if (placement) placement.classList.remove("hidden");
    if (placement) placement.style.display = "flex";
    
    // Test başlangıcında tüm gereksiz alanları gizle
    if (explanationBox) explanationBox.classList.add("hidden");
    motivationArea.innerHTML = "";
    
    if (placementSpeech) placementSpeech.textContent = "Merak etme, çok kısa sürecek 🙂";
    usedQuestions = []; 
    count = 0; 
    streak = 0;
    isRepeatingQuestion = false;
    // understoodBtn'ün varlığını kontrol et
    if (understoodBtn) understoodBtn.onclick = hideExplanation; 
    
    // Motivasyon kontrolü
    if (count > 0 && count % 4 === 0) { 
        showMotivationScreen();
    } else {
        nextQuestion();
    }
}

function updateCounter() {
    if (questionCounter) questionCounter.textContent = `Soru ${count} / ${TOTAL_QUESTIONS}`;
}

function nextQuestion(repeating = false) { 
    if (count >= TOTAL_QUESTIONS) return finish();
    
    if (questionCounter) questionCounter.textContent = `Soru ${count + 1} / ${TOTAL_QUESTIONS}`;

    testLocked = false;
    answersDiv.innerHTML = "";
    isRepeatingQuestion = repeating; 

    if (questionArea) questionArea.classList.remove("hidden"); 
    motivationArea.innerHTML = ""; 
    if (explanationBox) explanationBox.classList.add("hidden"); 
    
    let q;
    let indexKey;

    if (isRepeatingQuestion && currentQuestion) { 
        q = currentQuestion;
        indexKey = currentQuestionIndexKey;
        
    } else {
        const levelIndex = levels.indexOf(currentLevel);
        const poolKeys = [currentLevel, currentLevel]; 
        if (levelIndex > 0) poolKeys.push(levels[levelIndex - 1]); 

        const randomPoolKey = poolKeys[Math.floor(Math.random() * poolKeys.length)];
        const pool = QUESTION_POOL[randomPoolKey];

        let availableQuestions = pool.map((item, index) => ({q: item, index: `${randomPoolKey}-${index}`}));
        let unaskedQuestions = availableQuestions.filter(item => !usedQuestions.includes(item.index));
        
        if (unaskedQuestions.length === 0) {
            unaskedQuestions = availableQuestions; 
            usedQuestions = usedQuestions.filter(i => !i.startsWith(randomPoolKey));
        }

        const randomQuestion = unaskedQuestions[Math.floor(Math.random() * unaskedQuestions.length)];
        q = randomQuestion.q;
        indexKey = randomQuestion.index;
        
        usedQuestions.push(indexKey);
    }
    
    currentQuestion = q; 
    currentQuestionIndexKey = indexKey;

    if (questionText) questionText.textContent = q.q;

    const shuffledOptions = shuffleArray(q.o);

    shuffledOptions.forEach(opt => {
        const b = document.createElement("button");
        b.textContent = opt;

        b.onclick = () => answer(b, opt === q.a); 
        answersDiv.appendChild(b);
    });
}

// Rastgele karıştırma fonksiyonu (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function answer(btn, correct) {
    if (testLocked) return;
    testLocked = true;
    
    document.querySelectorAll("#answers button").forEach(b => b.disabled = true);

    if (correct) {
        btn.style.background = "#22c55e"; 
        btn.style.borderColor = "#22c55e"; 
        
        let shouldContinue = true;

        if (!isRepeatingQuestion) {
            if (placementSpeech) placementSpeech.textContent = "Doğru! Çok iyi gidiyorsun. 🎉";
            streak++;
            count++; 
            
            if (streak >= 3) { 
                levelUp();
                shouldContinue = false; 
            }

        } else {
            if (placementSpeech) placementSpeech.textContent = "Süper! Açıklamayı iyi anlamışsın. Devam edelim. 👍";
            streak = 0; 
            count++; 
            isRepeatingQuestion = false; 
        }
        
        if (shouldContinue) {
             if (count < TOTAL_QUESTIONS && count > 0 && count % 4 === 0) {
                 setTimeout(showMotivationScreen, 800);
             } else {
                 setTimeout(() => nextQuestion(false), 800);
             }
        }
       
    } else {
        btn.style.background = "#ef4444"; 
        btn.style.borderColor = "#ef4444";
        streak = 0; 
        
        document.querySelectorAll("#answers button").forEach(b => {
             if (b.textContent === currentQuestion.a) {
                b.style.background = "#f59e0b"; 
                b.style.borderColor = "#f59e0b";
             }
        });

        showExplanation(currentQuestion.e);
    }
}

function showExplanation(explanation) {
    if (questionArea) questionArea.classList.add("hidden"); 
    if (explanationBox) explanationBox.classList.remove("hidden");
    
    if (explanationText) explanationText.textContent = explanation; 
    
    if (placementSpeech) placementSpeech.textContent = "Hata yaptın ama hiç sorun değil! Gel öğrenelim 👇";
}

function hideExplanation() {
    if (explanationBox) explanationBox.classList.add("hidden");
    if (questionArea) questionArea.classList.remove("hidden"); 
    
    if (placementSpeech) placementSpeech.textContent = "Açıklamayı anladın mı? Haydi tekrar dene! 🤔";
    nextQuestion(true); 
}


function showMotivationScreen() {
    if (questionArea) questionArea.classList.add("hidden");
    
    if (placementSpeech) placementSpeech.textContent = motivationDialogues[Math.floor(Math.random() * motivationDialogues.length)];
    
    motivationArea.innerHTML = `
        <button id="motivationContinueBtn" class="action-btn">Devam Et</button>
    `;
    
    const motivationContinueBtn = document.getElementById("motivationContinueBtn");
    if (motivationContinueBtn) {
        motivationContinueBtn.onclick = () => {
            motivationArea.innerHTML = ""; 
            if (questionArea) questionArea.classList.remove("hidden"); 
            
            nextQuestion(false);
        };
    }
    
    setTimeout(() => {
        const btn = document.getElementById("motivationContinueBtn");
        if (btn) { 
             btn.click();
        }
    }, 10000); 
}


function levelUp() {
    const i = levels.indexOf(currentLevel);
    if (i < levels.length - 1) {
        currentLevel = levels[i + 1];
        if (placementSpeech) placementSpeech.textContent = `Tebrikler! Yeni seviyen: ${currentLevel}. Biraz zorlaştıralım 🔥`;
        streak = 0;
    } else {
        if (placementSpeech) placementSpeech.textContent = "C2 seviyesindesin! Zaten bir uzmansın. 🏆";
        streak = 0;
    }
    setTimeout(() => nextQuestion(false), 1200);
}

// Seviyeye özel yorumlar ve odaklanılacak konular
function getLevelCommentary(level) {
    const comments = {
        A2: {
            title: "Temel Başlangıç Seviyesi",
            description: "İngilizceye yeni adım attın veya temel bilgilerin zayıf. Günlük basit ifadeleri anlayıp kullanabilirsin. Ancak karmaşık yapılar ve zamanlar sorun yaratıyor.",
            focus: ["Geniş Zaman (Simple Present)", "Şimdiki Zaman (Present Continuous)", "Temel Edatlar (In, On, At)", "Düzenli/Düzensiz Fiillerin Geçmiş Halleri (V2)"]
        },
        B1: {
            title: "Orta Düzeye Geçiş",
            description: "Günlük hayatta zorlanmadan iletişim kurabilirsin. Basit metinleri anlayıp düşüncelerini ifade edebilirsin. Amacımız akıcılığı ve daha karmaşık yapıları kullanma yeteneğini artırmak.",
            focus: ["Present Perfect Tense", "Pasif Yapı (Passive Voice)", "Karşılaştırma Yapıları (Comparison)", "İlk Tip Koşul Cümleleri (Type 1 Conditional)"]
        },
        B2: {
            title: "Bağımsız Kullanıcı Seviyesi",
            description: "Akademik ve profesyonel içeriklerle başa çıkabilecek düzeydesin. Akıcılığın yüksek, ancak ince anlam farklarında ve ileri gramer yapılarında hatalar yapabiliyorsun. ",
            focus: ["Modal Perfects (Should have V3)", "Dolaylı Anlatım (Reported Speech) karmaşık formları", "Devrik Yapılar (Inversion)", "İleri Phrasal Verb'ler"]
        },
        C1: {
            title: "Gelişmiş Yeterlilik",
            description: "İngilizceyi neredeyse tam yeterlilikle kullanıyorsun. Karmaşık konuları spontane ve akıcı bir şekilde anlatabilirsin. Dilin nüanslarına hakim olmak için sürekli pratik şart.",
            focus: ["Gelişmiş Bağlaçlar (Although, Despite)", "Karışık Koşul Cümleleri (Mixed Conditionals)", "Akademik Kelime Dağarcığı", "İleri Devrik Yapılar (Only by...)"]
        },
        C2: {
            title: "Ustalık Seviyesi",
            description: "Tebrikler! İngilizceyi ana diline yakın bir yeterlilikle kullanıyorsun. En zor durumlarda bile ince anlam farklarını algılayabilirsin. Şimdi odaklanman gereken tek şey, uzmanlık alanındaki terminolojiyi genişletmek.",
            focus: ["İdiomatik İfadeler (Idiomatic Expressions)", "Nüanslı ve Az Kullanılan Kelimeler", "Stylistic Inversions", "Subjunctive Mood Kullanımı"]
        }
    };
    return comments[level];
}

function finish() {
    if (placement) placement.classList.add("hidden");
    if (finishScreen) finishScreen.classList.remove("hidden");

    const result = getLevelCommentary(currentLevel);

    const focusList = result.focus.map(item => `<li>${item}</li>`).join('');

    finishScreen.innerHTML = `
        <div class="test-header">
            <div class="penguin-emoji">🎉</div>
            <h2>Test Tamamlandı!</h2>
            <p>Penglish Seviye Tespit Sınavını başarıyla bitirdin. Final seviyen:</p>
            <h3 style="font-size: 38px;">${currentLevel} (${result.title})</h3>
            <p class="level-description">${result.description}</p>
            
            <div style="margin-top: 25px; text-align: left; width: 100%; max-width: 400px;">
                <h4 style="font-size: 18px; margin-bottom: 10px; color: #f59e0b;">🐧 Penglish'in Odak Tavsiyeleri:</h4>
                <ul style="list-style-type: disc; padding-left: 20px; font-size: 15px; opacity: 0.9;">
                    ${focusList}
                </ul>
            </div>
            
            <button class="action-btn" style="background: #22c55e; margin-top: 30px;">Derslere Başla</button>
        </div>
    `;

    localStorage.setItem("penglishLevel", currentLevel);
}