/****************************************************************************
 * 🧠 Smart Assistant V14 - المساعد الذكي المحسن
 * ════════════════════════════════════════════════════════════════════════════
 * ✅ جميع ميزات V13 + 
 * ✅ محرك الربط الذكي (DataLinkingEngine)
 * ✅ ذاكرة محادثة عميقة (20 رسالة)
 * ✅ استفسار عند الغموض وتأكيد المستخدم
 * ✅ عرض بدائل متشابهة للاختيار
 * ✅ معالجة أسئلة مركبة ومتتابعة
 * ✅ تتبع سياق المحادثة بالكامل
 * ✅ دعم اللهجة المصرية والعامية
 * ✅ نظام تعلم تلقائي من المحادثات
 * ✅ إحصائيات أداء متقدمة
 ****************************************************************************/

class IntelligentSmartAssistantV14 {
    constructor() {
        // 1. الذاكرة
        this.memory = {
            conversation: [],
            context: {
                currentEntity: null,
                currentType: null,
                currentData: null,
                currentAlternatives: [],
                conversationStack: [],
                timestamp: null,
                lastQuery: null,
                lastResponse: null,
                linkingContext: new Map(),
                vocab: null // سيتم ملؤه لاحقاً
            },
            preferences: {
                languageLevel: 'formal',
                detailLevel: 'detailed',
                confirmationMode: 'auto',
                useSmartLinking: true
            }
        };
        
        // 2. القواعد النصية
        this.db = { activities: null, industrial: null, decision104: null };
        this.dataLinker = null;
        this.linkingEnabled = true;
        
        // 3. الإحصائيات ونظام التعلم
        this.stats = { total: 0, successful: 0, linking: { totalAttempts: 0, successfulLinks: 0 } };
        this.confirmationSettings = { similarityThreshold: 0.1, maxAlternatives: 3, minLinkingConfidence: 0.4 };
        this.learning = { queryPatterns: new Map(), successfulLinks: new Map() };
        
        this.init();
    } // 👈 نهاية الـ constructor (تأكد من وجود هذا القوس)

    // ==================== الدوال الأساسية ====================

    async init() {
        console.log('🚀 Smart Assistant V14 - البدء...');
        this.loadTextDatabases();
        
        // تفعيل المعجم فوراً بعد تحميل البيانات
        this.buildGeniusVocab();
        
        this.restoreConversation();
        await this.initializeDataLinker();
        
        if (window.vEngine) window.vEngine.init();
        console.log('✅ المساعد V14 جاهز والمعجم مفعّل');
    }

    buildGeniusVocab() {
        console.log("🏗️ بناء المعجم الديناميكي...");
        this.vocab = { allNames: new Set(), map: new Map() };

        if (this.db.industrial) {
            this.db.industrial.forEach(area => {
                if (area.name) this.vocab.allNames.add(area.name.toLowerCase().trim());
                if (area.governorate) this.vocab.allNames.add(area.governorate.toLowerCase().trim());
            });
        }

        if (this.db.activities) {
            this.db.activities.forEach(act => {
                if (act.text) this.vocab.allNames.add(act.text.toLowerCase().trim());
                if (act.keywords) act.keywords.forEach(k => this.vocab.allNames.add(k.toLowerCase().trim()));
            });
        }
    }
        // ... باقي الكود كما هو (من السطر 90 فصاعداً)

    // ==================== التهيئة المحسنة ====================
    async init() {
    console.log('🚀 Smart Assistant V14 - التهيئة المتقدمة...');
    
    // تحميل القواعد النصية الجديدة
    this.loadTextDatabases();
    
    // انتظار تحميل جميع قواعد البيانات
    await this.waitForDatabases();
    
    // تهيئة ذاكرة المحادثة
    this.restoreConversation();
    
    // تهيئة محرك الربط الذكي (إذا كان متاحاً)
    await this.initializeDataLinker();
    
    // تهيئة نظام التعلم
    this.initializeLearningSystem();
    
    // انتظار تهيئة محرك المتجهات
    if (window.vEngine) {
        await window.vEngine.init();
        
        // مشاركة محرك الربط مع vEngine إذا كان مهيأ
        if (this.dataLinker && window.vEngine.setDataLinker) {
            window.vEngine.setDataLinker(this.dataLinker);
        }
    }
    
    console.log('✅ المساعد V14 جاهز للعمل');
    if (this.dataLinker) {
        console.log('🔗 محرك الربط الذكي نشط');
    }
}

// إضافة دالة جديدة للانتظار
async waitForDatabases() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (this.db.activities && this.db.industrial && this.db.decision104) {
                console.log("📚 تم تحميل قواعد البيانات النصية بنجاح");
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
}

// إضافة دالة لمشاركة محرك الربط
setDataLinker(linker) {
    this.dataLinker = linker;
    this.linkingEnabled = true;
    console.log('🔗 تم مشاركة محرك الربط مع V14');
}
    
    // ==================== تهيئة محرك الربط الذكي ====================
    async initializeDataLinker() {
        if (typeof DataLinkingEngine === 'undefined') {
            console.warn('⚠️ DataLinkingEngine غير متوفر - سيتم استخدام النظام التقليدي');
            this.linkingEnabled = false;
            return;
        }
        
        try {
            console.log('🔗 جاري تهيئة محرك الربط الذكي...');
            this.dataLinker = new DataLinkingEngine();
            
            // تهيئة المحرك مع البيانات الكاملة
            await this.dataLinker.initialize({
                activities: this.db.activities,
                industrial: this.db.industrial,
                decision104: this.db.decision104
            });
            
            console.log('✅ محرك الربط الذكي جاهز');
            
            // عرض تقرير الأداء الأولي
            const report = this.dataLinker.getPerformanceReport();
            console.log('📊 أداء المحرك:', report);
            
        } catch (error) {
            console.error('❌ فشل تهيئة محرك الربط:', error);
            this.linkingEnabled = false;
            this.dataLinker = null;
        }
    }
    
    // ==================== نظام التعلم المحسن ====================
    initializeLearningSystem() {
        try {
            const saved = localStorage.getItem('smart_assistant_learning_v14');
            if (saved) {
                const data = JSON.parse(saved);
                this.learning.queryPatterns = new Map(data.queryPatterns || []);
                this.learning.successfulLinks = new Map(data.successfulLinks || []);
                console.log(`🎓 تم استرجاع ${this.learning.queryPatterns.size} نمط تعلم`);
            }
        } catch (e) {
            console.warn('⚠️ فشل استرجاع نظام التعلم:', e);
        }
    }
    
    saveLearningSystem() {
        try {
            const data = {
                queryPatterns: Array.from(this.learning.queryPatterns.entries()),
                successfulLinks: Array.from(this.learning.successfulLinks.entries()),
                timestamp: Date.now()
            };
            localStorage.setItem('smart_assistant_learning_v14', JSON.stringify(data));
        } catch (e) {
            console.warn('⚠️ فشل حفظ نظام التعلم:', e);
        }
    }
    
