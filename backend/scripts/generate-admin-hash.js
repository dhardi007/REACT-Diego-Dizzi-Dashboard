const bcrypt = require('bcryptjs');

/**
 * Script para generar el hash de la contraseña del admin
 * Ejecutar: node scripts/generate-admin-hash.js
 */
async function generateAdminHash() {
  const password = 'admin123'; // Cambiar esto por la contraseña deseada
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log('\n=== Hash de Contraseña Admin ===');
  console.log('Contraseña:', password);
  console.log('Hash:', hash);
  console.log('\nCopia este hash y úsalo en init-db.sql');
  console.log('O ejecuta este comando SQL:');
  console.log(`\nINSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@dashboard.com', '${hash}', 'admin') ON CONFLICT (email) DO NOTHING;\n`);
}

generateAdminHash();
