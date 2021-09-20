const express = require("express");
const router = express.Router();

module.exports = router;

// Array of objects
let animalArray = [
    { id: 1, animalName: "dog" },
    { id: 2, animalName: "cat" },
    { id: 3, animalName: "hamster" },
];

// router.get('/', function(req, res) {
//     let foundAnimal = null;

//     if (Object.keys(req.query).length === 0) {
//         res.json(animalArray);
//     } else {
//         animalArray.forEach((e) => {
//             if (e.animalName === req.query.animal) {
//                 foundAnimal = e;
//             }
//         })
//     }
//     if (!foundAnimal) {
//         res.json({ animalArray });
//     } else {
//         res.json({ foundAnimal });
//     }
// });

router.get('/get-animal-by-id/:id', function(req, res) {
    let animalId = null;

    animalArray.forEach((element) => {
        if (element.id === +req.params.id) {
            animalId = element;
        }
    })

    res.json({ animalId, id: req.params.id })
})

router.get('/get-animal-by-name/:name', function(req, res) {
    let foundAnimal = null;

    animalArray.forEach((animal) => {
        if (animal.animalName === req.params.name) {
            foundAnimal = animal;
        }
    })
    if (!foundAnimal) {
        res.send('Animal not found');
    } else {
        res.json({ foundAnimal });
    }
})

router.post('/', function(req, res) {
    let answer = null;

    animalArray.forEach((animal) => {
        if (animal.animalName === req.body.animalName) {
            res.send('Error, item already present in array');
            res.end;
        } else {answer = req.body}
    })
    animalArray.push(answer)
    res.json({ animalArray })
})