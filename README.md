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

## 📋 Detailed SharePoint Installation Guide

### Prerequisites
- **SharePoint Online** or **SharePoint Server 2019/2022** with modern sites
- **Global Administrator** or **SharePoint Administrator** access
- **App Catalog** configured in your SharePoint tenant
- **Node.js 16.13.0 - 18.x.x** installed on development machine

### Step 1: Build the WebPart Package

1. **Set up the development environment:**
   ```bash
   # Use the setup script (recommended)
   ./setup.sh
   
   # Or manually:
   nvm install 18
   nvm use 18
   npm install --legacy-peer-deps
   ```

2. **Build and package the solution:**
   ```bash
   # Build the project
   npm run build
   
   # Create the SharePoint package
   npm run package-solution
   ```

3. **Locate the package file:**
   - The `.sppkg` file will be created in: `sharepoint/solution/`
   - File name: `document-id-webpart.sppkg`

### Step 2: Deploy to SharePoint App Catalog

#### Option A: Tenant App Catalog (Recommended)

1. **Access the App Catalog:**
   - Go to your SharePoint Admin Center: `https://[tenant]-admin.sharepoint.com`
   - Navigate to **More features** → **Apps** → **App Catalog**
   - Click **Distribute apps for SharePoint**

2. **Upload the package:**
   - Click **Upload** or drag the `document-id-webpart.sppkg` file
   - Check **"Make this solution available to all sites in the organization"**
   - Click **Deploy**

3. **Approve API permissions (if required):**
   - Go to SharePoint Admin Center → **Advanced** → **API access**
   - Approve any pending requests for this app

#### Option B: Site Collection App Catalog

1. **Enable Site Collection App Catalog:**
   - Go to your site collection
   - Navigate to **Site Settings** → **Site collection features**
   - Activate **"Site Collection App Catalog"**

2. **Upload the package:**
   - Go to **Site Contents** → **Apps for SharePoint**
   - Upload the `.sppkg` file
   - Click **Deploy**

### Step 3: Add WebPart to SharePoint Page

#### Method 1: Modern SharePoint Pages

1. **Navigate to your SharePoint site**
2. **Create or edit a page:**
   - Go to **Site Pages** → **New** → **Site Page**
   - Or edit an existing page by clicking **Edit**

3. **Add the webpart:**
   - Click the **"+"** icon to add a web part
   - Search for **"Document ID Webpart"**
   - Click to add it to your page

4. **Configure the webpart:**
   - Click the **edit (pencil)** icon on the webpart
   - Click **"Configure web part"** or the **settings gear** icon
   - In the property pane, set:
     - **Description**: Custom description for your webpart
     - **POST URL**: The endpoint URL where document IDs will be sent

5. **Save and publish the page**

#### Method 2: Classic SharePoint Pages

1. **Navigate to your SharePoint site**
2. **Edit the page:**
   - Go to the page you want to modify
   - Click **Edit** → **Edit Page**

3. **Add the webpart:**
   - Click **Insert** → **Web Part**
   - Browse to **Custom** category
   - Select **"Document ID Webpart"**
   - Click **Add**

4. **Configure and save**

### Step 4: Configure the WebPart

1. **Open the webpart settings:**
   - Click the webpart menu (⋮) → **Edit web part**

2. **Configure properties:**
   - **Description**: Enter a custom description
   - **POST URL**: Enter your endpoint URL (e.g., `https://api.example.com/webhook`)

3. **Test the functionality:**
   - Click **"Send Document ID"** button
   - Verify the POST request is sent with the document ID as `Name` parameter

### Step 5: Verify Installation

#### Test the WebPart:

1. **Check document ID detection:**
   - The webpart should display the current document/page ID
   - ID format depends on the page type (list item ID, page ID, etc.)

2. **Test POST request:**
   - Configure a test endpoint (e.g., webhook.site)
   - Click the button and verify the request is sent
   - Check that the URL includes `?Name={document-id}`

3. **Verify JSON payload:**
   ```json
   {
     "documentId": "123",
     "timestamp": "2025-08-28T15:13:28.000Z"
   }
   ```

### Troubleshooting

#### Common Issues:

1. **"App not found" error:**
   - Ensure the app is deployed to the correct App Catalog
   - Wait 5-10 minutes for deployment to propagate
   - Clear browser cache

2. **"Document ID shows 'unknown'":**
   - The webpart might be on a page without a document context
   - Try adding it to a document library page or list item page

3. **POST request fails:**
   - Check the POST URL configuration
   - Verify CORS settings on the target endpoint
   - Check browser developer tools for error messages

4. **Permission errors:**
   - Ensure you have **Site Owner** or **Site Member** permissions
   - Check if the app requires additional API permissions

#### Support Commands:

```bash
# Rebuild after changes
npm run clean && npm run build

# View build logs
npm run build -- --verbose

# Package for deployment
npm run package-solution -- --ship
```

### Security Considerations

- **CORS**: Ensure your endpoint accepts requests from SharePoint domains
- **Authentication**: Consider implementing authentication for your POST endpoint
- **Data Validation**: Validate the document ID parameter on your server
- **HTTPS**: Always use HTTPS endpoints for production deployments

### Next Steps

After successful installation:
1. Train users on how to use the webpart
2. Monitor POST request logs on your endpoint
3. Set up error handling and logging
4. Consider implementing batch processing if needed
