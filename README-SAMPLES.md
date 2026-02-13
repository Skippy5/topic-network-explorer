# Sample Datasets

Three ready-to-use sample datasets are included for testing Connection Canvas.

## Dataset Overview

| Dataset | Tickets | File Size | Use Case |
|---------|---------|-----------|----------|
| **Small** | 100 | 21 KB | Quick demos, learning the tool |
| **Medium** | 500 | 102 KB | Realistic analysis, clear patterns |
| **Large** | 2,000 | 403 KB | Stress testing, complex clusters |

## Products Included

All datasets include realistic distribution across 8 products:
- **Email** - Email-related issues
- **Teams** - Microsoft Teams collaboration
- **SharePoint** - Document management and sharing
- **Smartsheet** - Project management
- **OneDrive** - Cloud storage
- **PowerBI** - Data analytics and reporting
- **Excel** - Spreadsheet issues
- **Outlook** - Calendar and email client

## Topic Clusters

Each dataset contains tickets from 10 distinct topic clusters:

### 1. Password & Authentication (15% of tickets)
Keywords: password, reset, login, authentication, locked, account, credential, MFA, expired

### 2. Email & Calendar (18% of tickets)
Keywords: email, calendar, meeting, appointment, inbox, send, receive, attachment, sync

### 3. File Access & Sharing (20% of tickets)
Keywords: file, folder, share, permission, access, denied, document, upload, download

### 4. Performance & Speed (12% of tickets)
Keywords: slow, performance, loading, timeout, lag, freeze, crash, unresponsive

### 5. Software Installation (10% of tickets)
Keywords: install, software, application, upgrade, update, license, activation

### 6. Network & Connectivity (8% of tickets)
Keywords: network, connection, VPN, offline, disconnect, timeout, latency

### 7. Hardware Issues (7% of tickets)
Keywords: laptop, monitor, keyboard, mouse, printer, display, hardware, device

### 8. Data & Reporting (6% of tickets)
Keywords: report, dashboard, data, export, query, filter, chart, visualization

### 9. Mobile & Remote Access (2% of tickets)
Keywords: mobile, phone, tablet, remote, app, smartphone, iOS, Android

### 10. Training & How-To (2% of tickets)
Keywords: training, tutorial, guide, documentation, help, instruction

## CSV Structure

All sample files have the same columns:

```csv
ticket_id,product,priority,status,short_description,description,closed_notes
```

- **ticket_id** - Unique identifier (TKT-00001, TKT-00002, etc.)
- **product** - Product category (Email, Teams, SharePoint, etc.)
- **priority** - Ticket priority (P1, P2, P3, P4)
- **status** - Always "Closed" in samples
- **short_description** - Brief issue summary (50-100 chars)
- **description** - Detailed issue description with context (100-200 chars)
- **closed_notes** - Resolution notes with keywords (50-100 chars)

## Using the Samples

### In the Web App
1. Open https://skippy5.github.io/topic-network-explorer/
2. Click "Browse" or drag-and-drop a sample CSV file
3. Select which text fields to analyze (recommend all three)
4. Explore the network graph and clusters!

### Filtering by Product
After uploading, you can:
- Filter the original CSV by product before upload
- Analyze patterns specific to Email vs Teams vs SharePoint
- Compare cluster patterns across different products

### Regenerating Samples
To create fresh datasets with new randomization:

```bash
cd ~/Projects/topic-network-explorer
node generate-samples.js
```

## Expected Results

### Small Dataset (100 tickets)
- **Clusters:** 6-8 distinct topic groups
- **Network density:** Moderate, easy to navigate
- **Best for:** Understanding the tool, quick demos

### Medium Dataset (500 tickets)
- **Clusters:** 8-10 well-defined topic groups
- **Network density:** Rich connections, clear patterns
- **Best for:** Realistic analysis, presentations

### Large Dataset (2000 tickets)
- **Clusters:** 10+ topic groups with sub-clusters
- **Network density:** Dense, shows complex relationships
- **Best for:** Finding subtle patterns, performance testing

## Tips for Analysis

### Finding Patterns
- **Password cluster** - Look for "password", "reset", "login" nodes tightly connected
- **File access cluster** - "permission", "share", "access denied" keywords grouped
- **Performance cluster** - "slow", "timeout", "freeze" keywords clustered

### Using the Cluster Panel
- Click any cluster in the panel to auto-zoom
- Note the dominant keywords for each cluster
- Use cluster insights to inform ticket categorization

### Field Selection
- **All three fields** - Most comprehensive analysis
- **Short description only** - High-level patterns
- **Description + closed notes** - Resolution-focused analysis

## License

Sample data is synthetically generated for demonstration purposes.
Free to use, modify, and distribute.

---

**Generated:** February 12, 2026  
**Tool:** Connection Canvas  
**Version:** 1.0
