export const msalConfig = {
  auth: {
    clientId: process.env.VITE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE',
    authority: `https://login.microsoftonline.com/${process.env.VITE_TENANT_ID || 'YOUR_TENANT_ID_HERE'}`,
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
}

export const loginRequest = {
  scopes: ['User.Read', 'Files.Read.All']
}

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphFilesEndpoint: 'https://graph.microsoft.com/v1.0/me/drive/root'
} 