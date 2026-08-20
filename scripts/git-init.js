import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

const dir = path.resolve('.');

async function initAndCommit() {
  console.log('Initializing Git repository...');
  await git.init({ fs, dir });

  console.log('Staging files...');
  // Recursively find all files excluding node_modules, dist, .git, etc.
  function getFiles(currentDir, relativePath = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      if (
        entry.name === 'node_modules' || 
        entry.name === 'dist' || 
        entry.name === '.git' || 
        entry.name === '.DS_Store' ||
        entry.name.endsWith('.log')
      ) {
        continue;
      }
      if (entry.isDirectory()) {
        files = files.concat(getFiles(path.join(currentDir, entry.name), relPath));
      } else {
        files.push(relPath);
      }
    }
    return files;
  }

  const filepaths = getFiles(dir);
  for (const filepath of filepaths) {
    await git.add({ fs, dir, filepath });
  }

  console.log(`Staged ${filepaths.length} files.`);

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Dishcovery Developer',
      email: 'dev@dishcovery.app'
    },
    message: 'Initial commit of Dishcovery full-page website'
  });

  console.log(`Commit created successfully! SHA: ${sha}`);
}

initAndCommit().catch(err => {
  console.error('Error during git init/commit:', err);
  process.exit(1);
});
