const { Pinecone } = require("@pinecone-database/pinecone");

async function initPinecone() {
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pinecone.index("healthcare-bot");
    return index;
}

module.exports = { initPinecone };
