const express=require("express")
const router= express()
const db= require('../dbproject')




// Reterive data
router.get('/name',(req,res)=>{
    db.query('select * from namedetails',(err,result)=>{
        if(!err){
           
            res.send(result.rows).status(200)
        }
        else{
            console.log("No data")
            res.send(400)
        }
})
})

// insert data
router.post('/users',(req,res)=>{
    const detail=req.body;
    console.log(detail)
    // let insertData=`Insert into namedetails(nid,name,password)
    // values ('${detail}')`
    let insertData=`Insert into namedetails(nid,name,password)
     values (${detail.nid},'${detail.name}','${detail.password}')`
    console.log(insertData)
     db.query(insertData,(err,result)=>{
         if(!err)
         {
          console.log("data inserted successfully")
          res.status(200)
        }
    
        else{
            console.log("data insertion failed",err)
            res.status(400)
        }
     })
    })

    // Add data
    router.put('/users/:nid',(req,res)=>{
        const detail=req.body;
        let insertData=`Update namedetails set name='${detail.name}' where nid=${req.params.nid}`
        console.log(insertData)
         db.query(insertData,(err,result)=>{
             if(!err)
             {
              console.log("data updated successfully")
              res.status(200)
            }
        
            else{
                console.log("data updation failed",err)
                res.status(400)
            }
         })
        })

        // delete data
        router.delete('/users/:nid',(req,res)=>{
            let deletedata=`delete from namedetails where nid=${req.params.nid}`
            db.query(deletedata,(err,result)=>{
                if(!err)
                {
                 console.log("data deleted successfully")
                 res.status(200)
               }
           
               else{
                   console.log("data deleted failed",err)
                   res.status(400)
               }
            })
        })

        module.exports=router;