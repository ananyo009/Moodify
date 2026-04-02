
const imageKit = require('@imagekit/nodejs')



const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function uploadFile(buffer, fileName ,folder) {
    const file = await client.files.upload({
        file: await imageKit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder: folder
    });

    return file;
}

module.exports = { uploadFile };