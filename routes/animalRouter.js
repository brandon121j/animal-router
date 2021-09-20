const express = require("express");
const router = express.Router();

module.exports = router;

// Array of objects
let animalArray = [
    { id: 1, animalName: "dog" },
    { id: 2, animalName: "cat" },
    { id: 3, animalName: "hamster" },
];

router.get('/', function(req, res) {
    let foundAnimal = null;

    if (Object.keys(req.query).length === 0) {
        res.json({ animalArray })
    } else {
        animalArray.forEach((e) => {
            if (e.animalName === req.query.animalName.toLowerCase()) {
                foundAnimal = e;
            }
        })
    }
    if (!foundAnimal) {
        res.json({ animalArray });
    } else {
        res.json({ foundAnimal });
    }
});

router.get('/get-animal-by-id/:id', function(req, res) {
    let foundAnimal = null;

    animalArray.forEach((element) => {
        if (element.id === +req.params.id) {
            foundAnimal = element;
        }
    })

    res.json({ foundAnimal, id: req.params.id })
});

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
});

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
});

router.put('/update-animal-by-name/:name', function(req, res) {
    let foundAnimal = null;

    animalArray.forEach((item) => {
        if (item.animalName === req.params.name) {
            item.animalName = req.body.newName;
            foundAnimal = true;
        }
    })
    if (!foundAnimal) {
        res.send('Please check your spelling');
    } else {res.json({ animalArray })}
});

router.put('/update-animal-by-id/:id', function(req, res) {
    let foundAnimal = null;
    console.log(animalArray[2])

    animalArray.forEach((item) => {
        if (item.id === +req.params.id) {
            foundAnimal = item;
        }
    })
    if (!foundAnimal) {
        res.send('Please check your spelling')
    } else {
        // animalArray[foundAnimal] = req.body
        foundAnimal.animalName = req.body.newName;
        res.json({ animalArray })
    }
});

router.delete('/delete-by-name/:name', function(req, res) {
    let foundAnimal = null;

    animalArray.forEach((item) => {
        if (item.animalName === req.params.name) {
            foundAnimal = item;
        }
    })
    if (!foundAnimal) {
        res.send('Animal not found');
    } else {
        animalArray.splice(foundAnimal, 1);
        res.json({ animalArray, message: `Successfully deleted: ${req.params.name}` });
    }
});

router.delete('/delete-by-id/:id', function(req, res) {
    let foundAnimal = null;

    animalArray.forEach((item, index) => {
        if (item.id === +req.params.id) {
            foundAnimal = item;
            animalArray.splice(index, 1);
        }
    })
    if (!foundAnimal) {
        res.send('Animal does not exist');
    } else {
        res.json({ foundAnimal, animalArray})
    }
});