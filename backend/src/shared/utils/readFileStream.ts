import fs from "fs";
import { parse } from "csv-parse";

interface IData {
  date: Date;
  value: number;
}

export async function readFileStream(path: string): Promise<IData[]> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(path);
    const data: IData[] = [];

    const parseFile = parse();

    stream.pipe(parseFile);

    parseFile
      .on("data", async (line) => {
        const [date, value] = line;

        const result = {
          date: new Date(date),
          value: Number(value.replace(",",".")),
        };

        data.push(result);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
