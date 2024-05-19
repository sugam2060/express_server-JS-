//My first express server using express

const express = require("express");
const app = express();


let Users = [{
    name:"sugam",
    Property:[{
        OwnedProperty: true
    }]
}]

app.use(express.json());

app.get('/',(req,res)=>{
    let Property = Users[0].Property;
    let OwnedProperty = Users[0].Property.length;
    let NoofownedProperty = 0;
    let NoofDisOwnedProperty = 0;
    for(let i = 0; i < OwnedProperty; i++){
        if(Users[0].Property[i].OwnedProperty == true){
            NoofownedProperty++;
        }
        else{
            NoofDisOwnedProperty++;
        }
    }

    res.json({
        OwnedProperty,
        NoofownedProperty,
        NoofDisOwnedProperty
    })
})


app.post('/',(req,res)=>{
    let OwnedProperty = req.body.OwnedProperty;

    Users[0].Property.push({
        Property:OwnedProperty,
    })

    res.status(200).json({
        msg:"OK"
    })
})

//update all the false into true
app.put('/',(req,res)=>{
    let lengthOfpeoperty = Users[0].Property.length;
    if(!IsallPropertyOwned()){
        for(let i = 0; i < lengthOfpeoperty; i++){
            if(!Users[0].Property[i].OwnedProperty){
                Users[0].Property[i].OwnedProperty = true;
            }
        }
        res.json({});
    }
    else{
        res.json({
            msg:"every property is owned"
        })
    }
})

// delete all false property
app.delete('/',(req,res)=>{
    let newProperty = [];
    if(!IsallPropertyOwned()){
        for(let i = 0; i < Users[0].Property.length; i++){
            if(Users[0].Property[i].OwnedProperty){
                newProperty.push({
                    OwnedProperty: true
                })
            }
        }
        Users[0].Property = newProperty;
        res.json({
            msg:"done"
        })
    }
    else{
        res.json({
            msg:"no false property found"
        })
    }
})

app.listen(3000);

function IsallPropertyOwned(){
    let trueCounter = 0;
    for(let i = 0;i < Users[0].Property.length; i++){
        if(Users[0].Property[i].OwnedProperty){
            trueCounter++;
        }
    }
    if(Users[0].Property.length == trueCounter){
        return true;
    }
    else{
        return false;
    }
}


