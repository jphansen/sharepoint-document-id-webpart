# Document ID WebPart for SharePoint

This is a SharePoint Framework (SPFx) webpart that provides a button to send the current document ID via a POST request.

## ⚠️ Important: Node.js Version Requirement

**This project requires Node.js version 16.13.0 to 18.x.x to build properly.**

Your current environment is running Node.js v24.5.0, which is not compatible with the SharePoint Framework build tools. To build and run this project:

1. **Install Node Version Manager (nvm)**:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   ```

2. **Install and use Node.js 18**:
   ```bash
   nvm install 18
   nvm use 18
   ```

3. **Then run the build**:
   ```bash
   npm install
   npm run build
   ```

## Features

- **Button Interface**: Simple button to trigger the POST request
- **Document ID Detection**: Automatically detects the current document/page ID from SharePoint context
- **Configurable URL**: POST URL can be configured through webpart properties
- **Status Feedback**: Shows success/error messages after request completion

## How it works

1. The webpart detects the current document ID from the SharePoint page context
2. When the button is clicked, it constructs a POST request URL with the document ID as a `Name` parameter: `{your-post-url}?Name={document-id}`
3. Sends the POST request with JSON payload containing document ID and timestamp
4. Displays status messages to indicate success or failure

## Project Structure

- `src/webparts/documentIdWebpart/` - Main webpart files
  - `DocumentIdWebpartWebPart.ts` - Main webpart class with SharePoint context handling
  - `components/DocumentIdWebpart.tsx` - React component with button and POST logic
  - `components/IDocumentIdWebpartProps.ts` - TypeScript interface
- `config/` - SPFx configuration files
- `package.json` - Dependencies and build scripts

## Configuration

After deployment, configure the webpart through its property pane:
- **Description**: Customize the description text
- **POST URL**: Set the endpoint URL where the document ID will be sent

## Key Implementation Details

The webpart includes:

1. **Document ID Detection**: Uses SharePoint page context to get the current document/list item ID
2. **HTTP Client**: Uses standard fetch API for POST requests (compatible with both SharePoint and external endpoints)  
3. **Error Handling**: Comprehensive error handling with user-friendly messages
4. **UI Components**: Uses Office UI Fabric React components for consistent SharePoint look and feel

## Deployment

1. Ensure you have the correct Node.js version (16.13.0 - 18.x.x)
2. Install dependencies: `npm install`
3. Build the solution: `npm run build`
4. Package the solution: `npm run package-solution`
5. Deploy the .sppkg file to your SharePoint App Catalog
6. Add the webpart to a SharePoint page
7. Configure the POST URL in the webpart properties
