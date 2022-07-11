import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const major = await req.context.models.majors.findAll();
    return res.send(major);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const major = await req.context.models.majors.findOne({
      where: { major_id: id },
    });
    return res.send(major);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  try {
    const major = await req.context.models.majors.create({
      major_id: req.body.major_id,
      major_name: req.body.major_name,
      head_major: req.body.head_major,
    });
    return res.send(major);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const major = await req.context.models.majors.update(
      {
        major_id: req.body.major_id,
        major_name: req.body.major_name,
        head_major: req.body.head_major,
      },
      { returning: true, where: { major_id: id } }
    );
    return res.send(major);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  const { id } = req.params;
  try {
    const major = await req.context.models.majors.destroy({
      where: { major_id: id },
    });
    return res.send(`Deleted ${major} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const sqlAll = async (req, res) => {
  try {
    await sequelize
      .query("SELECT * from majors", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((result) => {
        return res.send(result);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};
const sqlOne = async (req, res) => {
  try {
    await sequelize
      .query("SELECT * from majors where major_id=:id", {
        replacements: { id: req.params.id },
        type: sequelize.QueryTypes.SELECT,
      })
      .then((result) => {
        return res.send(result);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};
const sqlCreate = async (req, res) => {
  const { major_id, major_name, head_major } = req.body;
  try {
    await sequelize
      .query(
        "INSERT into majors (major_id, major_name, head_major) values (:major_id, :major_name, :head_major)",
        {
          replacements: { major_id, major_name, head_major },
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((result) => {
        return res.send(`${result} Add Success`);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};

const sqlUpdate = async (req, res) => {
  const { id } = req.params;
  const { major_id, major_name, head_major } = req.body;
  try {
    await sequelize
      .query(
        "UPDATE majors set major_id=:major_id, major_name=:major_name, head_major=:head_major where major_id =:id ",
        {
          replacements: { major_id, major_name, head_major, id },
          type: sequelize.QueryTypes.UPDATE,
        }
      )
      .then((result) => {
        return res.send(`Update Success`);
      });
  } catch (error) {
    return res.send(error);
  }
};
const sqlDeleted = async (req, res) => {
  try {
    await sequelize
      .query("DELETE from majors where major_id=:id", {
        replacements: { id: req.params.id },
        type: sequelize.QueryTypes.DELETE,
      })
      .then((result) => {
        return res.send(`Deleted Success`);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
  // SQL Query Manual Sederhana
  sqlAll,
  sqlOne,
  sqlCreate,
  sqlUpdate,
  sqlDeleted,
};
