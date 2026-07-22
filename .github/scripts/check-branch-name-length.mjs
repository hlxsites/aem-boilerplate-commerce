#!/usr/bin/env node
// Edge Delivery Services serves preview/live content from
// https://{branch}--{repo}--{owner}.aem.page/ (and .aem.live). That whole
// "{branch}--{repo}--{owner}" string is a single DNS label, which RFC 1035
// caps at 63 characters. Branches that exceed it can never resolve, so this
// check runs both as a pre-commit hook and a GitHub Actions check.
// See: https://www.aem.live/docs/faq#what-is-the-character-limit-for-a-branchsubdomain
import { execFileSync } from 'node:child_process';

const MAX_HOSTNAME_LABEL_LENGTH = 63;

function getBranchName() {
  // PR branch name in a pull_request workflow run
  if (process.env.GITHUB_HEAD_REF) return process.env.GITHUB_HEAD_REF;
  // branch name in a push workflow run
  if (process.env.GITHUB_REF_TYPE === 'branch' && process.env.GITHUB_REF_NAME) {
    return process.env.GITHUB_REF_NAME;
  }
  return execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();
}

function getOwnerAndRepo() {
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    return { owner, repo };
  }
  const url = execFileSync('git', ['remote', 'get-url', 'origin']).toString().trim();
  const match = url.match(/[/:]([^/]+)\/([^/]+?)(\.git)?$/);
  if (!match) throw new Error(`Could not parse owner/repo from remote URL: ${url}`);
  return { owner: match[1], repo: match[2] };
}

const branch = getBranchName();

if (branch === 'HEAD' || branch === 'main') {
  process.exit(0);
}

const { owner, repo } = getOwnerAndRepo();
const hostnameLabel = `${branch}--${repo}--${owner}`;

if (hostnameLabel.length > MAX_HOSTNAME_LABEL_LENGTH) {
  const maxBranchLength = MAX_HOSTNAME_LABEL_LENGTH - repo.length - owner.length - 4;
  console.error(`
Branch name "${branch}" is too long to ever be deployed by Edge Delivery Services.

EDS preview/live URLs use the format https://{branch}--{repo}--{owner}.aem.page/,
and that whole string must fit within a 63-character DNS label.

For ${owner}/${repo}, branch names must be ${maxBranchLength} characters or fewer.
"${branch}" is ${branch.length} characters (${hostnameLabel.length} total).

Rename the branch to something shorter, e.g.:
  git branch -m ${branch} <shorter-name>

Docs: https://www.aem.live/docs/faq#what-is-the-character-limit-for-a-branchsubdomain
`);
  process.exit(1);
}
