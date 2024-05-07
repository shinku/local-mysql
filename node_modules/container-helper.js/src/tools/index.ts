import {exec} from 'child_process'
export const convertBufferToString = (data: Buffer)=>{
  const buffer = Buffer.from(data).toString('utf-8');
  const result = buffer.split(/\r?\n/);
  return result
}
export const runCommand = (command:string)=>{
  console.log("[command]" + command + ":")
  return new Promise<string[]>(resolve=>{
    const result = exec(command);
    const datas = [] as Buffer[];
    result.stdout?.on('data', data=>{
      console.info(convertBufferToString(data).join("\n"))
      datas.push(Buffer.from(data))
    })
    result.stderr?.on('data', data=>{
      console.info(convertBufferToString(data).join("\n"))
      datas.push(Buffer.from(data))
    })
    result.on('close',()=>resolve(convertBufferToString(Buffer.concat(datas))))
  })
}

export const sliceCommandResult = function <T>(res: string[]): T[] {
  const reg = /\s{2,}/
  const tags = res[0].split(reg);
  const results: Array<T> = [];
  for(let i = 1;i<res.length;i++){
    if(!res[i]) continue
    const values = res[i].split(reg);
    const obj = {} as T;
    values.forEach((v,index)=>{
      obj[tags[index]] = v
    })
    results.push(obj)
  }
  return results as T[]
}