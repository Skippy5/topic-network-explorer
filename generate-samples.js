#!/usr/bin/env node

const fs = require('fs');

// Product categories
const products = ['Email', 'Teams', 'SharePoint', 'Smartsheet', 'OneDrive', 'PowerBI', 'Excel', 'Outlook'];

// Topic clusters with associated keywords and patterns
const topicClusters = [
  {
    name: 'Password & Authentication',
    keywords: ['password', 'reset', 'login', 'authentication', 'locked', 'account', 'credential', 'MFA', 'two-factor', 'expired', 'unlock'],
    templates: [
      'User unable to {action} due to {issue} {keyword}',
      'Need help with {keyword} {issue}',
      '{keyword} {issue} preventing access to {product}',
      'Request to {action} {keyword} for user account'
    ],
    actions: ['login', 'access', 'authenticate', 'reset', 'unlock'],
    issues: ['error', 'failure', 'problem', 'issue', 'expired', 'locked']
  },
  {
    name: 'Email & Calendar',
    keywords: ['email', 'calendar', 'meeting', 'appointment', 'inbox', 'send', 'receive', 'attachment', 'sync', 'delegate', 'out-of-office'],
    templates: [
      'Cannot {action} {keyword} in {product}',
      '{keyword} not {action} properly',
      'Issue with {keyword} {issue}',
      'Need assistance with {keyword} {action}'
    ],
    actions: ['send', 'receive', 'sync', 'access', 'view', 'delete', 'forward'],
    issues: ['synchronization', 'delivery', 'loading', 'display', 'permissions']
  },
  {
    name: 'File Access & Sharing',
    keywords: ['file', 'folder', 'share', 'permission', 'access', 'denied', 'document', 'upload', 'download', 'sync', 'collaborate'],
    templates: [
      'Unable to {action} {keyword} in {product}',
      '{keyword} {issue} when trying to {action}',
      'Permission denied when {action} {keyword}',
      'Request access to {keyword} in {product}'
    ],
    actions: ['share', 'access', 'edit', 'upload', 'download', 'delete', 'move'],
    issues: ['error', 'failure', 'denied', 'missing', 'corrupted']
  },
  {
    name: 'Performance & Speed',
    keywords: ['slow', 'performance', 'loading', 'timeout', 'lag', 'freeze', 'hang', 'crash', 'unresponsive', 'delay'],
    templates: [
      '{product} {keyword} when {action}',
      'Experiencing {keyword} {issue} with {product}',
      '{product} {keyword} and {issue}',
      'Application {keyword} during normal use'
    ],
    actions: ['loading', 'opening', 'saving', 'searching', 'scrolling', 'typing'],
    issues: ['performance', 'issue', 'problem', 'behavior']
  },
  {
    name: 'Software Installation',
    keywords: ['install', 'installation', 'software', 'application', 'upgrade', 'update', 'version', 'license', 'activation', 'patch'],
    templates: [
      'Need to {action} {keyword} for {product}',
      '{keyword} {issue} when attempting {action}',
      'Request {keyword} {action} assistance',
      '{issue} during {keyword} process'
    ],
    actions: ['install', 'upgrade', 'update', 'activate', 'configure', 'deploy'],
    issues: ['error', 'failure', 'compatibility', 'issue', 'problem']
  },
  {
    name: 'Network & Connectivity',
    keywords: ['network', 'connection', 'connectivity', 'VPN', 'offline', 'disconnect', 'timeout', 'latency', 'bandwidth', 'firewall'],
    templates: [
      '{keyword} {issue} affecting {product} access',
      'Cannot connect due to {keyword} {issue}',
      'Intermittent {keyword} {issue}',
      '{product} unavailable due to {keyword} problem'
    ],
    actions: ['connect', 'access', 'establish', 'maintain'],
    issues: ['error', 'failure', 'timeout', 'dropped', 'unstable', 'blocked']
  },
  {
    name: 'Hardware Issues',
    keywords: ['laptop', 'monitor', 'keyboard', 'mouse', 'printer', 'display', 'hardware', 'device', 'peripheral', 'dock', 'charger'],
    templates: [
      '{keyword} not {action} properly',
      '{keyword} {issue} preventing work',
      'Need replacement {keyword}',
      '{keyword} {issue} requiring support'
    ],
    actions: ['working', 'responding', 'connecting', 'functioning', 'charging', 'displaying'],
    issues: ['malfunction', 'failure', 'broken', 'damaged', 'defective']
  },
  {
    name: 'Data & Reporting',
    keywords: ['report', 'dashboard', 'data', 'export', 'query', 'filter', 'chart', 'visualization', 'analytics', 'refresh', 'dataset'],
    templates: [
      'Cannot {action} {keyword} from {product}',
      '{keyword} not {action} correctly',
      'Need help {action} {keyword}',
      '{keyword} {issue} in {product}'
    ],
    actions: ['generate', 'export', 'view', 'update', 'refresh', 'create', 'share'],
    issues: ['error', 'missing', 'incorrect', 'outdated', 'incomplete']
  },
  {
    name: 'Mobile & Remote Access',
    keywords: ['mobile', 'phone', 'tablet', 'remote', 'app', 'smartphone', 'iOS', 'Android', 'cellular', 'offline'],
    templates: [
      '{keyword} {issue} with {product}',
      'Cannot {action} {product} on {keyword} device',
      '{product} not {action} on {keyword}',
      '{keyword} app {issue}'
    ],
    actions: ['access', 'sync', 'open', 'install', 'update', 'login'],
    issues: ['error', 'crash', 'incompatibility', 'failure', 'problem']
  },
  {
    name: 'Training & How-To',
    keywords: ['training', 'tutorial', 'guide', 'documentation', 'help', 'instruction', 'learn', 'setup', 'configure', 'best practice'],
    templates: [
      'Need {keyword} on how to {action} in {product}',
      'Request {keyword} for {product} {action}',
      'How to {action} {keyword} in {product}',
      'Seeking {keyword} for new {product} feature'
    ],
    actions: ['use', 'configure', 'setup', 'create', 'manage', 'customize'],
    issues: ['question', 'request', 'inquiry']
  }
];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTicket(id, cluster) {
  const product = randomElement(products);
  const template = randomElement(cluster.templates);
  const keyword = randomElement(cluster.keywords);
  const action = randomElement(cluster.actions);
  const issue = randomElement(cluster.issues);
  
  // Generate short description from template
  let shortDesc = template
    .replace('{product}', product)
    .replace('{keyword}', keyword)
    .replace('{action}', action)
    .replace('{issue}', issue);
  
  // Add some variation
  const moreKeywords = [];
  for (let i = 0; i < randomInt(1, 3); i++) {
    const kw = randomElement(cluster.keywords);
    if (!moreKeywords.includes(kw) && kw !== keyword) {
      moreKeywords.push(kw);
    }
  }
  
  // Generate longer description
  const descTemplates = [
    `${shortDesc}. User reports ${randomElement(cluster.keywords)} ${randomElement(cluster.issues)} affecting productivity.`,
    `${shortDesc}. This is impacting ${randomElement(['daily workflow', 'team collaboration', 'project deadlines', 'client communication'])}.`,
    `${shortDesc}. Error occurs when attempting to ${randomElement(cluster.actions)}. ${moreKeywords.join(' and ')} also affected.`,
    `${shortDesc}. User has tried ${randomElement(['restarting', 'clearing cache', 'reinstalling', 'updating'])} without success.`
  ];
  
  const description = randomElement(descTemplates);
  
  // Generate resolution notes
  const resolutionTemplates = [
    `Resolved by ${randomElement(['resetting', 'updating', 'reconfiguring', 'reinstalling'])} ${keyword}. User confirmed ${randomElement(['working', 'resolved', 'fixed'])}.`,
    `${randomElement(['Fixed', 'Resolved', 'Corrected'])} ${randomElement(cluster.keywords)} ${randomElement(cluster.issues)}. Tested successfully with user.`,
    `${randomElement(['Applied', 'Implemented', 'Deployed'])} ${randomElement(['fix', 'patch', 'update', 'configuration change'])}. Issue no longer occurring.`,
    `Escalated to ${randomElement(['tier 2', 'specialist team', 'vendor support'])}. Resolution: ${randomElement(cluster.keywords)} ${randomElement(['updated', 'replaced', 'reconfigured'])}.`
  ];
  
  const closedNotes = randomElement(resolutionTemplates);
  
  const priority = randomElement(['P1', 'P2', 'P3', 'P4']);
  const status = 'Closed';
  
  return {
    ticket_id: `TKT-${String(id).padStart(5, '0')}`,
    product: product,
    priority: priority,
    status: status,
    short_description: shortDesc,
    description: description,
    closed_notes: closedNotes
  };
}

