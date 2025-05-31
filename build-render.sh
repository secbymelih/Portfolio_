#!/bin/bash

set -e

echo "🔧 [1/4] Obfuscation de js/script.js..."
javascript-obfuscator js/script.js --output js/script-obf.js

echo "📦 [2/4] Fusion de style.css et script-obf.js dans index.html..."
cp index.html index.temp.html

# Insère le CSS inline
sed -i '/<link rel="stylesheet" href="css\/style.css">/r css/style.css' index.temp.html
sed -i 's~<link rel="stylesheet" href="css/style.css">~<style>~' index.temp.html
sed -i '/<style>/a </style>' index.temp.html

# Insère le JS obfusqué inline
sed -i '/<script src="js\/script.js"><\/script>/r js/script-obf.js' index.temp.html
sed -i 's~<script src="js/script.js"></script>~<script>~' index.temp.html
sed -i '/<script>/a </script>' index.temp.html

echo "🧼 [3/4] Minification de index.temp.html..."
html-minifier-terser index.temp.html \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  -o index.html

rm index.temp.html
rm js/script-obf.js

echo "✅ [4/4] index.html prêt pour publication (inline, minifié, obfusqué)"
