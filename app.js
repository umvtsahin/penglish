// app.js

// --- DOM Elementleri ve Global Değişkenler ---
const rootScreen = document.getElementById("root");
const authScreen = document.getElementById("authScreen");
const placement = document.getElementById("placementTest");
const finishScreen = document.getElementById("finishScreen");
const continueTestBtn = document.getElementById("continueTestBtn");
const startNewTestBtn = document.getElementById("startNewTestBtn");

// Yeni Kelime Testi DOM Elementleri
const vocabTestScreen = document.getElementById("vocabularyTestScreen");
const vocabSelectScreen = document.getElementById("vocabularySelectScreen");
const vocabDialogue = document.getElementById("vocabDialogue");
const vocabQuestionArea = document.getElementById("vocabQuestionArea");

let activeUser = null; 
let currentQuestionIndex = 0;
let correctAnswers = 0;
let userAnswers = [];

// Kelime Testi Değişkenleri
let vocabLevel = null; // Kullanıcının belirlenmiş kelime seviyesi (A1, A2, ...)
let vocabTestQuestions = []; // Mevcut testin soruları
let vocabCurrentIndex = 0;
let vocabCorrectCount = 0;
const INITIAL_VOCAB_TEST_SIZE = 30; // İlk kelime testi soru sayısı

// Adaptif Test Değişkenleri (Dilbilgisi)
let currentLevel = 'A2'; 
let levelProgress = 0;   
const CORRECT_ANSWERS_TO_LEVEL_UP = 3; 
const MAX_PLACEMENT_QUESTIONS = 10; 

// Diyalog Değişkenleri
const DIALOGUE_SPEED = 32;
let dialogueSteps = [];
let currentDialogueStep = 0;
let isTyping = false; 
let typewriterTimeout = null; 

// motivation.js'ten gelen MOTIVATION_DIALOGUES global olarak varsayılır

function getRandomMotivation(level) {
    if (typeof MOTIVATION_DIALOGUES === 'undefined') {
        return { title: "Hadi Devam!", message: "İyi gidiyorsun!", emoji: "🚀" };
    }

    const levelKey = level in MOTIVATION_DIALOGUES ? level : 
                     (level === 'C1' || level === 'C2' ? 'B2' : 'Default'); 
    
    const messages = MOTIVATION_DIALOGUES[levelKey] || MOTIVATION_DIALOGUES['Default'];
    
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
}


// --- LOCALSTORAGE İŞLEMLERİ ---

function saveUserProgress() {
    const data = {
        currentQuestionIndex,
        correctAnswers,
        userAnswers,
        currentLevel,
        levelProgress,
        activeUser,
    };
    try {
        localStorage.setItem('penglishTestProgress', JSON.stringify(data));
        if (activeUser && activeUser.level) {
             localStorage.setItem('penglishUserLevel', activeUser.level);
        }
        if (vocabLevel) {
            localStorage.setItem('penglishVocabLevel', vocabLevel);
        }
    } catch (e) {
        console.warn("Kullanıcı ilerlemesi kaydedilemedi (LocalStorage hatası).");
    }
}

function loadUserProgress() {
    try {
        const dataStr = localStorage.getItem('penglishTestProgress');
        if (dataStr) {
            const data = JSON.parse(dataStr);
            currentQuestionIndex = data.currentQuestionIndex || 0;
            correctAnswers = data.correctAnswers || 0;
            userAnswers = data.userAnswers || [];
            currentLevel = data.currentLevel || 'A2';
            levelProgress = data.levelProgress || 0;
            activeUser = data.activeUser || null;

            if (currentQuestionIndex > 0 && currentQuestionIndex < MAX_PLACEMENT_QUESTIONS) {
                continueTestBtn.classList.remove("hidden");
                startNewTestBtn.classList.add("hidden");
                return true; 
            }
        }
        
        const savedLevel = localStorage.getItem('penglishUserLevel');
        vocabLevel = localStorage.getItem('penglishVocabLevel') || null; // Kelime seviyesini yükle

        if (savedLevel && !activeUser) {
             activeUser = { username: 'Geri Dönen Misafir', email: null, level: savedLevel, score: 0, wordCount: 0 };
        }
        
    } catch (e) {
        console.error("Kullanıcı ilerlemesi yüklenemedi:", e);
    }
    continueTestBtn.classList.add("hidden");
    startNewTestBtn.classList.remove("hidden");
    return false; 
}

function clearUserProgress() {
    localStorage.removeItem('penglishTestProgress');
}

