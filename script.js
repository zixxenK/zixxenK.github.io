/**
 * CROSSROADS COMMUNITY STEM CENTRE
 * Feasibility Simulation Dashboard - V2
 * Interactive Financial Modelling & Decision-Support Tool
 *
 * Architecture: DATA ? CALC ? UI (modular, no frameworks)
 * Charts: Plotly.js (single library)
 *
 * VALIDATED DATA LOCKS:
 *   Lean Startup Total:     $476,100
 *   Expanded Startup Total: $738,300
 *   Monthly Revenue Target: $29,000
 *   Monthly Operating Cost: $25,833
 *   Monthly Surplus:        $3,167
 *   Survey Respondents:     54
 *   Barrier Percentage:     78%
 *   Interest Percentage:    65%
 */

(function () {
    'use strict';

    // ============================================
    // DATA MODULE - Source-of-Truth Constants
    // ============================================

    var DATA = {
        /**
         * Table 3 (Feasibility-Adjusted): Integrated Start-up Budget
         * Lean: feasibility Table 1 ($476,100)
         * Expanded: fully derived from feasibility §6.2 adjustments ($738,300)
         */
        budget: {
            lean: {
                total: 476100,
                label: 'Lean Model',
                items: [
                    { category: 'Personnel (Salaries + Benefits)', description: '2 Safety Instructors + Admin Support', amount: 165000 },
                    { category: 'Equipment and Tooling', description: '3D printers, CNC, electronics, design tools', amount: 68000 },
                    { category: 'Facility Operations', description: '12 months rent (4,000 sqft Langford), utilities, internet', amount: 120000 },
                    { category: 'Legal and Insurance', description: 'High-risk liability coverage + nonprofit incorporation', amount: 28000 },
                    { category: 'Marketing and Outreach', description: 'School district outreach, branding, signage', amount: 6000 },
                    { category: 'Development Labor', description: 'Student labor (850 hrs × $20/hr)', amount: 17000 },
                    { category: 'Equipment Sinking Fund', description: 'Future equipment replacement reserve', amount: 10000 },
                    { category: 'Contingency (15%)', description: 'Emergency repairs and working capital', amount: 62100 }
                ]
            },
            expanded: {
                total: 738300,
                label: 'Expanded Model',
                items: [
                    { category: 'Personnel (Salaries + Benefits)', description: 'Additional instructors + benefits', amount: 230000 },
                    { category: 'Equipment and Tooling', description: 'CNC, expanded fab lab, premium tools', amount: 136000 },
                    { category: 'Facility Operations', description: '12 months rent (6,000 sqft Langford), utilities, fiber', amount: 180000 },
                    { category: 'Legal and Insurance', description: 'Expanded CGL coverage + incorporation', amount: 49000 },
                    { category: 'Marketing and Outreach', description: 'Organic community-driven outreach', amount: 12000 },
                    { category: 'Development Labor', description: 'Student labor (850 hrs × $20/hr)', amount: 17000 },
                    { category: 'Equipment Sinking Fund', description: 'Expanded maintenance and depreciation reserve', amount: 18000 },
                    { category: 'Contingency (15%)', description: 'Emergency repairs and working capital', amount: 96300 }
                ]
            }
        },

        /** Annual operating costs - Feasibility Table 2 */
        operating: {
            lean: {
                total: 310000,
                items: [
                    { category: 'Facility Lease & Utilities', amount: 120000 },
                    { category: 'Personnel (inc. Benefits)', amount: 165000 },
                    { category: 'Maintenance & Sinking Fund', amount: 10000 },
                    { category: 'Insurance, Ops & Legal', amount: 15000 }
                ]
            },
            expanded: {
                total: 450000,
                items: [
                    { category: 'Facility Lease & Utilities', amount: 180000 },
                    { category: 'Personnel (inc. Benefits)', amount: 230000 },
                    { category: 'Maintenance & Sinking Fund', amount: 18000 },
                    { category: 'Insurance, Ops & Legal', amount: 22000 }
                ]
            }
        },

        /** Break-even baseline (lean, feasibility study) */
        breakeven: {
            revenue: 29000,
            cost: 25833,
            surplus: 3167
        },

        /** Revenue breakdown - Proposal Table 4 (7 sources) */
        revenueBreakdown: [
            { source: 'Individual Memberships', unitPrice: '$60/month', target: '200 members', amount: 12000 },
            { source: 'Drop-in Day Passes', unitPrice: '$15/visit', target: '100 visits', amount: 1500 },
            { source: 'Workshop Fees', unitPrice: '$40/attendee', target: '100 attendees', amount: 4000 },
            { source: 'Corporate Training', unitPrice: '$500/session', target: '4 sessions', amount: 2000 },
            { source: 'Equipment Surcharges', unitPrice: '$15/booking', target: '100 bookings', amount: 1500 },
            { source: 'Event and Room Rental', unitPrice: '$250/event', target: '4 events', amount: 1000 },
            { source: 'Grants and Sponsorships', unitPrice: '-', target: '-', amount: 7000 }
        ],

        /** Scenario presets */
        scenarios: {
            best: {
                label: 'Best Case',
                description: 'Strong early adoption with 250 members, equipment cost offset through institutional donations, and 20% higher grant success rates.',
                members: 250, fee: 60,
                workshopRev: 6000, grantRev: 8400, otherRev: 6000,
                annualLease: 120000, annualStaff: 165000,
                annualMaint: 10000, annualInsurance: 15000
            },
            expected: {
                label: 'Expected Case',
                description: 'Baseline projections from the feasibility study: 200 members at $60/month, standard operating costs under the lean model.',
                members: 200, fee: 60,
                workshopRev: 5000, grantRev: 7000, otherRev: 5000,
                annualLease: 120000, annualStaff: 165000,
                annualMaint: 10000, annualInsurance: 15000
            },
            worst: {
                label: 'Worst Case',
                description: 'Slow uptake with only 120 members, grants at 60% of target. Facility and staffing costs remain contractually fixed.',
                members: 120, fee: 60,
                workshopRev: 3000, grantRev: 4200, otherRev: 3500,
                annualLease: 120000, annualStaff: 165000,
                annualMaint: 10000, annualInsurance: 15000
            }
        },

        /** Survey data - Appendix F */
        survey: {
            respondents: 54,
            barrier: 78,
            interest: 65,
            feePreference: '25-50',
            disciplines: [
                { name: '3D Printing / Fabrication', pct: 72 },
                { name: 'Software Development', pct: 58 },
                { name: 'Robotics / Electronics', pct: 54 },
                { name: 'Creative Design', pct: 41 }
            ],
            peakTimes: { evenings: 68, weekends: 59 }
        },

        /** Population & demographics */
        population: { count: 63120, growthRate: 3.95 },

        /** Clientele segments - Appendix G / Table 5 */
        clientele: [
            { segment: 'Curious Beginners', percentage: 35, demographics: 'All ages, no prior technical experience', needs: 'Low-pressure environment to explore STEM interests', color: '#004a99' },
            { segment: 'Experienced Makers', percentage: 25, demographics: 'Hobbyists and professionals', needs: 'Industrial-grade tools; collaborative community', color: '#007bff' },
            { segment: 'Students & Educators', percentage: 25, demographics: 'Post-secondary students; K-12 teachers', needs: 'Supplementary lab time; ADST curriculum resources', color: '#66b2ff' },
            { segment: 'Community Builders', percentage: 15, demographics: 'Retirees, volunteers', needs: 'Social connection through mentorship and events', color: '#99ccff' }
        ],

        /** Slider bounds */
        sliders: {
            members:   { min: 50,  max: 300,    step: 5,    default: 200 },
            fee:       { min: 30,  max: 80,     step: 5,    default: 60 },
            workshop:  { min: 0,   max: 15000,  step: 500,  default: 5000 },
            grant:     { min: 0,   max: 15000,  step: 500,  default: 7000 },
            other:     { min: 0,   max: 15000,  step: 500,  default: 5000 },
            lease:     { min: 60000,  max: 250000, step: 5000, default: 120000 },
            staff:     { min: 100000, max: 300000, step: 5000, default: 165000 },
            maint:     { min: 5000,   max: 30000,  step: 1000, default: 10000 },
            insurance: { min: 5000,   max: 30000,  step: 1000, default: 15000 }
        },

        /** Chart color palette (institutional, non-startup) */
        colors: {
            primary: '#004a99',
            primaryDark: '#002855',
            primaryLight: '#0066cc',
            accent: '#e67e22',
            success: '#198754',
            warning: '#ffc107',
            danger: '#dc3545',
            muted: '#666666',
            pieSequence: ['#002855', '#004a99', '#0066cc', '#e67e22', '#f39c12', '#198754', '#8b5cf6', '#666666']
        }
    };

    // ============================================
    // CALC MODULE - Pure Calculation Functions
    // ============================================

    var CALC = {
        monthlyRevenue: function (members, fee, workshopRev, grantRev, otherRev) {
            return (members * fee) + workshopRev + grantRev + otherRev;
        },

        monthlyCost: function (annualLease, annualStaff, annualMaint, annualInsurance) {
            return Math.round((annualLease + annualStaff + annualMaint + annualInsurance) / 12);
        },

        surplus: function (revenue, cost) {
            return revenue - cost;
        },

        breakevenMembers: function (fee, monthlyCost, otherRevenue) {
            if (fee <= 0) return Infinity;
            return Math.max(0, Math.ceil((monthlyCost - otherRevenue) / fee));
        },

        sensitivityCurve: function (fee, monthlyCost, otherRevenue, minMembers, maxMembers, step) {
            if (minMembers > maxMembers) { var tmp = minMembers; minMembers = maxMembers; maxMembers = tmp; }
            step = step || 5;
            var points = [];
            for (var m = minMembers; m <= maxMembers; m += step) {
                var rev = (m * fee) + otherRevenue;
                points.push({ members: m, surplus: rev - monthlyCost });
            }
            if (points.length < 2) {
                points.push({ members: maxMembers, surplus: (maxMembers * fee) + otherRevenue - monthlyCost });
            }
            return points;
        }
    };

    // ============================================
    // UI MODULE - DOM Manipulation & Rendering
    // ============================================

    var UI = {
        els: {},

        cacheElements: function () {
            var ids = [
                'sidebar-nav', 'budget-toggle', 'budget-body', 'budget-table-caption',
                'lean-label', 'expanded-label', 'lean-card', 'expanded-card',
                'infobox-title', 'infobox-desc',
                'view-table-btn', 'view-chart-btn',
                'budget-table-container', 'budget-chart-container',
                'sim-members', 'sim-members-val', 'sim-fee', 'sim-fee-val',
                'sim-workshop', 'sim-workshop-val', 'sim-grant', 'sim-grant-val',
                'sim-other', 'sim-other-val',
                'cost-lease', 'cost-lease-val', 'cost-staff', 'cost-staff-val',
                'cost-maint', 'cost-maint-val', 'cost-insurance', 'cost-insurance-val',
                'live-revenue', 'live-cost', 'live-surplus', 'live-breakeven',
                'breakeven-indicator', 'breakeven-status',
                'plotly-budget-chart', 'plotly-needs-chart', 'plotly-clientele-chart',
                'plotly-revenue-chart', 'plotly-cost-chart', 'plotly-sensitivity-chart',
                'scenario-desc',
                'total-monthly-cost', 'total-annual-cost'
            ];
            for (var i = 0; i < ids.length; i++) {
                this.els[ids[i]] = document.getElementById(ids[i]);
            }
        },

        formatCurrency: function (n) {
            if (n === Infinity || n === -Infinity) return '∞';
            if (typeof n !== 'number' || isNaN(n)) return '–';
            var rounded = Math.round(n);
            if (rounded < 0) return '-$' + Math.abs(rounded).toLocaleString();
            return '$' + rounded.toLocaleString();
        },

        // --- Budget Section ---
        currentBudgetType: 'lean',
        currentBudgetView: 'table',

        renderBudget: function (type) {
            this.currentBudgetType = type;
            var data = DATA.budget[type];
            var budgetBody = this.els['budget-body'];
            if (!budgetBody) return;

            var html = '';
            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                var pct = ((item.amount / data.total) * 100).toFixed(1);
                html += '<tr class="table__row">';
                html += '<td class="table__cell">' + item.category + '</td>';
                html += '<td class="table__cell">' + item.description + '</td>';
                html += '<td class="table__cell val-cell">' + this.formatCurrency(item.amount) + '</td>';
                html += '<td class="table__cell val-cell">' + pct + '%</td>';
                html += '</tr>';
            }
            html += '<tr class="total-row table__row">';
            html += '<th scope="row" colspan="2" class="table__cell">TOTAL</th>';
            html += '<td class="table__cell val-cell"><strong>' + this.formatCurrency(data.total) + '</strong></td>';
            html += '<td class="table__cell val-cell">100%</td>';
            html += '</tr>';
            budgetBody.innerHTML = html;

            if (this.els['budget-table-caption']) {
                this.els['budget-table-caption'].textContent = 'Table 3: Integrated Startup Budget (' + data.label + ')';
            }
            if (this.els['infobox-title'] && this.els['infobox-desc']) {
                if (type === 'lean') {
                    this.els['infobox-title'].textContent = 'Lean Model Overview';
                    this.els['infobox-desc'].textContent = '4,000 sqft facility, core equipment clusters (3D printing, electronics, computing), first year of safety staffing, 15% contingency reserve. Total: ' + this.formatCurrency(data.total) + '.';
                } else {
                    this.els['infobox-title'].textContent = 'Expanded Model Overview';
                    this.els['infobox-desc'].textContent = '6,000 sqft facility, additional industrial equipment (CNC, expanded fabrication lab), higher-performance computing, dedicated business fiber internet. Total: ' + this.formatCurrency(data.total) + '.';
                }
            }
            var leanCard = this.els['lean-card'];
            var expandedCard = this.els['expanded-card'];
            if (leanCard && expandedCard) {
                leanCard.style.opacity = type === 'lean' ? '1' : '0.5';
                expandedCard.style.opacity = type === 'expanded' ? '1' : '0.5';
            }
            var leanLabel = this.els['lean-label'];
            var expandedLabel = this.els['expanded-label'];
            if (leanLabel) leanLabel.style.fontWeight = type === 'lean' ? '700' : '400';
            if (expandedLabel) expandedLabel.style.fontWeight = type === 'expanded' ? '700' : '400';

            this.renderBudgetChart(type);
        },

        renderBudgetChart: function (type) {
            if (typeof Plotly === 'undefined' || !this.els['plotly-budget-chart']) return;
            var data = DATA.budget[type];
            var trace = {
                labels: data.items.map(function (i) { return i.category; }),
                values: data.items.map(function (i) { return i.amount; }),
                text: data.items.map(function (i) { return i.description; }),
                hovertemplate: '<b>%{label}</b><br>%{text}<br>Amount: $%{value:,}<br>Share: %{percent}<extra></extra>',
                type: 'pie',
                hole: 0.4,
                marker: { colors: DATA.colors.pieSequence }
            };
            var layout = {
                title: { text: data.label + ' Breakdown (' + UI.formatCurrency(data.total) + ')', font: { size: 14 } },
                font: { family: '"Segoe UI", system-ui, sans-serif', size: 12 },
                margin: { t: 50, b: 30, l: 20, r: 20 },
                showlegend: true,
                legend: { orientation: 'h', y: -0.15, font: { size: 10 } },
                height: 420
            };
            Plotly.newPlot(this.els['plotly-budget-chart'], [trace], layout, { responsive: true, displayModeBar: false });
        },

        // --- Needs Analysis Chart ---
        renderNeedsChart: function () {
            if (typeof Plotly === 'undefined' || !this.els['plotly-needs-chart']) return;
            var labels = [
                'Barrier: Lack of Access',
                'Would Use Facility',
                '3D Printing Demand',
                'Software Dev Demand',
                'Robotics Demand',
                'Creative Design Demand'
            ];
            var values = [
                DATA.survey.barrier,
                DATA.survey.interest,
                DATA.survey.disciplines[0].pct,
                DATA.survey.disciplines[1].pct,
                DATA.survey.disciplines[2].pct,
                DATA.survey.disciplines[3].pct
            ];
            var colors = ['#dc3545', '#198754', '#004a99', '#0066cc', '#007bff', '#66b2ff'];
            var trace = {
                y: labels,
                x: values,
                type: 'bar',
                orientation: 'h',
                text: values.map(function (v) { return v + '%'; }),
                textposition: 'outside',
                marker: { color: colors },
                hovertemplate: '<b>%{y}</b>: %{x}%<extra></extra>'
            };
            var layout = {
                title: { text: 'Community Needs Assessment (n=' + DATA.survey.respondents + ')', font: { size: 14 } },
                font: { family: '"Segoe UI", system-ui, sans-serif', size: 12 },
                xaxis: { title: 'Percentage of Respondents', range: [0, 100], dtick: 20 },
                yaxis: { automargin: true },
                margin: { t: 50, b: 50, l: 180, r: 50 },
                height: 350
            };
            Plotly.newPlot(this.els['plotly-needs-chart'], [trace], layout, { responsive: true, displayModeBar: false });
        },

        // --- Clientele Chart ---
        renderClienteleChart: function () {
            if (typeof Plotly === 'undefined' || !this.els['plotly-clientele-chart']) return;
            var trace = {
                labels: DATA.clientele.map(function (c) { return c.segment; }),
                values: DATA.clientele.map(function (c) { return c.percentage; }),
                type: 'pie',
                hole: 0.35,
                marker: { colors: DATA.clientele.map(function (c) { return c.color; }) },
                textinfo: 'label+percent',
                hovertemplate: '<b>%{label}</b><br>%{percent}<br>%{value}% of members<extra></extra>'
            };
            var layout = {
                title: { text: 'Target Clientele Distribution', font: { size: 14 } },
                font: { family: '"Segoe UI", system-ui, sans-serif', size: 12 },
                margin: { t: 50, b: 30, l: 20, r: 20 },
                showlegend: true,
                legend: { orientation: 'h', y: -0.1, font: { size: 10 } },
                height: 380
            };
            Plotly.newPlot(this.els['plotly-clientele-chart'], [trace], layout, { responsive: true, displayModeBar: false });
        },

        // --- Revenue Chart ---
        renderRevenueChart: function (members, fee, workshopRev, grantRev, otherRev) {
            if (typeof Plotly === 'undefined' || !this.els['plotly-revenue-chart']) return;
            var memberRev = members * fee;
            var labels = ['Memberships', 'Workshops', 'Grants/Sponsors', 'Other'];
            var values = [memberRev, workshopRev, grantRev, otherRev];
            var colors = ['#004a99', '#0066cc', '#e67e22', '#198754'];
            var trace = {
                x: labels,
                y: values,
                type: 'bar',
                text: values.map(function (v) { return UI.formatCurrency(v); }),
                textposition: 'outside',
                cliponaxis: false,
                marker: { color: colors },
                hovertemplate: '<b>%{x}</b>: $%{y:,}/mo<extra></extra>'
            };
            var layout = {
                title: { text: 'Monthly Revenue Breakdown', font: { size: 14 } },
                font: { family: '"Segoe UI", system-ui, sans-serif', size: 12 },
                yaxis: { title: 'Revenue ($)', tickprefix: '$', separatethousands: true, automargin: true },
                margin: { t: 60, b: 60, l: 80, r: 20 },
                height: 380
            };
            Plotly.newPlot(this.els['plotly-revenue-chart'], [trace], layout, { responsive: true, displayModeBar: false });
        },

        // --- Cost Chart ---
        renderCostChart: function (lease, staff, maint, insurance) {
            if (typeof Plotly === 'undefined' || !this.els['plotly-cost-chart']) return;
            var labels = ['Facility Lease', 'Personnel', 'Maintenance', 'Insurance/Ops'];
            var monthlyVals = [lease, staff, maint, insurance].map(function (v) { return Math.round(v / 12); });
            var colors = ['#dc3545', '#e67e22', '#ffc107', '#666666'];
            var trace = {
                x: labels,
                y: monthlyVals,
                type: 'bar',
                text: monthlyVals.map(function (v) { return UI.formatCurrency(v); }),
                textposition: 'outside',
                cliponaxis: false,
                marker: { color: colors },
                hovertemplate: '<b>%{x}</b>: $%{y:,}/mo<extra></extra>'
            };
            var layout = {
                title: { text: 'Monthly Cost Breakdown', font: { size: 14 } },
                font: { family: '"Segoe UI", system-ui, sans-serif', size: 12 },
                yaxis: { title: 'Cost ($)', tickprefix: '$', separatethousands: true, automargin: true },
                margin: { t: 60, b: 60, l: 80, r: 20 },
                height: 380
            };
            Plotly.newPlot(this.els['plotly-cost-chart'], [trace], layout, { responsive: true, displayModeBar: false });
        },

        // --- Sensitivity Chart ---
        renderSensitivityChart: function (fee, monthlyCost, otherRevenue, currentMembers) {
            if (typeof Plotly === 'undefined' || !this.els['plotly-sensitivity-chart']) return;
            var curve = CALC.sensitivityCurve(fee, monthlyCost, otherRevenue, 50, 300, 5);
            var breakeven = CALC.breakevenMembers(fee, monthlyCost, otherRevenue);

            var xVals = curve.map(function (p) { return p.members; });
            var yVals = curve.map(function (p) { return p.surplus; });

            var traceLine = {
                x: xVals, y: yVals,
                type: 'scatter', mode: 'lines',
                name: 'Monthly Surplus/Deficit',
                line: { color: DATA.colors.primary, width: 3 },
                hovertemplate: '%{x} members ? $%{y:,}/mo<extra></extra>'
            };

            var traceZero = {
                x: [50, 300], y: [0, 0],
                type: 'scatter', mode: 'lines',
                name: 'Break-even',
                line: { color: DATA.colors.danger, width: 1, dash: 'dash' },
                showlegend: true,
                hoverinfo: 'skip'
            };

            var shapes = [];
            shapes.push({
                type: 'line', x0: currentMembers, x1: currentMembers,
                y0: Math.min.apply(null, yVals) - 1000, y1: Math.max.apply(null, yVals) + 1000,
                line: { color: DATA.colors.accent, width: 2, dash: 'dot' }
            });

            var annotations = [];
            if (breakeven >= 50 && breakeven <= 300) {
                annotations.push({
                    x: breakeven, y: 0,
                    text: 'Break-even: ' + breakeven + ' members',
                    showarrow: true, arrowhead: 2, arrowcolor: DATA.colors.danger,
                    ax: 0, ay: -40,
                    font: { size: 11, color: DATA.colors.danger }
                });
            }
            annotations.push({
                x: currentMembers,
                y: CALC.surplus(CALC.monthlyRevenue(currentMembers, fee, 0, 0, otherRevenue), monthlyCost),
                text: 'Current: ' + currentMembers,
                showarrow: true, arrowhead: 2, arrowcolor: DATA.colors.accent,
                ax: 40, ay: -30,
                font: { size: 11, color: DATA.colors.accent }
            });

            var layout = {
                title: { text: 'Sensitivity: Members vs Monthly Surplus', font: { size: 14 } },
                font: { family: '"Segoe UI", system-ui, sans-serif', size: 12 },
                xaxis: { title: 'Number of Members', dtick: 25 },
                yaxis: { title: 'Monthly Surplus/Deficit ($)', tickprefix: '$', separatethousands: true, zeroline: false },
                margin: { t: 50, b: 60, l: 80, r: 30 },
                shapes: shapes,
                annotations: annotations,
                showlegend: true,
                legend: { orientation: 'h', y: -0.2 },
                height: 420
            };
            Plotly.newPlot(this.els['plotly-sensitivity-chart'], [traceLine, traceZero], layout, { responsive: true, displayModeBar: false });
        },

        // --- Break-even Display ---
        updateBreakevenDisplay: function (revenue, cost, breakeven) {
            var surplus = CALC.surplus(revenue, cost);
            if (this.els['live-revenue']) this.els['live-revenue'].textContent = this.formatCurrency(revenue);
            if (this.els['live-cost']) this.els['live-cost'].textContent = this.formatCurrency(cost);
            if (this.els['live-surplus']) {
                this.els['live-surplus'].textContent = this.formatCurrency(surplus);
                this.els['live-surplus'].className = surplus >= 0 ? 'metric__value metric__value--positive' : 'metric__value metric__value--negative';
            }
            if (this.els['live-breakeven']) {
                this.els['live-breakeven'].textContent = (breakeven === Infinity) ? '∞' : breakeven + ' members';
            }

            var indicator = this.els['breakeven-indicator'];
            var status = this.els['breakeven-status'];
            if (indicator && status) {
                if (surplus > 500) {
                    indicator.className = 'breakeven-indicator breakeven-indicator--surplus';
                    status.textContent = 'Surplus: ' + this.formatCurrency(surplus) + '/mo';
                } else if (surplus >= -500) {
                    indicator.className = 'breakeven-indicator breakeven-indicator--even';
                    status.textContent = 'Near Break-even';
                } else {
                    indicator.className = 'breakeven-indicator breakeven-indicator--deficit';
                    status.textContent = 'Deficit: ' + this.formatCurrency(surplus) + '/mo';
                }
            }
        },

        // --- Get current simulator values ---
        getSimValues: function () {
            var el = this.els;
            function clampedVal(slider, fallback) {
                if (!slider) return fallback;
                var v = parseInt(slider.value) || fallback;
                var min = parseInt(slider.min);
                var max = parseInt(slider.max);
                if (!isNaN(min) && v < min) v = min;
                if (!isNaN(max) && v > max) v = max;
                return v;
            }
            return {
                members: clampedVal(el['sim-members'], DATA.sliders.members.default),
                fee: clampedVal(el['sim-fee'], DATA.sliders.fee.default),
                workshopRev: clampedVal(el['sim-workshop'], DATA.sliders.workshop.default),
                grantRev: clampedVal(el['sim-grant'], DATA.sliders.grant.default),
                otherRev: clampedVal(el['sim-other'], DATA.sliders.other.default),
                annualLease: clampedVal(el['cost-lease'], DATA.sliders.lease.default),
                annualStaff: clampedVal(el['cost-staff'], DATA.sliders.staff.default),
                annualMaint: clampedVal(el['cost-maint'], DATA.sliders.maint.default),
                annualInsurance: clampedVal(el['cost-insurance'], DATA.sliders.insurance.default)
            };
        },

        // --- Master recalculate cascade ---
        recalculate: function () {
            var v = this.getSimValues();
            var revenue = CALC.monthlyRevenue(v.members, v.fee, v.workshopRev, v.grantRev, v.otherRev);
            var cost = CALC.monthlyCost(v.annualLease, v.annualStaff, v.annualMaint, v.annualInsurance);
            var otherNonMember = v.workshopRev + v.grantRev + v.otherRev;
            var breakeven = CALC.breakevenMembers(v.fee, cost, otherNonMember);

            this.updateBreakevenDisplay(revenue, cost, breakeven);
            this.renderRevenueChart(v.members, v.fee, v.workshopRev, v.grantRev, v.otherRev);
            this.renderCostChart(v.annualLease, v.annualStaff, v.annualMaint, v.annualInsurance);
            this.renderSensitivityChart(v.fee, cost, otherNonMember, v.members);

            if (this.els['total-monthly-cost']) {
                this.els['total-monthly-cost'].textContent = this.formatCurrency(cost);
            }
            if (this.els['total-annual-cost']) {
                this.els['total-annual-cost'].textContent = this.formatCurrency(v.annualLease + v.annualStaff + v.annualMaint + v.annualInsurance);
            }
        },

        // --- Apply scenario preset ---
        applyScenario: function (key) {
            var s = DATA.scenarios[key];
            if (!s) return;

            var fields = {
                'sim-members': s.members, 'sim-fee': s.fee,
                'sim-workshop': s.workshopRev, 'sim-grant': s.grantRev, 'sim-other': s.otherRev,
                'cost-lease': s.annualLease, 'cost-staff': s.annualStaff,
                'cost-maint': s.annualMaint, 'cost-insurance': s.annualInsurance
            };
            for (var id in fields) {
                if (this.els[id]) {
                    this.els[id].value = fields[id];
                    var valEl = this.els[id + '-val'];
                    if (valEl) {
                        var val = fields[id];
                        if (id === 'sim-members') {
                            valEl.textContent = val;
                        } else if (id === 'sim-fee') {
                            valEl.textContent = '$' + val;
                        } else {
                            valEl.textContent = '$' + val.toLocaleString();
                        }
                    }
                }
            }

            if (this.els['scenario-desc']) {
                this.els['scenario-desc'].textContent = s.description;
            }

            document.querySelectorAll('.scenario-btn').forEach(function (btn) {
                btn.classList.remove('scenario-btn--active');
            });
            var activeBtn = document.querySelector('[data-scenario="' + key + '"]');
            if (activeBtn) activeBtn.classList.add('scenario-btn--active');

            this.recalculate();
        },

        resetToDefaults: function () {
            var defaults = DATA.sliders;
            var resetMap = {
                'sim-members': defaults.members, 'sim-fee': defaults.fee,
                'sim-workshop': defaults.workshop, 'sim-grant': defaults.grant,
                'sim-other': defaults.other,
                'cost-lease': defaults.lease, 'cost-staff': defaults.staff,
                'cost-maint': defaults.maint, 'cost-insurance': defaults.insurance
            };
            for (var id in resetMap) {
                var def = resetMap[id];
                if (this.els[id]) {
                    this.els[id].value = def.default;
                    var valEl = this.els[id + '-val'];
                    if (valEl) {
                        if (id === 'sim-members') {
                            valEl.textContent = def.default;
                        } else if (id === 'sim-fee') {
                            valEl.textContent = '$' + def.default;
                        } else {
                            valEl.textContent = '$' + def.default.toLocaleString();
                        }
                    }
                }
            }
            document.querySelectorAll('.scenario-btn').forEach(function (btn) {
                btn.classList.remove('scenario-btn--active');
            });
            var expectedBtn = document.querySelector('[data-scenario="expected"]');
            if (expectedBtn) expectedBtn.classList.add('scenario-btn--active');
            if (this.els['scenario-desc']) {
                this.els['scenario-desc'].textContent = DATA.scenarios.expected.description;
            }

            // Reset budget toggle to lean
            var budgetToggle = this.els['budget-toggle'];
            if (budgetToggle && budgetToggle.checked) {
                budgetToggle.checked = false;
                this.renderBudget('lean');
            }

            this.recalculate();
        }
    };

    // ============================================
    // SIDEBAR NAVIGATION - Scroll Spy
    // ============================================

    function initSidebar() {
        var sections = document.querySelectorAll('main section[id]');
        var navLinks = document.querySelectorAll('.sidebar__link');
        var breadcrumbSpan = document.getElementById('breadcrumb-section');
        if (sections.length === 0 || navLinks.length === 0) return;

        function updateActiveLink() {
            var scrollPos = window.scrollY + 120;
            sections.forEach(function (section) {
                var top = section.offsetTop;
                var height = section.offsetHeight;
                var id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('sidebar__link--active');
                        link.removeAttribute('aria-current');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('sidebar__link--active');
                            link.setAttribute('aria-current', 'true');
                            if (breadcrumbSpan) breadcrumbSpan.textContent = link.textContent;
                        }
                    });
                }
            });
        }

        var scrollTimer;
        window.addEventListener('scroll', function () {
            if (scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(updateActiveLink, 50);
        });
        updateActiveLink();

        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (!href || href === '#') return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var offset = 80;
                    var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPos, behavior: 'smooth' });
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    history.replaceState(null, null, href);
                }
            });
        });
    }

    // ============================================
    // SIDEBAR MOBILE TOGGLE
    // ============================================

    function initMobileNav() {
        var toggle = document.getElementById('sidebar-toggle');
        var sidebar = document.getElementById('sidebar-nav');
        if (!toggle || !sidebar) return;

        toggle.addEventListener('click', function () {
            sidebar.classList.toggle('sidebar--open');
            var isOpen = sidebar.classList.contains('sidebar--open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        sidebar.querySelectorAll('.sidebar__link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 900) {
                    sidebar.classList.remove('sidebar--open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ============================================
    // INPUT WIRING - Debounced Event Listeners
    // ============================================

    function initSimulatorInputs() {
        var inputIds = [
            'sim-members', 'sim-fee', 'sim-workshop', 'sim-grant', 'sim-other',
            'cost-lease', 'cost-staff', 'cost-maint', 'cost-insurance'
        ];

        var debounceTimer;
        function onInput() {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function () { UI.recalculate(); }, 150);
        }

        inputIds.forEach(function (id) {
            var el = UI.els[id];
            if (!el) return;
            el.addEventListener('input', function () {
                var valEl = UI.els[id + '-val'];
                if (valEl) {
                    var v = parseInt(this.value) || 0;
                    if (id === 'sim-members') {
                        valEl.textContent = v;
                    } else if (id === 'sim-fee') {
                        valEl.textContent = '$' + v;
                    } else {
                        valEl.textContent = '$' + v.toLocaleString();
                    }
                }
                onInput();
            });
        });
    }

    function initBudgetToggle() {
        var toggle = UI.els['budget-toggle'];
        if (!toggle) return;

        toggle.addEventListener('change', function () {
            UI.renderBudget(this.checked ? 'expanded' : 'lean');
        });

        // Handle browser-cached toggle state on page load
        if (toggle.checked) {
            UI.renderBudget('expanded');
        }

        var viewTableBtn = UI.els['view-table-btn'];
        var viewChartBtn = UI.els['view-chart-btn'];
        var tableContainer = UI.els['budget-table-container'];
        var chartContainer = UI.els['budget-chart-container'];

        if (viewTableBtn && viewChartBtn && tableContainer && chartContainer) {
            viewTableBtn.addEventListener('click', function () {
                viewTableBtn.classList.replace('btn--outline', 'btn--primary');
                viewChartBtn.classList.replace('btn--primary', 'btn--outline');
                viewTableBtn.setAttribute('aria-pressed', 'true');
                viewChartBtn.setAttribute('aria-pressed', 'false');
                tableContainer.style.display = 'block';
                chartContainer.style.display = 'none';
            });
            viewChartBtn.addEventListener('click', function () {
                viewChartBtn.classList.replace('btn--outline', 'btn--primary');
                viewTableBtn.classList.replace('btn--primary', 'btn--outline');
                viewChartBtn.setAttribute('aria-pressed', 'true');
                viewTableBtn.setAttribute('aria-pressed', 'false');
                tableContainer.style.display = 'none';
                chartContainer.style.display = 'block';
                UI.renderBudgetChart(UI.currentBudgetType);
            });
        }
    }

    function initScenarioButtons() {
        document.querySelectorAll('.scenario-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var key = this.getAttribute('data-scenario');
                if (key === 'reset') {
                    UI.resetToDefaults();
                } else {
                    UI.applyScenario(key);
                }
            });
        });
    }

    // ============================================
    // CSV EXPORT
    // ============================================

    function exportCurrentState() {
        var v = UI.getSimValues();
        var revenue = CALC.monthlyRevenue(v.members, v.fee, v.workshopRev, v.grantRev, v.otherRev);
        var cost = CALC.monthlyCost(v.annualLease, v.annualStaff, v.annualMaint, v.annualInsurance);
        var surplus = CALC.surplus(revenue, cost);
        var otherNonMember = v.workshopRev + v.grantRev + v.otherRev;
        var breakeven = CALC.breakevenMembers(v.fee, cost, otherNonMember);

        var rows = [
            ['Crossroads Feasibility Dashboard - Scenario Export'],
            ['Generated', new Date().toISOString()],
            [''],
            ['Parameter', 'Value'],
            ['Members', v.members],
            ['Monthly Fee', '$' + v.fee],
            ['Workshop Revenue', '$' + v.workshopRev],
            ['Grant Revenue', '$' + v.grantRev],
            ['Other Revenue', '$' + v.otherRev],
            ['Annual Lease', '$' + v.annualLease],
            ['Annual Staff', '$' + v.annualStaff],
            ['Annual Maintenance', '$' + v.annualMaint],
            ['Annual Insurance', '$' + v.annualInsurance],
            [''],
            ['Output', 'Value'],
            ['Monthly Revenue', '$' + revenue],
            ['Monthly Cost', '$' + cost],
            ['Monthly Surplus/Deficit', '$' + surplus],
            ['Break-even Members', breakeven === Infinity ? 'N/A' : breakeven]
        ];

        var csv = rows.map(function (r) {
            return r.map(function (cell) {
                var s = String(cell);
                if (s.indexOf(',') !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
                    return '"' + s.replace(/"/g, '""') + '"';
                }
                return s;
            }).join(',');
        }).join('\n');
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'crossroads-scenario-' + new Date().toISOString().split('T')[0] + '.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    window.exportCurrentState = exportCurrentState;

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        UI.cacheElements();

        initBudgetToggle();
        UI.renderBudget('lean');

        UI.renderNeedsChart();
        UI.renderClienteleChart();

        initSimulatorInputs();
        initScenarioButtons();
        UI.applyScenario('expected');

        initSidebar();
        initMobileNav();

        console.log('Crossroads Feasibility Dashboard V2 initialized');
        console.log('Data Locks Verified:');
        console.log('  Lean Startup:     $' + DATA.budget.lean.total.toLocaleString());
        console.log('  Expanded Startup: $' + DATA.budget.expanded.total.toLocaleString());
        console.log('  Monthly Revenue:  $' + DATA.breakeven.revenue.toLocaleString());
        console.log('  Monthly Cost:     $' + DATA.breakeven.cost.toLocaleString());
        console.log('  Monthly Surplus:  $' + DATA.breakeven.surplus.toLocaleString());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
