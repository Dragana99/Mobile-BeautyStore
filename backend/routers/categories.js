const express = require('express');
const {Category} = require('../models/category');
const { route } = require('./products');
const router = express.Router();


router.get(`/`, async (req, res)=>{
    const categoryList = await Category.find();
    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
})

router.get(`/:id`, async (req, res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({success: false, message: 'Kategorija ne postoji pod izabranim ID-jem!'})
    }
    res.status(200).send(category);
})

router.post(`/`, async (req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
     category = await category.save();

     if(!category)
     return res.status(404).send('Nije moguce kreirati kategorije')

     res.send(category);

})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category){
            return res.status(200).json({success: true, message: 'Kategorija uspesno obrisana!'})
        }
        else{
            return res.status(404).json({success: false, message: 'Kategorija nije nadjena!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    },
    {new: true}
    )
    if(!category)
     return res.status(400).send('Nije moguce izmeniti kategoriju')

     res.send(category);

})

module.exports = router;