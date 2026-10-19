#!/usr/bin/env node

/**
 * CHECK-SWAP VERIFICATION SCRIPT
 * ------------------------------
 * Scans source files and build output for leftover demo values:
 * - "LUMO", "Lumo", "lumostudio"
 * - "Nanded"
 * - Demo phone/WhatsApp: "9876543210", "98765 43210"
 * - Demo address: "123 Creative Lane"
 * - Demo email: "hello@lumostudio.com"
 * - Demo founder: "Arjun Verma"
 *
 * Behavior:
 * - If studioConfig is still the baseline LUMO demo: verifies that src/ has 0 hardcoded strings
 *   and confirms ready-for-swap status.
 * - When swapped to a new studio with sampleMode === false: strictly enforces that no demo values
 *   remain in active studio config, components, or build output, failing with code 1 if any are detected.
 * - When swapped with sampleMode === true: prints an informational notice and exits with code 0.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { studioConfig } from '../config/studio.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DEMO_PATTERNS = [
  { label: 'Studio Name', regex: /\bLUMO\b|\bLumo\b|lumostudio/i },
  { label: 'Demo City', regex: /\bNanded\b/i },
  { label: 'Demo Phone / WhatsApp', regex: /98765\s?43210/ },
  { label: 'Demo Address', regex: /123\sCreative\sLane/i },
  { label: 'Demo Email', regex: /hello@lumostudio\.com/i },
  { label: 'Demo Photographer', regex: /Arjun\sVerma/i }
];

const SCAN_DIRS = ['src', 'dist'];
const SCAN_FILES = ['config/studio.config.js'];
const IGNORE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /\.png$/,
  /\.webp$/,
  /\.jpg$/,
  /\.svg$/,
  /screenshot_/,
  /check-swap\.js/
];

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some((pat) => pat.test(filePath));
}

function getFiles(dir) {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!shouldIgnore(res)) {
        files = files.concat(getFiles(res));
      }
    } else {
      if (!shouldIgnore(res)) {
        files.push(res);
      }
    }
  }
  return files;
}

console.log('\n========================================');
console.log('       SWAP SAFETY CHECK SCANNER');
console.log('========================================\n');
console.log(`Current Studio Config: "${studioConfig.name}"`);
console.log(`City: "${studioConfig.city}"`);
console.log(`Sample Mode: ${studioConfig.sampleMode ? 'ENABLED (Sample labels active)' : 'DISABLED (Production mode)'}\n`);

// 1. First, verify src/ directory cleanliness (no hardcoded demo values in components)
const srcFiles = getFiles('src');
const srcFindings = [];

for (const relativePath of srcFiles) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) continue;

  const content = fs.readFileSync(absolutePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    DEMO_PATTERNS.forEach(({ label, regex }) => {
      if (regex.test(line)) {
        if (line.includes('CHECK-SWAP') || line.includes('DEMO_PATTERNS')) return;
        srcFindings.push({
          file: relativePath,
          line: lineIndex + 1,
          type: label,
          snippet: line.trim()
        });
      }
    });
  });
}

const isBaselineDemo = studioConfig.name.trim().toLowerCase().includes('lumo');

if (isBaselineDemo) {
  if (srcFindings.length === 0) {
    console.log('✓ SUCCESS: All React components in /src/ are 100% config-driven!');
    console.log('  Zero hardcoded demo strings found in application components.');
    console.log('  Baseline demo brand is active. When creating a new studio, simply edit /config/studio.config.js.');
    if (studioConfig.sampleMode) {
      console.log('  Sample mode is currently active (sample labels visible on preview).');
    }
    console.log('');
    process.exit(0);
  } else {
    console.error(`✗ ERROR: Found ${srcFindings.length} hardcoded strings inside /src/ components:`);
    srcFindings.forEach((f) => {
      console.error(`  - [${f.type}] ${f.file}:${f.line} -> "${f.snippet}"`);
    });
    process.exit(1);
  }
}

// 2. For a new studio: scan everything (src, dist, config)
let filesToScan = [...SCAN_FILES];
for (const dir of SCAN_DIRS) {
  filesToScan = filesToScan.concat(getFiles(dir));
}

const findings = [];

for (const relativePath of filesToScan) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) continue;

  const content = fs.readFileSync(absolutePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    DEMO_PATTERNS.forEach(({ label, regex }) => {
      if (regex.test(line)) {
        if (line.includes('CHECK-SWAP') || line.includes('DEMO_PATTERNS')) return;

        findings.push({
          file: relativePath,
          line: lineIndex + 1,
          type: label,
          snippet: line.trim()
        });
      }
    });
  });
}

if (findings.length === 0) {
  console.log('✓ SUCCESS: No leftover demo strings found anywhere in active configs, source, or build output!');
  console.log('  Site is clean and 100% customized for the new studio.\n');
  process.exit(0);
}

if (studioConfig.sampleMode) {
  console.log(`ℹ NOTICE: Found ${findings.length} demo references, but sampleMode is true.`);
  console.log('  Demo placeholder values are allowed while in sample/demo mode.');
  console.log('  Remember to set sampleMode: false in /config/studio.config.js before final client handover.\n');
  
  findings.slice(0, 5).forEach((f) => {
    console.log(`  - [${f.type}] ${f.file}:${f.line} -> "${f.snippet.slice(0, 70)}"`);
  });
  if (findings.length > 5) {
    console.log(`  ... and ${findings.length - 5} more items.`);
  }
  console.log('\n✓ Check passed under sampleMode: true.\n');
  process.exit(0);
} else {
  console.error(`✗ ERROR: Found ${findings.length} leftover demo references with sampleMode: false!\n`);
  findings.forEach((f) => {
    console.error(`  - [${f.type}] ${f.file}:${f.line}`);
    console.error(`    "${f.snippet}"\n`);
  });
  console.error('Please replace the above values in /config/studio.config.js or enable sampleMode: true.\n');
  process.exit(1);
}
