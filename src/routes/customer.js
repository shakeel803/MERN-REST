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


module.exports = router