    // ==================== 🎯 الوظيفة الرئيسية المحسنة ====================
    async query(userInput) {
        this.stats.total++;
        const originalQuery = userInput.trim();
        
        console.log(`\n${'═'.repeat(70)}`);
        console.log(`💬 V14 Query: "${originalQuery}"`);
        console.log(`${'═'.repeat(70)}\n`);
        
        // 🔥 الخطوة 1: تحليل الاستعلام مع السياق المحسن
        const queryAnalysis = this.enhancedAnalyzeWithContext(originalQuery);
        
        // 🔥 الخطوة 2: تطبيق التعلم السابق (إن وجد)
        const learnedPattern = this.applyLearnedPatterns(queryAnalysis);
        if (learnedPattern && learnedPattern.confidence > 0.8) {
            console.log(`🎓 تطبيق نمط متعلم: ${learnedPattern.pattern}`);
        }
        
        // 🔥 الخطوة 3: التحقق من الحاجة للاستفسار
        if (this.needsClarification(queryAnalysis)) {
            return this.askForClarification(queryAnalysis);
        }
        
        // 🔥 الخطوة 4: البحث المتقدم مع تتبع الأداء
        let searchResults;
        const searchStartTime = Date.now();
        
        if (window.vEngine && window.vEngine.isReady) {
            searchResults = await window.vEngine.intelligentSearch(originalQuery, {
                contextType: queryAnalysis.detectedType,
                requireConfirmation: queryAnalysis.isAmbiguous
            });
        } else {
            searchResults = await this.localSearch(originalQuery);
        }
        
        const searchDuration = Date.now() - searchStartTime;
        console.log(`⏱️ مدة البحث: ${searchDuration}ms`);
        
        // 🔥 الخطوة 5: معالجة الغموض وعرض البدائل
        if (searchResults.ambiguous || this.hasSimilarAlternatives(searchResults)) {
            return this.handleAmbiguousResults(originalQuery, searchResults, queryAnalysis);
        }
        
        // 🔥 الخطوة 6: التصنيف الذكي والمعالجة
        const category = this.intelligentClassification(originalQuery, searchResults, queryAnalysis);
        
        // 🔥 الخطوة 7: المعالجة حسب التصنيف مع الربط الذكي
        let response = await this.processByCategory(category, originalQuery, searchResults, queryAnalysis);
        
        // 🔥 الخطوة 8: تحديث الذاكرة والسياق مع التعلم
        this.updateEnhancedMemory(originalQuery, response, queryAnalysis, searchResults);
        
        // 🔥 الخطوة 9: تحديث إحصائيات الربط
        this.updateLinkingStats(response);
        
        return response;
    }
    
    // ==================== تحليل الاستعلام المعزز ====================
    enhancedAnalyzeWithContext(query) {
        const analysis = this.analyzeWithContext(query);
        
        // إضافة تحليل إضافي للربط
        analysis.linkingContext = {
            hasPreviousLinks: this.memory.context.linkingContext.size > 0,
            relatedEntities: this.extractRelatedEntities(query),
            linkingPotential: this.assessLinkingPotential(query)
        };
        
        return analysis;
    }
    
    // ==================== نظام الربط الذكي المحسن ====================
    async enhancedFindActivityData(id, metadata) {
        if (!this.db.activities) return null;
        // 🛡️ فحص أمان إضافي
        if (!(this.memory.context.linkingContext instanceof Map)) {
            console.warn("🔄 إعادة تهيئة linkingContext كـ Map");
            this.memory.context.linkingContext = new Map();
        }
        
        // التحقق من الذاكرة المؤقتة أولاً
        const cacheKey = `activity_${id}_${metadata?.text_preview?.substring(0, 20) || ''}`;
        if (this.memory.context.linkingContext.has(cacheKey)) {
            const cached = this.memory.context.linkingContext.get(cacheKey);
            if (Date.now() - cached.timestamp < 300000) { // 5 دقائق
                console.log(`♻️ استخدام ذاكرة التخزين المؤقت للنشاط`);
                return cached.data;
            }
        }
        
        let foundData = null;
        let linkingMethod = 'traditional';
        let confidence = 0;
        
        // المحاولة 1: استخدام محرك الربط الذكي إذا كان مفعلاً
        if (this.linkingEnabled && this.dataLinker && metadata?.text_preview) {
            this.stats.linking.totalAttempts++;
            
            const vectorResult = {
                id: id,
                metadata: metadata,
                text_preview: metadata.text_preview,
                db_type: 'activity'
            };
            
            try {
                const linkingStartTime = Date.now();
                const linkedResult = await this.dataLinker.link(
                    vectorResult,
                    'activity',
                    {
                        conversationHistory: this.getConversationContext(),
                        currentContext: this.memory.context,
                        queryAnalysis: this.memory.context.lastQueryAnalysis
                    }
                );
                
                const linkingDuration = Date.now() - linkingStartTime;
                console.log(`🔗 ربط نشاط: ${linkedResult.confidence.toFixed(3)} ثقة [${linkedResult.strategy}] (${linkingDuration}ms)`);
                
                // تسجيل الاستراتيجية المستخدمة
                this.stats.linking.strategiesUsed.set(
                    linkedResult.strategy,
                    (this.stats.linking.strategiesUsed.get(linkedResult.strategy) || 0) + 1
                );
                
                if (linkedResult.data && linkedResult.confidence > this.confirmationSettings.minLinkingConfidence) {
                    foundData = linkedResult.data;
                    linkingMethod = linkedResult.strategy;
                    confidence = linkedResult.confidence;
                    
                    // تحديث إحصائيات النجاح
                    this.stats.linking.successfulLinks++;
                    this.stats.linking.averageConfidence = 
                        (this.stats.linking.averageConfidence * (this.stats.linking.totalAttempts - 1) + confidence) / 
                        this.stats.linking.totalAttempts;
                    
                    // تعليم النظام من هذا النجاح
                    this.learnFromSuccessfulLink(vectorResult, foundData, confidence);
                    
                    // التخزين في الذاكرة المؤقتة
                    this.memory.context.linkingContext.set(cacheKey, {
                        data: foundData,
                        timestamp: Date.now(),
                        confidence: confidence,
                        method: linkingMethod
                    });
                }
                
            } catch (error) {
                console.warn('⚠️ فشل الربط الذكي:', error);
            }
        }
        
        // المحاولة 2: النظام التقليدي (إذا فشل الربط الذكي أو غير مفعّل)
        if (!foundData) {
            foundData = this.traditionalFindActivityData(id, metadata);
            if (foundData) {
                confidence = 0.5; // ثقة متوسطة للنظام التقليدي
            }
        }
        
        // إضافة معلومات الربط إلى البيانات
        if (foundData) {
            foundData._linkingInfo = {
                method: linkingMethod,
                confidence: confidence,
                timestamp: Date.now(),
                vectorId: id
            };
        }
        
        return foundData;
    }
    
    traditionalFindActivityData(id, metadata) {
        let found = this.db.activities.find(a => a.value == id);
        
        if (!found && metadata?.original_data?.id) {
            found = this.db.activities.find(a => a.value == metadata.original_data.id);
        }
        
        if (!found && metadata?.text_preview) {
            const searchText = metadata.text_preview.split(' ').slice(0, 3).join(' ');
            
            // بحث ذكي مع أوزان
            const candidates = this.db.activities
                .map(activity => {
                    const activityText = activity.text || '';
                    let score = 0;
                    
                    // حساب درجة المطابقة
                    if (activityText.includes(searchText)) score += 3;
                    if (metadata.text_preview.includes(activityText.substring(0, 20))) score += 2;
                    
                    // المطابقة الجزئية
                    const searchWords = searchText.split(' ');
                    searchWords.forEach(word => {
                        if (activityText.includes(word)) score += 1;
                    });
                    
                    return { activity, score };
                })
                .filter(item => item.score > 0)
                .sort((a, b) => b.score - a.score);
            
            if (candidates.length > 0) {
                found = candidates[0].activity;
            }
        }
        
        return found;
    }

