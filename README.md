# Connection Canvas

**Standalone web application for visualizing keyword co-occurrence and topic clustering in any text data.**

## Features

- **Drag & drop CSV upload** - No backend required
- **Automatic topic clustering** - Louvain community detection algorithm
- **Dual visualization modes:**
  - **Network View** - Interactive force-directed graph with cluster boundaries
  - **Community View** - Clean grid layout showing topics separately
- **Interactive cluster panel** - Click to zoom and highlight specific topics
- **Field selection** - Analyze short_description, description, closed_notes individually or combined
- **Color-coded clusters** - Easy visual identification of topic groups
- **Zoom & pan controls** - Navigate large datasets smoothly

## Quick Start

### Option 1: Simple Python Server
```bash
cd ~/Projects/connection-canvas
python3 -m http.server 8080
```

Then open: http://localhost:8080

### Option 2: Node.js Server
```bash
cd ~/Projects/connection-canvas
npx http-server -p 8080
```

Then open: http://localhost:8080

### Option 3: Double-click (macOS/Windows)
Just open `index.html` in your browser directly. Works offline!

## CSV Format

Your CSV can have **any columns** - you'll select which ones to analyze after upload.

**The tool will:**
1. Let you upload any CSV file
2. Show you all available text columns
3. Let you select 1-3 columns to analyze
4. Extract keywords and find patterns

**Example use cases:**
- **Customer feedback:** Analyze comments, reviews, complaints
- **Support tickets:** Short description, full description, resolution notes
- **Survey responses:** Open-ended question responses
- **Social media:** Posts, comments, hashtags
- **Product reviews:** Title, review text, pros/cons
- **Meeting notes:** Agenda, notes, action items

**Sample CSV:**
```csv
product,review,rating
Widget Pro,Love this product! Great quality and fast shipping,5
Widget Pro,Good value but shipping was slow,4
Super Widget,Amazing features! Best purchase ever,5
```

After upload, you'd select which columns contain the text you want to analyze (e.g., "review").

## How It Works

1. **Upload CSV** - Drag and drop or click to browse
2. **Word extraction** - Parses all three text fields, removes stop words
3. **Co-occurrence analysis** - Identifies which keywords appear together frequently
4. **Community detection** - Louvain algorithm groups related keywords into topics
5. **Visualization** - Two interactive views with cluster summary panel

## Usage Tips

### Finding Topic Patterns
- Upload 50+ tickets for meaningful clusters
- Look for natural groupings (e.g., password issues, network problems, software bugs)
- Use cluster panel to explore each topic

### Filtering Analysis
- Uncheck fields you don't want to analyze
- Click "Re-analyze" to update the graph
- Example: Analyze only `short_description` for high-level patterns

### Navigation
- **Drag nodes** - Rearrange the graph manually
- **Click cluster** - Auto-zoom to that topic group
- **Reset View** - Return to full graph overview
- **Scroll wheel** - Zoom in/out
- **Drag background** - Pan around

### Exporting Results
- Take screenshots of interesting clusters
- Use cluster panel keywords to inform categorization
- Share the HTML file with colleagues (no server needed!)

## Technical Details

**Built with:**
- D3.js v7 - Force-directed graph visualization
- PapaParse - CSV parsing
- Graphology - Graph data structure
- Louvain algorithm - Community detection

**No backend required** - Runs entirely in the browser
**No data sent to servers** - All processing happens locally
**Works offline** - Can be used without internet (after initial load)

## Deployment Options

### Static Hosting (Easy)
- **GitHub Pages** - Push to repo, enable Pages
- **Netlify** - Drag & drop the folder
- **Vercel** - Deploy in seconds
- **AWS S3** - Static website hosting

### Embed in Existing Site
Copy `index.html` to any web directory. It's self-contained (all CSS/JS inline or CDN).

### Intranet Deployment
Copy to your internal web server. No database or backend dependencies.

## Customization

All configuration is in `index.html`:

**Adjust top N keywords:**
```javascript
// Line ~620
.slice(0, 80)  // Change to 50, 100, 150, etc.
```

**Change cluster colors:**
```javascript
// Line ~270
const CLUSTER_COLORS = [
    '#667eea', '#764ba2', // Add more hex colors
];
```

**Adjust minimum co-occurrence threshold:**
```javascript
// Line ~640
&& count >= 2  // Change to 3, 5, etc. for fewer connections
```

**Add more stop words:**
```javascript
// Line ~260
'user', 'need', 'please', // Add your own
```

## Troubleshooting

**Graph stuck on "Processing tickets..."**
- Check browser console (F12) for errors
- Verify CSV has correct column names
- Try a smaller dataset first

**No clusters detected**
- Need at least 10-15 tickets with overlapping keywords
- Try analyzing more text fields (enable all three)
- Lower the co-occurrence threshold

**Graph is too cluttered**
- Reduce top N keywords to 50
- Increase minimum co-occurrence threshold
- Use Community View instead of Network View

**Libraries not loading**
- Requires internet for CDN libraries (D3, PapaParse, Graphology)
- Or download libraries and reference locally

## Future Enhancements

Potential additions:
- Export cluster keywords as CSV
- Save/load graph layouts
- Timeline view (if tickets have dates)
- Sentiment analysis integration
- Multi-file upload and comparison

## License

Created Feb 2026 for IT ticket analysis.
Free to use, modify, and distribute.

## Support

This is a standalone tool - no ongoing maintenance required.
Works in any modern browser (Chrome, Firefox, Safari, Edge).

---

**Created by:** Skippy the Magnificent 🍺  
**Version:** 1.0  
**Last Updated:** February 11, 2026
