/****************************************************************************
 * 🎨 Response Formatter V3 - منسق الردود الذكي لمحرك الربط الذكي V14
 * ════════════════════════════════════════════════════════════════════════════
 * ✅ متوافق كلياً مع Smart Assistant V14 + DataLinkingEngine
 * ✅ عرض معلومات الربط الذكي والاستنتاجات
 * ✅ تصميم كروت تفاعلية ذكية
 * ✅ دعم البدائل والتوصيات الذكية
 ****************************************************************************/

class ResponseFormatterV3 {
    constructor() {
        // نظام الألوان الذكي
        this.cardThemes = {
            // الأنشطة
            activity: { 
                primary: '#2196f3', 
                secondary: '#e3f2fd', 
                icon: '🏭',
                gradient: 'linear-gradient(135deg, #2196f3, #1976d2)'
            },
            activity_full: { 
                primary: '#2196f3', 
                secondary: '#e3f2fd', 
                icon: '🏢',
                gradient: 'linear-gradient(135deg, #2196f3, #0d47a1)'
            },
            activity_specific: { 
                primary: '#03a9f4', 
                secondary: '#e1f5fe', 
                icon: '📋',
                gradient: 'linear-gradient(135deg, #03a9f4, #0277bd)'
            },
            
            // المناطق
            area: { 
                primary: '#4caf50', 
                secondary: '#e8f5e9', 
                icon: '📍',
                gradient: 'linear-gradient(135deg, #4caf50, #2e7d32)'
            },
            area_full: { 
                primary: '#4caf50', 
                secondary: '#e8f5e9', 
                icon: '🏭',
                gradient: 'linear-gradient(135deg, #4caf50, #1b5e20)'
            },
            area_specific: { 
                primary: '#66bb6a', 
                secondary: '#e8f5e9', 
                icon: '🗺️',
                gradient: 'linear-gradient(135deg, #66bb6a, #388e3c)'
            },
            area_list: { 
                primary: '#81c784', 
                secondary: '#f1f8e9', 
                icon: '📊',
                gradient: 'linear-gradient(135deg, #81c784, #43a047)'
            },
            area_count: { 
                primary: '#a5d6a7', 
                secondary: '#f1f8e9', 
                icon: '🔢',
                gradient: 'linear-gradient(135deg, #a5d6a7, #66bb6a)'
            },
            area_dependencies: { 
                primary: '#c8e6c9', 
                secondary: '#f9fbe7', 
                icon: '🏛️',
                gradient: 'linear-gradient(135deg, #c8e6c9, #a5d6a7)'
            },
            
            // القرار 104
            decision104: { 
                primary: '#ff9800', 
                secondary: '#fff3e0', 
                icon: '⭐',
                gradient: 'linear-gradient(135deg, #ff9800, #f57c00)'
            },
            decision104_general: { 
                primary: '#ff9800', 
                secondary: '#fff3e0', 
                icon: '📜',
                gradient: 'linear-gradient(135deg, #ff9800, #e65100)'
            },
            decision104_list: { 
                primary: '#ffb74d', 
                secondary: '#fff8e1', 
                icon: '📋',
                gradient: 'linear-gradient(135deg, #ffb74d, #ff9800)'
            },
            decision104_match: { 
                primary: '#ff9800', 
                secondary: '#fff3e0', 
                icon: '✅',
                gradient: 'linear-gradient(135deg, #ff9800, #f57c00)'
            },
            decision104_not_found: { 
                primary: '#ff9800', 
                secondary: '#fff3e0', 
                icon: '❌',
                gradient: 'linear-gradient(135deg, #ff9800, #f57c00)'
            },
            
            // الأنواع التفاعلية
            confirmation_needed: { 
                primary: '#009688', 
                secondary: '#e0f2f1', 
                icon: '🔢',
                gradient: 'linear-gradient(135deg, #009688, #00796b)'
            },
            clarification_needed: { 
                primary: '#6c757d', 
                secondary: '#e9ecef', 
                icon: '❓',
                gradient: 'linear-gradient(135deg, #6c757d, #495057)'
            },
            
            // الربط الذكي
            smart_link: { 
                primary: '#9c27b0', 
                secondary: '#f3e5f5', 
                icon: '🔗',
                gradient: 'linear-gradient(135deg, #9c27b0, #7b1fa2)'
            },
            genius_insight: { 
                primary: '#00bcd4', 
                secondary: '#e0f7fa', 
                icon: '💡',
                gradient: 'linear-gradient(135deg, #00bcd4, #0097a7)'
            },
            
            // حالات عامة
            error: { 
                primary: '#f44336', 
                secondary: '#ffebee', 
                icon: '⚠️',
                gradient: 'linear-gradient(135deg, #f44336, #c62828)'
            },
            success: { 
                primary: '#4caf50', 
                secondary: '#e8f5e9', 
                icon: '✅',
                gradient: 'linear-gradient(135deg, #4caf50, #2e7d32)'
            },
            info: { 
                primary: '#2196f3', 
                secondary: '#e3f2fd', 
                icon: 'ℹ️',
                gradient: 'linear-gradient(135deg, #2196f3, #0d47a1)'
            },
            no_results: { 
                primary: '#ff9800', 
                secondary: '#fff3e0', 
                icon: '😕',
                gradient: 'linear-gradient(135deg, #ff9800, #f57c00)'
            }
        };
        
        // رموز خاصة بالمعلومات
        this.icons = {
            confidence: '🎯',
            linking: '🔗',
            strategy: '⚙️',
            time: '⏱️',
            source: '📊',
            suggestion: '💡',
            warning: '⚠️',
            success: '✅',
            info: 'ℹ️',
            location: '📍',
            area: '🏭',
            activity: '🏢',
            decision: '⭐',
            license: '📄',
            authority: '🏛️',
            legislation: '⚖️',
            technical: '🔧',
            guide: '📚'
        };
    }
    
