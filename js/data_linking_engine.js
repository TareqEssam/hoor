/****************************************************************************
 * 🔗 DataLinkingEngine V1.0 - محرك الربط الذكي المتطور
 * 
 * ✅ يعمل مع النظام الحالي دون تعديلات على البيانات
 * ✅ قابل للتوسيع بإضافة Plugins
 * ✅ يتعلم من الاستخدام ويتحسن ذاتياً
 * ✅ متكامل مع Smart Assistant V13
 * 
 * ⚠️  ملاحظة: هذه النسخة مصممة للتوسيع التدريجي
 ****************************************************************************/

class DataLinkingEngine {
    constructor() {
        console.log("🚀 تهيئة محرك الربط الذكي...");
        
        // --- النواة الأساسية (ثابتة) ---
        this.isInitialized = false;
        this.fullDatabases = null;
        
        // نظام التخزين المؤقت متعدد المستويات
        this.cacheSystem = {
            shortTerm: new Map(),    // ذاكرة الجلسة
            longTerm: new Map(),     // ذاكرة التخزين المحلي
            patternCache: new Map()  // أنماط الربط الناجحة
        };
        
        // إحصائيات الأداء
        this.metrics = {
            startTime: Date.now(),
            linkingAttempts: 0,
            cacheHits: 0,
            averageConfidence: 0,
            successRate: 0,
            responseTimes: []
        };
        
        // --- نظام التوسيع (Plugins) ---
        this.extensions = {
            // يمكن إضافة خوارزميات مطابقة جديدة هنا
            matchingStrategies: [
                'semantic_keywords',
                'contextual_similarity',
                'pattern_recognition'
            ],
            
            // يمكن إضافة معالجات قبلية/بعدية
            preProcessors: [],
            postProcessors: [],
            
            // أنظمة تعلم إضافية
            learningModules: []
        };
        
        // معالجات الـ text_preview
        this.textProcessors = {
            extractKeywords: (text) => {
                // استخراج كلمات مفتاحية ذكية
                const words = text.split(/\s+/).filter(w => w.length > 3);
                const stopWords = ['من', 'في', 'على', 'إلى', 'أن', 'هو', 'هي'];
                return words.filter(w => !stopWords.includes(w));
            },
            
            normalizeText: (text) => {
                // توحيد النص للبحث
                return text
                    .replace(/[.,،؛!?]/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
            },
            
            createFingerprint: (text) => {
                // إنشاء بصمة فريدة للنص
                const normalized = this.textProcessors.normalizeText(text);
                const keywords = this.textProcessors.extractKeywords(normalized);
                return keywords.sort().join('|');
            }
        };
        
        console.log("✅ تم إنشاء نواة محرك الربط");
    }
    
    // ==================== التهيئة الرئيسية ====================
    async initialize(fullDatabases) {
        console.log("🧠 جاري تحميل البيانات الكاملة...");
        
        this.fullDatabases = fullDatabases;
        
        // تحميل الذاكرة المؤقتة من localStorage
        await this.loadPersistentCache();
        
        // تحليل أنماط البيانات
        this.analyzeDataPatterns();
        
        this.isInitialized = true;
        
        console.log(`✅ تم تهيئة محرك الربط مع:
        - ${fullDatabases.activities?.length || 0} نشاط
        - ${fullDatabases.industrial?.length || 0} منطقة
        - ${fullDatabases.decision104 ? 'قاعدة قرار 104' : 'لا يوجد'}
        `);
        
        return this;
    }
    
    // ==================== الوظيفة الأساسية: الربط ====================
    async link(vectorResult, dbType, context = {}) {
        if (!this.isInitialized) {
            throw new Error("المحرك غير مهيأ. قم باستدعاء initialize() أولاً.");
        }
        
        this.metrics.linkingAttempts++;
        
        const startTime = Date.now();
        
        try {
            // الخطوة 1: التحقق من الذاكرة المؤقتة
            const cachedResult = this.checkCache(vectorResult, dbType);
            if (cachedResult) {
                this.metrics.cacheHits++;
                return cachedResult;
            }
            
            // الخطوة 2: اختيار استراتيجية الربط المناسبة
            const strategy = this.selectMatchingStrategy(vectorResult, dbType, context);
            
            // الخطوة 3: تنفيذ الربط
            const linkedData = await this.executeLinking(vectorResult, dbType, strategy, context);
            
            // الخطوة 4: تحسين النتيجة
            const enhancedResult = await this.enhanceResult(linkedData, context);
            
            // الخطوة 5: التخزين في الذاكرة المؤقتة
            this.storeInCache(vectorResult, dbType, enhancedResult);
            
            // الخطوة 6: تسجيل الأداء
            this.recordPerformance(startTime, enhancedResult.confidence);
            
            return enhancedResult;
            
        } catch (error) {
            console.error("❌ فشل عملية الربط:", error);
            return this.createFallbackResult(vectorResult, dbType);
        }
    }
    
    // ==================== استراتيجيات الربط ====================
    selectMatchingStrategy(vectorResult, dbType, context) {
        const textPreview = vectorResult.metadata?.text_preview || '';
        
        // تحديد الاستراتيجية بناءً على نوع البيانات والسياق
        if (dbType === 'activity') {
            return this.selectActivityStrategy(textPreview, context);
        } else if (dbType === 'industrial') {
            return this.selectIndustrialStrategy(textPreview, context);
        } else if (dbType === 'decision104') {
            return this.selectDecision104Strategy(textPreview, context);
        }
        
        return 'semantic_keywords'; // الاستراتيجية الافتراضية
    }
    
    selectActivityStrategy(textPreview, context) {
        // إذا كان النص قصيراً، نستخدم مطابقة دلالية أقوى
        if (textPreview.length < 50) {
            return 'enhanced_semantic';
        }
        
        // إذا كان هناك سياق محادثة، نستخدم الربط السياقي
        if (context.conversationHistory && context.conversationHistory.length > 0) {
            return 'contextual_similarity';
        }
        
        // إذا كان النص يحتوي على مصطلحات متخصصة
        const technicalTerms = ['ترخيص', 'رخصة', 'إجازة', 'مواصفات', 'اشتراطات'];
        if (technicalTerms.some(term => textPreview.includes(term))) {
            return 'technical_pattern';
        }
        
        return 'semantic_keywords';
    }
    // ⬇️ الصق الكود الجديد هنا تماماً ⬇️

    selectIndustrialStrategy(textPreview, context) {
        // إذا كان الاستعلام يحتوي على مسميات جغرافية أو أرقام قرارات
        if (/\d+/.test(textPreview) || textPreview.includes('قرار')) {
            return 'technical_pattern';
        }
        return 'semantic_keywords';
    }

    selectDecision104Strategy(textPreview, context) {
        // القرار 104 يحتاج دائماً لمطابقة دلالية عالية الدقة
        return 'enhanced_semantic';
    }
    // ==================== تنفيذ الربط ====================
    async executeLinking(vectorResult, dbType, strategy, context) {
        // 🔥 حل عبقري: توحيد المسميات (المفرد والجمع) لضمان الوصول للبيانات
        const targetKey = dbType === 'activity' ? 'activities' : dbType;
        
        const targetDB = this.fullDatabases[targetKey];
        
        if (!targetDB || !Array.isArray(targetDB)) {
            // إضافة تفاصيل للخطأ لتسهيل التتبع
            console.error(`❌ خطأ في محرك الربط: المفتاح المستخدم هو [${targetKey}] والقواعد المتاحة هي:`, Object.keys(this.fullDatabases));
            throw new Error(`قاعدة البيانات ${targetKey} غير متوفرة في الذاكرة`);
        }
        
        const textPreview = vectorResult.metadata?.text_preview || '';
        const fingerprint = this.textProcessors.createFingerprint(textPreview);
        
        let bestMatch = null;
        let bestScore = 0;
        
        // البحث في قاعدة البيانات
        for (const item of targetDB) {
            let score = 0;
            
            // تطبيق استراتيجية الربط المختارة
            switch (strategy) {
                case 'semantic_keywords':
                    score = this.calculateKeywordScore(textPreview, item);
                    break;
                    
                case 'enhanced_semantic':
                    score = this.calculateEnhancedSemanticScore(textPreview, item);
                    break;
                    
                case 'contextual_similarity':
                    score = this.calculateContextualScore(textPreview, item, context);
                    break;
                    
                case 'technical_pattern':
                    score = this.calculateTechnicalScore(textPreview, item);
                    break;
                    
                default:
                    score = this.calculateKeywordScore(textPreview, item);
            }
            
            // إذا كانت هذه أفضل نتيجة حتى الآن
            if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
            }
            
            // إذا كانت النتيجة ممتازة، نتوقف مبكراً
            if (score > 0.9) break;
        }
        
        // إذا لم نجد نتيجة جيدة، نجرب استراتيجية أخرى
        if (!bestMatch || bestScore < 0.4) {
            return this.tryAlternativeStrategies(textPreview, targetDB, strategy, context);
        }
        
        return {
            data: bestMatch,
            confidence: bestScore,
            strategy: strategy,
            fingerprint: fingerprint,
            metadata: {
                textPreview: textPreview,
                dbType: dbType,
                timestamp: Date.now()
            }
        };
    }
    
