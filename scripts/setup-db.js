const { execSync } = require('child_process');
const path = require('path');

const projectRoot = '/vercel/share/v0-project';
const schemaPath = path.join(projectRoot, 'prisma', 'schema.prisma');

console.log('Setting up database...');
console.log('Project root:', projectRoot);
console.log('Schema path:', schemaPath);

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync(`npx prisma generate --schema="${schemaPath}"`, { cwd: projectRoot, stdio: 'inherit' });
  
  // Push schema to database
  console.log('Pushing schema to database...');
  execSync(`npx prisma db push --force-reset --schema="${schemaPath}"`, { cwd: projectRoot, stdio: 'inherit' });
  
  // Seed the database
  console.log('Seeding database...');
  execSync('npx tsx prisma/seed.ts', { cwd: projectRoot, stdio: 'inherit' });
  
  console.log('Database setup complete!');
} catch (error) {
  console.error('Error setting up database:', error.message);
  process.exit(1);
}
