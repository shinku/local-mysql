
import path from 'path';
import { initSql, query } from '../src/index';
describe("test instance", ()=>{
  beforeAll(async ()=>{
    await initSql([path.join(__dirname,'./sql/instance.sql')])
  })
  test("test a instance", async ()=>{
    let result = await query('select * from names');
    expect(result[0].name).toBe('shingu.gu')
    result = await query('select * from users');
    expect(result[0].uid).toBe('shingu.gu')
  })
})