    // ==================== التنسيق الرئيسي ====================
    formatResponse(response) {
        if (!response || !response.type) {
            return this.createErrorCard('خطأ في تنسيق الرد: البيانات غير مكتملة');
        }
        
        console.log('🎨 تنسيق رد من نوع:', response.type, 'الثقة:', response.confidence);
        
        // تحديد نوع التنسيق
        switch (response.type) {
            // --- الأنشطة ---
            case 'activity_full':
                return this.formatActivityFull(response);
            case 'activity_specific':
                return this.formatActivitySpecific(response);
            
            // --- المناطق الصناعية ---
            case 'area_full':
                return this.formatAreaFull(response);
            case 'area_specific':
                return this.formatAreaSpecific(response);
            case 'area_list':
                return this.formatAreaList(response);
            case 'area_count':
                return this.formatAreaCount(response);
            case 'area_dependencies':
                return this.formatAreaDependencies(response);
            
            // --- القرار 104 ---
            case 'decision104_general':
                return this.formatDecision104General(response);
            case 'decision104_list':
                return this.formatDecision104List(response);
            case 'decision104_match':
                return this.formatDecision104Match(response);
            case 'decision104_not_found':
                return this.formatDecision104NotFound(response);
            
            // --- الأنواع التفاعلية ---
            case 'confirmation_needed':
                return this.formatConfirmation(response);
            case 'clarification_needed':
                return this.formatClarification(response);
            
            // --- حالات الربط الذكي ---
            case 'smart_link':
                return this.formatSmartLink(response);
            case 'genius_insight':
                return this.formatGeniusInsight(response);
            
            // --- حالات عامة ---
            case 'no_results':
                return this.formatNoResults(response);
            case 'command':
                return this.formatCommand(response);
            case 'help':
                return this.formatHelp(response);
            case 'error':
                return this.createErrorCard(response.text);
            
            default:
                return this.formatGeneralResponse(response);
        }
    }
    
    // ==================== تنسيق الأنشطة (محسنة للربط الذكي) ====================
    formatActivityFull(response) {
        const { activity, confidence } = response;
        const details = activity?.details || {};
        
        let content = `<div class="activity-full-card">`;
        
        // رأس البطاقة مع معلومات النشاط
        content += this.createActivityHeader(activity, confidence);
        
        // معلومات الربط الذكي (إذا وجدت)
        if (activity?._linkingInfo) {
            content += this.formatLinkingInfo(activity._linkingInfo);
        }
        
        // المحتوى الأساسي
        content += `<div class="activity-content">`;
        
        // عرض النص المنسق
        content += `<div class="formatted-text">${this.formatEnhancedText(response.text)}</div>`;
        
        // تفاصيل إضافية
        content += this.createActivityDetails(details);
        
        content += `</div>`;
        
        // أزرار المتابعة الذكية
        content += this.createSmartActionButtons(activity, response);
        
        content += `</div>`;
        
        return this.createEnhancedCard('activity_full', 'تفاصيل النشاط', content, confidence);
    }
    
