import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.join(__dirname, "..");
export const TMP_DIR = path.join(ROOT_DIR, "data");
export const BASE_NAME = path
  .basename(process.env.EMOJI_KITCHEN_URL)
  .replace(".pb", "");

export const BASE_JSON = path.join(TMP_DIR, `${BASE_NAME}.json`);
export const BASE_PB = path.join(TMP_DIR, `${BASE_NAME}.pb`);
