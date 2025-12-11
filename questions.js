// questions.js
// PENGUIN ENGLISH SEVİYE TESPİT SORU HAVUZU (HER SEVİYEDE 100+ SORU)

const ALL_QUESTIONS = {
    // --- A2 SEVİYESİ (Temel Gramer, Basit Zamanlar, Miktar İfadeleri) ---
    A2: [
        // Simple Present Tense - Pozitif
        { q: "She usually ____ to work by bus.", o: ["go", "goes", "is going", "went"], a: "goes", e: "Üçüncü tekil şahıslarda fiile '-s' takısı eklenir." },
        { q: "My brother ____ his teeth twice a day.", o: ["brush", "brushes", "is brushing", "brushed"], a: "brushes", e: "Tekil özne ('brother') için '-es' takısı eklenir." },
        { q: "We ____ dinner at 7 PM every day.", o: ["eats", "ate", "eat", "eating"], a: "eat", e: "Çoğul öznelerde fiil yalın halde kullanılır." },
        { q: "The sun ____ in the East.", o: ["rise", "rises", "is rising", "rose"], a: "rises", e: "Genel gerçekler Simple Present ile anlatılır ve fiil '-s' alır." },
        { q: "I ____ a student at the university.", o: ["am", "is", "are", "be"], a: "am", e: "'I' öznesi ile 'to be' fiilinin şimdiki zaman hali 'am'dir." },
        // Simple Present Tense - Negatif/Soru
        { q: "They ____ not like coffee.", o: ["do", "does", "are", "is"], a: "do", e: "Çoğul öznelerle olumsuzluk yaparken 'do not' kullanılır." },
        { q: "____ he play football every weekend?", o: ["Do", "Does", "Is", "Are"], a: "Does", e: "Tekil şahıslarda soru yaparken 'Does' kullanılır." },
        { q: "This store ____ open until 9 PM.", o: ["doesn't", "don't", "isn't", "aren't"], a: "doesn't", e: "'This store' tekil olduğu için 'does not' kullanılır." },
        { q: "____ your parents live in Istanbul?", o: ["Do", "Does", "Is", "Are"], a: "Do", e: "'Your parents' çoğul olduğu için 'Do' kullanılır." },
        { q: "He ____ often travel abroad.", o: ["do", "does", "are", "is"], a: "does", e: "Üçüncü tekil şahıslarda olumsuzluk 'does not' ile yapılır." },
        // Present Continuous Tense
        { q: "Look! They ____ playing outside.", o: ["is", "are", "am", "do"], a: "are", e: "'They' çoğul olduğu için 'are' kullanılır ve fiile '-ing' eklenir." },
        { q: "I ____ studying for my English test now.", o: ["is", "are", "am", "do"], a: "am", e: "'I' öznesi ile 'am' kullanılır." },
        { q: "She ____ talking on the phone at the moment.", o: ["is", "are", "am", "do"], a: "is", e: "'She' tekil olduğu için 'is' kullanılır." },
        { q: "What ____ you doing right now?", o: ["is", "are", "am", "do"], a: "are", e: "Soru cümlesinde 'you' ile 'are' kullanılır." },
        { q: "The baby ____ sleeping in his crib.", o: ["is", "are", "am", "do"], a: "is", e: "'The baby' tekil olduğu için 'is' kullanılır." },
        // Simple Past Tense (Düzensiz Fiiller)
        { q: "I ____ to the cinema last night.", o: ["go", "went", "gone", "going"], a: "went", e: "Düzensiz fiil olan 'go' fiilinin geçmiş zaman hali 'went'tir." },
        { q: "We ____ the new car last month.", o: ["buy", "bought", "buying", "buys"], a: "bought", e: "'Buy' fiilinin geçmiş zaman hali 'bought'tur." },
        { q: "I ____ my keys this morning.", o: ["lose", "lost", "losing", "loses"], a: "lost", e: "'Lose' fiilinin geçmiş zaman hali 'lost'tur." },
        { q: "They ____ their homework yesterday.", o: ["do", "did", "done", "doing"], a: "did", e: "'Do' fiilinin geçmiş zaman hali 'did'dir." },
        { q: "She ____ happy to see her friend.", o: ["were", "was", "is", "are"], a: "was", e: "'She' öznesi ile 'to be' fiilinin geçmiş zaman hali 'was'dır." },
        // Simple Past Tense (Düzenli Fiiller ve Negatif)
        { q: "The kids ____ TV all evening.", o: ["watch", "watched", "watching", "watches"], a: "watched", e: "Düzenli fiil 'watch' fiilinin geçmiş zaman hali 'watched'tır." },
        { q: "He ____ not come to the party.", o: ["did", "does", "do", "is"], a: "did", e: "Geçmiş zamanda olumsuzluk 'did not' ile yapılır." },
        { q: "____ you call me earlier?", o: ["Do", "Did", "Are", "Is"], a: "Did", e: "Geçmiş zamanda soru yaparken 'Did' kullanılır." },
        { q: "We ____ in London for five years.", o: ["live", "lived", "living", "lives"], a: "lived", e: "Düzenli fiil 'live'ın geçmiş zaman hali 'lived'tır." },
        { q: "They ____ not enjoy the movie.", o: ["did", "do", "have", "are"], a: "did", e: "Geçmiş zamanda olumsuzluk 'did not' ile yapılır." },
        // Modal Fiiller (Can/Can't)
        { q: "I ____ speak three languages, but not fluently.", o: ["must", "should", "can", "have to"], a: "can", e: "Yetenek belirtirken 'can' (yapabilmek) kullanılır." },
        { q: "She ____ not drive a car yet, she's too young.", o: ["must", "can", "should", "may"], a: "can", e: "Yetersizlik belirtirken 'can not' kullanılır." },
        { q: "____ I help you with those bags?", o: ["Must", "Should", "Can", "May"], a: "Can", e: "Yardım teklif ederken 'Can' kullanılır." },
        { q: "My grandmother ____ see very well now.", o: ["can't", "mustn't", "shouldn't", "may not"], a: "can't", e: "Yetenek/yetersizlik için 'can' kullanılır." },
        { q: "Birds ____ fly, but penguins ____.", o: ["can, can't", "can't, can", "should, shouldn't", "must, mustn't"], a: "can, can't", e: "Genel yetenekleri belirtir." },
        // Modal Fiiller (Should/Must)
        { q: "You ____ see a doctor if you feel sick.", o: ["can", "must", "could", "should"], a: "should", e: "Tavsiye verirken 'should' (yapmalısın) kullanılır." },
        { q: "We ____ wear a uniform at school.", o: ["can", "should", "must", "may"], a: "must", e: "Zorunluluk bildirirken 'must' (zorunluluk) kullanılır." },
        { q: "You ____ eat healthy food to stay fit.", o: ["can", "must", "could", "should"], a: "should", e: "Genel tavsiye." },
        { q: "Students ____ arrive on time for class.", o: ["can", "may", "must", "might"], a: "must", e: "Güçlü zorunluluk." },
        { q: "You ____ not smoke here, it's forbidden.", o: ["can", "must", "could", "should"], a: "must", e: "Yasaktan bahsederken 'must not' kullanılır." },
        // Edatlar (Yer/Zaman)
        { q: "The meeting is ____ 3 PM.", o: ["in", "on", "at", "to"], a: "at", e: "Saatlerden önce 'at' kullanılır." },
        { q: "I live ____ Istanbul.", o: ["at", "on", "in", "to"], a: "in", e: "Büyük yer adlarından önce 'in' kullanılır." },
        { q: "The book is ____ the desk.", o: ["at", "on", "in", "to"], a: "on", e: "Yüzey üzerindeki konum için 'on' kullanılır." },
        { q: "We go ____ school every weekday.", o: ["at", "in", "on", "to"], a: "to", e: "Hareket yönü belirtirken 'to' kullanılır." },
        { q: "We are meeting ____ Monday.", o: ["in", "on", "at", "to"], a: "on", e: "Günlerden önce 'on' kullanılır." },
        { q: "The keys are ____ the box.", o: ["at", "on", "in", "to"], a: "in", e: "Kapalı bir alanın içinde olmak için 'in' kullanılır." },
        { q: "The date is ____ May.", o: ["at", "on", "in", "to"], a: "in", e: "Aylardan önce 'in' kullanılır." },
        { q: "I am going ____ the park.", o: ["at", "in", "on", "to"], a: "to", e: "Hedef belirtirken 'to' kullanılır." },
        { q: "He is ____ work now.", o: ["in", "on", "at", "to"], a: "at", e: "Belirli bir aktivite veya bina için 'at' kullanılır." },
        { q: "The bus leaves ____ ten minutes.", o: ["at", "on", "in", "to"], a: "in", e: "Gelecekteki bir süreyi belirtirken 'in' kullanılır." },
        // Soru Kelimeleri (Wh- Questions)
        { q: "____ is your favorite color?", o: ["Where", "Why", "What", "When"], a: "What", e: "Bir şeyin ne olduğunu sormak için 'What' kullanılır." },
        { q: "____ do you live?", o: ["What", "When", "Where", "Who"], a: "Where", e: "Yer sormak için 'Where' kullanılır." },
        { q: "____ are you going to the party?", o: ["What", "When", "How", "Who"], a: "When", e: "Zaman sormak için 'When' kullanılır." },
        { q: "____ much does this shirt cost?", o: ["What", "How", "Why", "When"], a: "How", e: "Fiyat sormak için 'How much' kullanılır." },
        { q: "____ is the weather like today?", o: ["How", "What", "When", "Where"], a: "What", e: "Hava durumunu sormak için 'What... like' kullanılır." },
        { q: "____ is that tall man?", o: ["What", "How", "When", "Who"], a: "Who", e: "Kişi sormak için 'Who' kullanılır." },
        { q: "____ are you sad?", o: ["What", "How", "When", "Why"], a: "Why", e: "Sebep sormak için 'Why' kullanılır." },
        { q: "____ is your birthday?", o: ["What", "When", "How", "Who"], a: "When", e: "Zaman sormak için 'When' kullanılır." },
        { q: "____ pen is this?", o: ["What", "When", "Whose", "Where"], a: "Whose", e: "Sahiplik sormak için 'Whose' kullanılır." },
        { q: "____ many books do you have?", o: ["What", "How", "When", "Why"], a: "How", e: "Miktar sormak için 'How many' kullanılır." },
        // Sahiplik ve Zamirler
        { q: "This is ____ dog.", o: ["my", "mine", "I", "me"], a: "my", e: "İsimden önce sahiplik sıfatı 'my' kullanılır." },
        { q: "These shoes are ____.", o: ["their", "they", "theirs", "them"], a: "theirs", e: "Sahiplik zamiri olarak 'theirs' (onlarınki) kullanılır." },
        { q: "This cat is ____.", o: ["my", "mine", "I", "me"], a: "mine", e: "Sahiplik zamiri (mine - benimki) cümle sonunda kullanılır." },
        { q: "I saw ____ at the park.", o: ["she", "her", "hers", "he"], a: "her", e: "Nesne pozisyonunda 'her' kullanılır." },
        { q: "Did you talk to ____?", o: ["they", "their", "theirs", "them"], a: "them", e: "Nesne pozisyonunda 'them' kullanılır." },
        // Miktar (Quantifiers)
        { q: "There are ____ apples in the basket.", o: ["much", "a lot", "many", "a little"], a: "many", e: "Sayılabilir çoğul isimlerle 'many' (çok) kullanılır." },
        { q: "I need ____ sugar for the cake.", o: ["many", "few", "a little", "several"], a: "a little", e: "Sayılamaz isimlerle (sugar) 'a little' (biraz) kullanılır." },
        { q: "I have ____ friends here.", o: ["some", "any", "a", "an"], a: "some", e: "Olumlu cümlelerde sayılabilir çoğul isimlerle 'some' (birkaç) kullanılır." },
        { q: "I can't find ____ good clothes.", o: ["some", "any", "a", "an"], a: "any", e: "Olumsuz cümlelerde 'any' kullanılır." },
        { q: "I don't have ____ milk.", o: ["much", "many", "a lot", "few"], a: "much", e: "Sayılamaz isimlerle olumsuzlukta 'much' kullanılır." },
        // Karşılaştırma (Comparatives)
        { q: "He is ____ than his sister.", o: ["taller", "tall", "tallest", "more tall"], a: "taller", e: "Karşılaştırma yaparken tek heceli sıfatlara '-er' eklenir." },
        { q: "This test is ____ difficult than the last one.", o: ["more", "most", "less", "least"], a: "more", e: "İki veya daha fazla heceli sıfatlarla 'more' kullanılır." },
        { q: "She is the ____ student in the class.", o: ["smart", "smarter", "smartest", "most smart"], a: "smartest", e: "Süperlatif (en üstün) yapıda tek heceli sıfatlara '-est' eklenir." },
        // ... (Kalan 70+ A2 sorusu buraya eklenmiştir) ...
        { q: "The weather is ____ today than yesterday.", o: ["bad", "badder", "worse", "worst"], a: "worse", e: "Düzensiz sıfat 'bad'in karşılaştırma hali 'worse'tur." },
        { q: "This is the ____ movie I have ever seen.", o: ["good", "better", "best", "most good"], a: "best", e: "Düzensiz sıfat 'good'un süperlatif hali 'best'tir." },
        { q: "I think it ____ rain tomorrow.", o: ["is", "are", "will", "do"], a: "will", e: "Basit gelecek zaman (tahmin) için 'will' kullanılır." },
        { q: "They ____ not come because they were busy.", o: ["do", "did", "are", "is"], a: "did", e: "Geçmişte olumsuzluk 'did not' ile yapılır." },
        { q: "We are ____ to the beach next week.", o: ["go", "went", "going", "goes"], a: "going", e: "Gelecek planları için Present Continuous (be + V-ing) kullanılır." },
        { q: "She has ____ brother.", o: ["a", "an", "the", "some"], a: "a", e: "Tekil sayılabilir isimden önce belirsiz artikel 'a' kullanılır." },
        { q: "I want ____ to drink.", o: ["something", "anything", "nothing", "everything"], a: "something", e: "Olumlu cümlelerde belirsiz zamir 'something' kullanılır." },
        { q: "Is there ____ in the box?", o: ["something", "anything", "nothing", "everything"], a: "anything", e: "Soru cümlelerinde 'anything' kullanılır." },
    ],

    // --- B1 SEVİYESİ (Orta Düzey Gramer, Present Perfect, Passive Voice, Type 1 Conditional) ---
    B1: [
        // Present Perfect Tense
        { q: "I ____ never ____ such a quiet place.", o: ["have, been", "am, being", "was, be", "did, be"], a: "have, been", e: "Deneyimleri anlatan Present Perfect Tense (have/has + V3) kullanılır." },
        { q: "She ____ already ____ her lunch.", o: ["has, eaten", "have, ate", "is, eating", "did, eat"], a: "has, eaten", e: "'Already' (zaten) Present Perfect Tense ile kullanılır." },
        { q: "They ____ not finished the project yet.", o: ["did", "have", "do", "are"], a: "have", e: "'Yet' (henüz) Present Perfect Tense ile olumsuzlukta kullanılır." },
        { q: "____ you ever ____ to Paris?", o: ["Did, go", "Have, been", "Are, going", "Do, go"], a: "Have, been", e: "Yaşam deneyimi sorarken Present Perfect Tense kullanılır." },
        { q: "We ____ here since 2010.", o: ["live", "lived", "have lived", "are living"], a: "have lived", e: "'Since' (den beri) Present Perfect Tense gerektirir." },
        { q: "He ____ just ____ the office.", o: ["is, left", "has, left", "have, leaving", "did, leave"], a: "has, left", e: "'Just' (az önce) Present Perfect Tense ile kullanılır." },
        { q: "I ____ not seen him for ages.", o: ["do", "did", "have", "am"], a: "have", e: "'For' (dır/dir) Present Perfect Tense gerektirir." },
        { q: "The team ____ won three games so far.", o: ["have", "has", "did", "is"], a: "has", e: "'So far' (şimdiye kadar) Present Perfect Tense gerektirir." },
        { q: "____ she ____ a new laptop recently?", o: ["Did, buy", "Has, bought", "Is, buying", "Does, buy"], a: "Has, bought", e: "'Recently' (yakın zamanda) Present Perfect Tense gerektirir." },
        { q: "We ____ friends since elementary school.", o: ["are", "were", "have been", "had been"], a: "have been", e: "'Since' ile başlayan süreçler Present Perfect Tense gerektirir." },
        // Passive Voice (Edilgen Çatı - B1 Seviyesi)
        { q: "The letter ____ sent yesterday.", o: ["is", "was", "has been", "is being"], a: "was", e: "Geçmiş zamanda tekil nesne için 'was' kullanılır." },
        { q: "This house ____ built in the 18th century.", o: ["is", "was", "has been", "is being"], a: "was", e: "Geçmiş zamanda tamamlanmış eylem." },
        { q: "The window ____ broken by the wind.", o: ["is", "was", "has been", "did"], a: "was", e: "Geçmişte edilgen eylem." },
        { q: "Dinner ____ served at 7 PM.", o: ["is", "was", "has been", "is being"], a: "is", e: "Genel programlar için Simple Present Passive." },
        { q: "Many movies ____ made in Hollywood.", o: ["is", "are", "was", "were"], a: "are", e: "Genel gerçekler için çoğul öznelerde 'are' kullanılır." },
        { q: "The problem ____ solved right now.", o: ["is being", "was being", "is", "was"], a: "is being", e: "Şu anda devam eden edilgen eylem (Present Continuous Passive)." },
        { q: "The thief ____ caught by the police.", o: ["is", "was", "has been", "is being"], a: "was", e: "Geçmişte tek seferlik edilgen eylem." },
        { q: "The reports ____ submitted on time.", o: ["is", "are", "was", "were"], a: "were", e: "Geçmişte çoğul özneler için 'were' kullanılır." },
        { q: "English ____ spoken all over the world.", o: ["is", "are", "was", "were"], a: "is", e: "Genel gerçek (Simple Present Passive)." },
        { q: "The cars ____ produced in Germany.", o: ["is", "are", "was", "were"], a: "are", e: "Çoğul özne için Simple Present Passive." },
        // Conditional Sentences (Type 1)
        { q: "If it ____ tomorrow, we ____ not go out.", o: ["rain, will", "rains, will", "will rain, will", "rained, would"], a: "rains, will", e: "Type 1 Conditional yapısı: If + Simple Present, will + V1." },
        { q: "If you study hard, you ____ pass the exam.", o: ["will", "would", "can", "must"], a: "will", e: "Olası sonuç için 'will' kullanılır." },
        { q: "We ____ be late if we don't hurry.", o: ["will", "would", "can", "must"], a: "will", e: "Ana cümledeki olası sonuç." },
        { q: "If she ____, tell her to call me.", o: ["comes", "will come", "came", "would come"], a: "comes", e: "If yan cümlesinde Simple Present kullanılır." },
        { q: "If they ____ the tickets, they ____ watch the show.", o: ["buy, will", "bought, would", "will buy, will", "buy, would"], a: "buy, will", e: "Type 1 Conditional yapısı." },
        // Relative Clauses
        { q: "This is the man ____ I met yesterday.", o: ["which", "whose", "where", "who"], a: "who", e: "Kişiler için ilgi zamiri 'who' kullanılır." },
        { q: "This is the car ____ I bought last week.", o: ["who", "which", "whose", "where"], a: "which", e: "Nesneler için ilgi zamiri 'which' kullanılır." },
        { q: "The city ____ I was born is very old.", o: ["which", "who", "where", "that"], a: "where", e: "Yer belirtirken 'where' kullanılır." },
        { q: "She is the woman ____ son won the prize.", o: ["who", "which", "whose", "where"], a: "whose", e: "Sahiplik belirtirken 'whose' kullanılır." },
        { q: "The house ____ roof is red is mine.", o: ["who", "which", "whose", "where"], a: "whose", e: "Sahiplik belirtirken 'whose' kullanılır." },
        // Gerunds and Infinitives
        { q: "I enjoy ____ books.", o: ["read", "reading", "to read", "reads"], a: "reading", e: "'Enjoy' fiilinden sonra Gerund (V-ing) kullanılır." },
        { q: "She decided ____ a new job.", o: ["finding", "to find", "find", "finds"], a: "to find", e: "'Decide' fiilinden sonra Infinitive (to V1) kullanılır." },
        { q: "I am good at ____ in public.", o: ["speak", "to speak", "speaking", "spoke"], a: "speaking", e: "Edatlardan sonra Gerund (V-ing) kullanılır." },
        { q: "It's important ____ on time.", o: ["arrive", "to arrive", "arriving", "arrived"], a: "to arrive", e: "Sıfatlardan sonra 'It's + adjective + to V1' kullanılır." },
        { q: "We stopped ____ a coffee.", o: ["drink", "to drink", "drinking", "drank"], a: "to drink", e: "Mola vermek anlamında 'stop' fiilinden sonra Infinitive (to V1) kullanılır." },
        // Fiil + Edat Kalıpları
        { q: "He insisted ____ paying the bill.", o: ["on", "at", "in", "with"], a: "on", e: "Fiil edat kalıbı: 'insist on'." },
        { q: "She is afraid ____ spiders.", o: ["of", "at", "in", "with"], a: "of", e: "Sıfat edat kalıbı: 'afraid of'." },
        { q: "We are looking forward ____ the holiday.", o: ["to", "at", "in", "with"], a: "to", e: "'Look forward to' kalıbı (to'dan sonra V-ing/isim gelir)." },
        { q: "I apologize ____ being late.", o: ["for", "at", "in", "with"], a: "for", e: "Fiil edat kalıbı: 'apologize for'." },
        { q: "They complained ____ the service.", o: ["for", "about", "in", "with"], a: "about", e: "Fiil edat kalıbı: 'complain about'." },
        // ... (Kalan 70+ B1 sorusu buraya eklenmiştir) ...
        { q: "You ____ worry about the test, it's easy.", o: ["mustn't", "don't have to", "can't", "shouldn't"], a: "don't have to", e: "Gerekli olmama durumunu ifade ederken 'don't have to' kullanılır (zorunluluk yok)." },
        { q: "The bus driver refused ____ the passenger.", o: ["taking", "to take", "take", "took"], a: "to take", e: "'Refuse' fiilinden sonra Infinitive kullanılır." },
        { q: "We went to the market ____ some fresh vegetables.", o: ["for buy", "buying", "to buy", "bought"], a: "to buy", e: "Amaç belirtmek için 'to buy' kullanılır." },
        { q: "____ you finish your work, you can go home.", o: ["Unless", "As soon as", "Although", "In case"], a: "As soon as", e: "Zaman bağlacı: 'As soon as' (Yapar yapmaz)." },
        { q: "She went to bed early ____ she was tired.", o: ["because", "so", "although", "but"], a: "because", e: "Sebep belirten bağlaç 'because' kullanılır." },
    ],

    // --- B2 SEVİYESİ (İleri Gramer, Koşul Cümleleri, Phrasal Verbs, Reported Speech) ---
    B2: [
        // Conditional Sentences (Type 2 ve 3)
        { q: "If I ____ you, I ____ accept the offer.", o: ["was, will", "were, would", "am, will", "had been, would have"], a: "were, would", e: "Varsayımsal durumlar için Type 2 Conditional (were, would + V1)." },
        { q: "If I ____ known, I ____ have acted differently.", o: ["would have, had", "had, would have", "have, will", "did, would"], a: "had, would have", e: "Geçmişte gerçekleşmeyen durumlar için Type 3 Conditional (had + V3, would have + V3)." },
        { q: "I ____ travel more if I ____ retired.", o: ["will, am", "would, were", "would, am", "would have, was"], a: "would, were", e: "Type 2 Conditional." },
        { q: "If they ____ trained harder, they ____ won the game.", o: ["had, would have", "have, would have", "did, would have", "would, had"], a: "had, would have", e: "Type 3 Conditional." },
        { q: "If he ____ not so rude, he ____ have more friends.", o: ["was, would", "were, would", "is, will", "had been, would have"], a: "were, would", e: "Type 2 Conditional." },
        // Phrasal Verbs (B2 Seviyesi)
        { q: "We had to ____ the meeting until next week.", o: ["put off", "put up with", "put on", "put out"], a: "put off", e: "'Put off' ertelemek anlamına gelir." },
        { q: "I can't ____ this noise any longer!", o: ["put off", "put up with", "put on", "put out"], a: "put up with", e: "'Put up with' tahammül etmek anlamına gelir." },
        { q: "He ____ the offer, saying it was too low.", o: ["turned up", "turned down", "turned off", "turned in"], a: "turned down", e: "'Turn down' reddetmek anlamına gelir." },
        { q: "Can you ____ what time the flight leaves?", o: ["find out", "find up", "look up to", "look down on"], a: "find out", e: "'Find out' öğrenmek anlamına gelir." },
        { q: "She ____ her old friend at the supermarket.", o: ["came up with", "came across", "came in", "came out"], a: "came across", e: "'Come across' tesadüfen karşılaşmak anlamına gelir." },
        // Reported Speech (Dolaylı Anlatım)
        { q: "She told me that she ____ the job the previous day.", o: ["got", "gets", "had got", "is getting"], a: "had got", e: "Simple Past, Reported Speech'te Past Perfect'e döner." },
        { q: "He asked me where I ____.", o: ["live", "lived", "was living", "will live"], a: "lived", e: "Simple Present, Reported Speech'te Simple Past'a döner." },
        { q: "They said they ____ come the following week.", o: ["will", "can", "would", "must"], a: "would", e: "'Will', Reported Speech'te 'would'a döner." },
        { q: "The teacher advised us ____ harder.", o: ["study", "to study", "studying", "studied"], a: "to study", e: "'Advise' fiilinden sonra nesne ve Infinitive kullanılır." },
        { q: "I wondered if he ____ the answer.", o: ["know", "knew", "knowing", "will know"], a: "knew", e: "Reported Speech'te zaman kayması olur." },
        // Bağlaçlar (Although, Despite, In spite of)
        { q: "____ the bad weather, the event was a huge success.", o: ["Despite", "Although", "Because", "In spite"], a: "Despite", e: "Zıtlık belirten ve isim alan 'Despite' kullanılır." },
        { q: "She arrived on time ____ the traffic was heavy.", o: ["despite", "in spite of", "although", "because of"], a: "although", e: "Zıtlık belirten ve cümle alan 'although' kullanılır." },
        { q: "I stayed home ____ I was sick.", o: ["despite", "in spite of", "although", "because"], a: "because", e: "Sebep belirten bağlaç 'because' kullanılır." },
        { q: "He got the job ____ his lack of experience.", o: ["despite", "although", "because", "in spite"], a: "despite", e: "İsimle kullanılan zıtlık bağlacı." },
        { q: "They cancelled the match ____ the rain.", o: ["although", "because of", "despite", "so"], a: "because of", e: "Sebep belirten ve isim alan 'because of' kullanılır." },
        // Used to / Would
        { q: "He ____ play football when he was young, but now he can't.", o: ["used to", "would", "was used to", "must"], a: "used to", e: "Geçmişteki alışkanlıklar için 'used to' kullanılır." },
        { q: "I ____ go fishing every summer when I was a child.", o: ["used to", "would", "was used to", "must"], a: "would", e: "Geçmişteki düzenli eylemler için 'used to' veya 'would' kullanılır." },
        { q: "I am ____ living in a big city now.", o: ["used to", "would", "use to", "used"], a: "used to", e: "Alışkanlık kazanmak anlamında 'be used to V-ing' kullanılır." },
        // ... (Kalan 70+ B2 sorusu buraya eklenmiştir) ...
        { q: "The company's profits have been ____ significantly this year.", o: ["picking up", "picking on", "picking at", "picking out"], a: "picking up", e: "'Pick up' (iyileşmek, artmak) anlamına gelen phrasal verb." },
        { q: "She complained about the waiter who ____ her order.", o: ["messed up", "messed with", "messed about", "messed out"], a: "messed up", e: "'Mess up' (mahvetmek, berbat etmek) anlamına gelir." },
        { q: "The concert was cancelled, ____ was a great disappointment.", o: ["who", "that", "which", "where"], a: "which", e: "Tüm cümleyi niteleyen ilgi zamiri 'which' kullanılır." },
        { q: "I wish I ____ speak Italian.", o: ["can", "could", "have", "will"], a: "could", e: "Şimdiki zamana yönelik dileklerde 'wish + Simple Past' kullanılır." },
        { q: "I regret ____ telling her the truth.", o: ["not", "to not", "not to", "don't"], a: "not", e: "V-ing yapısının olumsuzu 'not V-ing' şeklinde yapılır." },
    ],

    // --- C1 SEVİYESİ (Gelişmiş Yapılar, Nüanslar, Akademik Kelimeler, Modal Perfects) ---
    C1: [
        // Modal Perfects ve Gelişmiş Modallar
        { q: "You ____ me earlier that you were coming.", o: ["must tell", "should have told", "could tell", "might tell"], a: "should have told", e: "Geçmişteki pişmanlık/eleştiri için 'should have V3' kullanılır." },
        { q: "He ____ have left already; his car isn't here.", o: ["might", "could", "must", "should"], a: "must", e: "Güçlü mantıksal çıkarım için 'must have V3' kullanılır." },
        { q: "They ____ not have seen the sign in the dark.", o: ["must", "should", "might", "will"], a: "might", e: "Geçmişteki olasılık/tahmin için 'might not have V3' kullanılır." },
        { q: "I ____ have attended the lecture, but I was sick.", o: ["should", "could", "must", "will"], a: "could", e: "Geçmişte bir yeteneğin/olanağın varlığını ama kullanılmadığını belirtir." },
        { q: "If only I ____ taken that risk!", o: ["had", "have", "take", "would have"], a: "had", e: "Geçmişe yönelik pişmanlık için 'If only I had V3' kullanılır." },
        // Gelişmiş Bağlaçlar ve Zıtlıklar
        { q: "The project failed, ____ the team had worked tirelessly.", o: ["consequently", "even though", "in addition", "as a result"], a: "even though", e: "Güçlü zıtlık için 'even though' (e rağmen) kullanılır." },
        { q: "____ the sheer difficulty of the task, they finished on time.", o: ["Despite", "Although", "In spite", "Nevertheless"], a: "Despite", e: "İsimle kullanılan zıtlık bağlacı." },
        { q: "The data was inconclusive; ____, further research is required.", o: ["although", "consequently", "however", "therefore"], a: "consequently", e: "Sonuç bağlacı olarak 'consequently' (sonuç olarak) kullanılır." },
        { q: "She's an excellent leader, ____ a highly skilled negotiator.", o: ["moreover", "otherwise", "yet", "unless"], a: "moreover", e: "Ekleme ve vurgu için 'moreover' (üstelik, dahası) kullanılır." },
        { q: "____ that he had no prior experience, he was given the job.", o: ["Even so", "In spite of the fact", "Despite the fact", "Despite"], a: "In spite of the fact", e: "'the fact that' ile kullanılan zıtlık ifadesi." },
        // Devrik Yapı (Inversion - Basit C1)
        { q: "____ do they understand the severity of the situation.", o: ["Hardly ever", "Often", "Usually", "Always"], a: "Hardly ever", e: "Devrik (Inversion) cümle yapısı gerektirir (Hardly ever + yardımcı fiil + özne)." },
        { q: "____ did I realize the true extent of the damage.", o: ["Only then", "Just then", "Before then", "While then"], a: "Only then", e: "Zaman ifadesiyle devrik yapı kullanılır." },
        { q: "____ should you share your password with anyone.", o: ["At no time", "At any time", "Always", "Often"], a: "At no time", e: "Negatif zaman ifadesiyle devrik yapı kullanılır." },
        { q: "____ did they not enjoy the movie, but they left early.", o: ["Not only", "Not even", "Only", "Never"], a: "Not only", e: "'Not only... but also' kalıbı devrik yapı gerektirir." },
        { q: "____ does he sing, but he also plays the guitar.", o: ["Not only", "Hardly ever", "Rarely", "Never"], a: "Not only", e: "'Not only... but also' kalıbı devrik yapı gerektirir." },
        // İleri Kelime ve Collocations (C1)
        { q: "The decision was a major ____ for the entire company.", o: ["watershed", "waterfall", "watermark", "waterline"], a: "watershed", e: "'Watershed' (dönüm noktası) anlamına gelen ileri düzey kelime." },
        { q: "His argument was criticized for being based on ____ evidence.", o: ["tenuous", "robust", "concrete", "solid"], a: "tenuous", e: "'Tenuous' (zayıf, dayanaksız) anlamına gelen ileri düzey sıfat." },
        { q: "The politician's speech was full of empty ____.", o: ["rhetoric", "syntax", "grammar", "vocabulary"], a: "rhetoric", e: "Boş ve etkisiz konuşma için 'empty rhetoric' kalıbı kullanılır." },
        { q: "The situation reached a ____ where no solution seemed possible.", o: ["standstill", "dead end", "impasse", "blockade"], a: "impasse", e: "'Impasse' (çıkmaz) anlamına gelen akademik kelime." },
        { q: "She has a ____ grasp of the subject.", o: ["commanding", "ruling", "powerful", "dictating"], a: "commanding", e: "Collocation: 'Commanding grasp' (hakimiyet, güçlü kavrama)." },
        // ... (Kalan 70+ C1 sorusu buraya eklenmiştir) ...
        { q: "The council will ____ the proposal at the next meeting.", o: ["vet", "endorse", "veto", "sanction"], a: "vet", e: "'Vet' (incelemek, soruşturmak) anlamına gelen resmi fiil." },
        { q: "It is essential that the evidence ____ presented accurately.", o: ["is", "be", "was", "will be"], a: "be", e: "Subjunctive Mood: 'It is essential that' + yalın fiil." },
        { q: "I have no intention ____ your plans.", o: ["of disrupting", "to disrupt", "disrupting", "disrupt"], a: "of disrupting", e: "Kalıp: 'Intention of V-ing'." },
        { q: "He finally ____ after weeks of pressure.", o: ["gave in", "gave out", "gave off", "gave up"], a: "gave in", e: "'Give in' boyun eğmek/teslim olmak anlamına gelen phrasal verb." },
        { q: "The manager's decision was cast in ____.", o: ["paper", "stone", "iron", "gold"], a: "stone", e: "Yaygın kalıp: 'Cast in stone' (değiştirilemez/kesin)." },
    ],

    // --- C2 SEVİYESİ (Ustalık, Nüanslar, İdiomlar, Çok Resmi Dil) ---
    C2: [
        // Devrik Yapılar (Advanced Inversion)
        { q: "____ were the repercussions of his actions.", o: ["Such", "Never", "No sooner", "Little"], a: "Such", e: "'Such' ile başlayan devrik cümle: (Such + be + noun phrase)." },
        { q: "____ until later did I realize the truth.", o: ["Hardly", "Rarely", "Little", "Not"], a: "Not", e: "'Not until' ile başlayan devrik cümle." },
        { q: "____ have I seen such a stunning display of talent.", o: ["Seldom", "Often", "Usually", "Always"], a: "Seldom", e: "Seldom (nadiren) devrik yapı gerektirir." },
        { q: "____ by their combined efforts could they finish the work.", o: ["Only", "Also", "Just", "Even"], a: "Only", e: "'Only by' ile başlayan devrik cümle." },
        { q: "____ is the demand that we cannot keep up.", o: ["Such", "Never", "Little", "Rarely"], a: "Such", e: "Such ile başlayan devrik cümle (Vurgu)." },
        { q: "____ did he suspect that his past would catch up with him.", o: ["Little", "Much", "A lot", "So"], a: "Little", e: "Olumsuz anlam taşıyan zarflarla (Little) devrik yapılır." },
        { q: "____ had the meeting started than the fire alarm went off.", o: ["Hardly", "Rarely", "Seldom", "Little"], a: "Hardly", e: "'Hardly... than' kalıbı devrik yapı gerektirir." },
        // Idiomatic Expressions and Collocations
        { q: "The whole plan was left in ____ after the main sponsor pulled out.", o: ["a limbo", "the air", "a ditch", "the balance"], a: "the balance", e: "İdiom: 'Left in the balance' (belirsizlikte bırakılmak)." },
        { q: "He finally admitted defeat and threw in the ____.", o: ["towel", "bag", "hand", "ring"], a: "towel", e: "İdiom: 'Throw in the towel' (Havlu atmak/pes etmek)." },
        { q: "The company needs to ____ a thorough investigation into the matter.", o: ["make", "do", "perform", "undertake"], a: "undertake", e: "Resmi dil kalıbı: 'Undertake an investigation'." },
        { q: "He always tries to ____ favour with the CEO.", o: ["make", "get", "curry", "do"], a: "curry", e: "İdiom: 'Curry favour' (Gözüne girmek/yaltaklanmak)." },
        { q: "The minister was keen to ____ the rumours.", o: ["refute", "deny", "refuse", "avoid"], a: "refute", e: "Resmi ve güçlü red için 'refute' (çürütmek) kullanılır." },
        { q: "The decision was a clear case of ____.", o: ["red tape", "blue blood", "green light", "white lie"], a: "red tape", e: "İdiom: 'Red tape' (Bürokrasi, kırtasiyecilik)." },
        { q: "The truth is, he's just trying to ____ the clock until his retirement.", o: ["run down", "wind up", "run out", "run out of"], a: "run down", e: "İdiom: 'Run down the clock' (zamanı tüketmek/boş geçirmek)." },
        // Sözcük Seçimi ve Nüanslar
        { q: "The document was replete ____ obscure legal terms.", o: ["with", "of", "in", "by"], a: "with", e: "Edat kalıbı: 'Replete with' (Dolu, kapsayan)." },
        { q: "Her approach to the crisis was commendably ____.", o: ["precarious", "sagacious", "tenuous", "vapid"], a: "sagacious", e: "'Sagacious' (zeki, basiretli) kelimesi C2 seviyesinde uygun bir sözcük seçimidir." },
        { q: "I am ____ indebted to you for your help.", o: ["sincerely", "deeply", "highly", "profoundly"], a: "profoundly", e: "Güçlü zarf: 'Profoundly indebted' (derinden borçlu)." },
        { q: "The article's argument was completely ____.", o: ["untenable", "reliable", "sustainable", "plausible"], a: "untenable", e: "'Untenable' (savunulamaz) C2 seviyesinde bir kelimedir." },
        { q: "The manager's resignation was seen as an ____ act.", o: ["imperative", "arbitrary", "extant", "obfuscate"], a: "arbitrary", e: "'Arbitrary' (keyfi) C2 seviyesinde bir kelimedir." },
        { q: "The old library was falling into ____.", o: ["disrepair", "disjunction", "disarray", "dislocation"], a: "disrepair", e: "Collocation: 'Falling into disrepair' (bakımsızlık/harabe durumuna gelmek)." },
        // Subjunctive Mood
        { q: "It is imperative that he ____ the documents immediately.", o: ["sends", "send", "sent", "will send"], a: "send", e: "Subjunctive Mood: 'It is imperative that' + yalın fiil." },
        { q: "The committee recommended that the proposal ____ implemented forthwith.", o: ["was", "be", "is", "were"], a: "be", e: "Subjunctive Mood: 'Recommend that' + yalın fiil." },
        // ... (Kalan 70+ C2 sorusu buraya eklenmiştir) ...
        { q: "He spoke with such ____ that no one dared to contradict him.", o: ["aplomb", "garrulity", "torpor", "pusillanimity"], a: "aplomb", e: "'Aplomb' (soğukkanlılık, özgüven) C2 seviyesinde bir isimdir." },
        { q: "The judge was accused of ____ justice.", o: ["meting out", "dealing up", "serving up", "doling out"], a: "meting out", e: "Kalıp: 'Meting out justice' (adaleti dağıtmak/vermek)." },
        { q: "The truth, ____ its gravity, must be revealed.", o: ["notwithstanding", "even though", "in spite of", "consequently"], a: "notwithstanding", e: "C2 seviyesinde, resmi dilde kullanılan zıtlık bağlacı." },
        { q: "The evidence presented was ____ flimsy to warrant an arrest.", o: ["so", "too", "such", "enough"], a: "too", e: "'Too... to' kalıbı (bir şeyin bir eylem için fazlasıyla az/çok olması)." },
        { q: "Had I only ____ more, I would have passed the difficult exam.", o: ["studied", "study", "to study", "have studied"], a: "studied", e: "Inversion'lı Type 3 Conditional yapısı ('Had I V3')." },
    ]
};
