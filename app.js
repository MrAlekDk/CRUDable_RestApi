const express = require("express");
const app = express();

app.use(express.json());

const beers = [{id : 1,brand : "Carlsberg",type : "Blonde",strength : "Light"},
                {id : 2,brand : "Tuborg",type : "IPA",strength : "Dark"},
                {id : 3,brand : "Grimbergen",type : "Double",strength : "Dark"}
            ];



app.get("/beers/:id",(req,res) =>{
    const id = parseFloat(req.params.id)
    res.send(beers.find(beer => beer.id ===id))
});

app.get("/beers",(req,res)=>{

    res.send(beers)
});

app.post("/beers",(req,res)=>{

    newBeer = req.body
    newBeer.id = beers.length+1

    
    beers.push(newBeer);        
    res.send("Beer succesfully created!")
});

app.put("/beers/:id",(req,res)=>{
    const id = parseFloat(req.params.id)

    index = beers.findIndex(beer => beer.id === id)
    if(index!==null && index>=0){
        beerUpdated = {...beers[index],...req.body}
        beers[index] = beerUpdated
        res.send("Beer updated")
    }
    else{
        res.send("Beer with specified ID doesn't exist!")
    }

})

app.patch("/beers/:id",(req,res)=>{
const id = parseFloat(req.params.id)

index = beers.findIndex(beer => beer.id === id)
if(index!==null && index>=0){
    beerUpdated = {...beers[index],...req.body}
    beers[index] = beerUpdated
    res.send("Beer property updated")
}
else{
    res.send("Beer with specified ID doesn't exist!")
}
})


app.delete("/beers/:id",(req,res)=>{
    const id = parseFloat(req.params.id)

    index = beers.findIndex(beer => beer.id === id)
    if(index!==null && index>=0){
    beers.splice(index,index)
    res.send("Succesfully removed beer")
    }
    else{
        res.send("Specified ID doesn't match any beer")
    }
})

app.listen(8080)