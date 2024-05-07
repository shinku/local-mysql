import path from 'path';
import { initSql, query, trimSql } from '../src/index';
describe('test-sql',()=>{
  const  str = `select * from abc;
  select * from  def;`;
  test('trimsql', async ()=>{
    const sqlRes =  trimSql(str).split(";")
    expect(sqlRes.length).toBe(3);
    expect(sqlRes[0]).toBe("select * from abc");
  })
  test("test prepare sql", async ()=>{
    await initSql([
      path.join(__dirname,'./sql/init.sql')
    ]);
    let res = await query('show tables');
    res = await query('describe table names');
    console.log(res);
  })
})