// --- 1. UYGULAMA BAŞLANGICI VE EKRAN YÖNETİMİ ---

function startApp() {
    loadUserProgress(); 
    showRootScreen();
}

function showRootScreen() {
    [rootScreen, authScreen, placement, finishScreen, document.getElementById("app"), vocabTestScreen, vocabSelectScreen].forEach(el => {
        if (el) el.classList.add("hidden");
    });
    if (rootScreen) rootScreen.classList.remove("hidden");
}

function navigateToScreen(screenElement) {
    [rootScreen, authScreen, placement, finishScreen, document.getElementById("app"), vocabTestScreen, vocabSelectScreen].forEach(el => {
        if (el) el.classList.add("hidden");
    });
    if (screenElement) screenElement.classList.remove("hidden");
}

function startNewFlow() {
    clearUserProgress(); 

    if (rootScreen) rootScreen.classList.add("hidden");
    if (placement) placement.classList.remove("hidden");
    
    activeUser = { username: 'Misafir', email: null, level: 'A2', score: 0, vocabLevel: 'A1' }; 
    currentQuestionIndex = 0;
    correctAnswers = 0;
    userAnswers = [];
    currentDialogueStep = 0;
    currentLevel = 'A2'; 
    levelProgress = 0;

    document.getElementById("progressBarContainer").classList.add("hidden");

    placement.onclick = continueDialogue; 

    dialogueSteps = [
        "Hoş geldin! Ben Penglish yapay zeka asistanın.",
        "Senin için tamamen kişiselleştirilmiş bir öğrenme yolculuğu tasarladım.",
        "Ama önce, hangi seviyeden başlayacağını belirlememiz gerekiyor.",
        "Şimdi 10 soruluk seviye tespit testimize başlıyoruz.",
        "Başarılar dilerim! Test başlıyor...", 
    ];

    let existingDialogue = document.getElementById("dialogue");
    const questionArea = document.getElementById("questionArea");
    
    if (!existingDialogue || existingDialogue.parentElement !== placement) {
         existingDialogue = document.createElement('div');
         existingDialogue.id = 'dialogue';
         existingDialogue.classList.add('dialogue-box');
         placement.insertBefore(existingDialogue, questionArea);
    }
    
    existingDialogue.classList.remove("hidden");
    existingDialogue.innerHTML = '';
    
    if (questionArea) questionArea.classList.add("hidden");
    typewriterEffect(dialogueSteps[currentDialogueStep], 0);
}

// ... (continueDialogue, toggleAuth, authForm, handleRegistration, existingFlow aynı kalır)

function continueDialogue() {
    const dialog = document.getElementById("dialogue");
    if (!dialog) return; 
    
    if (isTyping) {
        clearTimeout(typewriterTimeout);
        const currentStepText = dialogueSteps[currentDialogueStep];
        dialog.innerHTML = currentStepText; 
        
        if (currentDialogueStep === dialogueSteps.length - 2) { 
            dialog.innerHTML += '<div id="clickPrompt">Devam etmek için ekrana dokun / tıkla</div>';
        }
        
        isTyping = false;
        return;
    }

    currentDialogueStep++;
    
    if (currentDialogueStep < dialogueSteps.length - 1) {
        dialog.innerHTML = '';
        typewriterEffect(dialogueSteps[currentDialogueStep], 0, () => {
            setTimeout(continueDialogue, 1500); 
        });
    } else if (currentDialogueStep === dialogueSteps.length - 1) {
        dialog.innerHTML = '';
        placement.onclick = null; 

        typewriterEffect(dialogueSteps[currentDialogueStep], 0, () => {
            setTimeout(() => startPlacement(), 1000); 
        });
    }
}

function toggleAuth(type) {
    const title = document.getElementById('authTitle');
    const actionBtn = document.getElementById('authActionBtn');
    const switchLink = document.getElementById('authSwitch');
    
    if (type === 'login') {
        title.textContent = "Giriş Yap";
        actionBtn.textContent = "Giriş Yap";
        actionBtn.onclick = existingFlow;
        switchLink.innerHTML = "Hesabın yok mu? <b>Kayıt Ol</b>";
        switchLink.onclick = (e) => { e.preventDefault(); toggleAuth('register'); };
    } else {
        title.textContent = "Hesap Oluştur";
        actionBtn.textContent = "Kayıt Ol ve Uygulamaya Git"; 
        actionBtn.onclick = handleRegistration;
        switchLink.innerHTML = "Zaten hesabın var mı? <b>Giriş Yap</b>";
        switchLink.onclick = (e) => { e.preventDefault(); toggleAuth('login'); };
    }
}

