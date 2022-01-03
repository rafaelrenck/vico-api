import fs from "fs";
import path from "path";

export class LoadArchiveUseCase {
  async execute(fiaId: string) {
    return {
      fileExists: fs.existsSync(
        path.join(
          path.resolve(__dirname, "..", "..", "..", "..", "..", "archive"),
          fiaId + "_SCAN.PDF"
        )
      ),
    };
  }
}
