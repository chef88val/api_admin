const ObjectId = require('mongoose').Types.ObjectId;
var Products = require('../models/products')
function getproductID(req,res){
    var id= req.params.id
    Products
        .aggregate([
            {$lookup:{from:"Categories",localField:'category',foreignField:'_id',as:"category"}},
            {$lookup:{from:"Subcategories",localField:'subcategory',foreignField:'_id',as:"subcategory"}},
            {$match:{_id: ObjectId(id)}}
        ],(err, exampled) => {
            console.log(exampled,'getproductsID',err)
            return res.status(200).send(
                exampled[0]
            
            )
        })
}

function getproducts(req, res) {
    var filter = req.query
    delete filter.page
    if('name' in filter)filter.name = new RegExp(filter.name, "i")
    console.log('filter', filter)

    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //console.log('products',products)
    Products.find(filter, (err, exampled) => {
        console.log('prods', exampled)
        return res.status(200).send(
            exampled
        
        )
    })
}

function updateproducts(req, res) {
    var id = req.body.name
    var update = req.body
    Products.update({name:id}, update,
        (err, _prod) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            if (!_prod) return res.status(404).send({ message: 'No hay producto disponibles' })
            return res.status(200).send({
                message: "User updated"

            })
        })
}

function saveproducts(req, res, next) {
    var data = req.body
    var prod = new Products(data)
    //prod.name = data.name
    //prod.status = data.status
    //prod=data
    Products.find({
        name: prod.name
    }).exec(
        (err, prods) => {
            if (err) return res.status(500).send({ message: "Ha habido un error" })
            if (prods && prods.length >= 1) {
                return res.status(200).send({ message: "Ya hay un producto con las mismas crendeciales" })
            } else {
                prod.save(
                    (err, prodStored) => {
                        if (err) return res.status(500).send({ message: "Error al guarda el producto por la password" })
                        if (prodStored){
                            req.params.id = prodStored._id
                             res.status(200).send({ prod: prodStored });
                                //uploadImage(req,res)
                            }
                        else res.status(404).send({ message: "Error al guarda el producto" })

                    }
                )
            }
        })

}


function uploadImage(req, res) {
    var id = req.params.id;
    var update = req.body;


    if (req.files) {
        console.log("req.files",req.files.image.path)
       var file_path = req.files.image.path;

        if(file_path.split('\/') === undefined)
            var file_split = file_path.split('\\');
        else
            var file_split = file_path.split('\/');
        var file_name= file_split[2];
        console.log("file_name[2]",file_name);
        var _ext= file_name.split('\.');
        var file_ext= _ext[1];
        console.log(file_split,file_name,_ext,file_ext)

        if (id != req.user.sub) {
            removeFilesUploads(res,file_path,"No tienes permiso para actualizar los datos del usuario")
        }
        if(file_ext =='png' || file_ext =='jpg'){
            User.findByIdAndUpdate(id,{image: file_name},{new:true},(err,_user)=>{
                if (err) return res.status(500).send({message: 'Error en la peticion'})
                if (!_user) return res.status(404).send({message: 'No se ha actualizado'})
                return res.status(200).send({
                    message: "User image updated"
                })
            })
        }else{
            removeFilesUploads(res,file_path,"Extensión no valida")
        }

    } else {
        return res.status(200).send({message: "No se han subido imagenes"})
    }
}
function removeFilesUploads(res,file_path,message) {
    fs.unlink(file_path,(err)=>{
        return res.status(200).send({message})
    })
}

module.exports ={
    getproducts,getproductID,saveproducts,updateproducts, uploadImage
}