function authForm() {
    navigateToScreen(authScreen);
    toggleAuth('login');
}

function handleRegistration() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    if (!username || !email || email.indexOf('@') === -1) {
        alert("Lütfen geçerli bir kullanıcı adı ve e-posta girin.");
        return;
    }

    if (!activeUser || activeUser.email === null) {
        const finalLevel = activeUser ? activeUser.level : 'A2'; 
        activeUser = { username, email, level: finalLevel, score: activeUser ? activeUser.score : 0, wordCount: 0 };
    } else {
        activeUser.username = username;
        activeUser.email = email;
    }
    
    // Kelime seviyesi belirlenmediyse A1'i başlangıç olarak ata
    if (!vocabLevel) {
        vocabLevel = 'A1'; 
        saveUserProgress(); 
    }
    
    navigateToApp(activeUser);
}

function existingFlow() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    if (!username || !email || email.indexOf('@') === -1) {
        alert("Lütfen geçerli bir kullanıcı adı ve e-posta girin.");
        return;
    }

    // Kayıtlı kelime seviyesini yükle
    loadUserProgress(); 
    
    activeUser = { 
        username: username, 
        email: email, 
        level: localStorage.getItem('penglishUserLevel') || 'B1', 
        score: 8,
        wordCount: 120 
    }; 
    
    navigateToApp(activeUser);
}


// --- DİLBİLGİSİ TESTİ (PLACEMENT TEST) AKIŞI ---

function startPlacement(isContinuing = false) {
    const dialogueBox = document.getElementById("dialogue");
    if (dialogueBox) {
        dialogueBox.remove(); 
    }
    
    document.getElementById("questionArea").classList.remove("hidden");
    document.getElementById("progressBarContainer").classList.remove("hidden");
    
    if (isContinuing) {
        updateProgressBar();
        nextQuestion();
    } else {
        updateProgressBar();
        nextQuestion();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        const percentage = (currentQuestionIndex / MAX_PLACEMENT_QUESTIONS) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}


function nextQuestion(repeating = false) {
    if (typeof ALL_QUESTIONS === 'undefined') {
        console.error("questions.js dosyası yüklenmedi veya ALL_QUESTIONS tanımlanmadı!");
        finishTest();
        return; 
    }
    const QUESTION_POOL = ALL_QUESTIONS;
    
    if (currentQuestionIndex >= MAX_PLACEMENT_QUESTIONS) {
        finishTest();
        return;
    }

    updateProgressBar(); 
    saveUserProgress(); 

    document.getElementById("questionArea").classList.remove("hidden");
    
    const selectedLevel = currentLevel; 

    const questionNumber = currentQuestionIndex + 1;
    const totalQuestions = MAX_PLACEMENT_QUESTIONS;
    const progressText = `Soru ${questionNumber} / ${totalQuestions}`;
    
    const levelQuestions = QUESTION_POOL[selectedLevel];
    if (!levelQuestions || levelQuestions.length === 0) {
        if (selectedLevel !== 'A2') {
            currentLevel = 'A2';
            levelProgress = 0;
            return nextQuestion(true); 
        }
        console.error(`Sorun: ${selectedLevel} seviyesinde soru bulunamadı.`);
        finishTest();
        return;
    }
    
    const qIndex = Math.floor(Math.random() * levelQuestions.length);
    const questionData = levelQuestions[qIndex];

    questionData.level = selectedLevel; 

    document.getElementById("questionText").innerHTML = `
        <div class="question-header">
            <span class="level-badge small">${selectedLevel}</span> 
            <span class="progress-info">${progressText}</span>
        </div>
        <p class="question-title">${questionData.q}</p>
    `;
    document.getElementById("feedback").textContent = "";

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = '';
    
    const options = shuffleArray(questionData.o);
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, option, questionData.a, questionData.e, questionData.level);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedBtn, selectedOption, correctAnswer, explanation, currentQLevel) {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => btn.disabled = true);
    
    let isCorrect = (selectedOption === correctAnswer);

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        correctAnswers++;
        levelProgress++; 
    } else {
        selectedBtn.classList.add('wrong');
        options.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        levelProgress = Math.max(0, levelProgress - 1); 
    }

    // Geri bildirim kutusunu doldur
    document.getElementById("feedback").innerHTML = `
        <p><strong>Açıklama:</strong> ${explanation}</p>
        <button id="nextQuestionBtn" class="main-button small-next-button">Devam Et ➡️</button>
    `;

    // --- ADAPTİF SEVİYE YÖNETİMİ ---
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentLevelIndex = levels.indexOf(currentLevel);

    if (levelProgress >= CORRECT_ANSWERS_TO_LEVEL_UP) {
        const nextLevelIndex = Math.min(currentLevelIndex + 1, levels.length - 1);
        currentLevel = levels[nextLevelIndex];
        levelProgress = 0; 
    } else if (!isCorrect && currentQuestionIndex > 0 && currentLevelIndex > 0) {
        if (levelProgress < 1) { 
           const prevLevelIndex = Math.max(0, currentLevelIndex - 1);
           currentLevel = levels[prevLevelIndex];
           levelProgress = 0;
        }
    }
    // ----------------------------------------
    
    const showMotivation = (currentQuestionIndex + 1) % 3 === 0;
    
    currentQuestionIndex++;
    
    // Testin bitişini kontrol et
    if (currentQuestionIndex >= MAX_PLACEMENT_QUESTIONS) {
        document.getElementById("nextQuestionBtn").onclick = finishTest;
        return; 
    }
    
    // --- MANİPÜLASYON: Otomatik geçişi kaldırıp butona bağlama ---
    
    if (showMotivation) {
        document.getElementById("nextQuestionBtn").onclick = () => {
            const questionArea = document.getElementById("questionArea");
            questionArea.classList.add("hidden"); 
            
            let dialogContainer = document.getElementById("dialogue");
            const placementTest = document.getElementById("placementTest");
            
            if (!dialogContainer) {
                dialogContainer = document.createElement('div');
                dialogContainer.id = 'dialogue';
                dialogContainer.classList.add('dialogue-box');
                placementTest.insertBefore(dialogContainer, questionArea);
            }
            
            dialogContainer.classList.remove("hidden");
            
            const motivation = getRandomMotivation(currentQLevel);
            
            dialogContainer.innerHTML = `
                <div class="penguin-dialog-box">
                    <span class="penguin-icon">${motivation.emoji}</span>
                    <p><strong>${motivation.title}</strong><br>${motivation.message}</p>
                </div>
            `;
            
            const delay = 2500; 
            
            setTimeout(() => {
                if (dialogContainer) {
                    dialogContainer.classList.add("hidden"); 
                }
                nextQuestion();
            }, delay);
        };
        
    } else {
        document.getElementById("nextQuestionBtn").onclick = nextQuestion;
    }
}


