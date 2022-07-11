// agar dapat melakukan query sequelize harus di import terlebih dahulu
import { sequelize } from "../models/init-models";

// RestFull API sederhana CRUD pada setiap table
const findAll = async (req, res) => {
  try {
    const course = await req.context.models.courses.findAll();
    return res.send(course);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const findOne = async (req, res) => {
  try {
    const course = await req.context.models.courses.findOne({
      where: { course_id: req.params.id },
    });
    // jika data yang di cari tidak ada akan mengembalikan string di dalamnya karena berupa return maka langsung berhenti
    if (!course) {
      return res.send(`Data Tidak Ada`);
    }
    return res.send(course);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const create = async (req, res) => {
  try {
    const course = await req.context.models.courses.create({
      course_id: req.body.course_id,
      course_name: req.body.course_name,
      sks: req.body.sks,
    });
    return res.send(course);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await req.context.models.courses.update(
      {
        course_id: req.body.course_id,
        course_name: req.body.course_name,
        sks: req.body.sks,
      },
      { returning: true, where: { course_id: id } }
    );
    return res.send(course);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const deleted = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await req.context.models.courses.destroy({
      where: { course_id: id },
    });
    return res.send(`deleted ${course} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// menggunakan sql biasa pada sequilize (Harus import sequelize terlebih dahulu)
const sqlAll = async (req, res) => {
  try {
    await sequelize
      .query("SELECT * from courses", {
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
      .query("SELECT * from courses where course_id= :id ", {
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
  const { course_id, course_name, sks } = req.body;
  try {
    await sequelize
      .query(
        "INSERT into courses (course_id, course_name, sks) values (:course_id, :course_name, :sks)",
        {
          replacements: { course_id, course_name, sks },
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((result) => {
        return res.send(`Data Add`);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};
const sqlUpdate = async (req, res) => {
  const { id } = req.params;
  const { course_id, course_name, sks } = req.body;
  try {
    await sequelize
      .query(
        "UPDATE courses set course_id=:course_id, course_name=:course_name, sks=:sks where course_id=:id",
        {
          replacements: { course_id, course_name, sks, id },
          type: sequelize.QueryTypes.UPDATE,
        }
      )
      .then((result) => {
        return res.send(`Data update`);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};

const sqlDeleted = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize
      .query("DELETE from courses where course_id=:id", {
        replacements: { id },
        type: sequelize.QueryTypes.delete,
      })
      .then((result) => {
        return res.send(result.rowCount);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};
// Memasukan data langsung 2 table dengan middleware menambahkan next yang akan di lanjutkan ke table selanjutnya
const crateNext = async (req, res, next) => {
  try {
    const course = await req.context.models.courses.create({
      course_id: req.body.course_id,
      course_name: req.body.course_name,
      sks: req.body.sks,
    });
    req.courses = course;
    next();
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
  // query sql
  sqlAll,
  sqlOne,
  sqlCreate,
  sqlUpdate,
  sqlDeleted,
  // memasukan data langsung dengan 2 table yang berelasi
  crateNext,
};
