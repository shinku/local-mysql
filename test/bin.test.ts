import { execSync } from "child_process";
import path from "path";

describe('test-bin', ()=>{
  test("test bin", async ()=>{
    const result = execSync(
      `node  ${path.join(__dirname, '../dist/bin.js')} -c ./test/config/config.json`,
      {
        stdio: 'pipe',
      }
    );
    expect(Buffer.from(result.buffer))
  })
})