    formatActivitySpecific(response) {
        const { activity, infoType, confidence } = response;
        const title = this.getSpecificTitle(infoType);
        
        let content = `<div class="activity-specific-card">`;
        
        // رأس البطاقة
        content += `<div class="card-header-mini">
            <span class="mini-icon">${this.getInfoTypeIcon(infoType)}</span>
            <span class="mini-title">${title}</span>
        </div>`;
        
        // معلومات الربط الذكي (إذا وجدت)
        if (activity?._linkingInfo) {
            content += this.formatMiniLinkingInfo(activity._linkingInfo);
        }
        
        // المحتوى
        content += `<div class="specific-content">${this.formatEnhancedText(response.text)}</div>`;
        
        content += `</div>`;
        
        return this.createEnhancedCard('activity_specific', title, content, confidence);
    }
    
    // ==================== تنسيق المناطق ====================
    formatAreaFull(response) {
        const { area, confidence } = response;
        
        let content = `<div class="area-full-card">`;
        
        // رأس البطاقة
        content += this.createAreaHeader(area, confidence);
        
        // معلومات المنطقة
        content += `<div class="area-info-grid">`;
        
        if (area?.governorate) {
            content += `<div class="info-item">
                <span class="info-label">${this.icons.location} المحافظة:</span>
                <span class="info-value">${area.governorate}</span>
            </div>`;
        }
        
        if (area?.dependency) {
            content += `<div class="info-item">
                <span class="info-label">${this.icons.authority} جهة الولاية:</span>
                <span class="info-value">${area.dependency}</span>
            </div>`;
        }
        
        if (area?.area) {
            content += `<div class="info-item">
                <span class="info-label">${this.icons.area} المساحة:</span>
                <span class="info-value">${area.area} فدان</span>
            </div>`;
        }
        
        if (area?.x && area?.y) {
            content += `<div class="info-item">
                <span class="info-label">${this.icons.location} الإحداثيات:</span>
                <span class="info-value">${area.x}, ${area.y}</span>
            </div>`;
        }
        
        content += `</div>`;
        
        // النص المنسق
        content += `<div class="area-content">${this.formatEnhancedText(response.text)}</div>`;
        
        // زر الخريطة
        if (area?.x && area?.y) {
            content += this.createMapButton(area.x, area.y, area.name);
        }
        
        content += `</div>`;
        
        return this.createEnhancedCard('area_full', `منطقة ${area?.name || 'صناعية'}`, content, confidence);
    }
    
    // ==================== تنسيق القرار 104 (محسنة) ====================
    formatDecision104Match(response) {
        const sector = response.sector || 'A';
        const incentive = response.incentive || '50%';
        const confidence = response.confidence || 0.8;
        
        const sectorInfo = sector === 'A' ? 
            { name: 'القطاع (أ)', color: '#198754', incentive: '50%' } : 
            { name: 'القطاع (ب)', color: '#0d6efd', incentive: '30%' };
        
        let content = `<div class="decision-match-card">`;
        
        // رأس البطاقة
        content += `
            <div class="match-header" style="background: ${sectorInfo.color}15; border-color: ${sectorInfo.color}30;">
                <div class="match-icon">🎯</div>
                <div class="match-title">
                    <h3>✅ النشاط مشمول في القرار 104</h3>
                    <div class="match-badge" style="background: ${sectorInfo.color};">
                        ${sectorInfo.name}
                    </div>
                </div>
            </div>
        `;
        
        // معلومات الحوافز
        content += `
            <div class="incentive-box" style="border-color: ${sectorInfo.color};">
                <div class="incentive-icon">💰</div>
                <div class="incentive-content">
                    <div class="incentive-percent" style="color: ${sectorInfo.color};">${incentive}</div>
                    <div class="incentive-label">نسبة الحافز الاستثماري</div>
                </div>
            </div>
        `;
        
        // النص المنسق
        content += `<div class="decision-content">${this.formatEnhancedText(response.text)}</div>`;
        
        // معلومات إضافية
        content += `<div class="decision-info">`;
        
        if (response.metadata?.text_preview) {
            content += `<div class="info-line">
                <span class="info-icon">📋</span>
                <span class="info-text">${response.metadata.text_preview}</span>
            </div>`;
        }
        
        content += `<div class="info-line">
            <span class="info-icon">📅</span>
            <span class="info-text">للمشروعات المنشأة بعد قانون الاستثمار 72 لسنة 2017</span>
        </div>`;
        
        content += `</div>`;
        
        content += `</div>`;
        
        return this.createEnhancedCard('decision104_match', 'فحص القرار 104', content, confidence);
    }
    
