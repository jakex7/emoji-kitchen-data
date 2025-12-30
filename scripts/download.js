import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import https from "node:https";
import { pipeline } from "node:stream/promises";
import { BASE_PB, TMP_DIR } from "./directories.js";

const FILE_URL = process.env.EMOJI_KITCHEN_URL;
const USER_AGENT = "emoji-kitchen-data/1.0";

async function main() {
  console.log(`Downloading from ${FILE_URL}...`);

  await mkdir(TMP_DIR, { recursive: true });

  try {
    const responseStream = await new Promise((resolve, reject) => {
      https
        .get(FILE_URL, { headers: { "User-Agent": USER_AGENT } }, (res) => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res);
            return;
          }

          reject(
            new Error(`Unexpected status code: ${res.statusCode || "unknown"}`),
          );
          res.resume();
        })
        .on("error", reject);
    });

    await pipeline(responseStream, createWriteStream(BASE_PB));
    console.log(`File saved to ${BASE_PB}`);
  } catch (error) {
    console.error(`Download failed: ${error.message}`);
  }
}

await main();
