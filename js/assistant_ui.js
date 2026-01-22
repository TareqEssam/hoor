/****************************************************************************
 * 🎨 Assistant UI V2 - الواجهة التفاعلية المحسنة لمحرك الربط الذكي V14
 * ════════════════════════════════════════════════════════════════════════════
 * ✅ متوافق كلياً مع Smart Assistant V14 + DataLinkingEngine
 * ✅ عرض معلومات الربط الذكي والتوصيات الاستنتاجية
 * ✅ دعم البدائل المتعددة والتأكيدات
 * ✅ إحصائيات أداء متقدمة
 * ✅ نظام ملاحظات ذكية
 ****************************************************************************/

class AssistantUIV2 {
    constructor() {
        // المكونات الأساسية
        this.voice = null;
        this.formatter = null;
        
        // عناصر DOM
        this.elements = {};
        
        // الحالة
        this.isOpen = false;
        this.isMinimized = false;
        this.currentMode = 'text';
        this.currentAssistant = null;
        
        // الإعدادات
        this.settings = {
            autoScroll: true,
            soundEffects: true,
            showLinkingInfo: true,
            showConfidence: true,
            darkMode: false
        };
        
        // السياق
        this.context = {
            lastQuery: null,
            lastResponse: null,
            conversationDepth: 0,
            awaitingConfirmation: false,
            currentAlternatives: []
        };
        
        this.initialize();
    }
    
    // ==================== التهيئة المتقدمة ====================
    async initialize() {
        try {
            console.log('🚀 Assistant UI V2 - التهيئة للربط الذكي...');
            
            // إنشاء عناصر الواجهة
            this.createEnhancedUI();
            
            // تهيئة المكونات
            await this.initializeComponents();
            
            // ربط الأحداث
            this.bindEnhancedEvents();
            
            // البحث عن المساعد الذكي المناسب
            this.detectAssistant();
            
            // عرض رسالة ترحيب ذكية
            this.showSmartWelcome();
            
            console.log('✅ واجهة المساعد UI V2 جاهزة للربط الذكي');
            
        } catch (error) {
            console.error('❌ فشل تهيئة الواجهة:', error);
            this.createFallbackUI();
        }
    }
    
    // ==================== الكشف الذكي عن المساعد ====================
    detectAssistant() {
        // البحث عن أفضل نسخة متاحة
        if (window.finalAssistantV14) {
            this.currentAssistant = window.finalAssistantV14;
            console.log('🤖 تم الكشف عن المساعد V14');
        } else if (window.smartAssistant && window.smartAssistant.linkingEnabled) {
            this.currentAssistant = window.smartAssistant;
            console.log('🤖 تم الكشف عن المساعد V14 (smartAssistant)');
        } else if (window.finalAssistantV13) {
            this.currentAssistant = window.finalAssistantV13;
            console.log('🤖 تم الكشف عن المساعد V13 (بدون ربط ذكي)');
        } else {
            console.warn('⚠️ لم يتم العثور على مساعد ذكي نشط');
            this.showAssistantWarning();
        }
    }
    
    // ==================== إنشاء واجهة محسنة ====================
    createEnhancedUI() {
        // الأيقونة العائمة الذكية
        const fab = document.createElement('div');
        fab.id = 'smart-assistant-fab';
        fab.className = 'smart-assistant-fab';
        fab.innerHTML = `
            <div class="fab-icon">
                <i class="fas fa-brain"></i>
                <span class="fab-badge" id="linking-badge"></span>
            </div>
            <div class="fab-pulse"></div>
            <div class="fab-tooltip">المساعد الذكي V14</div>
        `;
        document.body.appendChild(fab);
        this.elements.fab = fab;
        
        // نافذة المحادثة المتقدمة
        const chatWindow = document.createElement('div');
        chatWindow.id = 'smart-assistant-window';
        chatWindow.className = 'smart-assistant-window';
        chatWindow.innerHTML = this.createEnhancedWindowHTML();
        document.body.appendChild(chatWindow);
        this.elements.window = chatWindow;
        this.elements.window.style.display = 'none';

        
        // تخزين المراجع
        this.cacheDOMReferences();
    }
    