function generateDataset(name, count) {
  const tickets = [];
  const headers = ['ticket_id', 'product', 'priority', 'status', 'short_description', 'description', 'closed_notes'];
  
  for (let i = 1; i <= count; i++) {
    // Weight clusters to create realistic distribution
    const clusterWeights = [15, 18, 20, 12, 10, 8, 7, 6, 2, 2]; // Sums to 100
    let rand = Math.random() * 100;
    let clusterIdx = 0;
    let cumulative = 0;
    
    for (let j = 0; j < clusterWeights.length; j++) {
      cumulative += clusterWeights[j];
      if (rand < cumulative) {
        clusterIdx = j;
        break;
      }
    }
    
    const cluster = topicClusters[clusterIdx];
    const ticket = generateTicket(i, cluster);
    tickets.push(ticket);
  }
  
  // Convert to CSV
  const lines = [headers.join(',')];
  tickets.forEach(ticket => {
    const row = headers.map(h => {
      const val = ticket[h] || '';
      // Escape quotes and wrap in quotes if contains comma
      const escaped = val.replace(/"/g, '""');
      return escaped.includes(',') || escaped.includes('\n') ? `"${escaped}"` : escaped;
    });
    lines.push(row.join(','));
  });
  
  const filename = `sample-data-${name}.csv`;
  fs.writeFileSync(filename, lines.join('\n'));
  console.log(`✅ Generated ${filename} (${count} tickets, ${lines.length} total lines)`);
  
  // Stats
  const productCounts = {};
  tickets.forEach(t => {
    productCounts[t.product] = (productCounts[t.product] || 0) + 1;
  });
  console.log(`   Products: ${Object.keys(productCounts).map(p => `${p} (${productCounts[p]})`).join(', ')}`);
}

// Generate three datasets
console.log('🎯 Generating Topic Network sample datasets...\n');
generateDataset('small', 100);
console.log();
generateDataset('medium', 500);
console.log();
generateDataset('large', 2000);

console.log('\n📊 Sample datasets created!');
console.log('\nTopic clusters included:');
topicClusters.forEach((c, i) => {
  console.log(`  ${i + 1}. ${c.name}`);
});
