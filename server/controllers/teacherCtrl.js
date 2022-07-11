import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const teacher = await req.context.models.teachers.findAll();
    return res.send(teacher);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await req.context.models.teachers.findOne({
      where: { teacher_id: id },
    });
    return res.send(teacher);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  const cekCourse = req.courses;
  try {
    const teacher = await req.context.models.teachers.create({
      teacher_id: req.body.teacher_id,
      teacher_name: req.body.teacher_name,
      address: req.body.address,
      course_id: req.body.course_id,
    });
    return res.send(teacher);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await req.context.models.teachers.update(
      {
        teacher_id: req.body.teacher_id,
        teacher_name: req.body.teacher_name,
        address: req.body.address,
        course_id: req.body.course_id,
      },
      { returning: true, where: { teacher_id: id } }
    );
    return res.send(teacher);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await req.context.models.teachers.destroy({
      where: { teacher_id: id },
    });
    return res.send(`Deleted ${teacher} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// Rest Full API Menggunakan SQL Sederhana
const sqlAll = async (req, res) => {
  try {
    await sequelize
      .query("SELECT * from teachers", {
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
  const { id } = req.params;
  try {
    await sequelize
      .query("SELECT * from teachers where teacher_id=:id", {
        replacements: { id },
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
  const { teacher_id, teacher_name, address, course_id } = req.body;
  try {
    await sequelize
      .query(
        "INSERT into teachers (teacher_id, teacher_name, address, course_id) values (:teacher_id, :teacher_name, :address, :course_id)",
        {
          replacements: { teacher_id, teacher_name, address, course_id },
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((result) => {
        return res.send(`Data Add Success`);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};
const sqlUpdate = async (req, res) => {
  const { id } = req.params;
  const { teacher_id, teacher_name, address, course_id } = req.body;
  try {
    await sequelize
      .query(
        "UPDATE teachers set teacher_id=:teacher_id, teacher_name=:teacher_name, address=:address, course_id=:course_id where teacher_id=:id",
        {
          replacements: { teacher_id, teacher_name, address, course_id, id },
          type: sequelize.QueryTypes.UPDATE,
        }
      )
      .then((result) => {
        return res.send(`Update Success`);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};

const sqlDeleted = async (req, res) => {
  try {
    await sequelize
      .query("DELETE from teachers where teacher_id=:id", {
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
  // sql Manual
  sqlAll,
  sqlOne,
  sqlCreate,
  sqlUpdate,
  sqlDeleted,
};