    createEnhancedWindowHTML() {
        return `
            <div class="smart-chat-header">
                <div class="header-left">
                    <div class="assistant-avatar">
                        <i class="fas fa-robot"></i>
                        <span class="avatar-status" id="assistant-status"></span>
                    </div>
                    <div class="header-info">
                        <div class="assistant-name">
                            المساعد الذكي V14
                            <span class="version-badge">محرك الربط الذكي</span>
                        </div>
                        <div class="assistant-subtitle" id="assistant-subtitle">
                            جاهز للربط الذكي بين القواعد
                        </div>
                    </div>
                </div>
                <div class="header-right">
                    <button id="stats-btn" class="header-btn" title="إحصائيات الربط">
                        <span class="btn-icon"><i class="fas fa-chart-line"></i></span>
                    </button>
                    <button id="settings-btn" class="header-btn" title="الإعدادات">
                        <span class="btn-icon"><i class="fas fa-cog"></i></span>
                    </button>
                    <button id="mute-btn" class="header-btn" title="كتم الصوت">
                        <span class="btn-icon"><i class="fas fa-volume-up"></i></span>
                    </button>
                    <button id="minimize-btn" class="header-btn" title="تصغير">
                        <span class="btn-icon"><i class="fas fa-minus"></i></span>
                    </button>
                    <button id="close-btn" class="header-btn" title="إغلاق">
                        <span class="btn-icon"><i class="fas fa-times"></i></span>
                    </button>
                </div>
            </div>
            
            <div class="smart-status-bar">
                <div class="status-left">
                    <div class="status-item" id="linking-status">
                        <i class="fas fa-link"></i>
                        <span>الربط الذكي: نشط</span>
                    </div>
                    <div class="status-item" id="memory-status">
                        <i class="fas fa-memory"></i>
                        <span>الذاكرة: 20 رسالة</span>
                    </div>
                </div>
                <div class="status-right">
                    <div class="status-item" id="confidence-display">
                        <i class="fas fa-bullseye"></i>
                        <span>الثقة: --</span>
                    </div>
                </div>
            </div>
            
            <div class="smart-messages-container" id="smart-messages">
                <!-- الرسائل تُضاف هنا ديناميكياً -->
            </div>
            
            <div class="smart-thinking-indicator" id="thinking-indicator">
                <div class="thinking-header">
                    <div class="thinking-icon">
                        <div class="spinner"></div>
                    </div>
                    <div class="thinking-text">
                        <div class="thinking-title">جاري البحث الذكي</div>
                        <div class="thinking-subtitle" id="thinking-subtitle">فحص الأنشطة والمناطق والحوافز...</div>
                    </div>
                </div>
                <div class="thinking-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="thinking-progress"></div>
                    </div>
                    <div class="progress-steps">
                        <span class="step active">تحليل الاستعلام</span>
                        <span class="step">الربط الذكي</span>
                        <span class="step">الاستنتاج الذكي</span>
                        <span class="step">تنسيق الرد</span>
                    </div>
                </div>
            </div>
            
            <div class="smart-input-area">
                <div class="input-header">
                    <div class="input-tabs">
                        <button class="tab-btn active" data-tab="text">
                            <i class="fas fa-keyboard"></i> كتابة
                        </button>
                        <button class="tab-btn" data-tab="voice" id="voice-tab-btn">
                            <i class="fas fa-microphone"></i> صوت
                        </button>
                        <button class="tab-btn" data-tab="quick" id="quick-tab-btn">
                            <i class="fas fa-bolt"></i> سريع
                        </button>
                    </div>
                    <div class="input-actions">
                        <button id="clear-btn" class="action-btn" title="مسح المحادثة">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button id="help-btn" class="action-btn" title="المساعدة">
                            <i class="fas fa-question-circle"></i>
                        </button>
                    </div>
                </div>
                
                <div class="tab-content active" id="text-tab">
                    <div class="input-container">
                        <textarea 
                            id="smart-chat-input" 
                            placeholder="اكتب سؤالك هنا... مثال: 'ما تراخيص فندق 5 نجوم في العاشر من رمضان؟'"
                            rows="2"
                            autocomplete="off"
                        ></textarea>
                        <button id="send-btn" class="send-btn">
                            <i class="fas fa-paper-plane"></i>
                            <span>إرسال</span>
                        </button>
                    </div>
                </div>
                
                <div class="tab-content" id="voice-tab">
                    <div class="voice-container">
                        <div class="voice-visualizer" id="voice-visualizer">
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                            <div class="voice-bar"></div>
                        </div>
                        <div class="voice-controls">
                            <button id="start-voice-btn" class="voice-btn">
                                <i class="fas fa-microphone"></i>
                                <span>ابدأ التحدث</span>
                            </button>
                            <div class="voice-feedback" id="voice-feedback">
                                جاري الاستماع...
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="quick-tab">
                    <div class="quick-queries">
                        <div class="quick-title">استفسارات سريعة:</div>
                        <div class="quick-grid">
                            <button class="quick-btn" data-query="تراخيص فندق 5 نجوم">
                                🏨 فندق 5 نجوم
                            </button>
                            <button class="quick-btn" data-query="منطقة العاشر من رمضان">
                                🏭 منطقة العاشر
                            </button>
                            <button class="quick-btn" data-query="ما هو القرار 104">
                                ⭐ القرار 104
                            </button>
                            <button class="quick-btn" data-query="هل مصنع الأدوية مشمول في 104">
                                💊 مصنع أدوية
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="input-footer">
                    <div class="footer-tips" id="typing-tips">
                        💡 حاول: "ما تكلفة مصنع أدوية في برج العرب"
                    </div>
                    <div class="footer-stats">
                        <span id="char-count">0/500</span>
                    </div>
                </div>
            </div>
            
            <!-- نافذة الإعدادات -->
            <div class="settings-panel" id="settings-panel">
                <div class="settings-header">
                    <h3><i class="fas fa-cog"></i> إعدادات المساعد الذكي</h3>
                    <button class="close-settings" id="close-settings">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="settings-content">
                    <div class="setting-group">
                        <h4><i class="fas fa-link"></i> إعدادات الربط الذكي</h4>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="toggle-linking" checked>
                                <span>تفعيل الربط الذكي</span>
                            </label>
                            <div class="setting-desc">ربط تلقائي بين الأنشطة والمناطق والقرار 104</div>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="show-confidence" checked>
                                <span>عرض مؤشر الثقة</span>
                            </label>
                        </div>
                    </div>
                    <div class="setting-group">
                        <h4><i class="fas fa-comments"></i> إعدادات المحادثة</h4>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="auto-scroll" checked>
                                <span>التمرير التلقائي</span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="sound-effects" checked>
                                <span>الأصوات التأثيرية</span>
                            </label>
                        </div>
                    </div>
                    <div class="setting-group">
                        <h4><i class="fas fa-chart-bar"></i> الأداء</h4>
                        <button class="btn btn-secondary" id="clear-cache">
                            <i class="fas fa-trash"></i> مسح الذاكرة المؤقتة
                        </button>
                        <button class="btn btn-secondary" id="reset-stats">
                            <i class="fas fa-redo"></i> إعادة تعيين الإحصائيات
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    cacheDOMReferences() {
        // العناصر الرئيسية
        this.elements.header = this.elements.window.querySelector('.smart-chat-header');
        this.elements.messagesContainer = this.elements.window.querySelector('.smart-messages-container');
        this.elements.inputArea = this.elements.window.querySelector('.smart-input-area');
        this.elements.textInput = this.elements.window.querySelector('#smart-chat-input');
        this.elements.sendBtn = this.elements.window.querySelector('#send-btn');
        
        // أزرار التحكم
        this.elements.statsBtn = this.elements.window.querySelector('#stats-btn');
        this.elements.settingsBtn = this.elements.window.querySelector('#settings-btn');
        this.elements.muteBtn = this.elements.window.querySelector('#mute-btn');
        this.elements.closeBtn = this.elements.window.querySelector('#close-btn');
        this.elements.minimizeBtn = this.elements.window.querySelector('#minimize-btn');
        this.elements.clearBtn = this.elements.window.querySelector('#clear-btn');
        this.elements.helpBtn = this.elements.window.querySelector('#help-btn');
        
        // مؤشرات الحالة
        this.elements.linkingStatus = this.elements.window.querySelector('#linking-status');
        this.elements.memoryStatus = this.elements.window.querySelector('#memory-status');
        this.elements.confidenceDisplay = this.elements.window.querySelector('#confidence-display');
        this.elements.thinkingIndicator = this.elements.window.querySelector('#smart-thinking-indicator');
        this.elements.thinkingSubtitle = this.elements.window.querySelector('#thinking-subtitle');
        this.elements.thinkingProgress = this.elements.window.querySelector('#thinking-progress');
        this.elements.assistantStatus = this.elements.window.querySelector('#assistant-status');
        this.elements.assistantSubtitle = this.elements.window.querySelector('#assistant-subtitle');
        
        // علامات التبويب
        this.elements.tabBtns = this.elements.window.querySelectorAll('.tab-btn');
        this.elements.tabContents = this.elements.window.querySelectorAll('.tab-content');
        
        // الإعدادات
        this.elements.settingsPanel = this.elements.window.querySelector('#settings-panel');
        this.elements.toggleLinking = this.elements.window.querySelector('#toggle-linking');
        this.elements.closeSettings = this.elements.window.querySelector('#close-settings');
        
        // الصوت
        this.elements.voiceTabBtn = this.elements.window.querySelector('#voice-tab-btn');
        this.elements.startVoiceBtn = this.elements.window.querySelector('#start-voice-btn');
        this.elements.voiceFeedback = this.elements.window.querySelector('#voice-feedback');
        
        // الاستفسارات السريعة
        this.elements.quickBtns = this.elements.window.querySelectorAll('.quick-btn');
    }
    
    // ==================== تهيئة المكونات ====================
    async initializeComponents() {
        // تهيئة منسق الردود
        this.formatter = new ResponseFormatter();
        
        // تهيئة الصوت (إذا كان متاحاً)
        if (window.VoiceHandler) {
            this.voice = new VoiceHandler(
                (transcript, confidence) => this.handleVoiceResult(transcript, confidence),
                (error) => this.handleVoiceError(error)
            );
        } else {
            this.elements.voiceTabBtn.style.display = 'none';
        }
        // دالة التحكم في فتح وإغلاق النافذة
    toggleWindow() {
        if (this.isOpen) {
            this.closeWindow();
        } else {
            this.openWindow();
        }
   
        // استعادة الإعدادات
        this.restoreSettings();
        
        // تحديث الحالة
        this.updateStatusDisplay();
    }
    
    // ==================== دوال مساعدة للإعدادات ====================
    restoreSettings() {
        try {
            const saved = localStorage.getItem('assistant_ui_settings_v2');
            if (saved) {
                this.settings = JSON.parse(saved);
                console.log('✅ تم استعادة الإعدادات');
            }
        } catch (e) {
            console.warn('⚠️ فشل استعادة الإعدادات:', e);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('assistant_ui_settings_v2', JSON.stringify(this.settings));
        } catch (e) {
            console.warn('⚠️ فشل حفظ الإعدادات:', e);
        }
    }

    // ==================== دوال تحديث الحالة ====================
    updateStatusDisplay() {
        // تحديث حالة الربط الذكي
        if (this.currentAssistant && this.elements.linkingStatus) {
            const linkingStatus = this.currentAssistant.linkingEnabled ? 'نشط' : 'معطل';
            this.elements.linkingStatus.innerHTML = `
                <i class="fas fa-link"></i>
                <span>الربط الذكي: ${linkingStatus}</span>
            `;
        }
        
        // تحديث حالة الذاكرة
        if (this.elements.memoryStatus) {
            const memoryCount = this.context?.conversationDepth || 0;
            this.elements.memoryStatus.innerHTML = `
                <i class="fas fa-memory"></i>
                <span>الذاكرة: ${memoryCount} رسالة</span>
            `;
        }
        
        // تحديث الحالة العامة للمساعد
        if (this.elements.assistantStatus) {
            if (this.currentAssistant) {
                this.elements.assistantStatus.className = 'avatar-status status-active';
                this.elements.assistantStatus.title = 'المساعد نشط';
            } else {
                this.elements.assistantStatus.className = 'avatar-status status-inactive';
                this.elements.assistantStatus.title = 'المساعد غير متصل';
            }
        }
        
        // تحديث العنوان الفرعي
        if (this.elements.assistantSubtitle) {
            if (this.currentAssistant) {
                this.elements.assistantSubtitle.textContent = 'جاهز للربط الذكي بين القواعد';
            } else {
                this.elements.assistantSubtitle.textContent = 'المساعد غير متوفر';
            }
        }
        
        // تحديث مؤشر الثقة
        if (this.elements.confidenceDisplay) {
            this.updateConfidenceDisplay(0.5); // قيمة افتراضية
        }
    }
    
    updateConfidenceDisplay(confidence) {
        if (!this.elements.confidenceDisplay || !this.settings.showConfidence) return;
        
        const percent = Math.round(confidence * 100);
        let color = '#4caf50';
        
        if (percent < 50) color = '#f44336';
        else if (percent < 75) color = '#ff9800';
        
        this.elements.confidenceDisplay.innerHTML = `
            <i class="fas fa-bullseye"></i>
            <span>الثقة: <span style="color: ${color}">${percent}%</span></span>
        `;
    }

    createFallbackUI() {
        console.log('🔄 إنشاء واجهة الطوارئ البسيطة...');
        
        const fallbackDiv = document.createElement('div');
        fallbackDiv.id = 'assistant-fallback';
        fallbackDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 15px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        fallbackDiv.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #4caf50; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                    <i class="fas fa-robot"></i>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 16px;">المساعد الذكي (وضع الطوارئ)</h3>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">الواجهة المتقدمة غير متوفرة</p>
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <textarea id="fallback-input" 
                    placeholder="اكتب سؤالك هنا..." 
                    style="width: 100%; height: 60px; padding: 8px; border: 1px solid #ddd; border-radius: 5px; resize: none; font-family: inherit;"></textarea>
            </div>
            
            <button id="fallback-send" 
                    style="width: 100%; padding: 10px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                <i class="fas fa-paper-plane"></i> إرسال
            </button>
            
            <div id="fallback-response" 
                 style="margin-top: 15px; padding: 10px; background: #f5f5f5; border-radius: 5px; max-height: 200px; overflow-y: auto; font-size: 14px; display: none;">
            </div>
        `;
        
        document.body.appendChild(fallbackDiv);
        
        // ربط الأحداث
        const sendBtn = document.getElementById('fallback-send');
        const inputField = document.getElementById('fallback-input');
        const responseDiv = document.getElementById('fallback-response');
        
        sendBtn.addEventListener('click', () => {
            const query = inputField.value.trim();
            if (!query) return;
            
            responseDiv.style.display = 'block';
            responseDiv.innerHTML = '<div style="color: #666; text-align: center;"><i class="fas fa-spinner fa-spin"></i> جاري المعالجة...</div>';
            
            if (this.currentAssistant) {
                this.currentAssistant.query(query)
                    .then(response => {
                        responseDiv.innerHTML = `
                            <div style="color: #333; margin-bottom: 10px;"><strong>السؤال:</strong> ${query}</div>
                            <div style="color: #4caf50; margin-bottom: 10px;"><strong>الإجابة:</strong></div>
                            <div style="background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #4caf50;">
                                ${response.text.replace(/\n/g, '<br>')}
                            </div>
                        `;
                        inputField.value = '';
                    })
                    .catch(error => {
                        responseDiv.innerHTML = `
                            <div style="color: #f44336;">
                                <strong>خطأ:</strong> ${error.message || 'حدث خطأ غير متوقع'}
                            </div>
                        `;
                    });
            } else {
                responseDiv.innerHTML = `
                    <div style="color: #f44336;">
                        <strong>تحذير:</strong> المساعد الذكي غير متوفر حالياً
                    </div>
                `;
            }
        });
        
        // السماح بالإرسال بالزر Enter
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        });
    }
    
    // ==================== ربط الأحداث المحسنة ====================
    bindEnhancedEvents() {
        // التحكم بالنافذة
        this.elements.fab.addEventListener('click', () => this.toggleWindow());
        this.elements.closeBtn.addEventListener('click', () => this.closeWindow());
        this.elements.minimizeBtn.addEventListener('click', () => this.minimizeWindow());
        
        // إرسال الرسائل
        this.elements.sendBtn.addEventListener('click', () => this.sendTextMessage());
        this.elements.textInput.addEventListener('input', (e) => this.handleInputChange(e));
        this.elements.textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendTextMessage();
            }
        });
        
        // علامات التبويب
        this.elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        
        // الاستفسارات السريعة
        this.elements.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sendMessage(btn.dataset.query);
            });
        });
        
        // الإعدادات والإحصائيات
        this.elements.settingsBtn.addEventListener('click', () => this.toggleSettings());
        this.elements.statsBtn.addEventListener('click', () => this.showLinkingStats());
        this.elements.clearBtn.addEventListener('click', () => this.clearConversation());
        this.elements.helpBtn.addEventListener('click', () => this.showHelp());
        
        // إعدادات الربط الذكي
        this.elements.toggleLinking.addEventListener('change', (e) => {
            this.toggleLinking(e.target.checked);
        });
        this.elements.closeSettings.addEventListener('click', () => this.toggleSettings(false));
        
        // الصوت
        if (this.voice) {
            this.elements.startVoiceBtn.addEventListener('click', () => this.toggleVoice());
            this.elements.muteBtn.addEventListener('click', () => this.toggleMute());
        } else {
            this.elements.muteBtn.style.display = 'none';
        }
        
        // جعل النافذة قابلة للسحب
        // دالة جعل النافذة قابلة للسحب
    makeDraggable() {
        const header = this.elements.header;
        const win = this.elements.window;
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        header.onmousedown = (e) => {
            isDragging = true;
            initialX = e.clientX - win.offsetLeft;
            initialY = e.clientY - win.offsetTop;
        };

        document.onmousemove = (e) => {
            if (isDragging) {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                win.style.left = currentX + 'px';
                win.style.top = currentY + 'px';
                win.style.bottom = 'auto';
                win.style.right = 'auto';
            }
        };

        document.onmouseup = () => isDragging = false;
    }

    // دالة كتم الصوت
    toggleMute() {
        if (!this.voice) return;
        const isMuted = this.voice.toggleMute();
        this.elements.muteBtn.innerHTML = isMuted ? 
            '<span class="btn-icon"><i class="fas fa-volume-mute"></i></span>' : 
            '<span class="btn-icon"><i class="fas fa-volume-up"></i></span>';
    }

    // دالة تبديل وضع الصوت
    toggleVoice() {
        if (!this.voice) return;
        if (this.voice.isListening) {
            this.voice.stopListening();
            this.elements.startVoiceBtn.innerHTML = '<i class="fas fa-microphone"></i> <span>ابدأ التحدث</span>';
            this.elements.voiceFeedback.style.display = 'none';
        } else {
            this.voice.startListening();
            this.elements.startVoiceBtn.innerHTML = '<i class="fas fa-stop"></i> <span>إيقاف</span>';
            this.elements.voiceFeedback.style.display = 'block';
        }
    }
    
    // دالة استخراج النص للنطق (مطلوبة لـ V14)
    extractSpeechText(response) {
        return response.text.replace(/[*#_]/g, '').substring(0, 200);
    }
    
    
    // ==================== المعالجة الأساسية ====================
    async processQuery(query) {
        if (!query.trim()) return;
        
        // إضافة رسالة المستخدم
        this.addMessage('user', query);
        
        // التحقق من وجود المساعد
        if (!this.currentAssistant) {
            this.showError('المساعد الذكي غير متوفر. يرجى التحديث.');
            return;
        }
        
        // عرض مؤشر التفكير
        this.showThinking(true);
        
        try {
            console.log(`🤖 إرسال استعلام إلى المساعد V14: "${query}"`);
            
            // إرسال الاستعلام
            const response = await this.currentAssistant.query(query);
            
            // إخفاء مؤشر التفكير
            this.showThinking(false);
            
            // تحديث سياق المحادثة
            this.context.lastQuery = query;
            this.context.lastResponse = response;
            this.context.conversationDepth++;
            
            // التعامل مع الحالات الخاصة
            if (this.handleSpecialCases(response)) return;
            
            // تنسيق وعرض الرد
            this.displayResponse(response);
            
            // تحديث الإحصائيات والعرض
            this.updateAfterResponse(response);
            
        } catch (error) {
            console.error('❌ خطأ في معالجة الاستعلام:', error);
            this.showThinking(false);
            this.showError(`حدث خطأ تقني: ${error.message}`);
        }
    }
    
    // ==================== عرض الرد ====================
    async displayResponse(response) {
        // تنسيق الرد
        const formattedHTML = this.formatter.formatResponse(response);
        
        // إضافة رسالة المساعد
        this.addMessage('assistant', formattedHTML, true);
        
        // عرض معلومات الربط الذكي إذا كانت موجودة
        if (response._linkingInfo && this.settings.showLinkingInfo) {
            this.showLinkingInfo(response._linkingInfo);
        }
        
        // عرض التوصيات الاستنتاجية إذا كانت موجودة
        if (response.geniusInsight) {
            this.showGeniusInsight(response.geniusInsight);
        }
        
        // تحديث مؤشر الثقة
        if (response.confidence !== undefined) {
            this.updateConfidenceDisplay(response.confidence);
        }
        
        // القراءة الصوتية
        if (this.currentMode === 'voice' && this.voice && response.text) {
            const speechText = this.extractSpeechText(response);
            this.voice.speak(speechText);
        }
    }
    
    // ==================== دوال العرض الخاصة ====================
    showLinkingInfo(linkingInfo) {
        const infoHTML = `
            <div class="linking-info-card">
                <div class="linking-header">
                    <i class="fas fa-link"></i>
                    <span>معلومات الربط الذكي</span>
                </div>
                <div class="linking-content">
                    <div class="linking-item">
                        <span class="label">الطريقة:</span>
                        <span class="value">${linkingInfo.method || 'غير معروف'}</span>
                    </div>
                    <div class="linking-item">
                        <span class="label">الثقة:</span>
                        <span class="value confidence-${linkingInfo.confidence > 0.7 ? 'high' : linkingInfo.confidence > 0.5 ? 'medium' : 'low'}">
                            ${(linkingInfo.confidence * 100).toFixed(1)}%
                        </span>
                    </div>
                    <div class="linking-item">
                        <span class="label">المصدر:</span>
                        <span class="value">${linkingInfo.vectorId || 'نظام المتجهات'}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.addMessage('system', infoHTML, true);
    }
    
    showGeniusInsight(insight) {
        if (!insight.recommendation) return;
        
        const insightHTML = `
            <div class="genius-insight-card">
                <div class="insight-header">
                    <i class="fas fa-lightbulb"></i>
                    <span>💡 التوصية الذكية</span>
                </div>
                <div class="insight-content">
                    ${insight.recommendation.split('\n').map(line => `<p>${line}</p>`).join('')}
                    ${insight.technicalAlert ? `
                    <div class="technical-alert">
                        <i class="fas fa-exclamation-triangle"></i>
                        ${insight.technicalAlert}
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        this.addMessage('system', insightHTML, true);
    }
    
    showLinkingStats() {
        if (!this.currentAssistant || !this.currentAssistant.getLinkingPerformance) {
            this.showError('معلومات الربط غير متوفرة');
            return;
        }
        
        try {
            const stats = this.currentAssistant.getLinkingPerformance();
            
            const statsHTML = `
                <div class="stats-card">
                    <div class="stats-header">
                        <i class="fas fa-chart-line"></i>
                        <span>📊 إحصائيات الربط الذكي</span>
                    </div>
                    <div class="stats-content">
                        ${stats.engine ? `
                        <div class="engine-stats">
                            <h4>محرك الربط</h4>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <span class="stat-label">الحالة:</span>
                                    <span class="stat-value">${stats.engine.status}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">المحاولات:</span>
                                    <span class="stat-value">${stats.engine.totalAttempts}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">ضربات التخزين:</span>
                                    <span class="stat-value">${stats.engine.cacheHits}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">معدل النجاح:</span>
                                    <span class="stat-value">${stats.engine.successRate}</span>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                        
                        ${stats.assistant ? `
                        <div class="assistant-stats">
                            <h4>المساعد الذكي</h4>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <span class="stat-label">إجمالي محاولات الربط:</span>
                                    <span class="stat-value">${stats.assistant.totalAttempts}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">الربط الناجح:</span>
                                    <span class="stat-value">${stats.assistant.successfulLinks}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">معدل النجاح:</span>
                                    <span class="stat-value">${stats.assistant.successRate}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">متوسط الثقة:</span>
                                    <span class="stat-value">${stats.assistant.averageConfidence}</span>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            
            this.addMessage('system', statsHTML, true);
            
        } catch (error) {
            console.error('❌ خطأ في جلب الإحصائيات:', error);
            this.showError('تعذر جلب إحصائيات الربط');
        }
    }
    
    // ==================== إدارة الرسائل ====================
    addMessage(sender, content, isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `smart-message message-${sender}`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-avatar user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble user-bubble">
                        ${isHTML ? content : this.escapeHtml(content)}
                    </div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            `;
        } else if (sender === 'assistant') {
            messageDiv.innerHTML = `
                <div class="message-avatar assistant-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble assistant-bubble">
                        ${isHTML ? content : this.escapeHtml(content)}
                    </div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            `;
        } else if (sender === 'system') {
            messageDiv.innerHTML = `
                <div class="system-message">
                    ${isHTML ? content : this.escapeHtml(content)}
                </div>
            `;
        }
        
        this.elements.messagesContainer.appendChild(messageDiv);
        
        if (this.settings.autoScroll) {
            this.scrollToBottom();
        }
    }
    
    // ==================== دوال مساعدة ====================
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    showThinking(show) {
        if (show) {
            this.elements.thinkingIndicator.style.display = 'block';
            this.startThinkingAnimation();
        } else {
            this.elements.thinkingIndicator.style.display = 'none';
            this.stopThinkingAnimation();
        }
        
        if (show && this.settings.autoScroll) {
            setTimeout(() => this.scrollToBottom(), 100);
        }
    }
    
    startThinkingAnimation() {
        let progress = 0;
        const steps = [
            'تحليل الاستعلام...',
            'البحث في الأنشطة...',
            'الربط مع المناطق...',
            'فحص القرار 104...',
            'التوليد الذكي...'
        ];
        
        this.thinkingInterval = setInterval(() => {
            progress += 20;
            if (progress > 100) progress = 0;
            
            this.elements.thinkingProgress.style.width = `${progress}%`;
            
            const stepIndex = Math.floor(progress / 20);
            if (stepIndex < steps.length) {
                this.elements.thinkingSubtitle.textContent = steps[stepIndex];
            }
        }, 500);
    }
    
    stopThinkingAnimation() {
        if (this.thinkingInterval) {
            clearInterval(this.thinkingInterval);
            this.thinkingInterval = null;
        }
    }
    
    // ==================== الواجهة العامة ====================
    sendMessage(text) {
        if (!this.isOpen) this.openWindow();
        
        setTimeout(() => {
            this.elements.textInput.value = text;
            this.elements.textInput.focus();
            this.sendTextMessage();
        }, 100);
    }
    
    selectOption(id, type, text) {
        if (!this.currentAssistant || !this.currentAssistant.showDetails) {
            this.showError('الدالة غير متوفرة في هذا المساعد');
            return;
        }
        
        const displayText = text.length > 50 ? text.substring(0, 50) + "..." : text;
        this.addMessage('user', displayText);
        
        this.showThinking(true);
        
        this.currentAssistant.showDetails(id, type, text)
            .then(response => {
                this.showThinking(false);
                this.displayResponse(response);
            })
            .catch(error => {
                console.error('❌ خطأ في اختيار البديل:', error);
                this.showThinking(false);
                this.showError('تعذر جلب التفاصيل');
            });
    }
    
    toggleLinking(enabled) {
        if (this.currentAssistant && this.currentAssistant.linkingEnabled !== undefined) {
            this.currentAssistant.linkingEnabled = enabled;
            this.updateStatusDisplay();
        }
    }
    
    // ==================== التحكم بالنافذة ====================
    openWindow() {
        this.elements.window.classList.add('open');
        this.elements.fab.classList.add('hidden');
        this.isOpen = true;
        this.isMinimized = false;
        setTimeout(() => this.elements.textInput.focus(), 300);
    }
    
    closeWindow() {
        this.elements.window.classList.remove('open');
        this.elements.fab.classList.remove('hidden');
        this.isOpen = false;
        
        if (this.voice && this.voice.isListening) {
            this.voice.stopListening();
        }
        if (this.voice && this.voice.isSpeaking) {
            this.voice.stopSpeaking();
        }
    }
    
    minimizeWindow() {
        this.isMinimized = !this.isMinimized;
        this.elements.window.classList.toggle('minimized', this.isMinimized);
    }
    
    // ==================== دوال إضافية ====================
    showSmartWelcome() {
        const welcomeText = `🎉 **مرحباً بك في المساعد الذكي V14**\n\n${'═'.repeat(60)}\n\n🧠 **مميزات النظام الجديد:**\n• ربط ذكي بين الأنشطة والمناطق والقرار 104\n• محرك بحث دلالي متقدم\n• ذاكرة محادثة عميقة (20 رسالة)\n• استفسار ذكي عند الغموض\n• إحصائيات أداء متقدمة\n\n💡 **جرب:**\n• "تراخيص فندق 5 نجوم"\n• "ما هو القرار 104"\n• "منطقة العاشر من رمضان"\n\n${'═'.repeat(60)}`;
        
        setTimeout(() => {
            this.addMessage('assistant', welcomeText);
        }, 1000);
    }
    
    showAssistantWarning() {
        const warningHTML = `
            <div class="warning-message">
                <i class="fas fa-exclamation-triangle"></i>
                <div class="warning-content">
                    <div class="warning-title">تحذير: المساعد الذكي غير متوفر</div>
                    <div class="warning-text">
                        لم يتم العثور على Smart Assistant V14.<br>
                        يرجى التأكد من تحميل ملف smart_assistant_v14.js
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.addMessage('system', warningHTML, true);
        }, 1500);
    }
    
    handleVoiceResult(transcript, confidence) {
        if (confidence > 0.7) {
            this.sendMessage(transcript);
        } else {
            this.showError(`لم أفهم الصوت بوضوح (ثقة: ${(confidence * 100).toFixed(0)}%). يرجى المحاولة مرة أخرى.`);
        }
    }
    
    handleVoiceError(error) {
        console.error('❌ خطأ في الصوت:', error);
        this.showError('حدث خطأ في التعرف على الصوت. يرجى استخدام الكتابة.');
    }
    
    showError(message) {
        const errorHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.addMessage('system', errorHTML, true);
    }
    
    switchTab(tabName) {
        // إخفاء جميع المحتويات
        this.elements.tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // إلغاء تنشيط جميع الأزرار
        this.elements.tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // إظهار المحتوى المحدد
        const tabContent = document.getElementById(`${tabName}-tab`);
        if (tabContent) {
            tabContent.classList.add('active');
        }
        
        // تنشيط الزر المحدد
        const activeBtn = Array.from(this.elements.tabBtns).find(btn => btn.dataset.tab === tabName);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        this.currentMode = tabName;
    }
    
    sendTextMessage() {
        const text = this.elements.textInput.value.trim();
        if (!text) return;
        
        this.processQuery(text);
        this.elements.textInput.value = '';
    }
    
    handleInputChange(e) {
        const charCount = e.target.value.length;
        const charCountElement = document.getElementById('char-count');
        if (charCountElement) {
            charCountElement.textContent = `${charCount}/500`;
        }
    }
    
    toggleSettings(show) {
        if (typeof show === 'undefined') {
            show = !this.elements.settingsPanel.classList.contains('active');
        }
        
        if (show) {
            this.elements.settingsPanel.classList.add('active');
        } else {
            this.elements.settingsPanel.classList.remove('active');
        }
    }
    
    toggleVoice() {
        if (!this.voice) return;
        
        if (this.voice.isListening) {
            this.voice.stopListening();
            this.elements.voiceFeedback.textContent = 'متوقف';
            this.elements.startVoiceBtn.innerHTML = '<i class="fas fa-microphone"></i><span>ابدأ التحدث</span>';
        } else {
            this.voice.startListening();
            this.elements.voiceFeedback.textContent = 'جاري الاستماع...';
            this.elements.startVoiceBtn.innerHTML = '<i class="fas fa-stop"></i><span>توقف</span>';
        }
    }
    
    toggleMute() {
        if (!this.voice) return;
        
        this.voice.toggleMute();
        const isMuted = this.voice.isMuted;
        this.elements.muteBtn.innerHTML = `
            <span class="btn-icon">
                <i class="fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
            </span>
        `;
        this.elements.muteBtn.title = isMuted ? 'تشغيل الصوت' : 'كتم الصوت';
    }
    
    clearConversation() {
        this.elements.messagesContainer.innerHTML = '';
        this.context.conversationDepth = 0;
        this.context.lastQuery = null;
        this.context.lastResponse = null;
        this.context.currentAlternatives = [];
        this.context.awaitingConfirmation = false;
        
        this.updateStatusDisplay();
        
        const clearedMessage = '✅ تم مسح المحادثة بنجاح. جاهز لاستقبال استفسارات جديدة.';
        this.addMessage('system', clearedMessage);
    }
    
    showHelp() {
        const helpHTML = `
            <div class="help-card">
                <div class="help-header">
                    <i class="fas fa-question-circle"></i>
                    <span>🎯 دليل استخدام المساعد الذكي V14</span>
                </div>
                <div class="help-content">
                    <div class="help-section">
                        <h4>📋 أنواع الاستفسارات المدعومة:</h4>
                        <ul>
                            <li><strong>الأنشطة:</strong> "تراخيص فندق 5 نجوم"</li>
                            <li><strong>المناطق:</strong> "منطقة العاشر من رمضان"</li>
                            <li><strong>القرار 104:</strong> "ما هو القرار 104"</li>
                            <li><strong>الربط الذكي:</strong> "هل مصنع أدوية مشمول في 104"</li>
                        </ul>
                    </div>
                    
                    <div class="help-section">
                        <h4>⚡ الاستفسارات السريعة:</h4>
                        <div class="quick-help">
                            <button class="help-quick-btn" onclick="window.smartAssistantUI.sendMessage('تراخيص فندق 5 نجوم')">
                                🏨 فندق 5 نجوم
                            </button>
                            <button class="help-quick-btn" onclick="window.smartAssistantUI.sendMessage('منطقة العاشر من رمضان')">
                                🏭 منطقة العاشر
                            </button>
                            <button class="help-quick-btn" onclick="window.smartAssistantUI.sendMessage('ما هو القرار 104')">
                                ⭐ القرار 104
                            </button>
                        </div>
                    </div>
                    
                    <div class="help-section">
                        <h4>🔧 المميزات المتقدمة:</h4>
                        <ul>
                            <li>الربط الذكي بين القواعد</li>
                            <li>ذاكرة محادثة 20 رسالة</li>
                            <li>تأكيد المستخدم عند الغموض</li>
                            <li>إحصائيات أداء مفصلة</li>
                            <li>دعم الصوت والكتابة</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        this.addMessage('system', helpHTML, true);
    }
    
    handleSpecialCases(response) {
        if (response.type === 'confirmation_needed' && response.alternatives) {
            this.showConfirmationDialog(response.alternatives, response.originalQuery);
            return true;
        }
        
        if (response.type === 'clarification_needed') {
            return true;
        }
        
        return false;
    }
    
    showConfirmationDialog(alternatives, originalQuery) {
        const dialogHTML = `
            <div class="confirmation-dialog">
                <div class="dialog-header">
                    <i class="fas fa-question-circle"></i>
                    <span>اختر النتيجة الصحيحة:</span>
                </div>
                <div class="dialog-content">
                    <div class="alternatives-list">
                        ${alternatives.map((alt, index) => `
                            <div class="alternative-item" data-id="${alt.id}" data-type="${alt.type}">
                                <div class="alt-number">${index + 1}</div>
                                <div class="alt-content">
                                    <div class="alt-text">${alt.displayText}</div>
                                    <div class="alt-confidence">ثقة: ${(alt.score * 100).toFixed(1)}%</div>
                                </div>
                                <button class="alt-select-btn" data-index="${index}">اختيار</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="dialog-footer">
                    <button class="dialog-btn cancel-btn">إلغاء</button>
                    <button class="dialog-btn retry-btn">إعادة صياغة السؤال</button>
                </div>
            </div>
        `;
        
        this.addMessage('system', dialogHTML, true);
        
        // ربط أحداث الأزرار
        setTimeout(() => {
            const messageContainer = this.elements.messagesContainer;
            const lastMessage = messageContainer.lastElementChild;
            
            lastMessage.querySelectorAll('.alt-select-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    const alternative = alternatives[index];
                    
                    if (this.currentAssistant && this.currentAssistant.showDetails) {
                        this.selectOption(alternative.id, alternative.type, alternative.displayText);
                    }
                });
            });
            
            lastMessage.querySelector('.cancel-btn').addEventListener('click', () => {
                this.addMessage('user', 'ألغيت الاختيار');
            });
            
            lastMessage.querySelector('.retry-btn').addEventListener('click', () => {
                this.addMessage('user', 'سأعيد صياغة السؤال: ' + originalQuery);
                setTimeout(() => {
                    this.sendMessage(originalQuery);
                }, 500);
            });
        }, 100);
    }
    
    extractSpeechText(response) {
        // استخراج النص المناسب للقراءة الصوتية من الرد
        if (typeof response.text === 'string') {
            // إزالة التنسيق والرموز الخاصة
            return response.text
                .replace(/\*\*/g, '')
                .replace(/═+/g, '')
                .replace(/🎯|🧠|📋|📍|⚖️|🏛️|💰|🎉|💡|⚠️|❌|✅|🔗|📊|⚡|🔍|⏱️|📂|🎓|📦|🗺️|🏨|🏭|⭐|💊/g, '')
                .replace(/\n\n+/g, '. ')
                .replace(/\n/g, ' ')
                .trim();
        }
        return 'نفذ الأمر بنجاح';
    }
    
    updateAfterResponse(response) {
        // تحديث إحصائيات السياق
        this.context.conversationDepth++;
        
        // تحديث مؤشر الثقة إذا كان موجوداً
        if (response.confidence !== undefined) {
            this.updateConfidenceDisplay(response.confidence);
        }
        
        // تحديث حالة الذاكرة
        this.updateStatusDisplay();
    }
    
    scrollToBottom() {
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    }
    
    makeDraggable() {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        
        const header = this.elements.header;
        const windowElement = this.elements.window;
        
        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        
        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
            }
        }
        
        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                xOffset = currentX;
                yOffset = currentY;
                
                setTranslate(currentX, currentY, windowElement);
            }
        }
        
        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }
        
        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    }
    
    // ==================== التوافق مع V13 ====================
    // للحفاظ على التوافق مع الكود القديم
    selectActivity(activityText) {
        this.sendMessage(activityText);
    }
}

// ==================== تهيئة عند التحميل ====================
document.addEventListener('DOMContentLoaded', () => {
    window.smartAssistantUI = new AssistantUIV2();
    window.assistantUI = window.smartAssistantUI; // للتوافق
});




