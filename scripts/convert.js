import protobuf from "protobufjs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { ROOT_DIR, BASE_PB, BASE_JSON } from "./directories.js";

const SCHEMA_FILE = path.join(ROOT_DIR, "schema.proto");

async function convertPbToJson() {
  try {
    const root = await protobuf.load(SCHEMA_FILE);

    const MessageType = root.lookupType("EmojiKitchenData");

    const buffer = await readFile(BASE_PB);
    const message = MessageType.decode(buffer);
    const object = MessageType.toObject(message, {
      longs: String,
      enums: String,
      bytes: Buffer,
      defaults: true,
      arrays: true,
      objects: true,
    });

    const sortedObject = {
      emojis: object.emojis.sort((a, b) => a.id - b.id),
      combinations: object.combinations.sort((a, b) => a.id - b.id),
      categories: object.categories.sort(
        (a, b) => a.start_emoji_id - b.start_emoji_id,
      ),
    };

    const jsonOutput = JSON.stringify(sortedObject, null, 2);

    await writeFile(BASE_JSON, jsonOutput);
    console.log(`\nSuccess: ${BASE_JSON} created!`);
  } catch (error) {
    console.error("Error converting file:", error);
  }
}

await convertPbToJson();
