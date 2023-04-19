const router = require("express").Router();
const mongoose = require("mongoose");

const Person = require("../models/Person");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ message: "Name is required" });
    return;
  }
  if (!salary) {
    res.status(422).json({ message: "Salary is required" });
    return;
  }
  if (!approved) {
    res.status(422).json({ message: "Approved is required" });
    return;
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);
    res.status(201).json({ message: "Person created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).json({ message: "Person id wasn't found" });
  }
  next();
};

router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findOne({ _id: id });

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", validateId, async (req, res) => {
  const { name, salary, approved } = req.body;

  const id = req.params.id;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "The person was deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
