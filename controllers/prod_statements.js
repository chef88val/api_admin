var Statement = require('../models/prod_statements')
function getstatements(req, res) {
    var filter = req.body
    filter.name = new RegExp(filter.name, "i")
    console.log('filter', filter.name)

    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //console.log('statement',statement)
    Statement.find(filter, (err, exampled) => {
        console.log('cats', exampled)
        return res.status(200).send({
            exampled
        }
        )
    })
}

function updatestatements(req, res) {
    var id = req.body.name
    var update = req.body
    Statement.update({name:id}, update,
        (err, _cat) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            if (!_cat) return res.status(404).send({ message: 'No hay usuario disponibles' })
            return res.status(200).send({
                message: "User updated"

            })
        })
}

function savestatements(req, res, next) {
    var data = req.body
    var cat = new Statement()
    cat.name = data.name
    cat.status = data.status
    Statement.find({
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
    getstatements,savestatements,updatestatements
}