  traditionalFindAreaData(id, metadata) {
    if (!this.db.industrial) return null;
    
    let found = this.db.industrial.find(a => a.value == id);
    
    if (!found && metadata?.original_data?.id) {
        found = this.db.industrial.find(a => a.value == metadata.original_data.id);
    }
    
    if (!found && metadata?.text_preview) {
        const searchText = metadata.text_preview.split(' ').slice(0, 3).join(' ');
        
        const candidates = this.db.industrial
            .map(area => {
                const areaText = area.name || '';
                let score = 0;
                
                if (areaText.includes(searchText)) score += 3;
                if (metadata.text_preview.includes(areaText.substring(0, 20))) score += 2;
                
                const searchWords = searchText.split(' ');
                searchWords.forEach(word => {
                    if (areaText.includes(word)) score += 1;
                });
                
                return { area, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);
        
        if (candidates.length > 0) {
            found = candidates[0].area;
        }
    }
    
    return found;
}
    
    // ==================== نظام التعلم من الربط ====================
    learnFromSuccessfulLink(vectorResult, fullData, confidence) {
        const fingerprint = this.createFingerprint(vectorResult.text_preview);
        const fullText = this.extractMainText(fullData);
        
        if (!this.learning.successfulLinks.has(fingerprint)) {
            this.learning.successfulLinks.set(fingerprint, {
                vectorText: vectorResult.text_preview,
                fullText: fullText,
                successCount: 1,
                confidenceSum: confidence,
                lastUsed: Date.now(),
                firstLearned: Date.now()
            });
        } else {
            const existing = this.learning.successfulLinks.get(fingerprint);
            existing.successCount++;
            existing.confidenceSum += confidence;
            existing.lastUsed = Date.now();
        }
        
        // حفظ التعلم كل 10 مرات
        if (this.learning.successfulLinks.size % 10 === 0) {
            this.saveLearningSystem();
        }
    }
    
    createFingerprint(text) {
        // إنشاء بصمة فريدة للنص
        return text
            .toLowerCase()
            .replace(/[^أ-ي0-9\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3)
            .sort()
            .join('_');
    }
    
    extractMainText(data) {
        if (!data) return '';
        if (typeof data === 'string') return data.substring(0, 100);
        if (data.text) return data.text;
        if (data.name) return data.name;
        return JSON.stringify(data).substring(0, 100);
    }
    
    // ==================== تحديث الذاكرة المحسنة ====================
    updateEnhancedMemory(query, response, analysis, searchResults) {
        const memoryEntry = {
            query: query,
            response: response.text,
            type: response.type,
            confidence: response.confidence,
            analysis: analysis,
            timestamp: Date.now(),
            context: {
                entity: this.memory.context.currentEntity,
                type: this.memory.context.currentType,
                data: this.memory.context.currentData,
                linkingInfo: response._linkingInfo
            },
            searchResults: {
                activityCount: searchResults.activities?.length || 0,
                industrialCount: searchResults.industrial?.length || 0,
                decisionCount: searchResults.decision104?.length || 0
            }
        };
        
        this.memory.conversation.push(memoryEntry);
        
        // الاحتفاظ بآخر 20 رسالة
        if (this.memory.conversation.length > 20) {
            this.memory.conversation.shift();
        }
        
        // تحديث سياق الربط
        if (response._linkingInfo) {
            const linkKey = `link_${Date.now()}`;
            this.memory.context.linkingContext.set(linkKey, {
                query: query,
                result: response._linkingInfo,
                timestamp: Date.now()
            });
        }
        
        // تحديث السياق العام
        this.memory.context.lastQuery = query;
        this.memory.context.lastResponse = response;
        this.memory.context.timestamp = Date.now();
        this.memory.context.lastQueryAnalysis = analysis;
        
        // تحديث الإحصائيات
        if (response.confidence > 0.6) {
            this.stats.successful++;
        }
        
        // حفظ المحادثة
        this.saveConversation();
        
        // تحديث إحصائيات الربط
        console.log(`📊 إحصائيات الربط: ${this.stats.linking.successfulLinks}/${this.stats.linking.totalAttempts} نجاح`);
    }
    
    // ==================== دوال مساعدة محسنة ====================
    getConversationContext() {
        // استخراج السياق من آخر 5 رسائل
        return this.memory.conversation
            .slice(-5)
            .map(entry => entry.query + ' ' + entry.response)
            .join(' ');
    }
    
    updateLinkingStats(response) {
        if (response._linkingInfo) {
            this.stats.linking.cacheHits++;
        }
    }
    
    // ==================== تحسينات على الدوال الحالية ====================
    
    // تحسين handleActivityQuery لاستخدام النظام الجديد
    async handleActivityQuery(query, results, analysis) {
        const activityResults = results.activities || [];
        
        if (activityResults.length === 0) {
            return this.createResponse(
                'لم أجد نشاطاً مطابقاً.\n\n💡 جرب:\n• "تراخيص فندق 5 نجوم"\n• "متطلبات مصنع أدوية"\n• "إجراءات فتح مطعم"',
                'no_results',
                0.2
            );
        }
        
        const best = activityResults[0];
        
        // استخدام النظام المحسن للبحث عن البيانات
        const activityData = await this.enhancedFindActivityData(best.id, best.metadata);
        
        if (!activityData) {
            return this.createResponse(
                `وجدت "${best.metadata?.text_preview || 'النشاط'}" لكن التفاصيل غير متوفرة`,
                'partial',
                best.score
            );
        }
        
        // حفظ في السياق
        this.memory.context.currentEntity = activityData.text;
        this.memory.context.currentType = 'activity';
        this.memory.context.currentData = activityData;
        
        // تحديد المعلومات المطلوبة
        const specificInfo = this.extractSpecificRequest(query);
        
        if (specificInfo) {
            return this.provideSpecificActivityInfo(activityData, specificInfo, best.score);
        }
        
        // معلومات شاملة
        return this.provideComprehensiveActivityInfo(activityData, query, best.score, analysis);
    }
    
    // تحسين findAreaData
    async enhancedFindAreaData(id, metadata) {
        if (!this.db.industrial) return null;
        
        // تطبيق نفس منطق الربط الذكي للمناطق
        if (this.linkingEnabled && this.dataLinker && metadata?.text_preview) {
            const vectorResult = {
                id: id,
                metadata: metadata,
                text_preview: metadata.text_preview,
                db_type: 'industrial'
            };
            
            try {
                const linkedResult = await this.dataLinker.link(
                    vectorResult,
                    'industrial',
                    {
                        conversationHistory: this.getConversationContext(),
                        currentContext: this.memory.context
                    }
                );
                
                if (linkedResult.data && linkedResult.confidence > 0.4) {
                    // تعليم النظام
                    this.learnFromSuccessfulLink(vectorResult, linkedResult.data, linkedResult.confidence);
                    
                    return linkedResult.data;
                }
            } catch (error) {
                console.warn('⚠️ فشل ربط المنطقة:', error);
            }
        }
        
        // النظام التقليدي
        return this.traditionalFindAreaData(id, metadata);
    }
    
    // ==================== دوال التوافق مع V13 ====================
    loadTextDatabases() {
        // نفس الدالة في V13
        if (typeof masterActivityDB !== 'undefined') {
            this.db.activities = masterActivityDB;
            console.log(`✅ الأنشطة: ${masterActivityDB.length} نشاط`);
        }
        
        if (typeof industrialDB !== 'undefined') {
            this.db.industrial = industrialDB;
            console.log(`✅ المناطق: ${industrialDB.length} منطقة`);
        }
        
        if (typeof decision104DB !== 'undefined') {
            this.db.decision104 = decision104DB;
            console.log(`✅ القرار 104: قاعدة بيانات شاملة`);
        }
    }
    
    restoreConversation() {
        try {
            const savedConv = localStorage.getItem('smart_assistant_conversation_v14');
            const savedContext = localStorage.getItem('smart_assistant_context_v14');
            
            if (savedConv) {
                this.memory.conversation = JSON.parse(savedConv);
            }
            
            if (savedContext) {
                const parsedContext = JSON.parse(savedContext);
                // 🔥 الحل العلمي: إعادة تحويل البيانات إلى Map
                if (parsedContext.linkingContext) {
                    // إذا كانت البيانات مخزنة كمصفوفة إدخالات، نحولها لـ Map
                    const entries = Array.isArray(parsedContext.linkingContext) ? 
                                    parsedContext.linkingContext : 
                                    Object.entries(parsedContext.linkingContext);
                    parsedContext.linkingContext = new Map(entries);
                } else {
                    parsedContext.linkingContext = new Map();
                }
                this.memory.context = { ...this.memory.context, ...parsedContext };
            }
            console.log(`📚 تم استرجاع ${this.memory.conversation.length} رسالة وسياق الربط الذكي`);
        } catch (e) {
            console.warn('⚠️ فشل استرجاع المحادثة:', e);
            this.memory.context.linkingContext = new Map(); // تأمين الذاكرة في حالة الفشل
        }
    }
    
    saveConversation() {
        try {
            const contextToSave = { ...this.memory.context };
            // 🔥 تحويل الـ Map لمصفوفة ليتمكن JSON من قراءتها
            contextToSave.linkingContext = Array.from(this.memory.context.linkingContext.entries());
            
            localStorage.setItem('smart_assistant_conversation_v14', JSON.stringify(this.memory.conversation));
            localStorage.setItem('smart_assistant_context_v14', JSON.stringify(contextToSave));
        } catch (e) {
            console.warn('⚠️ فشل حفظ المحادثة:', e);
        }
    }
    
    // ==================== دوال جديدة للمراقبة ====================
    getLinkingPerformance() {
        if (!this.dataLinker) {
            return { status: 'محرك الربط غير نشط' };
        }
        
        const engineReport = this.dataLinker.getPerformanceReport();
        const successRate = this.stats.linking.totalAttempts > 0 
            ? (this.stats.linking.successfulLinks / this.stats.linking.totalAttempts * 100).toFixed(1)
            : 0;
        
        return {
            engine: engineReport,
            assistant: {
                totalAttempts: this.stats.linking.totalAttempts,
                successfulLinks: this.stats.linking.successfulLinks,
                successRate: `${successRate}%`,
                averageConfidence: this.stats.linking.averageConfidence.toFixed(3),
                cacheHits: this.stats.linking.cacheHits,
                strategies: Object.fromEntries(this.stats.linking.strategiesUsed)
            },
            learning: {
                patternsLearned: this.learning.queryPatterns.size,
                successfulLinks: this.learning.successfulLinks.size,
                userCorrections: this.learning.userCorrections.size
            }
        };
    }
    
    // ==================== دوال التعلم التلقائي ====================
    applyLearnedPatterns(analysis) {
        const queryKey = analysis.original.toLowerCase();
        
        // البحث عن أنماط متشابهة
        for (const [pattern, data] of this.learning.queryPatterns.entries()) {
            if (queryKey.includes(pattern) || pattern.includes(queryKey)) {
                return {
                    pattern: pattern,
                    confidence: data.confidence,
                    suggestedResponse: data.response
                };
            }
        }
        
        return null;
    }
    
    // ==================== جميع دوال V13 الأصلية محفوظة ====================
    
    // ════════════════════════════════════════════════════════════════════════
    // جميع الدوال التالية نسخت طبق الأصل من V13 مع تعديلات طفيفة للتوافق
    // ════════════════════════════════════════════════════════════════════════
    
    analyzeWithContext(query) {
        // نفس الدالة في V13
        const text = query.toLowerCase();
        const lastContext = this.memory.context;
        
        return {
            original: query,
            text: text,
            words: text.split(/\s+/),
            wordCount: text.split(/\s+/).length,
            
            hasContext: lastContext.currentEntity !== null,
            contextEntity: lastContext.currentEntity,
            contextType: lastContext.currentType,
            lastQuery: lastContext.lastQuery,
            
            intent: this.detectIntentWithContext(text, lastContext),
            detectedType: this.detectQueryType(text),
            complexity: this.assessQueryComplexity(text),
            isFollowUp: this.isFollowUpQuestion(text, lastContext),
            hasAmbiguousTerms: this.hasAmbiguousTerms(text),
            language: this.analyzeLanguage(text),
            timestamp: Date.now()
        };
    }
    
    detectIntentWithContext(text, context) {
        // نفس الدالة في V13
        if (context.currentEntity && this.isFollowUpQuestion(text, context)) {
            if (/مساحة|حجم|كبير|صغير/.test(text)) return 'area_size';
            if (/موقع|أين|عنوان/.test(text)) return 'location';
            if (/ترخيص|رخصة|إجازة/.test(text)) return 'licensing';
            if (/معلومات|تفاصيل|شرح/.test(text)) return 'more_details';
            if (/سعر|تكلفة|بكام/.test(text)) return 'cost';
            return 'follow_up';
        }
        
        if (/كام|كم|عدد/.test(text)) return 'count';
        if (/ما هو|ما هي|تعريف/.test(text)) return 'definition';
        if (/أين|مكان|موقع/.test(text)) return 'location';
        if (/كيف|طريقة|خطوات/.test(text)) return 'procedure';
        if (/هل|؟|\?/.test(text)) return 'yes_no';
        if (/أريد|أبحث عن|عايز/.test(text)) return 'search';
        
        return 'general';
    }
    
    detectQueryType(text) {
        // نفس الدالة في V13
        if (/قرار\s*104|104 لسنة|حافز استثماري|القطاع\s*أ|القطاع\s*ب/.test(text)) {
            return 'decision104';
        }
        
        if (/منطقة|صناعية|مدينة|العاشر|السادات|برج العرب|زهراء|بدر|العبور/.test(text)) {
            return 'industrial';
        }
        
        if (/فندق|مصنع|مخبز|ورشة|مطعم|صيدلية|عيادة|مستشفى/.test(text)) {
            return 'activity';
        }
        
        if (/كام منطقة|كم منطقة|عدد المناطق/.test(text)) {
            return 'count';
        }
        
        if (/جهات الولاية|الجهة المختصة/.test(text)) {
            return 'dependencies';
        }
        
        return 'general';
    }
    
    assessQueryComplexity(text) {
        // نفس الدالة في V13
        const wordCount = text.split(/\s+/).length;
        const hasAnd = text.includes('و') || text.includes('وأيضاً') || text.includes('بالإضافة');
        const hasMultipleEntities = this.countEntities(text) > 1;
        
        if (wordCount <= 3) return 'simple';
        if (wordCount <= 6 && !hasAnd) return 'medium';
        if (hasMultipleEntities || hasAnd) return 'complex';
        if (this.hasAmbiguousTerms(text)) return 'ambiguous';
        
        return 'medium';
    }
    
    isFollowUpQuestion(text, context) {
        // نفس الدالة في V13
        if (!context.currentEntity) return false;
        
        const followUpIndicators = [
            'ماذا عن', 'و', 'أيضاً', 'كمان',
            'بخصوص', 'حول', 'عن', 'فيما يخص',
            'المساحة', 'الموقع', 'التراخيص', 'التكلفة'
        ];
        
        return followUpIndicators.some(indicator => 
            text.includes(indicator) || 
            (text.length < 10 && !this.hasNewEntity(text))
        );
    }
    
    hasAmbiguousTerms(text) {
        // نفس الدالة في V13
        const ambiguousTerms = [
            'هو', 'هي', 'ذلك', 'هذا', 'هذه', 'هؤلاء',
            'المكان', 'النشاط', 'المنطقة', 'الشيء', 'الموضوع',
            'في', 'على', 'من'
        ];
        
        const words = text.split(/\s+/);
        const ambiguousCount = words.filter(word => 
            ambiguousTerms.includes(word)
        ).length;
        
        return ambiguousCount > 0 && (ambiguousCount / words.length) > 0.3;
    }
    
    analyzeLanguage(text) {
        // نفس الدالة في V13
        const egyptianTerms = ['كام', 'عايز', 'عاوز', 'ايوه', 'لأ', 'مش', 'يعني ايه'];
        const formalTerms = ['يرجى', 'الرجاء', 'ممكن', 'هل', 'ما هو'];
        
        const egyptianCount = egyptianTerms.filter(term => text.includes(term)).length;
        const formalCount = formalTerms.filter(term => text.includes(term)).length;
        
        if (egyptianCount > formalCount) return 'egyptian';
        if (formalCount > egyptianCount) return 'formal';
        return 'mixed';
    }
    
    countEntities(text) {
        // نفس الدالة في V13
        let count = 0;
        
        const governorates = ['القاهرة', 'الإسكندرية', 'الجيزة', 'الشرقية', 'الدقهلية'];
        count += governorates.filter(gov => text.includes(gov)).length;
        
        const areas = ['العاشر', 'السادات', 'برج العرب', 'زهراء', 'بدر'];
        count += areas.filter(area => text.includes(area)).length;
        
        const activities = ['فندق', 'مصنع', 'مخبز', 'ورشة', 'مطعم'];
        count += activities.filter(activity => text.includes(activity)).length;
        
        return count;
    }
    
    hasNewEntity(text) {
        // نفس الدالة في V13
        const currentEntity = this.memory.context.currentEntity;
        if (!currentEntity) return true;
        
        const entities = this.extractEntities(text);
        return entities.some(entity => 
            entity.text !== currentEntity && 
            !currentEntity.includes(entity.text)
        );
    }
    
    extractEntities(text) {
        // نفس الدالة في V13
        const entities = [];
        const t = text.toLowerCase();
        
        const governorates = ['القاهرة', 'الإسكندرية', 'الجيزة', 'الشرقية', 'الدقهلية'];
        governorates.forEach(gov => {
            if (t.includes(gov.toLowerCase())) {
                entities.push({ type: 'governorate', text: gov });
            }
        });
        
        const areas = ['العاشر', 'السادات', 'برج العرب', 'زهراء', 'بدر', 'العبور', '6 أكتوبر'];
        areas.forEach(area => {
            if (t.includes(area.toLowerCase())) {
                entities.push({ type: 'area', text: area });
            }
        });
        
        const activities = ['فندق', 'مصنع', 'مخبز', 'ورشة', 'مطعم', 'صيدلية', 'عيادة'];
        activities.forEach(activity => {
            if (t.includes(activity.toLowerCase())) {
                entities.push({ type: 'activity', text: activity });
            }
        });
        
        return entities;
    }

    
    // ==================== دوال الربط الذكي الجديدة ====================
    
    extractRelatedEntities(query) {
        // استخراج الكيانات ذات الصلة من الاستعلام للربط الذكي
        const entities = this.extractEntities(query);
        const related = [];
        
        // إضافة كيانات إضافية للربط
        const text = query.toLowerCase();
        
        // إضافة كيانات القرار 104
        if (text.includes('104') || text.includes('قرار')) {
            related.push({ type: 'decision', text: 'قرار 104', weight: 1.5 });
        }
        
        // إضافة كيانات المناطق
        const areaTerms = ['منطقة', 'صناعية', 'مدينة', 'العاشر', 'السادات', 'برج العرب'];
        areaTerms.forEach(term => {
            if (text.includes(term)) {
                related.push({ type: 'area', text: term, weight: 1.3 });
            }
        });
        
        // إضافة كيانات الأنشطة
        const activityTerms = ['فندق', 'مصنع', 'مخبز', 'ورشة', 'مطعم'];
        activityTerms.forEach(term => {
            if (text.includes(term)) {
                related.push({ type: 'activity', text: term, weight: 1.4 });
            }
        });
        
        return [...entities, ...related];
    }
    
    assessLinkingPotential(query) {
        // تقييم إمكانية الربط للاستعلام
        const text = query.toLowerCase();
        let potential = 0;
        
        // إذا كان الاستعلام يحتوي على مصطلحات متعددة، فهناك إمكانية ربط أعلى
        const terms = text.split(/\s+/).length;
        if (terms >= 3) potential += 0.3;
        
        // إذا كان الاستعلام يحتوي على أرقام (مثل 104)
        if (/\d+/.test(text)) potential += 0.2;
        
        // إذا كان الاستعلام يحتوي على كلمات ربط
        const linkingWords = ['و', 'أو', 'بعد', 'قبل', 'مع', 'في'];
        linkingWords.forEach(word => {
            if (text.includes(word)) potential += 0.1;
        });
        
        // إذا كان الاستعلام يحتوي على مصطلحات متعددة من قواعد بيانات مختلفة
        const dbTerms = {
            decision: ['104', 'قرار', 'حافز'],
            area: ['منطقة', 'صناعية', 'مدينة'],
            activity: ['فندق', 'مصنع', 'مخبز']
        };
        
        let dbCount = 0;
        Object.values(dbTerms).forEach(termList => {
            if (termList.some(term => text.includes(term))) {
                dbCount++;
            }
        });
        
        if (dbCount >= 2) potential += 0.3;
        
        return Math.min(1, potential);
    }
    
    needsClarification(analysis) {
        // نفس الدالة في V13
        if (analysis.hasAmbiguousTerms && analysis.words.length < 5) {
            return true;
        }
        
        if (analysis.isFollowUp && !analysis.hasContext) {
            return true;
        }
        
        if (analysis.wordCount <= 2 && analysis.detectedType === 'general') {
            return true;
        }
        
        if (this.memory.preferences.confirmationMode === 'always') {
            return true;
        }
        
        return false;
    }
    
    askForClarification(analysis) {
        // نفس الدالة في V13
        let clarificationText = '';
        
        if (analysis.isFollowUp && !analysis.hasContext) {
            clarificationText = `أعتذر، لم أتمكن من فهم إلى ماذا تشير.\n\n`;
            clarificationText += `💡 يمكنك سؤال مثل:\n`;
            clarificationText += `• "تراخيص فندق 5 نجوم"\n`;
            clarificationText += `• "منطقة العاشر من رمضان"\n`;
            clarificationText += `• "ما هو القرار 104"`;
        } else if (analysis.hasAmbiguousTerms) {
            clarificationText = `أرجو التوضيح، تقصد:\n\n`;
            
            if (analysis.text.includes('هو') || analysis.text.includes('هي')) {
                clarificationText += `1. تريد تعريفاً لشيء معين؟\n`;
                clarificationText += `2. تريد معلومات عن نشاط محدد؟\n`;
                clarificationText += `3. تريد معرفة تكلفة أو تراخيص؟`;
            } else {
                clarificationText += `💡 يرجى إعادة صياغة السؤال بشكل أكثر وضوحاً`;
            }
        } else if (analysis.wordCount <= 2) {
            clarificationText = `هل تقصد:\n\n`;
            clarificationText += `1. معلومات عن منطقة صناعية؟\n`;
            clarificationText += `2. تراخيص لنشاط معين؟\n`;
            clarificationText += `3. تفاصيل عن القرار 104؟\n\n`;
            clarificationText += `أو يمكنك إضافة المزيد من التفاصيل لمساعدتك بشكل أفضل`;
        }
        
        this.memory.context.awaitingClarification = true;
        this.memory.context.clarificationType = analysis.detectedType;
        
        return this.createResponse(
            clarificationText,
            'clarification_needed',
            0.3,
            { requiresClarification: true, clarificationFor: analysis.original }
        );
    }
    
    async localSearch(query) {
        // نفس الدالة في V13
        console.log('🔍 بحث محلي (بدون متجهات)...');
        
        const results = {
            activities: [],
            decision104: [],
            industrial: [],
            ambiguous: false
        };
        
        if (this.db.activities) {
            results.activities = this.db.activities
                .filter(activity => 
                    activity.text && 
                    activity.text.toLowerCase().includes(query.toLowerCase().substring(0, 10))
                )
                .slice(0, 5)
                .map((activity, index) => ({
                    id: activity.value,
                    score: 0.8 - (index * 0.1),
                    metadata: { text: activity.text }
                }));
        }
        
        return results;
    }
    
    hasSimilarAlternatives(results) {
        // نفس الدالة في V13
        if (results.activities.length >= 2) {
            const topTwo = results.activities.slice(0, 2);
            const scoreDiff = Math.abs(topTwo[0].score - topTwo[1].score);
            if (scoreDiff < this.confirmationSettings.similarityThreshold) {
                return true;
            }
        }
        
        if (results.industrial.length >= 2) {
            const topTwo = results.industrial.slice(0, 2);
            const scoreDiff = Math.abs(topTwo[0].score - topTwo[1].score);
            if (scoreDiff < this.confirmationSettings.similarityThreshold) {
                return true;
            }
        }
        
        return false;
    }
    
    handleAmbiguousResults(query, results, analysis) {
        // نفس الدالة في V13
        this.stats.ambiguous++;
        
        const alternatives = this.collectAlternatives(results);
        
        if (alternatives.length === 0) {
            const category = this.intelligentClassification(query, results, analysis);
            return this.processByCategory(category, query, results, analysis);
        }
        
        this.memory.context.currentAlternatives = alternatives;
        this.memory.context.awaitingConfirmation = true;
        
        let confirmationText = `وجدت عدة نتائج متشابهة. أيهم تقصد:\n\n`;
        
        alternatives.forEach((alt, index) => {
            confirmationText += `${index + 1}. ${alt.displayText}\n`;
        });
        
        confirmationText += `\n📝 الرجاء اختيار الرقم المناسب أو إعادة صياغة السؤال`;
        
        return this.createResponse(
            confirmationText,
            'confirmation_needed',
            0.4,
            { 
                alternatives: alternatives,
                requiresConfirmation: true,
                originalQuery: query
            }
        );
    }
    
    collectAlternatives(results) {
        // نفس الدالة في V13
        const alternatives = [];
        
        if (results.activities.length >= 2) {
            const topActivities = results.activities.slice(0, this.confirmationSettings.maxAlternatives);
            topActivities.forEach((activity, index) => {
                if (activity.metadata && activity.metadata.text_preview) {
                    alternatives.push({
                        type: 'activity',
                        id: activity.id,
                        score: activity.score,
                        displayText: activity.metadata.text_preview.substring(0, 80) + '...',
                        data: activity.metadata
                    });
                }
            });
        }
        
        if (results.industrial.length >= 2) {
            const topIndustrial = results.industrial.slice(0, this.confirmationSettings.maxAlternatives);
            topIndustrial.forEach((area, index) => {
                if (area.metadata && area.metadata.text_preview) {
                    alternatives.push({
                        type: 'industrial',
                        id: area.id,
                        score: area.score,
                        displayText: area.metadata.text_preview.substring(0, 80) + '...',
                        data: area.metadata
                    });
                }
            });
        }
        
        return alternatives;
    }
    
    intelligentClassification(query, results, analysis) {
        // نفس الدالة في V13
        if (results.activities.length > 0 && results.activities[0].score > 0.7) {
            return 'activity';
        }
        
        if (results.industrial.length > 0 && results.industrial[0].score > 0.7) {
            return 'area_specific';
        }
        
        if (results.decision104.length > 0 && results.decision104[0].score > 0.7) {
            return 'decision104_check';
        }
        
        const text = query.toLowerCase();
        
        if (/ما هو القرار 104|شرح القرار|تعريف القرار/.test(text)) {
            return 'decision104_general';
        }
        
        if (/الأنشطة.*(القطاع أ|قطاع أ|قطاع\s*a)/i.test(text)) {
            return 'decision104_list_a';
        }
        
        if (/الأنشطة.*(القطاع ب|قطاع ب|قطاع\s*b)/i.test(text)) {
            return 'decision104_list_b';
        }
        
        if (/هل|خاضع|مشمول|وارد/.test(text) && /104|قرار|حافز|حوافز/.test(text)) {
            return 'decision104_check';
        }
        
        if (/كام|عدد|كم/.test(text) && /منطقة|مناطق/.test(text)) {
            return 'area_count';
        }
        
        if (/جهة|جهات/.test(text) && /ولاية|الولاية/.test(text)) {
            return 'area_dependencies';
        }
        
        if (/المناطق|مناطق/.test(text) && /في|محافظة/.test(text)) {
            return 'area_list';
        }
        
        if (/منطقة/.test(text) && (/العاشر|السادات|برج العرب|زهراء|بدر/.test(text))) {
            return 'area_specific';
        }
        
        return 'activity';
    }
    
    async processByCategory(category, query, results, analysis) {
        // نفس الدالة في V13
        console.log(`📂 التصنيف الذكي: ${category}`);
        
        switch (category) {
            case 'decision104_general':
                return this.handleDecision104General();
            case 'decision104_list_a':
                return this.handleDecision104List('A');
            case 'decision104_list_b':
                return this.handleDecision104List('B');
            case 'decision104_check':
                return await this.handleDecision104Check(query, results);
            case 'area_count':
                return this.handleAreaCount(query);
            case 'area_list':
                return this.handleAreaList(query);
            case 'area_dependencies':
                return this.handleAreaDependencies();
            case 'area_specific':
                return await this.handleAreaSpecific(query, results);
            case 'activity':
                return await this.handleActivityQuery(query, results, analysis);
            default:
                return await this.handleGeneric(query, results, analysis);
        }
    }
    
    handleDecision104General() {
        // نفس الدالة في V13
        const text = `📜 **قرار رئيس مجلس الوزراء رقم 104 لسنة 2022**\n\n${'═'.repeat(60)}\n\nيتعلق بمنح حوافز استثمارية للمشروعات التي تُنشأ بعد صدور قانون الاستثمار رقم 72 لسنة 2017.\n\n📊 **القطاعات:**\n\n🔷 **القطاع (أ)**: حافز استثماري بنسبة **50%** من التكلفة\n   يشمل: الطاقة المتجددة، الهيدروجين الأخضر، الصناعات الاستراتيجية\n\n🔷 **القطاع (ب)**: حافز استثماري بنسبة **30%** من التكلفة\n   يشمل: صناعات أخرى مهمة\n\n💰 **الحوافز:**\n• إعفاءات جمركية\n• تخفيضات ضريبية\n• تسهيلات في الإجراءات\n\n${'═'.repeat(60)}\n\n💡 اسألني: "ما الأنشطة في القطاع أ" أو "هل النشاط X مشمول"`;
        
        return this.createResponse(text, 'decision104', 1, { 
            sector: 'both',
            hasDetails: true 
        });
    }
    
    handleDecision104List(sector) {
        // نفس الدالة في V13
        if (!this.db.decision104) {
            return this.createResponse('قاعدة القرار 104 غير متوفرة', 'error', 0);
        }
        
        const sectorKey = sector === 'A' ? 'sectorA' : 'sectorB';
        const sectorData = this.db.decision104[sectorKey];
        
        if (!sectorData) {
            return this.createResponse(`بيانات القطاع ${sector} غير متوفرة`, 'error', 0);
        }
        
        let text = `📋 **أنشطة القطاع (${sector}) - قرار 104 لسنة 2022**\n\n`;
        text += `${'═'.repeat(60)}\n\n`;
        
        let count = 1;
        for (const [category, items] of Object.entries(sectorData)) {
            if (Array.isArray(items)) {
                text += `**${count}. ${category}:**\n`;
                items.slice(0, 3).forEach(item => {
                    text += `   • ${item}\n`;
                });
                if (items.length > 3) {
                    text += `   ... و${items.length - 3} نشاط آخر\n`;
                }
                text += `\n`;
                count++;
            }
        }
        
        text += `${'═'.repeat(60)}\n`;
        text += `💡 حافز استثماري: **${sector === 'A' ? '50%' : '30%'}** من التكلفة`;
        
        return this.createResponse(text, 'decision104_list', 1, { 
            sector: sector,
            data: sectorData 
        });
    }
    
    async handleDecision104Check(query, results) {
        // نفس الدالة في V13
        if (!window.vEngine || !window.vEngine.isReady) {
            return this.handleDecision104LocalCheck(query);
        }
        
        const decisionResults = results.decision104 || [];
        
        if (decisionResults.length === 0 || decisionResults[0].score < 0.4) {
            return this.createResponse(
                `❌ **لم يتم العثور على هذا النشاط في قرار 104**\n\n` +
                `الأنشطة المشمولة تركز على:\n` +
                `• الطاقة المتجددة (خلايا شمسية، طاقة رياح)\n` +
                `• الهيدروجين الأخضر ومشتقاته\n` +
                `• الصناعات الغذائية الاستراتيجية\n` +
                `• المنسوجات والملابس الجاهزة`,
                'decision104_not_found',
                0.3
            );
        }
        
        const best = decisionResults[0];
        const metadata = best.metadata || {};
        
        const sector = metadata.metadata?.sector || 'A';
        const sectorName = sector === 'A' ? 'القطاع (أ)' : 'القطاع (ب)';
        const incentive = sector === 'A' ? '50%' : '30%';
        
        const text = `
✅ **نعم، مشمول في قرار 104 لسنة 2022**

${'═'.repeat(60)}

🎯 **القطاع:** ${sectorName}
💰 **الحافز:** ${incentive} من التكلفة

${'═'.repeat(60)}

📋 **التفاصيل:**
${metadata.text_preview || 'تفاصيل النشاط'}

📌 **ملاحظات:**
• للمشروعات المنشأة بعد قانون الاستثمار 72 لسنة 2017
• إعفاءات جمركية وتخفيضات ضريبية
• تسهيلات إجرائية في الجهات الحكومية

💡 **للاستفادة:** راجع الهيئة العامة للاستثمار والمناطق الحرة
        `.trim();
        
        return this.createResponse(text, 'decision104_match', best.score, {
            sector: sector,
            incentive: incentive,
            metadata: metadata
        });
    }
    
    handleAreaCount(query) {
        // نفس الدالة في V13
        if (!this.db.industrial) {
            return this.createResponse('قاعدة المناطق غير متوفرة', 'error', 0);
        }
        
        const govMatch = query.match(/(القاهرة|الإسكندرية|الجيزة|القليوبية|الشرقية|الدقهلية)/);
        
        if (govMatch) {
            const gov = govMatch[1];
            const filtered = this.db.industrial.filter(a => 
                a.governorate && a.governorate.includes(gov)
            );
            
            let text = `📊 **عدد المناطق في ${gov}:** ${filtered.length} منطقة\n\n`;
            if (filtered.length > 0) {
                text += `📋 **القائمة:**\n`;
                filtered.slice(0, 8).forEach((a, i) => {
                    text += `${i + 1}. ${a.name}\n`;
                });
                if (filtered.length > 8) text += `... و${filtered.length - 8} أخرى`;
            }
            
            return this.createResponse(text, 'area_count', 0.95, { 
                areas: filtered,
                governorate: gov 
            });
        }
        
        const total = this.db.industrial.length;
        return this.createResponse(
            `📊 **إجمالي المناطق الصناعية في مصر:** ${total} منطقة`,
            'area_count',
            1,
            { total }
        );
    }
    
    async handleAreaSpecific(query, results) {
        // نفس الدالة في V13
        const areaResults = results.industrial || [];
        
        if (areaResults.length === 0) {
            return this.handleAreaSpecificLocal(query);
        }
        
        const best = areaResults[0];
        const metadata = best.metadata || {};
        
        const areaData = await this.enhancedFindAreaData(best.id, metadata);
        
        if (!areaData) {
            return this.handleAreaSpecificLocal(query);
        }
        
        const specificInfo = this.extractSpecificRequest(query);
        
        if (specificInfo) {
            return this.provideSpecificAreaInfo(areaData, specificInfo, best.score);
        }
        
        return this.provideComprehensiveAreaInfo(areaData, query, best.score);
    }
    
    extractSpecificRequest(query) {
        // نفس الدالة في V13
        const text = query.toLowerCase();
        
        if (/ترخيص|تراخيص|رخص|إجازة/.test(text)) return 'licensing';
        if (/جهة|جهات|مختص|مسئول/.test(text)) return 'authorities';
        if (/سند|تشريع|قانون|لوائح/.test(text)) return 'legislation';
        if (/موقع|مكان|أين|عنوان/.test(text)) return 'location';
        if (/مساحة|حجم|متر|فدان/.test(text)) return 'area';
        if (/تكلفة|سعر|بكام|مصاريف/.test(text)) return 'cost';
        if (/مدة|زمن|وقت/.test(text)) return 'duration';
        if (/متطلبات|شروط|اشتراطات/.test(text)) return 'requirements';
        if (/إجراءات|خطوات|طريقة/.test(text)) return 'procedures';
        
        return null;
    }
    
    // ==================== الدوال المساعدة المحفوظة ====================
    createResponse(text, type, confidence, extraData = {}) {
        // نفس الدالة في V13 مع إضافة معلومات الربط
        return {
            text,
            type,
            confidence,
            timestamp: Date.now(),
            memoryContext: {
                currentEntity: this.memory.context.currentEntity,
                currentType: this.memory.context.currentType
            },
            ...extraData
        };
    }
    
    async handleGeneric(query, results, analysis) {
        // نفس الدالة في V13
        if (!window.vEngine || !window.vEngine.isReady) {
            return this.createResponse('محرك البحث غير جاهز', 'error', 0);
        }
        
        const allResults = [
            ...(results.activities || []).map(r => ({ ...r, type: 'activity' })),
            ...(results.industrial || []).map(r => ({ ...r, type: 'area' })),
            ...(results.decision104 || []).map(r => ({ ...r, type: 'decision104' }))
        ].sort((a, b) => b.score - a.score);
        
        if (allResults.length === 0) {
            return this.createResponse(
                'عذراً، لم أجد معلومات مطابقة.\n\n💡 جرب:\n• "ما تراخيص مصنع الأدوية"\n• "المناطق في القاهرة"\n• "ما هو القرار 104"',
                'no_results',
                0
            );
        }
        
        const best = allResults[0];
        
        if (best.type === 'activity') {
            return this.handleActivityQuery(query, results, analysis);
        }
        
        if (best.type === 'area') {
            return this.handleAreaSpecific(query, results);
        }
        
        if (best.type === 'decision104') {
            return this.handleDecision104Check(query, results);
        }
        
        return this.createResponse('لم أفهم السؤال', 'no_results', 0);
    }
    
    // ==================== دوال التوافق مع V13 ====================
    async showDetails(entityId, entityType, fallbackText = '') {
        console.log("🔍 استدعاء تفاصيل الكيان:", entityId, "النوع:", entityType);
        
        // توحيد مسمى النوع ليتوافق مع القواعد (مفرد/جمع)
        const type = (entityType === 'activity') ? 'activities' : entityType;
        
        const searchMeta = { text_preview: fallbackText || "" };

        try {
            if (type === 'activities') {
                const data = await this.enhancedFindActivityData(entityId, searchMeta);
                if (data) return this.provideComprehensiveActivityInfo(data, 'تفاصيل', 1, {});
            }
            
            if (type === 'area' || type === 'industrial') {
                const data = await this.enhancedFindAreaData(entityId, searchMeta);
                if (data) return this.provideComprehensiveAreaInfo(data, 'تفاصيل', 1);
            }
        } catch (e) {
            console.error("❌ فشل جلب التفاصيل في showDetails:", e);
        }
        
        return this.createResponse('عذراً، التفاصيل غير متوفرة حالياً لهذه الوحدة.', 'error', 0);
    }

// ============================================================================
// الجزء المصلح: ربط النموذج مع الدوال المساعدة (V14 مدمج)
// ============================================================================

// 1. دالة معلومات النشاط المحددة
IntelligentSmartAssistantV14.prototype.provideSpecificActivityInfo = function(activityData, infoType, confidence) {
    var details = activityData.details || {};
    var text = '';
    var title = '';
    
    switch (infoType) {
        case 'licensing':
            title = '📋 التراخيص المطلوبة لـ ' + activityData.text;
            text = details.req || 'لا توجد معلومات تفصيلية عن التراخيص';
            break;
        case 'authorities':
            title = '🏛️ الجهات المختصة بـ ' + activityData.text;
            text = details.auth || 'لا توجد معلومات عن الجهات المختصة';
            break;
        case 'legislation':
            title = '⚖️ التشريعات المنظمة لـ ' + activityData.text;
            text = details.leg || 'لا توجد معلومات عن التشريعات';
            break;
        case 'location':
            title = '📍 الموقع المناسب لـ ' + activityData.text;
            text = details.loc || 'لا توجد معلومات عن الموقع';
            break;
        case 'requirements':
            title = '📝 المتطلبات الأساسية لـ ' + activityData.text;
            text = details.req || 'لا توجد معلومات عن المتطلبات';
            break;
        default:
            title = 'ℹ️ معلومات عن ' + activityData.text;
            text = 'المعلومات المطلوبة غير متوفرة';
    }
    
    var responseText = title + '\n\n' + '═'.repeat(40) + '\n\n' + text + '\n\n' + '═'.repeat(40);
    
    return this.createResponse(responseText, 'activity_specific', confidence, {
        activity: activityData,
        infoType: infoType
    });
};

// 2. دالة المعلومات الشاملة للنشاط
IntelligentSmartAssistantV14.prototype.provideComprehensiveActivityInfo = function(activityData, query, confidence, analysis) {
    var details = activityData.details || {};
    var lang = (analysis && analysis.language) ? analysis.language : 'formal';
    var text = '🏢 **' + activityData.text + '**\n\n' + '═'.repeat(40) + '\n\n';
    
    if (lang === 'egyptian') {
        text += '📋 **طبيعة الشغل:**\n' + (details.act || 'مفيش تفاصيل متوفرة') + '\n\n';
        text += '📝 **التراخيص المطلوبة:**\n' + (details.req || 'مفيش بيانات') + '\n\n';
        text += '🏛️ **الجهات المسؤولة:**\n' + (details.auth || 'غير محددة') + '\n\n';
        text += '📍 **المكان المناسب:**\n' + (details.loc || 'في أي مكان ملائم') + '\n\n';
    } else {
        text += '📋 **طبيعة النشاط:**\n' + (details.act || 'لا توجد معلومات تفصيلية') + '\n\n';
        text += '📝 **التراخيص المطلوبة:**\n' + (details.req || 'يرجى مراجعة الجهة المختصة') + '\n\n';
        text += '🏛️ **الجهات المختصة:**\n' + (details.auth || 'غير محدد') + '\n\n';
        text += '📍 **الموقع المناسب:**\n' + (details.loc || 'غير محدد') + '\n\n';
        text += '⚖️ **التشريعات المنظمة:**\n' + (details.leg || 'القوانين العامة المعمول بها') + '\n\n';
    }
    
    if (details.link) {
        text += '🔗 **الدليل الإرشادي:** ' + details.link + '\n\n';
    }
    
    text += '═'.repeat(40) + '\n';
    text += '💡 اسألني عن أي جزء محدد (تراخيص، جهات، إجراءات...)';
    
    return this.createResponse(text, 'activity_full', confidence, {
        activity: activityData,
        hasDetails: (details.act ? true : false)
    });
};

// 3. دالة معلومات المنطقة المحددة
IntelligentSmartAssistantV14.prototype.provideSpecificAreaInfo = function(areaData, infoType, confidence) {
    var text = '';
    var title = '';
    
    switch (infoType) {
        case 'location':
            title = '📍 موقع ' + areaData.name;
            text = 'المحافظة: ' + (areaData.governorate || 'غير محدد');
            if (areaData.x && areaData.y) {
                text += '\nالإحداثيات: ' + areaData.x + ', ' + areaData.y;
                text += '\n🗺️ رابط الخريطة: https://www.google.com/maps?q=' + areaData.y + ',' + areaData.x;
            }
            break;
        case 'area':
            title = '📏 مساحة ' + areaData.name;
            text = (areaData.area || 'غير محدد') + ' فدان';
            break;
        case 'authorities':
            title = '🏛️ جهة الولاية لـ ' + areaData.name;
            text = areaData.dependency || 'غير محدد';
            break;
        case 'decision':
            title = '📜 قرار إنشاء ' + areaData.name;
            text = areaData.decision || 'غير متوفر';
            break;
        default:
            title = 'ℹ️ معلومات عن ' + areaData.name;
            text = 'المعلومات المطلوبة غير متوفرة حالياً';
    }
    
    var responseText = title + '\n\n' + '═'.repeat(40) + '\n\n' + text + '\n\n' + '═'.repeat(40);
    
    return this.createResponse(responseText, 'area_specific', confidence, {
        area: areaData,
        infoType: infoType
    });
};

// 4. دالة المعلومات الشاملة للمنطقة
IntelligentSmartAssistantV14.prototype.provideComprehensiveAreaInfo = function(areaData, query, confidence) {
    var text = '🏭 **' + areaData.name + '**\n\n' + '═'.repeat(40) + '\n\n';
    
    text += '📍 **المحافظة:** ' + (areaData.governorate || 'غير محدد') + '\n';
    text += '🏛️ **جهة الولاية:** ' + (areaData.dependency || 'غير محدد') + '\n';
    text += '📏 **المساحة:** ' + (areaData.area || 'غير محدد') + ' فدان\n\n';
    
    if (areaData.decision) {
        text += '📜 **قرار الإنشاء:**\n' + areaData.decision + '\n\n';
    }
    
    if (areaData.x && areaData.y) {
        text += '🗺️ **الموقع على الخريطة:**\nhttps://www.google.com/maps?q=' + areaData.y + ',' + areaData.x + '\n\n';
    }
    
    text += '═'.repeat(40) + '\n';
    text += '💡 اسألني عن: مساحة، موقع، جهة الولاية، أو قرار الإنشاء';
    
    return this.createResponse(text, 'area_full', confidence, {
        area: areaData,
        hasCoordinates: (areaData.x && areaData.y ? true : false)
    });
};

// 5. دالة البحث المحلي للمناطق (Fallback)
IntelligentSmartAssistantV14.prototype.handleAreaSpecificLocal = function(query) {
    if (!this.db.industrial) return this.createResponse('قاعدة المناطق غير متوفرة', 'error', 0);
    
    var found = null;
    var searchStr = query.toLowerCase();
    
    for (var i = 0; i < this.db.industrial.length; i++) {
        if (this.db.industrial[i].name && searchStr.indexOf(this.db.industrial[i].name.toLowerCase()) !== -1) {
            found = this.db.industrial[i];
            break;
        }
    }
    
    if (!found) {
        return this.createResponse('لم أجد المنطقة المطلوبة محلياً. يرجى تجربة محرك البحث المتجهي.', 'no_results', 0.2);
    }
    
    return this.provideComprehensiveAreaInfo(found, query, 0.9);
};

// 6. دالة فحص القرار 104 المحلي (Fallback)
IntelligentSmartAssistantV14.prototype.handleDecision104LocalCheck = function(query) {
    if (!this.db.decision104) return this.createResponse('قاعدة القرار 104 غير متوفرة', 'error', 0);
    
    var searchText = query.toLowerCase();
    var foundActivity = null;
    var foundSector = null;
    
    // فحص قطاع أ
    if (this.db.decision104.sectorA) {
        for (var catA in this.db.decision104.sectorA) {
            var itemsA = this.db.decision104.sectorA[catA];
            for (var j = 0; j < itemsA.length; j++) {
                if (itemsA[j].toLowerCase().indexOf(searchText.substring(0, 10)) !== -1) {
                    foundActivity = itemsA[j];
                    foundSector = 'A';
                    break;
                }
            }
            if (foundActivity) break;
        }
    }
    
    if (!foundActivity) {
        return this.createResponse('❌ النشاط غير مشمول في قرار 104 (فحص محلي)', 'decision104_not_found', 0.3);
    }
    
    var sectorName = (foundSector === 'A') ? 'القطاع (أ)' : 'القطاع (ب)';
    var incentive = (foundSector === 'A') ? '50%' : '30%';
    
    var resText = '✅ **نعم، مشمول في قرار 104 لسنة 2022**\n\n' + 
                  '📋 **النشاط:** ' + foundActivity + '\n' +
                  '🎯 **القطاع:** ' + sectorName + '\n' +
                  '💰 **الحافز:** ' + incentive + ' من التكلفة الاستثمارية';
    
    return this.createResponse(resText, 'decision104_match', 0.8, {
        sector: foundSector,
        incentive: incentive
    });
};

// ==================== التصدير والتهيئة النهائية (الإصلاح الحرج) ====================

// حذف كافة التكرارات السابقة وتعريف المساعد مرة واحدة فقط بنظام الأمان
if (!window.finalAssistantV14) {
    window.finalAssistantV14 = new IntelligentSmartAssistantV14();
    window.smartAssistant = window.finalAssistantV14;
    window.finalAssistant = window.finalAssistantV14;
}

// تحديث واجهة الربط الخارجية للـ UI
window.assistantV14 = {
    getResponse: function(q) { return window.finalAssistantV14.query(q); },
    showLicenseDetails: function(id, type, text) { return window.finalAssistantV14.showDetails(id, type, text); },
    getLinkingPerformance: function() { return window.finalAssistantV14.getLinkingPerformance(); }
};

console.log('✅ Smart Assistant V14 - تم الإصلاح الشامل وجاهز للعمل!');
