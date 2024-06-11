// file index.ts
import next from "next";
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const dev = process.env.NODE_ENV !== "test";
let nextDir = __dirname;
if (nextDir.indexOf("/dist") !== -1) {
    nextDir = resolve(__dirname, "../");
}
// console.log("nextDir", nextDir);
// console.log("dev", dev);
const nextapp = next({
    dev,
    dir: nextDir,
});

export default nextapp;
