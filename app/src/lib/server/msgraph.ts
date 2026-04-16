import { Client } from "@microsoft/microsoft-graph-client";
import { DefaultAzureCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import {
  AZURE_TENANT_ID,
  AZURE_CLIENT_ID,
  AZURE_CLIENT_SECRET,
} from "$env/static/private";

// const credential = new ({
//   tenantId: AZURE_TENANT_ID,
//   clientId: AZURE_CLIENT_ID,
//   userPromptCallback: (info) => {
//     console.log(info.message);
//   },
// });

const credential = new DefaultAzureCredential();

// @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ["https://graph.microsoft.com/.default"],
});

export const graphClient = Client.initWithMiddleware({ authProvider });
