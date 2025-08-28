#!/bin/bash

echo "🚀 SharePoint WebPart Development Environment Setup"
echo "=================================================="

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "📦 Installing Node Version Manager (nvm)..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    
    # Reload bash profile
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
else
    echo "✅ nvm is already installed"
fi

echo "📦 Installing Node.js 18..."
nvm install 18
nvm use 18

echo "🔧 Installing project dependencies..."
npm install --legacy-peer-deps

echo "🏗️  Building the project..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "To use this project:"
echo "1. Run 'nvm use 18' to ensure you're using the correct Node.js version"
echo "2. Run 'npm run build' to build the project"
echo "3. Run 'npm run package-solution' to create the SharePoint package"
echo ""
echo "📖 See README.md for deployment instructions"
