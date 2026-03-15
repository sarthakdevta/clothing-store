const { execSync } = require('child_process');

console.log('Generating Prisma client...');
execSync('npx prisma generate --schema="/vercel/share/v0-project/prisma/schema.prisma"', { 
  cwd: '/vercel/share/v0-project',
  stdio: 'inherit',
  shell: true
});
console.log('Prisma client generated!');
