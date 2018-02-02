var Subcategory = require('../models/subcategories')

function getsubcat(req,res){
    var id= req.params.id
    Subcategory.find({cat: id},(err, subcat) => {
        console.log(err,'populate', subcat)
        
        return res.status(200).send(
            subcat
        
        )
    })
}
function getsubcategories(req, res) {
    var filter = req.query
    if ('id' in filter) {
        Subcategory.findById(filter.id, (err, example) => {
            console.log('cadts', example)
            return res.status(200).send(
                example
            
            )
        })
    } else {
        //filter.name = new RegExp(filter.name, "i")
        console.log('filter', filter)
        if( 'name' in filter) filter.name = new RegExp(filter.name,"i")
        delete filter.page

        //res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //console.log('subcategories',subcategories)
        /* Subcategory.find(filter, (err, exampled) => {
            console.log('cats', exampled)
            Subcategory.findOne({_id: exampled})
            return res.status(200).send(
                exampled
            
            )
        }) */
        Subcategory.find(filter).populate('cat').exec((err, exampled) => {
            console.log(err,'populate', exampled)
            
            return res.status(200).send(
                exampled
            
            )
        })
    }
}

function updatesubcategories(req, res) {
    var id = req.params.id
    var update = req.body
    Subcategory.update({ _id: id }, update,
        (err, _cat) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            if (!_cat) return res.status(404).send({ message: 'No hay usuario disponibles' })
            return res.status(200).send({
                message: "User updated"

            })
        })
}

function savesubcategories(req, res, next) {
    var data = req.body
    var cat = new Subcategory()
    cat.name = data.name
    cat.status = data.status
    Subcategory.find({
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

module.exports = {
    getsubcat,getsubcategories, savesubcategories, updatesubcategories
}