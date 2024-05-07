import { runCommand, sliceCommandResult } from "../src/tools";

describe("test modle",()=>{
  test("test command", async ()=>{
  
    let result = await runCommand("ls")
    expect(result.some(item=>item==="bin.js")).toBe(true)
    const strs =  [
      'REPOSITORY               TAG       IMAGE ID       CREATED         SIZE',
      'docker/getting-started   latest    3e4394f6b72f   16 months ago   47MB',
      ''
    ]
    const r1 =  sliceCommandResult<any>(strs);
    expect(r1[0].REPOSITORY).toBe('docker/getting-started')
  })
})