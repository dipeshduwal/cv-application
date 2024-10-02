const Skill = require('../models/skill');
const { handleServerError } = require('../utils/errorHandler');

exports.PostSkill = async(req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error){
        handleServerError(res, error);
    }
};

exports.GetSkill = async(req, res) => {
    try{
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error){
        handleServerError(res, error);
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
        handleServerError(res, error);
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
        handleServerError(res, error);
    }
};