function finishTest() {
    const resultLevel = calculateFinalLevel(correctAnswers); 
    activeUser.level = resultLevel;
    activeUser.score = correctAnswers;
    
    clearUserProgress(); 

    navigateToScreen(finishScreen);
    
    document.getElementById("progressBarContainer").classList.add("hidden");

    const dialogueBox = document.getElementById("dialogue");
    if (dialogueBox) {
        dialogueBox.remove(); 
    }

    const resultLevelSpan = document.getElementById("finalLevel");
    const continueBtn = document.getElementById("finishContinueBtn");

    resultLevelSpan.textContent = resultLevel;
    
    const message = `Tebrikler, test tamamlandı! ${correctAnswers}/${MAX_PLACEMENT_QUESTIONS} doğru cevapla seviyenizi başarıyla ${resultLevel} olarak belirledik. Uygulamaya devam etmek için Kayıt olmalısınız.`;
    
    let dialogContainer = document.createElement('div');
    dialogContainer.id = 'dialogue';
    dialogContainer.classList.add('dialogue-box');
    
    const resultMessageDiv = document.getElementById("resultMessage");
    resultMessageDiv.innerHTML = ''; 
    resultMessageDiv.appendChild(dialogContainer);


    typewriterEffect(message, 0, () => {
        setTimeout(() => {
             dialogContainer.remove();
             continueBtn.classList.remove("hidden");
        }, 500); 
       
    }, resultMessageDiv);
}

// *** HATA ÇÖZÜMÜ: EKLENEN FONKSİYON ***
function handleFinishContinue() {
    // Test bittiğinde 'Devam Et' butonuna basılınca kullanıcıyı kayıt/giriş ekranına yönlendirir.
    authForm();
}
// *************************************


function calculateFinalLevel(correctCount) {
    return currentLevel;
}
// ... (typewriterEffect ve shuffleArray aynı kalır)

