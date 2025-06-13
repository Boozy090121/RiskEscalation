import { InteractionRequiredAuthError } from '@azure/msal-browser'

export async function getAccessToken(instance, account, scopes) {
  const request = {
    scopes,
    account
  }

  try {
    const response = await instance.acquireTokenSilent(request)
    return response.accessToken
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      const response = await instance.acquireTokenPopup(request)
      return response.accessToken
    }
    throw error
  }
}