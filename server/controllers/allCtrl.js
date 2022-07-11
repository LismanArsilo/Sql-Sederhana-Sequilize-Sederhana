// Menampilkan semua table dengan Middleware
const findAllTable = async (req, res) => {
  try {
    const student = await req.context.models.students.findAll({
      include: [
        {
          all: true,
        },
      ],
    });
    return res.send(student);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAllTable,
};