function typewriterEffect(text, i, callback, targetElement = null) {
    const dialog = targetElement ? targetElement.querySelector('#dialogue') : document.getElementById("dialogue");
    if (!dialog) return; 
    
    if (i === 0) {
        isTyping = true;
        dialog.innerHTML = ''; 
    }

    const clickPrompt = dialog.querySelector('#clickPrompt');
    if (clickPrompt) clickPrompt.remove(); 

    if (i < text.length) {
        dialog.innerHTML += text.charAt(i);
        typewriterTimeout = setTimeout(() => typewriterEffect(text, i + 1, callback, targetElement), DIALOGUE_SPEED);
    } else {
        isTyping = false;
        
         if (currentDialogueStep === dialogueSteps.length - 2 && !targetElement) { 
            const prompt = document.createElement('div');
            prompt.id = 'clickPrompt';
            prompt.textContent = "Devam etmek için ekrana dokun / tıkla";
            dialog.appendChild(prompt);
         }
        
        if (callback) {
            callback();
        }
    }
}


function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


// ----------------------------------------------------
// *** UYGULAMA İÇİ NAVİGASYON VE PROFİL EKRANI ***
// ----------------------------------------------------

let currentAppView = 'profile'; 

function navigateToApp(user) {
    activeUser = user;
    
    navigateToScreen(document.getElementById("app"));
    currentAppView = 'profile';
    renderAppContainer(); 
}

function renderAppContainer() {
    const appDiv = document.getElementById("app");

    appDiv.innerHTML = `
        <header class="app-header">
            <h1 class="app-title">Penglish 🐧</h1>
        </header>
        
        <div id="appContent" class="app-content">
        </div>

        <nav class="bottom-nav">
            <button id="navLessons" data-view="lessons" class="nav-btn">Dersler</button>
            <button id="navReview" data-view="review" class="nav-btn">Tekrar</button>
            <button id="navProfile" data-view="profile" class="nav-btn active">Profil</button>
            <button id="navLogout" class="nav-btn logout-btn">Çıkış Yap</button>
        </nav>
    `;

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', handleNavClick);
    });

    changeView(currentAppView);
}

function handleNavClick(e) {
    const target = e.currentTarget;
    const view = target.dataset.view;

    if (view) {
        changeView(view);
    } else if (target.id === 'navLogout') {
        logoutUser();
    }
}

function changeView(newView) {
    currentAppView = newView;
    const contentDiv = document.getElementById("appContent");
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.view === newView) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (!contentDiv) return;

    switch (newView) {
        case 'profile':
            renderProfileView(contentDiv);
            break;
        case 'lessons':
            renderLessonsView(contentDiv); // Yeni Dersler Sayfası
            break;
        case 'review':
            renderComingSoonView(contentDiv, "Tekrar Listesi");
            break;
        default:
            renderComingSoonView(contentDiv, "Bilinmeyen Sayfa");
    }
}

function renderProfileView(container) {
    if (!activeUser) {
        container.innerHTML = `<p>Kullanıcı bilgisi yüklenemedi.</p>`;
        return;
    }
    
    const mockWordCount = activeUser.wordCount || 0;
    
    container.innerHTML = `
        <div class="profile-card">
            <div class="profile-header">
                <span class="user-icon">👤</span> 
                <h3 class="username-display">${activeUser.username}</h3>
                <p class="user-email">${activeUser.email || 'Misafir Kullanıcı'}</p>
            </div>
            
            <div class="stats-section">
                <h4>Seviye ve İlerleme</h4>
                <div class="stat-item">
                    <span>Dilbilgisi Seviyen:</span>
                    <span class="stat-value level-badge large">${activeUser.level}</span>
                </div>
                <div class="stat-item">
                    <span>Kelime Seviyen:</span>
                    <span class="stat-value level-badge large">${vocabLevel || 'A1'}</span>
                </div>
                <div class="stat-item">
                    <span>Öğrenilen Kelime Sayısı:</span>
                    <span class="stat-value">${mockWordCount}</span>
                </div>
            </div>
            
            <div class="action-buttons-profile">
                <button class="main-button secondary">Ayarları Düzenle (Yakında)</button>
            </div>
            
        </div>
        <p style="margin-top: 20px; font-size: 0.8em; color: #666666; text-align: center;">Profil detayları ve ilerleme grafikleri yakında burada olacak.</p>
    `;
}

