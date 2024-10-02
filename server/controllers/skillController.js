const Skill = require('../models/skill');

exports.PostSkill = async(req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

exports.GetSkill = async(req, res) => {
    try{
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

exports.PutSkill = async(req, res) => {
    try{
        const [updated] = await Skill.update(req.body, {
            where: {id: req.params.id}
        });
        if (updated) {
            const updatedSKill = await Skill.findByPk(req.params.id);
            res.status(200).json(updatedSKill);
        } else{
            res.status(404).json({message: 'Skill not found'});
        }
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

exports.DeleteSkill = async(req, res) => {
    try{
        const deleted = await Skill.destroy({
            where: {id: req.params.id}
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({message: 'Skill not found'});
        }
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

