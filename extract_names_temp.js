const fs = require('fs');
const path = require('path');

const dir = 'd:/Subscribtions Sellers';
const files = fs.readdirSync(dir).filter(f => f.startsWith('insert-') || f === 'data/products.json' || f === 'supabase-migrate-data.sql');
let names = new Set();

const regex1 = /name_en\s*:\s*['"]([^'"]+)['"]/g;
const regex2 = /name_en\s*=\s*['"]([^'"]+)['"]/g;

for (const file of files) {
    try {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        let match;
        while ((match = regex1.exec(content)) !== null) {
            names.add(match[1]);
        }
        while ((match = regex2.exec(content)) !== null) {
            names.add(match[1]);
        }
    } catch (e) { }
}

try {
    const productsJson = fs.readFileSync(path.join(dir, 'data', 'products.json'), 'utf-8');
    let match;
    while ((match = regex1.exec(productsJson)) !== null) {
        names.add(match[1]);
    }
} catch (e) { }


console.log(Array.from(names).sort().join('\n'));