// Yeni: Dersler ana sayfası
function renderLessonsView(container) {
    container.innerHTML = `
        <h2 class="section-title">Dersler ve Testler</h2>
        <p class="description">Öğrenme yolculuğuna başlamak için bir alan seç.</p>

        <div class="lesson-card" onclick="changeView('review')">
            <span class="lesson-icon">📚</span>
            <h3>Dilbilgisi Dersleri</h3>
            <p>Seviyen: ${activeUser.level} - Öğrenmeye Devam Et</p>
        </div>

        <div class="lesson-card" onclick="navigateToVocabSelect()">
            <span class="lesson-icon">🧠</span>
            <h3>Kelime Testleri</h3>
            <p>Mevcut Kelime Seviyen: ${vocabLevel || 'A1'} (Tıklayarak testlere git)</p>
        </div>
        
        <div class="lesson-card" onclick="changeView('review')">
            <span class="lesson-icon">🗣️</span>
            <h3>Konuşma Alıştırmaları</h3>
            <p>Yakında...</p>
        </div>
    `;
}

function renderComingSoonView(container, title) {
    container.innerHTML = `
        <div class="coming-soon">
            <div class="penguin-emoji">🚧</div>
            <h2>${title}</h2>
            <p>Penglish, bu özelliği senin için geliştirmeye devam ediyor.</p>
            <p>Lütfen biraz sabret, yakında burası dolacak!</p>
        </div>
    `;
}


function logoutUser() {
    activeUser = null; 
    localStorage.removeItem('penglishUserLevel'); 
    localStorage.removeItem('penglishVocabLevel'); 
    document.getElementById("app").classList.add("hidden");
    if (rootScreen) rootScreen.classList.remove("hidden");
    alert("Başarıyla çıkış yaptınız.");
}

// ----------------------------------------------------
// *** YENİ KELİME TESTİ AKIŞI ***
// ----------------------------------------------------

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function navigateToVocabSelect() {
    navigateToScreen(vocabSelectScreen);
    renderVocabLevelList();
}

function renderVocabLevelList() {
    const listContainer = document.getElementById('vocabLevelList');
    listContainer.innerHTML = '';
    
    if (!vocabLevel) vocabLevel = 'A1';
    const userVocabIndex = CEFR_LEVELS.indexOf(vocabLevel);
    
    // 1. Kelime Dağarcığı Tespit Testi (Sadece 1 Kere Çözülecek)
    const initialTestDone = localStorage.getItem('penglishInitialVocabTestDone') === 'true';

    const initialCard = document.createElement('div');
    initialCard.className = 'level-card special-test';
    initialCard.innerHTML = `
        <h3>Kelime Dağarcığı Tespit Testi 🚀</h3>
        <p class="status-message">${initialTestDone ? '✅ Bu testi zaten çözdün.' : 'Yeni! Kelime seviyeni belirlemek için çöz.'}</p>
        <button class="main-button small-next-button" ${initialTestDone ? 'disabled' : ''} onclick="startInitialVocabTest()">
            ${initialTestDone ? 'Tamamlandı' : 'Teste Başla'}
        </button>
    `;
    listContainer.appendChild(initialCard);
    
    listContainer.innerHTML += '<h4>Seviyeye Göre Kelime Testleri:</h4>';

    // 2. Düzenli Seviye Testleri
    CEFR_LEVELS.forEach((level, index) => {
        let statusText = '';
        let buttonAction = `startRegularVocabTest('${level}')`;
        let buttonText = 'Teste Başla';
        let isDisabled = false;
        
        if (index < userVocabIndex) {
            statusText = '<span class="status-simple">😎 Bu seviye senin için çok basit.</span>';
            isDisabled = false; // Basit olsa bile çözebilsin
            buttonText = 'Çöz (Basit)';
            buttonAction = `startRegularVocabTest('${level}')`; 

        } else if (index > userVocabIndex) {
            statusText = '<span class="status-warning">⚠️ Biraz daha çalışman gerek.</span>';
            isDisabled = true;
            buttonText = 'Kilitli';

        } else {
            statusText = `<span class="status-active">🔥 Mevcut Çalışma Seviyen: ${level}</span>`;
            buttonText = 'Teste Başla';
            isDisabled = false;
        }

        const levelCard = document.createElement('div');
        levelCard.className = `level-card ${isDisabled ? 'disabled' : 'active-level'}`;
        levelCard.innerHTML = `
            <h3>Seviye ${level} Kelime Testi</h3>
            ${statusText}
            <button class="main-button small-next-button" ${isDisabled ? 'disabled' : ''} onclick="${buttonAction}">
                ${buttonText}
            </button>
        `;
        listContainer.appendChild(levelCard);
    });
}

