import { readFile, writeFile } from "fs/promises";
import path from "path";
import { BASE_JSON, ROOT_DIR } from "./directories.js";

const DATA_FILE = path.join(ROOT_DIR, "data.json");
const BY_EMOJI_FILE = path.join(ROOT_DIR, "data-by-emoji.json");

async function convertPbToJson() {
  try {
    const data = await readFile(BASE_JSON, "utf-8");
    const object = JSON.parse(data);

    const filesToExport = new Map();

    /*
     * Original Data
     */
    filesToExport.set(DATA_FILE, object);

    /*
     * By Emoji
     */
    const byEmoji = {};
    for (const e of object.emojis) {
      byEmoji[e.emoji] = {
        category: object.categories.find(
          (cat) =>
            e.id >= cat.startEmojiId &&
            e.id <
              (object.categories.find((c) => c.startEmojiId > cat.startEmojiId)
                ?.startEmojiId || Infinity),
        )?.name,
        combinations: (
          object.combinations.find((c) => c.id === e.id)?.emojiIds || []
        )
          .map((id) => object.emojis.find((em) => em.id === id)?.emoji)
          .filter(Boolean),
      };
    }
    filesToExport.set(BY_EMOJI_FILE, byEmoji);

    /*
     * Write files
     */

    for (const [filePath, content] of filesToExport) {
      const jsonOutput = JSON.stringify(content, null, 2);

      await writeFile(filePath, jsonOutput);
      console.log(`\nSuccess: ${path.basename(filePath)} created!`);
    }
  } catch (error) {
    console.error("Error converting file:", error);
  }
}

await convertPbToJson();
