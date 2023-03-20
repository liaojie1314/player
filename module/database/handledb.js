const db = require("./orm")
 
function handleDB(res,tableName,methodName,errorMsg, n1, n2){
    //数据库操作
    let Model = db.model(tableName);  // 表映射为模型, 参数是要操作的这个表的表名
    let results;  //results就收查询到的数据
    try{
        results = new Promise((resolve, reject)=>{
            // Model.find("id>=15",(err,data)=>{   //直接调用不封装
            if(!n1){
                Model[methodName]((err,data)=>{    //封装的时候使用这种格式 
                    if(err)reject(err);   // 失败的时候调用reject()
                    resolve(data);    //成功的时候调用resolve() 
                });
                return
            }
            //能够给执行到这里说明n1已经传进来了！
            if(!n2){
                Model[methodName](n1,(err,data)=>{    //封装的时候使用这种格式 
                    if(err)reject(err);   // 失败的时候调用reject()
                    resolve(data);    //成功的时候调用resolve() 
                });
                return
            }
            //能够给执行到这里说明n1和n2已经传进来了！
            Model[methodName](n1,n2,(err,data)=>{    //封装的时候使用这种格式 
                if(err)reject(err);   // 失败的时候调用reject()
                resolve(data);    //成功的时候调用resolve() 
            });
                
        }) 
    }catch(err){
        console.log(err); // 给后台看到的
        res.send({errMsg:errorMsg}); //给前端送过去的
        return
    }
 
    return results
}
 
module.exports = handleDB