    formatDecision104List(response) {
        const { data, sector, confidence } = response;
        
        let content = `<div class="decision-list-card">`;
        
        // رأس البطاقة
        content += `
            <div class="list-header">
                <div class="list-icon">📋</div>
                <div class="list-title">
                    <h3>أنشطة القطاع (${sector})</h3>
                    <div class="list-subtitle">قرار 104 لسنة 2022</div>
                </div>
            </div>
        `;
        
        if (!data || Object.keys(data).length === 0) {
            content += `<div class="empty-list">لا توجد بيانات متاحة</div>`;
        } else {
            content += `<div class="list-container">`;
            
            let categoryCount = 1;
            for (const [category, items] of Object.entries(data)) {
                if (Array.isArray(items) && items.length > 0) {
                    content += `
                        <div class="category-group">
                            <div class="category-header">
                                <span class="category-number">${categoryCount}</span>
                                <span class="category-name">${category}</span>
                                <span class="category-count">(${items.length})</span>
                            </div>
                            <ul class="category-items">`;
                    
                    items.slice(0, 5).forEach(item => {
                        content += `<li class="category-item">${item}</li>`;
                    });
                    
                    if (items.length > 5) {
                        content += `<li class="more-items">... و${items.length - 5} نشاط آخر</li>`;
                    }
                    
                    content += `</ul></div>`;
                    categoryCount++;
                }
            }
            
            content += `</div>`;
            
            // ملخص
            const totalActivities = Object.values(data).reduce((sum, items) => 
                sum + (Array.isArray(items) ? items.length : 0), 0
            );
            
            content += `
                <div class="list-summary">
                    <div class="summary-item">
                        <span class="summary-icon">📊</span>
                        <span class="summary-text">إجمالي الأنشطة: ${totalActivities}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-icon">💰</span>
                        <span class="summary-text">الحافز: ${sector === 'A' ? '50%' : '30%'}</span>
                    </div>
                </div>
            `;
        }
        
        content += `</div>`;
        
        return this.createEnhancedCard('decision104_list', `قائمة القطاع ${sector}`, content, confidence);
    }
    
    // ==================== تنسيق الأنواع التفاعلية ====================
    formatConfirmation(response) {
        const { alternatives, originalQuery } = response;
        
        let content = `<div class="confirmation-card">`;
        
        content += `
            <div class="confirmation-header">
                <div class="confirmation-icon">🤔</div>
                <div class="confirmation-title">
                    <h3>وجدت عدة نتائج متشابهة</h3>
                    <div class="confirmation-subtitle">أيهم تقصد؟</div>
                </div>
            </div>
        `;
        
        content += `<div class="confirmation-text">${this.formatEnhancedText(response.text)}</div>`;
        
        if (alternatives && alternatives.length > 0) {
            content += `<div class="alternatives-list">`;
            
            alternatives.forEach((alt, index) => {
                const text = alt.displayText || alt.text || "بديل";
                const id = alt.id || `alt_${index}`;
                const type = alt.type || 'activity';
                const safeText = text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                
                content += `
                    <div class="alternative-item" onclick="window.smartAssistantUI.selectOption('${id}', '${type}', '${safeText}')">
                        <div class="alternative-number">${index + 1}</div>
                        <div class="alternative-content">
                            <div class="alternative-text">${text}</div>
                            ${alt.score ? `
                            <div class="alternative-meta">
                                <span class="meta-item">
                                    <span class="meta-icon">🎯</span>
                                    <span class="meta-text">${(alt.score * 100).toFixed(0)}% ثقة</span>
                                </span>
                                <span class="meta-item">
                                    <span class="meta-icon">🏷️</span>
                                    <span class="meta-text">${type === 'activity' ? 'نشاط' : 'منطقة'}</span>
                                </span>
                            </div>
                            ` : ''}
                        </div>
                        <div class="alternative-arrow">→</div>
                    </div>
                `;
            });
            
            content += `</div>`;
            
            // تعليمات
            content += `
                <div class="confirmation-instructions">
                    <div class="instruction-item">
                        <span class="instruction-icon">💡</span>
                        <span class="instruction-text">اضغط على الرقم المناسب أو أعد صياغة السؤال</span>
                    </div>
                </div>
            `;
        }
        
        content += `</div>`;
        
        return this.createEnhancedCard('confirmation_needed', 'تأكيد الاختيار', content, 0.4);
    }
    
