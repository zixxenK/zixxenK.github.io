# Crossroads Community STEM Centre

A proposal and feasibility study for an open-access community STEM learning hub in Langford, British Columbia, paired with an interactive pitch-deck website and a Markdown-to-Word document converter.

---

## Repository Structure

```
Crossroads/
├── CRinteractivewebsite.html        # Interactive single-page pitch deck (open in a browser)
├── convert_convert.py               # Markdown → professional .docx converter
├── experiment_data.csv              # Supporting measurement data
├── Crossroads Business Plan.*       # Business plan (PDF / DOCX / Pages)
├── Crossroads Project proposal.pdf  # Project proposal PDF
└── Crossroads_Proposal_v*.docx      # Iterative proposal drafts
project feasibility                  # Feasibility study (Markdown)
```

---

## Interactive Website

`Crossroads/CRinteractivewebsite.html` is a fully self-contained, single-page presentation built with [Tailwind CSS](https://tailwindcss.com/) and [Chart.js](https://www.chartjs.org/) (both loaded from CDN). No build step is required.

**To view it:**

1. Open `Crossroads/CRinteractivewebsite.html` in any modern web browser.
2. An internet connection is required on first load to fetch the CDN assets (Tailwind, Chart.js, Google Fonts).

The page includes:
- Mission and vision overview
- Interactive grid explorer for 15 STEM disciplines
- Financial charts (space allocation, 3-year revenue growth, startup cost breakdown)
- Clickable implementation timeline

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

- Needs analysis and community survey results
- Technical, economic, social, environmental, and operational feasibility assessments
- 2026-adjusted cost matrix and break-even analysis
- Conclusion and funding recommendations

---

## Project Background

**Crossroads Community STEM Centre** is a proposed nonprofit facility in Langford, BC offering open drop-in access to professional-grade equipment — 3D printers, CNC machines, laser cutters, electronics labs — for career changers, students, and community members outside of formal post-secondary enrollment.

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