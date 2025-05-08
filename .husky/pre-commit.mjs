import { exec } from "node:child_process";
console.log('pre-commit hook running...')
const run = (cmd) => new Promise((resolve, reject) => exec(
  cmd,
  (error, stdout, stderr) => {
    if (error) reject();
    if (stderr) reject(stderr);
    resolve(stdout);
  }
));

try {
  const changeset = await run('git diff --cached --name-only --diff-filter=ACMR');
  const modifiedFiles = changeset.split('\n').filter(Boolean);

  // check if there are any model files staged
  const modifledPartials = modifiedFiles.filter((file) => file.match(/(^|\/)_.*.json/));
  if (modifledPartials.length > 0) {
    const output = await run('npm run build:json --silent');
    console.log(output);
    await run('git add .');
  }
} catch (e) {
  console.log('Error during pre-commit', e)
}

console.log('pre-commit hook complete...')
