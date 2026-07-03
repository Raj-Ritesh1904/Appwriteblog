import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6a2e8c31003947c2a452');

const databases = new Databases(client);

async function test() {
    try {
        console.log("Fetching documents...");
        const response = await databases.listDocuments(
            '6a2e8dbf0015a752eb50', // databaseId
            'articles' // collectionId
        );
        console.log("Success! Total documents:", response.total);
        if (response.documents.length > 0) {
            console.log("Sample Document Keys & Values:");
            console.log(JSON.stringify(response.documents[0], null, 2));
        } else {
            console.log("No documents found in collection 'articles'.");
        }
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

test();
