import * as fs from "fs";
import { parse, ParseResult } from "papaparse";
export type CommentSourceType = "youtube" | "x" | "form" | "other";

interface CsvRow {
  content: string;
  sourceType: CommentSourceType;
  sourceUrl: string;
}

test("parse csv file", () => {
  const buffer = fs.readFileSync(
    "./tests/testTargetFiles/東京都は、生成AIを都民向けサービスでどのように活用していくべきか.csv"
  );
  const blob = new Blob([buffer], { type: "text/csv" });
  const targetFile = new File([blob], "test.csv", { type: "text/csv" });

  const completeHandler = jest.fn((results: ParseResult<CsvRow>) => {
    console.log(results);
  });

  const errorHandler = jest.fn((error: Error) => {
    console.error("CSV parse error:", error);
  });

  parse<CsvRow>(targetFile, {
    header: true,
    preview: 1,
    complete: completeHandler,
    error: errorHandler,
  });

  expect(completeHandler).toHaveBeenCalled();
});
