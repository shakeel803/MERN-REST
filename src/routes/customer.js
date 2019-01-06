let CustomerModel = require("../models/customer.model")
let express = require("express")
let router = express.Router()


/**
 * Create new customer
 * POST localhost:3000/customer
 */
router.post('/customer', (req, res)=>{
    //req.body carries data to create
    if(!req.body){
        res.status(400).send('Request body is missing, use body application/json')
    }

    let model = new CustomerModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})


//Get All Customers
router.get('/customer', (req, res)=>{
    CustomerModel.find()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})


//GET one customer using email
router.get('/customer/:email', (req, res)=>{
    CustomerModel.findOne({email:req.params.email})
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

//Update a customer using email
router.put('/customer/:email', (req, res)=>{
    
    if(!req.body){
        res.status(400).send('Request body is missing, use body application/json')
    }

    if(!req.params){
        res.status(400).send('PUT customer/:email is req in url')
    }

    CustomerModel.findOne({email:req.params.email})
        .then((doc)=>{
            if(doc.name == req.body.name){
                res.status(201).json({'msg':'Same name is already saved in DB'})
            }
            CustomerModel.updateOne({email:doc.email},{$set:{...req.body}})
                .then(doc => {
                    if(!doc || doc.length === 0){
                        res.status(500).json(doc)
                    } else {
                        res.status(201).json(doc)
                    }
                })
                .catch(err=>{
                    res.status(500).send('unable to update')
                })
    
        })
        .catch(err=>{
            res.status(500).send('unable to find the customer')
        })
    

})

//DELETE one customer
router.delete('/customer/:email', (req, res)=>{
    if(!req.body){
        res.status(400).send('Request body is missing, use body application/json')
    }

    if(!req.params){
        res.status(400).send('PUT customer/:email is req in url')
    }

    CustomerModel.findOne({email:req.params.email})
        .then((doc)=>{
            CustomerModel.deleteOne({email:doc.email})
                .then(doc => {
                    if(!doc || doc.length === 0){
                        res.status(500).json(doc)
                    } else {
                        res.status(201).json(doc)
                    }
                })
                .catch(err=>{
                    res.status(500).send('unable to update')
                })
    
        })
        .catch(err=>{
            res.status(500).send('unable to find the customer')
        })  
})


module.exports = router