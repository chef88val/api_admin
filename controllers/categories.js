const ObjectId = require('mongoose').Types.ObjectId;
var Category = require('../models/categories')
function getcategoriesID(req,res){
    var id= req.params.id
    Category
        .aggregate([
            {$lookup:{from:"Subcategories",localField:'_id',foreignField:'cat',as:"xxx"}},
            {$match:{_id: ObjectId(id)}}
        ],(err, exampled) => {
            console.log(exampled,'getcategoriesID',err)
            return res.status(200).send(
                exampled
            
            )
        })
}

function getcategories(req, res) {
    var filter = req.query
    delete filter.page
    console.log('filter',Object.keys(filter).length === 0)
    if(Object.keys(filter).length === 0){
        Category
        .aggregate([
            {$lookup:{from:"Subcategories",localField:'_id',foreignField:'cat',as:"subCat"}},
        ],(err, exampled) => {
            //console.log(exampled,'getcategoriesID',err)
            return res.status(200).send(
                exampled
            
            )
        })
    }else{
        Category
        .aggregate([
            {$lookup:{from:"Subcategories",localField:'_id',foreignField:'cat',as:"subCat"}},
            {$match:filter}
        ],(err, exampled) => {
            //console.log(exampled,'getcategoriesQuery',err)
            return res.status(200).send(
                exampled
            
            )
        })
    }
    /* if ('id' in filter) {
        Category.findById(filter.id, (err, example) => {
            return res.status(200).send(
                example
            
            )
        })
    } else {
        
        //filter.name = new RegExp(filter.name, "i")

        //res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //console.log('subcategories',subcategories)
        if( 'name' in filter) filter.name = new RegExp(filter.name,"i")
        delete filter.page
        if(req.params.id){
            console.log('req.params.id',req.params.id)
        
    }else
        Category.aggregate({$lookup:{from:"Subcategories",localField:'_id',foreignField:'cat',as:"xxx"}},
         function(err,data){ return res.status(200).send(
            data
        
        );console.log(err,'datad',data)
        }) */
         /* Category.aggregate([
            
             { $group: 
            { _id: '$cat', total_products: { $sum: 1 } } 
            }, 
            {$group:{_id:"$_id", versions : {$push : "$name"}}}
        ],
            function (err, res) {
            if (err) console.log(err);
            console.log(res);
            }
           ); 
        Category.find(filter).populate('hasSub').exec((err, exampled) => {
            console.log('err',err)
            return res.status(200).send(
                exampled
            
            )
        })*/
    }
//}

function updatecategories(req, res) {
    var id = req.params.id
    var update = req.body
    Category.findByIdAndUpdate({_id:id}, update,
        (err, _cat) => {
            console.log('_cat',_cat)
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            if (!_cat) return res.status(404).send({ message: 'No hay usuario disponibles' })
            return res.status(200).send({
                message: "User updated"

            })
        })
}

function savecategories(req, res, next) {
    var data = req.body
    var cat = new Category()
    cat.name = data.name
    cat.status = data.status
    Category.find({
        name: cat.name
    }).exec(
        (err, cats) => {
            if (err) return res.status(500).send({ message: "Ha habido un error" })
            if (cats && cats.length >= 1) {
                return res.status(200).send({ message: "Ya hay un usuario con las mismas crendeciales" })
            } else {
                cat.save(
                    (err, catStored) => {
                        if (err) return res.status(500).send({ message: "Error al guarda el usuario por la password" })
                        if (catStored) res.status(200).send({ user: catStored })
                        else res.status(404).send({ message: "Error al guarda el usuario" })

                    }
                )
            }
        })

}

module.exports ={
    getcategories,getcategoriesID,savecategories,updatecategories
}