    // ==================== دوال حساب النقاط ====================
    calculateKeywordScore(textPreview, item) {
        // مطابقة الكلمات المفتاحية الأساسية
        const previewKeywords = this.textProcessors.extractKeywords(textPreview);
        const itemText = this.getItemText(item);
        const itemKeywords = this.textProcessors.extractKeywords(itemText);
        
        // حساب التداخل
        const intersection = previewKeywords.filter(kw => 
            itemKeywords.some(itemKw => itemKw.includes(kw) || kw.includes(itemKw))
        );
        
        return intersection.length / Math.max(previewKeywords.length, 1);
    }
    
    calculateEnhancedSemanticScore(textPreview, item) {
        // مطابقة دلالية محسنة
        const baseScore = this.calculateKeywordScore(textPreview, item);
        
        // عوامل تحسين إضافية
        let enhancedScore = baseScore;
        
        // 1. مكافأة المطابقة الكاملة للكلمات الرئيسية
        const mainTerms = this.extractMainTerms(textPreview);
        const itemText = this.getItemText(item);
        
        mainTerms.forEach(term => {
            if (itemText.includes(term)) {
                enhancedScore += 0.2;
            }
        });
        
        // 2. عقوبة الاختلاف في السياق إذا كان واضحاً
        if (this.isContextMismatch(textPreview, itemText)) {
            enhancedScore *= 0.7;
        }
        
        return Math.min(1, enhancedScore);
    }
    
