import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node/index.js';

const dir = path.resolve('.');

async function pushToGitHub() {
  const repoUrl = process.env.GITHUB_REPO_URL;
  const token = process.env.GITHUB_TOKEN;

  if (!repoUrl || !token) {
    console.error('Error: GITHUB_REPO_URL and GITHUB_TOKEN environment variables are required.');
    process.exit(1);
  }

  console.log(`Connecting to remote ${repoUrl}...`);
  await git.addRemote({
    fs,
    dir,
    remote: 'origin',
    url: repoUrl,
    force: true
  });

  console.log('Pushing main branch to GitHub...');
  const result = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: token })
  });

  console.log('Push completed successfully!', result);
}

pushToGitHub().catch(err => {
  console.error('Failed to push to GitHub:', err.message);
  process.exit(1);
});
