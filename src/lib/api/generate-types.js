import path, { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';
import fs from 'fs';

// Проверяем, существует ли файл apispec.yaml
const apiSpecPath = resolve(process.cwd(), './apispec.yaml');

if (!fs.existsSync(apiSpecPath)) {
  console.error('❌ Ошибка: Файл apispec.yaml не найден.');
  process.exit(1);
}

generateApi({
  name: 'swagger-types.ts',
  output: resolve(process.cwd(), './'),
  input: apiSpecPath,
  generateClient: true,
  generateUnionEnums: true,
  httpClientType: 'fetch',
})
  .then(() => console.log('✅ Типы успешно сгенерированы!'))
  .catch((err) => console.error('❌ Ошибка при генерации типов:', err));

// // -------------- OLD VERSION -----------
// import path, { resolve } from 'path';
// import { generateApi } from 'swagger-typescript-api';

// generateApi({
//   name: 'swagger-types.ts',
//   output: resolve(process.cwd(), './'),
//   input: './apispec.yaml',
//   generateClient: true,
//   generateUnionEnums: true,
//   httpClientType: 'fetch',
// });
