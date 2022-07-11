import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const student = await req.context.models.students.findAll();
    return res.send(student);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await req.context.models.students.findOne({
      where: { student_id: id },
    });
    return res.send(student);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  // untuk menerima next dari uploadDownload
  const { files, fields } = req.fileAttrb;
  try {
    const student = await req.context.models.students.create({
      // jika ada yang integer harus di parseInt karena semua berbentuk string ex: parseInt(fields[0].value)
      student_id: fields[0].value,
      first_name: fields[1].value,
      last_name: fields[2].value,
      phone_number: fields[3].value,
      teacher_id: fields[4].value,
      major_id: fields[5].value,
      // nilai index sesuai dengan jenis file
      student_profile: files[0].file.newFilename,
    });
    return res.send(student);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await req.context.models.students.update(
      {
        student_id: req.params.student_id,
        first_name: req.params.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        teacher_id: req.body.teacher_id,
        major_id: req.body.major_id,
      },
      { returning: true, where: { student_id: id } }
    );
    return res.send(student);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await req.context.models.students.destroy({
      where: { student_id: id },
    });
    return res.send(`Deleted ${student} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// SQL Rest API menggunakan query manual
const sqlAll = async (req, res) => {
  try {
    await sequelize
      .query("SELECT * from students", {
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
      .query("SELECT * from students where student_id =:id", {
        replacements: { id: req.params.id },
        type: sequelize.QueryTypes.SELECT,
      })
      .then((result) => {
        return res.send(result);
      });
  } catch (error) {
    return res.statu(404).send(error);
  }
};
const sqlCreate = async (req, res) => {
  const {
    student_id,
    first_name,
    last_name,
    phone_number,
    teacher_id,
    major_id,
  } = req.body;
  try {
    await sequelize
      .query(
        "INSERT into students (student_id, first_name, last_name, phone_number, teacher_id, major_id) values (:student_id, :first_name, :last_name, :phone_number, :teacher_id, :major_id)",
        {
          replacements: {
            student_id,
            first_name,
            last_name,
            phone_number,
            teacher_id,
            major_id,
          },
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((result) => {
        return res.send(`Insert Success`);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};
const sqlUpdate = async (req, res) => {
  const { id } = req.params;
  const {
    student_id,
    first_name,
    last_name,
    phone_number,
    teacher_id,
    major_id,
  } = req.body;
  try {
    await sequelize
      .query(
        "UPDATE students set  student_id=:student_id, first_name=:first_name, last_name=:last_name, phone_number=:phone_number, teacher_id=:teacher_id, major_id=:major_id where student_id=:id",
        {
          replacements: {
            student_id,
            first_name,
            last_name,
            phone_number,
            teacher_id,
            major_id,
            id,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      )
      .then((result) => {
        return res.send("Update Success");
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};

const sqlDeleted = async (req, res) => {
  try {
    await sequelize
      .query("DELETE from students where student_id=:id", {
        replacements: { id: req.params.id },
        type: sequelize.QueryTypes.DELETE,
      })
      .then((result) => {
        return res.send("Deleted Success");
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
  // Query manual
  sqlAll,
  sqlOne,
  sqlCreate,
  sqlUpdate,
  sqlDeleted,
};
