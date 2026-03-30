/**
 * CROSSROADS COMMUNITY STEM CENTRE
 * Deterministic Academic Presentation Website
 * Interactive Component Scripts
 * 
 * NON-NEGOTIABLE DATA LOCKS (Section G):
 * - Lean Budget Total: $476,100
 * - Expanded Budget Total: $611,800
 * - Weekly Staffed Hours: 63
 * - Monthly Revenue: $29,000
 * - Monthly Cost: $25,833
 * - Monthly Surplus: $3,167
 * - Survey Respondents: 54
 * - Barrier Percentage: 78%
 * - Interest Percentage: 65%
 */

(function() {
    'use strict';

    // ============================================
    // JSON DATA STRUCTURES (Section D)
    // ============================================

    /**
     * Table 3: Integrated Start-up Budget (First Year)
     * Per proposal Section 3d
     * NON-NEGOTIABLE: Lean = $476,100, Expanded = $611,800
     */
    const BUDGET_DATA = {
        lean: {
            total: 476100,
            label: "Lean Budget",
            items: [
                { category: "Personnel (Salaries)", description: "2 Safety Instructors + Admin Support", amount: 165000 },
                { category: "Equipment and Tooling", description: "3D printers, CNC, electronics, design tools", amount: 68000 },
                { category: "Facility Operations", description: "12 months rent (Langford, inc. NNN), utilities, internet", amount: 120000 },
                { category: "Legal and Insurance", description: "High-risk liability coverage + nonprofit incorporation", amount: 28000 },
                { category: "Marketing and Outreach", description: "School district outreach, branding, signage", amount: 6000 },
                { category: "Development Labor", description: "Student labor from Table 1", amount: 17000 },
                { category: "Equipment Sinking Fund", description: "Future equipment replacement reserve", amount: 10000 },
                { category: "Contingency (15%)", description: "Emergency repairs and working capital", amount: 62100 }
            ]
        },
        expanded: {
            total: 611800,
            label: "Expanded Budget",
            items: [
                { category: "Personnel (Salaries)", description: "2 Safety Instructors + Admin Support", amount: 160000 },
                { category: "Equipment and Tooling", description: "3D printers, CNC, electronics, design tools", amount: 120000 },
                { category: "Facility Operations", description: "12 months rent (Langford, inc. NNN), utilities, internet", amount: 180000 },
                { category: "Legal and Insurance", description: "High-risk liability coverage + nonprofit incorporation", amount: 35000 },
                { category: "Marketing and Outreach", description: "School district outreach, branding, signage", amount: 20000 },
                { category: "Development Labor", description: "Student labor from Table 1", amount: 17000 },
                { category: "Equipment Sinking Fund", description: "Future equipment replacement reserve", amount: 0 },
                { category: "Contingency (15%)", description: "Emergency repairs and working capital", amount: 79800 }
            ]
        }
    };

    /**
     * Table 5: Monthly Break-even Analysis
     * NON-NEGOTIABLE: Revenue $29,000, Costs $25,833, Surplus $3,167
     */
    const BREAKEVEN_DATA = {
        revenue: {
            total: 29000,
            items: [
                { source: "Individual Memberships", amount: 12000 },
                { source: "Drop-in Day Passes", amount: 1500 },
                { source: "Workshop Fees", amount: 4000 },
                { source: "Corporate Training", amount: 2000 },
                { source: "Equipment Surcharges", amount: 1500 },
                { source: "Event and Room Rental", amount: 1000 },
                { source: "Grants and Sponsorships", amount: 7000 }
            ]
        },
        costs: {
            total: 25833,
            items: [
                { expense: "Staff Salaries & Benefits", amount: 13750 },
                { expense: "Facility Lease & Utilities", amount: 10000 },
                { expense: "Insurance, Operations & Legal", amount: 1250 },
                { expense: "Maintenance & Sinking Fund", amount: 833 }
            ]
        },
        surplus: 3167
    };

    /**
     * Clientele Distribution (Pie Chart Data)
     * Per Table 5 in Appendix G
     */
    const CLIENTELE_DATA = [
        { segment: "Curious Beginners", percentage: 35, color: "#004a99" },
        { segment: "Experienced Makers", percentage: 25, color: "#007bff" },
        { segment: "Students & Educators", percentage: 25, color: "#66b2ff" },
        { segment: "Community Builders", percentage: 15, color: "#99ccff" }
    ];

    // ============================================
    // BUDGET TOGGLE FUNCTIONALITY
    // ============================================

    function initBudgetToggle() {
        const toggle = document.getElementById('budget-toggle');
        const budgetBody = document.getElementById('budget-body');
        const leanLabel = document.querySelector('.lean-label');
        const expandedLabel = document.querySelector('.expanded-label');
        const leanCard = document.querySelector('.lean-card');
        const expandedCard = document.querySelector('.expanded-card');
        
        // Table/Chart toggle elements
        const viewTableBtn = document.getElementById('view-table-btn');
        const viewChartBtn = document.getElementById('view-chart-btn');
        const tableContainer = document.getElementById('budget-table-container');
        const chartContainer = document.getElementById('budget-chart-container');
        const tableCaption = document.getElementById('budget-table-caption');
        
        // Infobox elements
        const infoboxTitle = document.getElementById('infobox-title');
        const infoboxDesc = document.getElementById('infobox-desc');

        if (!toggle || !budgetBody) {
            console.warn('Budget toggle elements not found');
            return;
        }
        
        // Current view state
        let currentType = 'lean';
        let currentView = 'table'; // 'table' or 'chart'

        function renderBudget(type) {
            const data = BUDGET_DATA[type];
            let html = '';

            // Update HTML Table
            data.items.forEach(function(item) {
                html += '<tr class="table__row">';
                html += '<td class="table__cell">' + item.category + '</td>';
                html += '<td class="table__cell">' + item.description + '</td>';
                html += '<td class="table__cell val-cell">$' + item.amount.toLocaleString() + '</td>';
                html += '</tr>';
            });

            html += '<tr class="total-row table__row">';
            html += '<th scope="row" colspan="2" class="table__cell">TOTAL</th>';
            html += '<td class="table__cell val-cell"><strong>$' + data.total.toLocaleString() + '</strong></td>';
            html += '</tr>';

            budgetBody.innerHTML = html;
            
            if (tableCaption) {
                tableCaption.textContent = 'Table 2: Integrated Startup Budget (' + (type === 'lean' ? 'Lean' : 'Expanded') + ' Model)';
            }
            
            // Render Plotly chart
            renderPlotlyChart(type);

            // Update InfoBox
            if (infoboxTitle && infoboxDesc) {
                if (type === 'lean') {
                    infoboxTitle.textContent = "Lean Model Price Breakdown";
                    infoboxDesc.textContent = "4,000 sqft facility, core equipment clusters (3D printing, electronics, computing), first year of safety staffing, 15% contingency reserve.";
                } else {
                    infoboxTitle.textContent = "Expanded Model Price Breakdown";
                    infoboxDesc.textContent = "6,000 sqft facility, additional industrial equipment (CNC, expanded fabrication lab), higher-performance computing, dedicated business fiber internet.";
                }
            }

            // Update visual indicators
            if (leanCard && expandedCard) {
                if (type === 'lean') {
                    leanCard.style.opacity = '1';
                    expandedCard.style.opacity = '0.5';
                } else {
                    leanCard.style.opacity = '0.5';
                    expandedCard.style.opacity = '1';
                }
            }

            // Update labels
            if (leanLabel && expandedLabel) {
                leanLabel.style.fontWeight = type === 'lean' ? '700' : '400';
                expandedLabel.style.fontWeight = type === 'expanded' ? '700' : '400';
            }

            // Announce change to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('class', 'sr-only visually-hidden');
            announcement.textContent = 'Budget view changed to ' + data.label + ': $' + data.total.toLocaleString();
            document.body.appendChild(announcement);
            setTimeout(function() {
                document.body.removeChild(announcement);
            }, 1000);
        }
        
        function renderPlotlyChart(type) {
            if (typeof Plotly === 'undefined') return;
            
            const data = BUDGET_DATA[type];
            const labels = data.items.map(item => item.category);
            const values = data.items.map(item => item.amount);
            const descriptions = data.items.map(item => item.description);
            
            const trace = {
                labels: labels,
                values: values,
                text: descriptions,
                hovertemplate: '<b>%{label}</b><br>%{text}<br>Amount: $%{value:,}<br>Percentage: %{percent}<extra></extra>',
                type: 'pie',
                hole: 0.4,
                marker: {
                    colors: [
                        '#002855', // dark blue
                        '#004a99', // primary blue
                        '#0066cc', // light blue
                        '#e67e22', // accent orange
                        '#f39c12', // light orange
                        '#198754', // success green
                        '#8b5cf6', // purple (sinking fund)
                        '#666666'  // dark gray
                    ]
                }
            };
            
            const layout = {
                title: data.label + ' Breakdown ($' + data.total.toLocaleString() + ')',
                font: { family: '"Segoe UI", system-ui, -apple-system, sans-serif' },
                margin: { t: 50, b: 20, l: 20, r: 20 },
                showlegend: true,
                legend: { orientation: 'h', y: -0.1 }
            };
            
            const config = { responsive: true, displayModeBar: false };
            
            Plotly.newPlot('plotly-budget-chart', [trace], layout, config);
        }

        toggle.addEventListener('change', function() {
            currentType = this.checked ? 'expanded' : 'lean';
            renderBudget(currentType);
        });
        
        // Handle View Toggles (Table vs Chart)
        if (viewTableBtn && viewChartBtn && tableContainer && chartContainer) {
            viewTableBtn.addEventListener('click', function() {
                viewTableBtn.classList.replace('btn--outline', 'btn--primary');
                viewChartBtn.classList.replace('btn--primary', 'btn--outline');
                viewTableBtn.setAttribute('aria-pressed', 'true');
                viewChartBtn.setAttribute('aria-pressed', 'false');
                
                tableContainer.style.display = 'block';
                chartContainer.style.display = 'none';
                currentView = 'table';
            });
            
            viewChartBtn.addEventListener('click', function() {
                viewChartBtn.classList.replace('btn--outline', 'btn--primary');
                viewTableBtn.classList.replace('btn--primary', 'btn--outline');
                viewChartBtn.setAttribute('aria-pressed', 'true');
                viewTableBtn.setAttribute('aria-pressed', 'false');
                
                tableContainer.style.display = 'none';
                chartContainer.style.display = 'block';
                currentView = 'chart';
                
                // Re-render chart to ensure proper sizing when made visible
                renderPlotlyChart(currentType);
            });
        }

        // Initialize with lean budget
        renderBudget('lean');
    }

    // ============================================
    // TAB FUNCTIONALITY
    // ============================================

    function initTabs() {
        const tabContainers = document.querySelectorAll('.tabs');

        tabContainers.forEach(function(container) {
            const tabs = container.querySelectorAll('.tab-link');
            const panels = container.querySelectorAll('.tab-content');

            tabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    const target = this.getAttribute('data-tab');

                    // Update tabs
                    tabs.forEach(function(t) {
                        t.classList.remove('active');
                        t.setAttribute('aria-selected', 'false');
                    });
                    this.classList.add('active');
                    this.setAttribute('aria-selected', 'true');

                    // Update panels
                    panels.forEach(function(panel) {
                        panel.classList.remove('active');
                        panel.setAttribute('hidden', '');
                    });
                    
                    var targetPanel = document.getElementById(target);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                        targetPanel.removeAttribute('hidden');
                    }
                });

                // Keyboard navigation
                tab.addEventListener('keydown', function(e) {
                    var index = Array.from(tabs).indexOf(this);
                    var nextIndex;

                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        nextIndex = (index + 1) % tabs.length;
                        tabs[nextIndex].focus();
                        tabs[nextIndex].click();
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        nextIndex = (index - 1 + tabs.length) % tabs.length;
                        tabs[nextIndex].focus();
                        tabs[nextIndex].click();
                    } else if (e.key === 'Home') {
                        e.preventDefault();
                        tabs[0].focus();
                        tabs[0].click();
                    } else if (e.key === 'End') {
                        e.preventDefault();
                        tabs[tabs.length - 1].focus();
                        tabs[tabs.length - 1].click();
                    }
                });
            });
        });
    }

    // ============================================
    // ACCORDION FUNCTIONALITY
    // ============================================

    function initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        accordionHeaders.forEach(function(header) {
            header.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true';
                const panelId = this.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);

                // Toggle this panel
                this.setAttribute('aria-expanded', String(!expanded));
                if (panel) {
                    if (expanded) {
                        panel.setAttribute('hidden', '');
                    } else {
                        panel.removeAttribute('hidden');
                    }
                }
            });

            // Keyboard support
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // ============================================
    // SVG CHART RENDERING
    // ============================================

    function renderClientelePieChart() {
        const container = document.getElementById('clientele-chart');
        if (!container) return;

        const size = 200;
        const radius = size / 2 - 10;
        const center = size / 2;

        let svg = '<svg viewBox="0 0 ' + size + ' ' + size + '" class="chart" role="img" aria-labelledby="pie-title pie-desc">';
        svg += '<title id="pie-title">Target Clientele Distribution</title>';
        
        // Generate dynamic description from the actual data
        const descText = CLIENTELE_DATA.map(item => `${item.segment} ${item.percentage}%`).join(', ');
        svg += '<desc id="pie-desc">Pie chart showing: ' + descText + '</desc>';

        let startAngle = -90; // Start at top

        CLIENTELE_DATA.forEach(function(item) {
            const angle = (item.percentage / 100) * 360;
            const endAngle = startAngle + angle;

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = center + radius * Math.cos(startRad);
            const y1 = center + radius * Math.sin(startRad);
            const x2 = center + radius * Math.cos(endRad);
            const y2 = center + radius * Math.sin(endRad);

            const largeArc = angle > 180 ? 1 : 0;

            const pathData = [
                'M', center, center,
                'L', x1, y1,
                'A', radius, radius, 0, largeArc, 1, x2, y2,
                'Z'
            ].join(' ');

            svg += '<path d="' + pathData + '" fill="' + item.color + '" stroke="#fff" stroke-width="2">';
            svg += '<title>' + item.segment + ': ' + item.percentage + '%</title>';
            svg += '</path>';

            startAngle = endAngle;
        });

        svg += '</svg>';

        // Legend
        svg += '<ul class="chart-legend">';
        CLIENTELE_DATA.forEach(function(item) {
            svg += '<li><span class="swatch" style="background-color: ' + item.color + '"></span>' + item.segment + ' (' + item.percentage + '%)</li>';
        });
        svg += '</ul>';

        container.innerHTML = svg;
    }

    function renderBreakevenBarChart() {
        const container = document.getElementById('breakeven-chart');
        if (!container) return;

        const width = 400;
        const height = 250;
        const barWidth = 80;
        const maxValue = 40000;
        const scale = (height - 50) / maxValue;

        let svg = '<svg viewBox="0 0 ' + width + ' ' + height + '" class="chart bar-chart" role="img" aria-labelledby="bar-title bar-desc">';
        svg += '<title id="bar-title">Monthly Break-even Analysis</title>';
        svg += '<desc id="bar-desc">Bar chart comparing monthly revenue ($29,000), costs ($25,833), and surplus ($3,167)</desc>';

        // Background grid lines
        for (let i = 0; i <= 4; i++) {
            const y = height - 30 - (i * 10000 * scale);
            svg += '<line x1="50" y1="' + y + '" x2="' + (width - 30) + '" y2="' + y + '" stroke="#e0e0e0" stroke-dasharray="4,4"/>';
            svg += '<text x="45" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="#666">$' + (i * 10) + 'k</text>';
        }

        // Baseline
        svg += '<line x1="50" y1="' + (height - 30) + '" x2="' + (width - 30) + '" y2="' + (height - 30) + '" stroke="#333" stroke-width="2"/>';

        // Revenue bar
        const revenueHeight = BREAKEVEN_DATA.revenue.total * scale;
        svg += '<rect x="80" y="' + (height - 30 - revenueHeight) + '" width="' + barWidth + '" height="' + revenueHeight + '" fill="#004a99" rx="4">';
        svg += '<title>Revenue: $' + BREAKEVEN_DATA.revenue.total.toLocaleString() + '</title>';
        svg += '</rect>';
        svg += '<text x="120" y="' + (height - 10) + '" text-anchor="middle" font-size="12" font-weight="600">Revenue</text>';
        svg += '<text x="120" y="' + (height - 35 - revenueHeight) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#004a99">$' + BREAKEVEN_DATA.revenue.total.toLocaleString() + '</text>';

        // Costs bar
        const costsHeight = BREAKEVEN_DATA.costs.total * scale;
        svg += '<rect x="180" y="' + (height - 30 - costsHeight) + '" width="' + barWidth + '" height="' + costsHeight + '" fill="#dc3545" rx="4">';
        svg += '<title>Costs: $' + BREAKEVEN_DATA.costs.total.toLocaleString() + '</title>';
        svg += '</rect>';
        svg += '<text x="220" y="' + (height - 10) + '" text-anchor="middle" font-size="12" font-weight="600">Costs</text>';
        svg += '<text x="220" y="' + (height - 35 - costsHeight) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#dc3545">$' + BREAKEVEN_DATA.costs.total.toLocaleString() + '</text>';

        // Surplus bar
        const surplusHeight = BREAKEVEN_DATA.surplus * scale;
        svg += '<rect x="280" y="' + (height - 30 - surplusHeight) + '" width="' + barWidth + '" height="' + surplusHeight + '" fill="#198754" rx="4">';
        svg += '<title>Surplus: $' + BREAKEVEN_DATA.surplus.toLocaleString() + '</title>';
        svg += '</rect>';
        svg += '<text x="320" y="' + (height - 10) + '" text-anchor="middle" font-size="12" font-weight="600">Surplus</text>';
        svg += '<text x="320" y="' + (height - 35 - surplusHeight) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#198754">$' + BREAKEVEN_DATA.surplus.toLocaleString() + '</text>';

        svg += '</svg>';

        // Summary text
        svg += '<p class="chart-summary" style="text-align: center; margin-top: 1rem; font-size: 0.9rem; color: #666;">';
        svg += '<strong>Monthly Surplus:</strong> $' + BREAKEVEN_DATA.surplus.toLocaleString() + ' (Revenue $' + BREAKEVEN_DATA.revenue.total.toLocaleString() + ' − Costs $' + BREAKEVEN_DATA.costs.total.toLocaleString() + ')';
        svg += '</p>';

        container.innerHTML = svg;
    }

    // ============================================
    // CSV EXPORT FUNCTIONALITY
    // ============================================

    function exportTableToCSV(tableId, filename) {
        const table = document.getElementById(tableId);
        if (!table) {
            console.error('Table not found:', tableId);
            return;
        }

        let csv = [];
        const rows = table.querySelectorAll('tr');

        rows.forEach(function(row) {
            const cols = row.querySelectorAll('th, td');
            const rowData = [];
            
            cols.forEach(function(col) {
                // Clean the text: remove currency symbols for numeric cells, escape quotes
                let text = col.innerText.trim();
                // Escape double quotes
                text = text.replace(/"/g, '""');
                // Wrap in quotes if contains comma or newline
                if (text.indexOf(',') !== -1 || text.indexOf('\n') !== -1) {
                    text = '"' + text + '"';
                }
                rowData.push(text);
            });
            
            csv.push(rowData.join(','));
        });

        // Create and download
        const csvContent = csv.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Attach export function to global scope for button onclick handlers
    window.exportTableToCSV = exportTableToCSV;

    // ============================================
    // SMOOTH SCROLL ENHANCEMENT
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.anchor-nav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update focus for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    // ============================================
    // ACTIVE NAV HIGHLIGHTING
    // ============================================

    function initActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.anchor-nav a');

        if (sections.length === 0 || navLinks.length === 0) return;

        function updateActiveNav() {
            const navHeight = document.querySelector('.anchor-nav').offsetHeight;
            const scrollPosition = window.scrollY + navHeight + 100;

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        // Debounce scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveNav, 50);
        });

        // Initial check
        updateActiveNav();
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Initialize all interactive components
        initBudgetToggle();
        initTabs();
        initAccordion();
        renderClientelePieChart();
        renderBreakevenBarChart();
        initSmoothScroll();
        initActiveNavHighlight();

        console.log('Crossroads STEM Centre website initialized');
        console.log('Data Locks Verified:');
        console.log('  - Lean Budget: $' + BUDGET_DATA.lean.total.toLocaleString());
        console.log('  - Expanded Budget: $' + BUDGET_DATA.expanded.total.toLocaleString());
        console.log('  - Monthly Revenue: $' + BREAKEVEN_DATA.revenue.total.toLocaleString());
        console.log('  - Monthly Costs: $' + BREAKEVEN_DATA.costs.total.toLocaleString());
        console.log('  - Monthly Surplus: $' + BREAKEVEN_DATA.surplus.toLocaleString());
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