function startInitialVocabTest() {
    if (localStorage.getItem('penglishInitialVocabTestDone') === 'true') {
        alert("Bu tespit testini zaten tamamladınız.");
        return;
    }
    
    // A1'den C2'ye kadar 30 soru için havuz oluştur (A1, A2, B1, B2, C1'den 6'şar)
    vocabTestQuestions = createInitialVocabTestQuestions(INITIAL_VOCAB_TEST_SIZE);
    vocabCurrentIndex = 0;
    vocabCorrectCount = 0;
    
    navigateToScreen(vocabTestScreen);
    
    // Başlangıç Diyaloğu
    vocabDialogue.classList.remove('hidden');
    vocabQuestionArea.classList.add('hidden');
    document.getElementById("vocabTestTitle").textContent = "Kelime Dağarcığı Tespit Testi";
    document.getElementById("vocabProgressBarContainer").classList.remove("hidden");
    
    vocabDialogue.innerHTML = 'Harika! 30 soruluk bu hızlı test, hangi seviyeden başlayacağını belirleyecek. Başlayalım mı?';
    
    setTimeout(() => {
        vocabDialogue.classList.add('hidden');
        nextVocabQuestion();
    }, 2000);
}

function startRegularVocabTest(level) {
    if (CEFR_LEVELS.indexOf(level) > CEFR_LEVELS.indexOf(vocabLevel)) {
        alert("Üzgünüm, bu seviye şu an için kilitli. Mevcut seviyende 30'da 30 yapmalısın!");
        return;
    }
    
    // Normal seviye testi (Sadece o seviyeden 30 soru)
    vocabTestQuestions = createRegularVocabTestQuestions(level, 30);
    vocabCurrentIndex = 0;
    vocabCorrectCount = 0;

    navigateToScreen(vocabTestScreen);

    vocabDialogue.classList.add('hidden');
    vocabQuestionArea.classList.remove('hidden');
    document.getElementById("vocabTestTitle").textContent = `Kelime Testi: ${level}`;
    document.getElementById("vocabProgressBarContainer").classList.remove("hidden");

    nextVocabQuestion();
}


function createInitialVocabTestQuestions(count) {
    if (typeof VOCABULARY === 'undefined') return [];
    
    // A1, A2, B1, B2, C1'den eşit sayıda soru al (30 soru için 6'şar)
    const levelsToInclude = ['A1', 'A2', 'B1', 'B2', 'C1']; 
    const questionsPerLevel = Math.floor(count / levelsToInclude.length);
    let questions = [];
    
    levelsToInclude.forEach(level => {
        const pool = VOCABULARY[level];
        if (pool && pool.length > 0) {
            const shuffledPool = shuffleArray(pool);
            for (let i = 0; i < questionsPerLevel; i++) {
                questions.push({ ...shuffledPool[i], level });
            }
        }
    });
    
    return shuffleArray(questions);
}

function createRegularVocabTestQuestions(level, count) {
    if (typeof VOCABULARY === 'undefined' || !VOCABULARY[level]) return [];
    
    const pool = VOCABULARY[level];
    if (pool.length < count) {
        // Yeterli kelime yoksa, havuzun tamamını kullan
        return shuffleArray(pool);
    }
    
    const shuffledPool = shuffleArray(pool);
    return shuffledPool.slice(0, count).map(q => ({ ...q, level }));
}

function updateVocabProgressBar() {
    const progressBar = document.getElementById("vocabProgressBar");
    if (progressBar) {
        const percentage = (vocabCurrentIndex / vocabTestQuestions.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}

function nextVocabQuestion() {
    if (vocabCurrentIndex >= vocabTestQuestions.length) {
        finishVocabTest();
        return;
    }

    updateVocabProgressBar();
    vocabQuestionArea.classList.remove('hidden');
    document.getElementById("vocabFeedback").innerHTML = '';

    const questionData = vocabTestQuestions[vocabCurrentIndex];
    
    // Soru Metni
    document.getElementById("vocabQuestionText").innerHTML = `
        <div class="question-header">
            <span class="level-badge small">${questionData.level}</span> 
            <span class="progress-info">Soru ${vocabCurrentIndex + 1} / ${vocabTestQuestions.length}</span>
        </div>
        <p class="question-title">Aşağıdaki kelimenin Türkçe karşılığı nedir?</p>
        <p class="vocab-word-display"><strong>${questionData.word}</strong></p>
    `;
    
    const optionsContainer = document.getElementById("vocabOptionsContainer");
    optionsContainer.innerHTML = '';
    
    const correctOption = questionData.translation;
    
    // Yanlış şıkları belirle
    let incorrectOptions = [];
    const poolCopy = [...TURKISH_OPTIONS_POOL].filter(o => o !== correctOption);
    while (incorrectOptions.length < 2) {
        const randomIndex = Math.floor(Math.random() * poolCopy.length);
        const option = poolCopy.splice(randomIndex, 1)[0];
        if (!incorrectOptions.includes(option)) {
            incorrectOptions.push(option);
        }
    }
    
    const allOptions = shuffleArray([correctOption, ...incorrectOptions]);

    allOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkVocabAnswer(btn, option, correctOption);
        optionsContainer.appendChild(btn);
    });
}

