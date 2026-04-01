# Crossroads Community STEM Centre

A proposal and feasibility study for an open-access community STEM learning hub in Langford, British Columbia, presented through a 3-page interactive website and supported by a Markdown-to-Word document converter.

---

## Website (3 Pages)

| Page | File | Description |
|------|------|-------------|
| **Dashboard** | `index.html` | Interactive feasibility simulation with Plotly.js charts, revenue/cost sliders, break-even engine, sensitivity analysis, and scenario presets. |
| **Proposal** | `proposal.html` | Full March 2026 project proposal with executive summary, budget tables (Tables 1-4), risk mitigation plan, evaluation plan, references (17), and appendices A-G. |
| **Feasibility Study** | `feasibility.html` | Feasibility study with KPI cards, Plotly charts, assessment-card grids, visual timeline, risk matrix, and expandable detail sections covering all viability dimensions. |

All three pages share a persistent **top navigation bar**, **grouped sidebar** with scroll-spy, and **breadcrumb** trail that updates on scroll.

### Live Site

The site is hosted on GitHub Pages and is publicly accessible at:

**<https://zixxenk.github.io>**

### To View Locally

Open `index.html` in any modern browser. An internet connection is required on first load for the Plotly.js CDN (used by Dashboard and Feasibility pages; `proposal.html` is fully self-contained).

### Hosting on GitHub Pages

This repository is configured to deploy automatically to GitHub Pages whenever changes are pushed to the `main` branch, via the workflow in `.github/workflows/deploy.yml`.

To enable GitHub Pages in your own fork:
1. Go to **Settings → Pages** in your repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push any commit to `main` — the workflow will build and publish the site automatically.

### Shared Assets

- `style.css` - Design tokens, BEM component library, responsive breakpoints, print styles
- `script.js` - Dashboard data model, Plotly chart rendering, simulator logic, sidebar scroll-spy

---

## Repository Structure

```
├── index.html                        # Dashboard (feasibility simulation)
├── proposal.html                     # Project proposal (March 2026)
├── feasibility.html                  # Feasibility study
├── style.css                         # Shared stylesheet
├── script.js                         # Dashboard logic and sidebar
├── project feasibility               # Feasibility study source (Markdown)
├── README.md
└── Crossroads/
    ├── CRinteractivewebsite.html     # Legacy single-page pitch deck
    ├── convert_convert.py            # Markdown → .docx converter
    ├── experiment_data.csv           # Supporting measurement data
    ├── Copy2 of Crossroads Project .md  # 2026 proposal source (Markdown)
    └── ...                           # Business plan files, Pages docs
```

---

## Markdown → Word Converter

`Crossroads/convert_convert.py` converts a Markdown proposal file into a submission-ready `.docx` document with:

- Professional cover page and section headings
- Formatted tables with shaded header rows
- Bold, italic, and hyperlink rendering
- Page breaks at `---` boundaries
- Centered page numbers in the footer
- Times New Roman 12 pt body text, 1-inch margins, 1.15 line spacing

### Setup

```bash
pip install -r Crossroads/requirements.txt
```

### Usage

```bash
python Crossroads/convert_convert.py <input.md> <output.docx>
```

**Example:**

```bash
python Crossroads/convert_convert.py "project feasibility" "Crossroads_Feasibility.docx"
```

---

## Feasibility Study

The `project feasibility` file (Markdown) contains the full feasibility study covering:

- Needs analysis with community survey results (54 respondents)
- Competitive landscape and demand quantification
- Technical, economic, social, environmental, political, operational, and schedule viability
- 2026-adjusted cost matrix, break-even analysis, and scenario modelling
- Risk assessment matrix with severity ratings
- Conclusion with eight-dimension viability summary and funding recommendations

---

## Project Background

**Crossroads Community STEM Centre** is a proposed nonprofit facility in Langford, BC offering open drop-in access to professional-grade equipment - 3D printers, CNC machines, laser cutters, electronics labs - for career changers, students, and community members outside of formal post-secondary enrollment.

Key figures (Lean Model, 2026 estimates):

| Item | Value |
|---|---|
| Facility size | 4,000 sq ft |
| Year 1 startup capital | ~$476,100 |
| Annual operating cost | ~$310,000 |
| Break-even membership | 200 members at $60/month |
| Projected break-even | Month 8 |

---

## License

This project and all associated documents are the work of Cameron Kibble, Founder, Crossroads Community Hub.