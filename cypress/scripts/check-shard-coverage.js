#!/usr/bin/env node
/**
 * Verifies every spec file under src/tests/b2c/ is assigned to exactly
 * one shard in each CI workflow that uses the matrix strategy.
 *
 * Run: node scripts/check-shard-coverage.js
 * Exit 1 if any spec is missing from a shard or assigned to multiple shards.
 */
const glob = require('glob');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const CYPRESS_DIR = resolve(__dirname, '..');
const WORKFLOW_FILES = [
  resolve(CYPRESS_DIR, '../.github/workflows/run-e2e-tests.yaml'),
  resolve(CYPRESS_DIR, '../.github/workflows/run-e2e-tests-saas.yaml'),
  resolve(CYPRESS_DIR, '../.github/workflows/run-e2e-tests-aco.yaml'),
];

const allSpecs = glob.sync('src/tests/b2c/**/*.spec.js', { cwd: CYPRESS_DIR });

function parseShardsFromWorkflow(workflowPath) {
  const content = readFileSync(workflowPath, 'utf8');
  const specs = [];
  // Match matrix spec entries: lines of the form:   - "path1,path2,..."
  const re = /^\s+- "([^"]+)"$/gm;
  let match;
  while ((match = re.exec(content)) !== null) {
    specs.push(...match[1].split(',').map((s) => s.trim()));
  }
  return specs;
}

let exitCode = 0;

for (const workflowFile of WORKFLOW_FILES) {
  const workflowName = workflowFile.split('/').pop();
  const shardedSpecs = parseShardsFromWorkflow(workflowFile);

  const counts = new Map();
  for (const spec of shardedSpecs) {
    counts.set(spec, (counts.get(spec) || 0) + 1);
  }

  const duplicates = [...counts.entries()].filter(([, n]) => n > 1).map(([s]) => s);
  if (duplicates.length > 0) {
    console.error(`\n❌ ${workflowName}: specs listed in multiple shards:`);
    duplicates.forEach((s) => console.error(`   ${s}`));
    exitCode = 1;
  }

  const missing = allSpecs.filter((s) => !shardedSpecs.includes(s));
  if (missing.length > 0) {
    console.error(`\n❌ ${workflowName}: spec files not assigned to any shard:`);
    missing.forEach((s) => console.error(`   ${s}`));
    console.error(`\n   Add each spec to exactly one shard in ${workflowName}.`);
    console.error('   See the shard comments for guidance on which shard fits best.');
    exitCode = 1;
  }
}

if (exitCode === 0) {
  console.log(`✓ All ${allSpecs.length} spec files are covered in all workflow shards.`);
}

process.exit(exitCode);
