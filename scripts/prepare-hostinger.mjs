import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, '.next', 'standalone');
const staticSrc = path.join(projectRoot, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(projectRoot, 'public');
const publicDest = path.join(standaloneDir, 'public');

if (!fs.existsSync(standaloneDir)) {
  console.error('Error: .next/standalone directory not found. Run "next build" first.');
  process.exit(1);
}

console.log('Preparing standalone bundle for Hostinger deployment...');

// Copy .next/static to .next/standalone/.next/static
if (fs.existsSync(staticSrc)) {
  fs.mkdirSync(path.dirname(staticDest), { recursive: true });
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  console.log('✓ Copied .next/static -> .next/standalone/.next/static');
}

// Copy public to .next/standalone/public
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
  console.log('✓ Copied public -> .next/standalone/public');
}

// Create a minimal ecosystem.config.cjs for PM2 if Hostinger VPS / Node app manager uses PM2
const pm2Config = `module.exports = {
  apps: [
    {
      name: '1stsavvy',
      script: 'server.js',
      env: {
        PORT: process.env.PORT || 3000,
        NODE_ENV: 'production'
      }
    }
  ]
};
`;
fs.writeFileSync(path.join(standaloneDir, 'ecosystem.config.cjs'), pm2Config);
console.log('✓ Generated ecosystem.config.cjs in .next/standalone');

console.log('\nHostinger package ready in .next/standalone!');
console.log('To deploy to Hostinger:');
console.log('1. Upload all contents of .next/standalone to your Hostinger application root.');
console.log('2. Set Node.js Application Startup / Entry file to: server.js');
console.log('3. Set Environment variable: PORT=3000 (or as assigned by Hostinger) and NODE_ENV=production');
