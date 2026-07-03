import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6a2e8c31003947c2a452');

const account = new Account(client);
const databases = new Databases(client);

const randomId = Math.random().toString(36).substring(7);
const email = `testuser_${randomId}@example.com`;
const password = 'Password123!';
const name = 'Test User';

async function run() {
    try {
        console.log("1. Creating temporary account:", email);
        await account.create(ID.unique(), email, password, name);
        
        console.log("2. Logging in...");
        await account.createEmailPasswordSession(email, password);
        
        console.log("3. Fetching database documents...");
        const response = await databases.listDocuments(
            '6a2e8dbf0015a752eb50', // databaseId
            'articles' // collectionId
        );
        
        console.log("Total documents in collection:", response.total);
        if (response.documents.length > 0) {
            console.log("\nFirst document structure:");
            console.log(JSON.stringify(response.documents[0], null, 2));
        } else {
            console.log("No documents found.");
        }
        
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

run();
