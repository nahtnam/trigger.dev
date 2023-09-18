import fs, { promises } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "node:buffer";

export async function fileFromString(
  contents: string | Buffer | ArrayBuffer,
  fileName: string
): Promise<File> {
  const directory = path.join("tmp", uuidv4());
  await promises.mkdir(directory, { recursive: true });
  const filePath = path.join(directory, fileName);
  await promises.writeFile(filePath, contents);
  return fs.createReadStream(filePath) as unknown as File;
}

export async function fileFromUrl(url: string) {
  const response = await fetch(url);
  const content = await response.arrayBuffer();
  const fileName = path.basename(url);

  return fileFromString(content, fileName);
}
