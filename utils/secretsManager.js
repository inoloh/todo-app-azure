const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const dotenv = require('dotenv');

require('dotenv').config({ path: '.env.dev' });

const credential = new DefaultAzureCredential();
const vaultName = process.env['KEY_VAULT_NAME'];
const url = `https://${vaultName}.vault.azure.net`;
const client = new SecretClient(url, credential);

async function getSecret(secretName) {
    const secret = await client.getSecret(secretName);
    return secret.value;
}

module.exports = { getSecret };