    formatClarification(response) {
        return this.createEnhancedCard('clarification_needed', 'أحتاج توضيحاً', 
            `<div class="clarification-content">${this.formatEnhancedText(response.text)}</div>`, 
            0.3
        );
    }
    
    // ==================== تنسيق الربط الذكي ====================
    formatSmartLink(response) {
        const { linkingInfo, confidence } = response;
        
        if (!linkingInfo) {
            return this.createErrorCard('معلومات الربط غير متوفرة');
        }
        
        let content = `<div class="smart-link-card">`;
        
        content += `
            <div class="link-header">
                <div class="link-icon">🔗</div>
                <div class="link-title">
                    <h3>معلومات الربط الذكي</h3>
                    <div class="link-subtitle">تم ربط البيانات تلقائياً</div>
                </div>
            </div>
        `;
        
        content += `<div class="link-info-grid">`;
        
        content += `
            <div class="link-info-item">
                <div class="link-info-label">${this.icons.strategy} الاستراتيجية:</div>
                <div class="link-info-value">${this.translateStrategy(linkingInfo.method)}</div>
            </div>
        `;
        
        content += `
            <div class="link-info-item">
                <div class="link-info-label">${this.icons.confidence} الثقة:</div>
                <div class="link-info-value confidence-${linkingInfo.confidence > 0.7 ? 'high' : linkingInfo.confidence > 0.5 ? 'medium' : 'low'}">
                    ${(linkingInfo.confidence * 100).toFixed(1)}%
                </div>
            </div>
        `;
        
        if (linkingInfo.vectorId) {
            content += `
                <div class="link-info-item">
                    <div class="link-info-label">${this.icons.source} المصدر:</div>
                    <div class="link-info-value">${linkingInfo.vectorId.substring(0, 15)}...</div>
                </div>
            `;
        }
        
        if (linkingInfo.timestamp) {
            const time = new Date(linkingInfo.timestamp).toLocaleTimeString('ar-EG');
            content += `
                <div class="link-info-item">
                    <div class="link-info-label">${this.icons.time} الوقت:</div>
                    <div class="link-info-value">${time}</div>
                </div>
            `;
        }
        
        content += `</div>`;
        
        if (response.suggestions && response.suggestions.length > 0) {
            content += `<div class="link-suggestions">`;
            content += `<div class="suggestions-title">${this.icons.suggestion} اقتراحات:</div>`;
            response.suggestions.forEach(suggestion => {
                content += `<div class="suggestion-item">${suggestion}</div>`;
            });
            content += `</div>`;
        }
        
        content += `</div>`;
        
        return this.createEnhancedCard('smart_link', 'الربط الذكي', content, confidence);
    }
    
