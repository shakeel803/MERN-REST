let express = require("express")
let router = express.Router()


//QueryString => from req object
//localhost:3000/person?name=shakeel
router.get('/person', (req, res)=>{
    if(req.query.name){
        res.send(`You have requested a person  ${req.query.name}`)
    }else{
        res.send('You have requested a person using api')
    }
    
});

//params on req object
//localhost:3000/person/shakeel
router.get('/person/:name', (req, res)=>{
    res.send(`You have requested a person  ${req.params.name}`)
});

router.get('/error', (req, res) =>{
    throw new Error('This is forced error')
})

module.exports = router