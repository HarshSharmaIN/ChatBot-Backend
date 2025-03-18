const { getEmbedding } = require("./embeddingService");
const { initPinecone } = require("../config/pinecone");

exports.getRelevantMedicalInfo = async (query) => {
    try {
        const index = await initPinecone();
        const embedding = await getEmbedding(query);
        
        const results = await index.query({
            vector: embedding,
            topK: 3,
            includeMetadata: true,
        });

        return results.matches.map(match => match.metadata.content).join("\n");
    } catch (error) {
        console.error("Error querying Pinecone:", error);
        return "No relevant medical information found.";
    }
};