    formatGeniusInsight(response) {
        const { insight } = response;
        
        if (!insight || !insight.recommendation) {
            return '';
        }
        
        let content = `<div class="genius-insight-card">`;
        
        content += `
            <div class="insight-header">
                <div class="insight-icon">💡</div>
                <div class="insight-title">
                    <h3>التوصية الذكية</h3>
                    <div class="insight-subtitle">تحليل متكامل من المساعد</div>
                </div>
            </div>
        `;
        
        content += `<div class="insight-content">`;
        
        // التوصية الرئيسية
        content += `<div class="insight-recommendation">${insight.recommendation}</div>`;
        
        // المعلومات التفصيلية
        if (insight.legalStatus || insight.incentivePercent || insight.sector) {
            content += `<div class="insight-details">`;
            
            if (insight.legalStatus && insight.legalStatus !== 'تحت الفحص') {
                content += `
                    <div class="detail-item">
                        <span class="detail-icon">⚖️</span>
                        <span class="detail-text">${insight.legalStatus}</span>
                    </div>
                `;
            }
            
            if (insight.incentivePercent && insight.incentivePercent !== '0%') {
                content += `
                    <div class="detail-item">
                        <span class="detail-icon">💰</span>
                        <span class="detail-text">الحافز: ${insight.incentivePercent}</span>
                    </div>
                `;
            }
            
            if (insight.sector) {
                content += `
                    <div class="detail-item">
                        <span class="detail-icon">🏭</span>
                        <span class="detail-text">القطاع: ${insight.sector === 'A' ? 'أ (50%)' : 'ب (30%)'}</span>
                    </div>
                `;
            }
            
            content += `</div>`;
        }
        
        // التنبيه الفني
        if (insight.technicalAlert) {
            content += `
                <div class="technical-alert">
                    <div class="alert-icon">⚠️</div>
                    <div class="alert-content">
                        <div class="alert-title">تنبيه فني</div>
                        <div class="alert-text">${insight.technicalAlert}</div>
                    </div>
                </div>
            `;
        }
        
        content += `</div></div>`;
        
        return this.createEnhancedCard('genius_insight', 'توصية ذكية', content, insight.confidence || 0.7);
    }
    
    // ==================== دوال مساعدة للتنسيق ====================
    createEnhancedCard(type, title, content, confidence = 0.8) {
        const theme = this.cardThemes[type] || this.cardThemes.info;
        const confidenceBar = this.createConfidenceBar(confidence);
        
        return `
            <div class="enhanced-card card-${type}" style="--card-primary: ${theme.primary}; --card-secondary: ${theme.secondary}">
                <div class="card-gradient" style="background: ${theme.gradient}"></div>
                <div class="card-header">
                    <div class="header-icon">${theme.icon}</div>
                    <div class="header-content">
                        <h3 class="card-title">${title}</h3>
                        ${confidence < 0.99 ? `
                        <div class="card-subtitle">
                            <span class="confidence-badge confidence-${confidence > 0.7 ? 'high' : confidence > 0.5 ? 'medium' : 'low'}">
                                ${(confidence * 100).toFixed(0)}% ثقة
                            </span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                <div class="card-body">
                    ${content}
                </div>
                ${confidenceBar}
            </div>
        `;
    }
    
    createConfidenceBar(confidence) {
        if (confidence >= 0.99) return '';
        
        const percent = Math.round(confidence * 100);
        let color = '#4caf50';
        if (percent < 50) color = '#f44336';
        else if (percent < 75) color = '#ff9800';
        
        return `
            <div class="confidence-bar">
                <div class="bar-fill" style="width: ${percent}%; background: ${color};"></div>
                <div class="bar-label">مستوى الثقة: ${percent}%</div>
            </div>
        `;
    }

    // ==================== [إضافة: دوال بناء الكروت المفقودة] ====================
    createActivityDetails(details) {
        let html = '<div class="activity-details-list" style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">';
        
        const rows = [
            { label: '🏛️ الجهة:', value: details.auth },
            { label: '📄 التراخيص:', value: details.req },
            { label: '📍 الموقع:', value: details.loc },
            { label: '⚖️ التشريع:', value: details.leg }
        ];

        rows.forEach(row => {
            if (row.value) {
                html += `
                    <div class="detail-row" style="margin-bottom: 8px; font-size: 0.85rem;">
                        <strong style="color: #666;">${row.label}</strong>
                        <div style="color: #333; margin-top: 2px; padding-right: 10px;">${row.value}</div>
                    </div>`;
            }
        });

        html += '</div>';
        return html;
    }

    createAreaHeader(area, confidence) {
        return `
            <div class="area-header" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="background: #e8f5e9; color: #2e7d32; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📍</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0; font-size: 1.1rem; color: #1b5e20;">${area?.name || 'منطقة غير محددة'}</h3>
                    <small style="color: #666;">${area?.governorate || ''}</small>
                </div>
            </div>`;
    }

    createActivityHeader(activity, confidence) {
        return `
            <div class="activity-header" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="background: #e3f2fd; color: #0d47a1; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🏢</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0; font-size: 1.1rem; color: #0d47a1;">${activity?.text || 'نشاط غير محدد'}</h3>
                    <small style="color: #666;">${activity?.details?.category || 'تصنيف عام'}</small>
                </div>
            </div>`;
    }

    createSmartActionButtons(activity, response) {
        // تم دمجها سابقاً، نضعها هنا للتأكيد
        return `
            <div class="smart-actions" style="display: flex; gap: 8px; margin-top: 15px; border-top: 1px solid #eee; padding-top: 12px;">
                <button class="btn-sm" style="background: #0d6efd; color: white; border: none; padding: 5px 12px; border-radius: 5px; font-size: 0.8rem; cursor: pointer;" onclick="window.assistantUI.sendMessage('ما هي ميزات ${activity.text} في قرار 104؟')">⭐ حوافز 104</button>
                <button class="btn-sm" style="background: #f8f9fa; color: #333; border: 1px solid #ccc; padding: 5px 12px; border-radius: 5px; font-size: 0.8rem; cursor: pointer;" onclick="window.assistantUI.sendMessage('الموقع المناسب لـ ${activity.text}')">📍 الموقع</button>
            </div>`;
    }

    createMapButton(x, y, name) {
        const url = `https://www.google.com/maps?q=${y},${x}`;
        return `
            <div style="margin-top: 15px;">
                <a href="${url}" target="_blank" style="display: block; text-align: center; background: #28a745; color: white; padding: 10px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 0.9rem;">
                    🌍 فتح موقع ${name} على الخريطة
                </a>
            </div>`;
    }
    // ==================== [نهاية الإضافة] ====================
    