    calculateContextualScore(textPreview, item, context) {
        let score = this.calculateKeywordScore(textPreview, item);
        
        // 🛡️ معالجة احترافية لـ conversationHistory (سواء كانت Array أو String)
        if (context && context.conversationHistory) {
            let historyText = "";
            
            if (Array.isArray(context.conversationHistory)) {
                historyText = context.conversationHistory.join(' ');
            } else if (typeof context.conversationHistory === 'string') {
                historyText = context.conversationHistory;
            }

            const itemText = this.getItemText(item).substring(0, 30);
            if (historyText && historyText.includes(itemText)) {
                score += 0.3; // تعزيز النتيجة بناءً على سياق المحادثة
            }
        }
        return Math.min(1, score);
    }
    
    calculateTechnicalScore(textPreview, item) {
        // مطابقة المصطلحات الفنية
        const technicalTerms = this.extractTechnicalTerms(textPreview);
        const itemText = this.getItemText(item);
        
        if (technicalTerms.length === 0) {
            return this.calculateKeywordScore(textPreview, item);
        }
        
        // حساب نسبة المصطلحات الفنية المتطابقة
        const matchedTerms = technicalTerms.filter(term => 
            itemText.includes(term)
        );
        
        return matchedTerms.length / Math.max(technicalTerms.length, 1);
    }
    