function checkVocabAnswer(selectedBtn, selectedOption, correctAnswer) {
    const options = document.querySelectorAll('#vocabOptionsContainer .option-btn');
    options.forEach(btn => btn.disabled = true);
    
    let isCorrect = (selectedOption === correctAnswer);

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        vocabCorrectCount++;
    } else {
        selectedBtn.classList.add('wrong');
        options.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    
    vocabCurrentIndex++;

    // Otomatik geçişi kaldır, kullanıcı onayı ekle
    const nextBtn = document.createElement('button');
    nextBtn.id = 'vocabNextBtn';
    nextBtn.className = 'main-button small-next-button';
    nextBtn.textContent = vocabCurrentIndex >= vocabTestQuestions.length ? 'Testi Bitir 🏁' : 'Devam Et ➡️';
    nextBtn.onclick = nextVocabQuestion;

    document.getElementById("vocabFeedback").innerHTML = `
        <p><strong>${isCorrect ? '✅ Doğru!' : '❌ Yanlış!'}</strong></p>
    `;
    document.getElementById("vocabFeedback").appendChild(nextBtn);
}


function finishVocabTest() {
    const totalQuestions = vocabTestQuestions.length;
    const score = vocabCorrectCount;
    const isInitialTest = totalQuestions === INITIAL_VOCAB_TEST_SIZE;
    
    let newVocabLevel = vocabLevel; 
    let message = `Tebrikler! Testi tamamladın. ${score}/${totalQuestions} doğru cevap.`;

    // İLK TESPİT TESTİ SONUCU
    if (isInitialTest) {
        localStorage.setItem('penglishInitialVocabTestDone', 'true');
        const percentage = (score / totalQuestions) * 100;

        if (percentage >= 85) newVocabLevel = 'B2';
        else if (percentage >= 70) newVocabLevel = 'B1';
        else if (percentage >= 50) newVocabLevel = 'A2';
        else newVocabLevel = 'A1';
        
        message += ` Buna göre Kelime Seviyeniz: ${newVocabLevel} olarak belirlendi! Bu seviyeden derslere başlayabilirsin.`;
        vocabLevel = newVocabLevel;
        saveUserProgress(); 
        
    } else { 
        // DÜZENLİ KELİME TESTİ SONUCU
        const currentLevelIndex = CEFR_LEVELS.indexOf(vocabLevel);
        
        if (score === totalQuestions) {
            const nextLevelIndex = currentLevelIndex + 1;
            if (nextLevelIndex < CEFR_LEVELS.length) {
                newVocabLevel = CEFR_LEVELS[nextLevelIndex];
                message += ` Mükemmel! Tüm soruları doğru bildin. Kelime Seviyen ${newVocabLevel}'ye yükseltildi!`;
                vocabLevel = newVocabLevel;
                saveUserProgress();
            } else {
                 message += ` Mükemmel! C2'desin ve tüm soruları doğru bildin! Artık bir kelime ustasısın.`;
            }
        } else {
             message += ` Tekrar çözerek bu seviyede ustalaşabilirsin. Üst seviyeler için 30/30 yapmalısın!`;
        }
    }

    // Sonuç ekranını ayarla
    vocabQuestionArea.classList.add('hidden');
    vocabDialogue.classList.remove('hidden');
    document.getElementById("vocabTestTitle").textContent = "Test Sonucu";
    document.getElementById("vocabDialogue").innerHTML = `
        <div class="result-box-small">
            <p>${message}</p>
            <p>Güncel Kelime Seviyen:</p>
            <span class="level-badge large">${vocabLevel}</span>
        </div>
        <button class="main-button" onclick="navigateToVocabSelect()">Seviye Seçim Ekranına Git</button>
    `;
}

document.addEventListener('DOMContentLoaded', startApp);