    formatEnhancedText(text) {
        if (!text) return '';
        
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="text-italic">$1</em>')
            .replace(/`(.*?)`/g, '<code class="text-code">$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '<span class="bullet-point">•</span>')
            .replace(/^### (.*?)$/gm, '<h3 class="text-h3">$1</h3>')
            .replace(/^## (.*?)$/gm, '<h2 class="text-h2">$1</h2>')
            .replace(/^# (.*?)$/gm, '<h1 class="text-h1">$1</h1>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-link">$1</a>')
            .trim();
    }
    
    createActivityHeader(activity, confidence) {
        if (!activity) return '';
        
        return `
            <div class="activity-header">
                <div class="activity-icon">🏢</div>
                <div class="activity-info">
                    <h3 class="activity-name">${activity.text || 'نشاط'}</h3>
                    ${activity.details?.category ? `
                    <div class="activity-category">${activity.details.category}</div>
                    ` : ''}
                </div>
                ${confidence !== undefined ? `
                <div class="activity-confidence confidence-${confidence > 0.7 ? 'high' : confidence > 0.5 ? 'medium' : 'low'}">
                    ${(confidence * 100).toFixed(0)}%
                </div>
                ` : ''}
            </div>
        `;
    }
    
    formatLinkingInfo(linkingInfo) {
        if (!linkingInfo) return '';
        
        return `
            <div class="linking-info-box">
                <div class="linking-header">
                    <span class="linking-icon">🔗</span>
                    <span class="linking-title">معلومات الربط الذكي</span>
                </div>
                <div class="linking-details">
                    <div class="linking-detail">
                        <span class="detail-label">الطريقة:</span>
                        <span class="detail-value">${this.translateStrategy(linkingInfo.method)}</span>
                    </div>
                    <div class="linking-detail">
                        <span class="detail-label">الثقة:</span>
                        <span class="detail-value confidence-${linkingInfo.confidence > 0.7 ? 'high' : linkingInfo.confidence > 0.5 ? 'medium' : 'low'}">
                            ${(linkingInfo.confidence * 100).toFixed(1)}%
                        </span>
                    </div>
                    ${linkingInfo.timestamp ? `
                    <div class="linking-detail">
                        <span class="detail-label">الوقت:</span>
                        <span class="detail-value">${new Date(linkingInfo.timestamp).toLocaleTimeString('ar-EG')}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    createSmartActionButtons(activity, response) {
        if (!activity) return '';
        
        let buttons = '';
        const details = activity.details || {};
        
        // أزرار حسب نوع المعلومات المتوفرة
        if (details.req || response.text?.includes('ترخيص')) {
            buttons += `
                <button class="action-btn" onclick="window.smartAssistantUI.sendMessage('التراخيص المطلوبة لـ ${activity.text}')">
                    <span class="btn-icon">📄</span>
                    <span class="btn-text">التراخيص</span>
                </button>
            `;
        }
        
        if (details.auth || response.text?.includes('جهة')) {
            buttons += `
                <button class="action-btn" onclick="window.smartAssistantUI.sendMessage('الجهات المختصة بـ ${activity.text}')">
                    <span class="btn-icon">🏛️</span>
                    <span class="btn-text">الجهات</span>
                </button>
            `;
        }
        
        if (details.loc || response.text?.includes('موقع')) {
            buttons += `
                <button class="action-btn" onclick="window.smartAssistantUI.sendMessage('الموقع المناسب لـ ${activity.text}')">
                    <span class="btn-icon">📍</span>
                    <span class="btn-text">الموقع</span>
                </button>
            `;
        }
        
        // زر فحص القرار 104
        buttons += `
            <button class="action-btn primary-btn" onclick="window.smartAssistantUI.sendMessage('هل ${activity.text} مشمول في قرار 104؟')">
                <span class="btn-icon">⭐</span>
                <span class="btn-text">فحص الحوافز</span>
            </button>
        `;
        
        return buttons ? `<div class="action-buttons">${buttons}</div>` : '';
    }
    
    createMapButton(x, y, areaName) {
        const mapUrl = `https://www.google.com/maps?q=${y},${x}`;
        
        return `
            <div class="map-button-container">
                <a href="${mapUrl}" target="_blank" class="map-btn">
                    <span class="btn-icon">🗺️</span>
                    <span class="btn-text">عرض ${areaName} على الخريطة</span>
                </a>
            </div>
        `;
    }
    
    translateStrategy(strategy) {
        const translations = {
            'semantic_keywords': 'كلمات دلالية',
            'enhanced_semantic': 'دلالي محسن',
            'contextual_similarity': 'تشابه سياقي',
            'technical_pattern': 'نمط فني',
            'fallback': 'احتياطي',
            'quick_index': 'فهرس سريع',
            'vector_similarity': 'تشابه متجهي'
        };
        
        return translations[strategy] || strategy;
    }
    
    getSpecificTitle(type) {
        const titles = {
            'licensing': '📄 التراخيص المطلوبة',
            'authorities': '🏛️ الجهات المختصة',
            'legislation': '⚖️ السند التشريعي',
            'location': '📍 الموقع المناسب',
            'requirements': '📋 المتطلبات',
            'cost': '💰 التكلفة المتوقعة',
            'duration': '⏱️ المدة الزمنية',
            'procedures': '📝 الإجراءات'
        };
        return titles[type] || 'تفاصيل النشاط';
    }
    
    getInfoTypeIcon(type) {
        const icons = {
            'licensing': '📄',
            'authorities': '🏛️',
            'legislation': '⚖️',
            'location': '📍',
            'requirements': '📋',
            'cost': '💰',
            'duration': '⏱️',
            'procedures': '📝'
        };
        return icons[type] || '📋';
    }
    
    // ==================== التوافق مع V2 القديم ====================
    createCard(type, title, content, confidence) {
        return this.createEnhancedCard(type, title, content, confidence);
    }
    
    formatText(text) {
        return this.formatEnhancedText(text);
    }
    
    createErrorCard(message) {
        return this.createEnhancedCard('error', 'خطأ', 
            `<div class="error-content">${this.formatEnhancedText(message)}</div>`, 
            0
        );
    }
}

// ==================== التصدير والتهيئة ====================
window.ResponseFormatterV3 = ResponseFormatterV3;
window.ResponseFormatter = ResponseFormatterV3; // للتوافق


console.log('✅ Response Formatter V3 جاهز للربط الذكي');