    // ==================== دوال مساعدة ====================
    getItemText(item) {
        // استخراج النص من عنصر البيانات
        if (typeof item === 'string') return item;
        if (item.text) return item.text;
        if (item.name) return item.name;
        if (item.description) return item.description;
        
        // محاولة استخراج أي نص من الكائن
        for (const key in item) {
            if (typeof item[key] === 'string' && item[key].length > 10) {
                return item[key];
            }
        }
        
        return JSON.stringify(item).substring(0, 100);
    }
    
    extractMainTerms(text) {
        // استخراج الكلمات الرئيسية (الأسماء والأفعال)
        const words = text.split(/\s+/);
        const stopWords = ['من', 'في', 'على', 'إلى', 'أن', 'هو', 'هي', 'هذا', 'هذه'];
        const mainTerms = words.filter(w => 
            w.length > 3 && 
            !stopWords.includes(w) &&
            !/\d/.test(w)
        );
        
        return [...new Set(mainTerms)]; // إزالة التكرارات
    }
    
    extractTechnicalTerms(text) {
        // المصطلحات الفنية الشائعة في الأنشطة
        const technicalPatterns = [
            'ترخيص', 'رخصة', 'إجازة', 'مواصفة', 'اشتراط',
            'جودة', 'سلامة', 'معايير', 'مواصفات', 'شهادة',
            'فحص', 'اختبار', 'تفتيش', 'مراقبة', 'تقييم'
        ];
        
        return technicalPatterns.filter(term => text.includes(term));
    }
    
    isContextMismatch(previewText, itemText) {
        // اكتشاف عدم تطابق واضح في السياق
        const previewContext = this.detectContext(previewText);
        const itemContext = this.detectContext(itemText);
        
        // إذا كان أحد النصوص عن "فندق" والآخر عن "مصنع"
        const incompatibleContexts = [
            ['فندق', 'مصنع'],
            ['سياحة', 'صناعة'],
            ['صحة', 'زراعة']
        ];
        
        return incompatibleContexts.some(([ctx1, ctx2]) => 
            (previewContext === ctx1 && itemContext === ctx2) ||
            (previewContext === ctx2 && itemContext === ctx1)
        );
    }
    
    detectContext(text) {
        // اكتشاف السياق العام للنص
        const contexts = {
            'فندق': ['فندق', 'نزل', 'سياحة', 'إقامة'],
            'مصنع': ['مصنع', 'معمل', 'إنتاج', 'تصنيع'],
            'زراعة': ['زراعة', 'مزرعة', 'محصول', 'أرض']
        };
        
        for (const [context, keywords] of Object.entries(contexts)) {
            if (keywords.some(kw => text.includes(kw))) {
                return context;
            }
        }
        
        return 'عام';
    }
    
