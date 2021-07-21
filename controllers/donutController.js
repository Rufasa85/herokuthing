const express = require('express');
const fs = require("fs")
const router = express.Router();

const donuts = require("../db/donuts.json");

router.get("/",(req,res)=>{
    res.json(donuts)
})

router.get("/:id",(req,res)=>{
    donuts.forEach(donut=>{
        if(donut.id===parseInt(req.params.id)){
            return res.json(donut)
        }
    })
    return res.status(404).send("donut not found")
})

router.post("/",(req,res)=>{
    if(req.body && req.body.type && req.body.rating && req.body.price){

        const newDonut = {
            type:req.body.type,
            rating:parseFloat(req.body.rating),
            price:parseFloat(req.body.price),
            id:donuts.length?donuts[donuts.length-1].id + 1:1
        }
        donuts.push(newDonut);
        console.log(donuts)

        fs.writeFile("db/donuts.json",JSON.stringify(donuts,null,4),(err)=>{
            if(err){
                res.status(500).send("error");
                console.log(err);
            } else{ 
                res.json(newDonut);
                // res.redirect("/")
            }
        })
    } else {
        res.status(500).send("you are missing data");
    }
})

router.delete("/:id",(req,res)=>{
    console.log(donuts,req.params)
    let foundDonut = false;
    donuts.forEach((donut,idx)=>{
        if(donut.id===parseInt(req.params.id)){
            foundDonut = true;
            donuts.splice(idx,1)
            fs.writeFile("db/donuts.json",JSON.stringify(donuts,null,4),(err)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send("error");
                } else{ 
                  return res.send("deleted!")
                }
            })
        }
    })
    if(!foundDonut){
        return res.status(404).send("donut not found")
    }
})

module.exports = router;