    // ==================== التعامل مع الفشل ====================
    async tryAlternativeStrategies(textPreview, targetDB, failedStrategy, context) {
        console.log(`🔄 تجربة استراتيجيات بديلة بعد فشل ${failedStrategy}`);
        
        const strategies = [
            'semantic_keywords',
            'enhanced_semantic',
            'contextual_similarity'
        ].filter(s => s !== failedStrategy);
        
        let bestResult = null;
        
        for (const strategy of strategies) {
            // محاكاة تنفيذ الربط بكل استراتيجية
            let bestScore = 0;
            let bestMatch = null;
            
            for (const item of targetDB) {
                let score = 0;
                
                // نفس دوال حساب النقاط ولكن باستراتيجية مختلفة
                if (strategy === 'semantic_keywords') {
                    score = this.calculateKeywordScore(textPreview, item);
                } else if (strategy === 'enhanced_semantic') {
                    score = this.calculateEnhancedSemanticScore(textPreview, item);
                } else if (strategy === 'contextual_similarity') {
                    score = this.calculateContextualScore(textPreview, item, context);
                }
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = item;
                }
            }
            
            if (bestScore > 0.5) {
                bestResult = {
                    data: bestMatch,
                    confidence: bestScore,
                    strategy: strategy,
                    metadata: {
                        textPreview: textPreview,
                        fallback: true,
                        originalStrategy: failedStrategy
                    }
                };
                break;
            }
        }
        
        if (!bestResult) {
            // إذا فشلت جميع الاستراتيجيات
            return this.createFallbackResult(textPreview, targetDB);
        }
        
        return bestResult;
    }
    
    createFallbackResult(vectorResult, dbType) {
        // إنشاء نتيجة افتراضية عند الفشل
        return {
            data: null,
            confidence: 0.1,
            strategy: 'fallback',
            metadata: {
                textPreview: vectorResult.metadata?.text_preview || '',
                dbType: dbType,
                error: 'لم يتم العثور على تطابق مناسب',
                timestamp: Date.now()
            },
            suggestions: [
                'جرب صياغة السؤال بشكل مختلف',
                'تأكد من ذكر النشاط أو المنطقة بوضوح',
                'استخدم مصطلحات أكثر تحديداً'
            ]
        };
    }
    
    // ==================== نظام الذاكرة المؤقتة ====================
    checkCache(vectorResult, dbType) {
        const fingerprint = this.textProcessors.createFingerprint(
            vectorResult.metadata?.text_preview || ''
        );
        
        // التحقق من الذاكرة قصيرة المدى
        const cacheKey = `${dbType}_${fingerprint}`;
        if (this.cacheSystem.shortTerm.has(cacheKey)) {
            const cached = this.cacheSystem.shortTerm.get(cacheKey);
            if (Date.now() - cached.timestamp < 300000) { // 5 دقائق
                return cached.data;
            }
        }
        
        // التحقق من الذاكرة طويلة المدى
        if (this.cacheSystem.longTerm.has(cacheKey)) {
            return this.cacheSystem.longTerm.get(cacheKey);
        }
        
        return null;
    }
    
    storeInCache(vectorResult, dbType, result) {
        const fingerprint = this.textProcessors.createFingerprint(
            vectorResult.metadata?.text_preview || ''
        );
        
        const cacheKey = `${dbType}_${fingerprint}`;
        
        // التخزين في الذاكرة قصيرة المدى
        this.cacheSystem.shortTerm.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
            accessCount: 1
        });
        
        // إذا كانت الثقة عالية، نخزن في الذاكرة طويلة المدى
        if (result.confidence > 0.7) {
            this.cacheSystem.longTerm.set(cacheKey, result);
        }
        
        // حفظ الأنماط الناجحة
        if (result.confidence > 0.8) {
            this.cacheSystem.patternCache.set(fingerprint, {
                strategy: result.strategy,
                successCount: 1,
                lastSuccess: Date.now()
            });
        }
    }
    
    async loadPersistentCache() {
        try {
            const saved = localStorage.getItem('data_linking_cache');
            if (saved) {
                const cacheData = JSON.parse(saved);
                this.cacheSystem.longTerm = new Map(cacheData.longTerm || []);
                this.cacheSystem.patternCache = new Map(cacheData.patternCache || []);
                console.log(`📦 تم تحميل ${this.cacheSystem.longTerm.size} عنصر من الذاكرة المؤقتة`);
            }
        } catch (e) {
            console.warn('⚠️ فشل تحميل الذاكرة المؤقتة:', e);
        }
    }
    
    savePersistentCache() {
        try {
            const cacheData = {
                longTerm: Array.from(this.cacheSystem.longTerm.entries()),
                patternCache: Array.from(this.cacheSystem.patternCache.entries()),
                timestamp: Date.now()
            };
            
            localStorage.setItem('data_linking_cache', JSON.stringify(cacheData));
        } catch (e) {
            console.warn('⚠️ فشل حفظ الذاكرة المؤقتة:', e);
        }
    }
    
    // ==================== تحليل الأنماط ====================
    analyzeDataPatterns() {
        console.log("🔍 تحليل أنماط البيانات...");
        
        // تحليل الأنشطة
        if (this.fullDatabases.activities) {
            const activityPatterns = this.extractCommonPatterns(
                this.fullDatabases.activities,
                'activity'
            );
            console.log(`📊 أنماط الأنشطة: ${activityPatterns.length} نمط`);
        }
        
        // تحليل المناطق
        if (this.fullDatabases.industrial) {
            const industrialPatterns = this.extractCommonPatterns(
                this.fullDatabases.industrial,
                'industrial'
            );
            console.log(`🗺️ أنماط المناطق: ${industrialPatterns.length} نمط`);
        }
    }
    
    extractCommonPatterns(dataArray, type) {
        const patterns = new Map();
        
        dataArray.forEach(item => {
            const text = this.getItemText(item);
            const keywords = this.textProcessors.extractKeywords(text);
            
            keywords.forEach(keyword => {
                const patternKey = `${type}_${keyword}`;
                patterns.set(patternKey, (patterns.get(patternKey) || 0) + 1);
            });
        });
        
        // ترتيب الأنماط حسب التكرار
        return Array.from(patterns.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20);
    }
    
    // ==================== تحسين النتائج ====================
    async enhanceResult(linkedData, context) {
        if (!linkedData.data) return linkedData;
        
        let enhanced = { ...linkedData };
        
        // تحسين الثقة بناءً على عوامل إضافية
        let confidenceBoost = 0;
        
        // 1. إذا كان هناك سياق محادثة متطابق
        if (context.conversationHistory) {
        const convoText = context.conversationHistory.join(' ');
        const itemText = this.getItemText(linkedData.data);
    
        if (convoText.includes(itemText.substring(0, 20))) {
        confidenceBoost += 0.15;
       }
      }
        
        // 2. إذا كان العنصر شائعاً (تم ربطه مسبقاً بنجاح)
        const fingerprint = linkedData.fingerprint;
        if (fingerprint && this.cacheSystem.patternCache.has(fingerprint)) {
            const pattern = this.cacheSystem.patternCache.get(fingerprint);
            confidenceBoost += Math.min(0.1, pattern.successCount * 0.02);
        }
        
        // 3. إذا كانت البيانات تحتوي على معلومات إضافية
        if (linkedData.data.details || linkedData.data.metadata) {
            confidenceBoost += 0.05;
        }
        
        // تطبيق التحسينات
        enhanced.confidence = Math.min(1, linkedData.confidence + confidenceBoost);
        
        // إضافة اقتراحات سياقية
        enhanced.suggestions = this.generateSuggestions(linkedData, context);
        
        return enhanced;
    }
    
    generateSuggestions(linkedData, context) {
        const suggestions = [];
        
        if (linkedData.confidence > 0.7) {
            suggestions.push('ربط ناجح مع ثقة عالية');
        }
        
        if (linkedData.strategy === 'contextual_similarity') {
            suggestions.push('استفاد من سياق المحادثة');
        }
        
        if (this.cacheSystem.patternCache.has(linkedData.fingerprint)) {
            suggestions.push('تم ربطه مسبقاً بنجاح');
        }
        
        return suggestions;
    }
    
    // ==================== تسجيل الأداء ====================
    recordPerformance(startTime, confidence) {
        const duration = Date.now() - startTime;
        
        this.metrics.responseTimes.push(duration);
        
        // تحديث متوسط الثقة
        const totalConfidence = this.metrics.averageConfidence * (this.metrics.linkingAttempts - 1);
        this.metrics.averageConfidence = (totalConfidence + confidence) / this.metrics.linkingAttempts;
        
        // تحديث نسبة النجاح
        if (confidence > 0.5) {
            this.metrics.successRate = 
                ((this.metrics.successRate * (this.metrics.linkingAttempts - 1)) + 1) / 
                this.metrics.linkingAttempts;
        }
        
        // حفظ الذاكرة المؤقتة كل 10 محاولات
        if (this.metrics.linkingAttempts % 10 === 0) {
            this.savePersistentCache();
        }
    }
    
    // ==================== الوظائف العامة ====================
    getPerformanceReport() {
        const averageResponseTime = this.metrics.responseTimes.length > 0
            ? this.metrics.responseTimes.reduce((a, b) => a + b, 0) / this.metrics.responseTimes.length
            : 0;
        
        const uptime = Date.now() - this.metrics.startTime;
        
        return {
            status: this.isInitialized ? 'نشط' : 'غير مهيأ',
            uptime: `${Math.floor(uptime / 1000)} ثانية`,
            totalAttempts: this.metrics.linkingAttempts,
            cacheHits: this.metrics.cacheHits,
            cacheHitRate: this.metrics.linkingAttempts > 0
                ? (this.metrics.cacheHits / this.metrics.linkingAttempts * 100).toFixed(1) + '%'
                : '0%',
            averageConfidence: this.metrics.averageConfidence.toFixed(3),
            successRate: (this.metrics.successRate * 100).toFixed(1) + '%',
            averageResponseTime: averageResponseTime.toFixed(0) + 'ms',
            cacheSize: this.cacheSystem.longTerm.size,
            learnedPatterns: this.cacheSystem.patternCache.size
        };
    }
    
    resetCache() {
        this.cacheSystem.shortTerm.clear();
        this.cacheSystem.longTerm.clear();
        this.cacheSystem.patternCache.clear();
        localStorage.removeItem('data_linking_cache');
        console.log('🗑️ تم مسح الذاكرة المؤقتة');
    }
    
    // ==================== نظام التوسيع ====================
    registerMatchingStrategy(name, matchingFunction) {
        this.extensions.matchingStrategies.push(name);
        
        // إضافة الدالة كطريقة في الكائن
        this[`match_${name}`] = matchingFunction;
        
        console.log(`✅ تم تسجيل استراتيجية مطابقة جديدة: ${name}`);
    }
    
    registerPreProcessor(name, processorFunction) {
        this.extensions.preProcessors.push({ name, processor: processorFunction });
    }
    
    registerPostProcessor(name, processorFunction) {
        this.extensions.postProcessors.push({ name, processor: processorFunction });
    }
    
    // ==================== التعلم من المستخدم ====================
    learnFromUserChoice(vectorResult, userChoice, userQuery) {
        const fingerprint = this.textProcessors.createFingerprint(
            vectorResult.metadata?.text_preview || ''
        );
        
        // تحديث نمط الربط
        if (this.cacheSystem.patternCache.has(fingerprint)) {
            const pattern = this.cacheSystem.patternCache.get(fingerprint);
            pattern.successCount++;
            pattern.lastSuccess = Date.now();
            pattern.userQuery = userQuery;
        } else {
            this.cacheSystem.patternCache.set(fingerprint, {
                successCount: 1,
                lastSuccess: Date.now(),
                userQuery: userQuery,
                firstLearned: Date.now()
            });
        }
        
        console.log(`🎓 تعلم من اختيار المستخدم: ${fingerprint}`);
        this.savePersistentCache();
    }
}

// ==================== التصدير ====================
window.DataLinkingEngine = DataLinkingEngine;


console.log('✅ DataLinkingEngine V1.0 جاهز للتوسيع');




