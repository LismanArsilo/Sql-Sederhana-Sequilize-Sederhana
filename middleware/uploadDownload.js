// formidable untuk menerima data berupa form
import formidable from "formidable";
import fs from "fs";
// untuk menyimpan gambar sesuai dengan yang kita inginkan cwd adalah tempat folder sekarang
const uploadDir = process.cwd() + "/storages";

// membuat function untuk mengolah gambar
const uploadFiles = async (req, res, next) => {
  // membuat ketentuan dari gambar
  const options = {
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 5 * 1024 * 1024,
  };
  // untuk memisahkan antara file dan gambar yang sudah di atur dalam options di atas
  const form = formidable(options);
  let files = [];
  let fields = [];

  // membuat function untuk memisahkan gambar
  form.onPart = function (part) {
    // jika file originalPart dan sesuai ketentuan regex di belakangnya maka lakukan handlePart
    if (
      !part.originalFilename ||
      part.originalFilename.match(/\.(jpg|jpeg|png)$/i)
    ) {
      this._handlePart(part);
      // jika tidak sesuai langsung return
    } else {
      return res.status(404).send(`File type is not supported`);
    }
  };
  form
    .parse(req)
    // melakukan parse jika sebuah file ambil valuenya
    .on("field", (fieldname, value) => {
      fields.push({ fieldname, value });
    })
    // Jika berupa file ambil filenya
    .on("file", (fieladname, file) => {
      files.push({ fieladname, file });
    })
    // jika sudah maka tampilkan di console done
    .once("end", () => {
      console.info("Upload Done");
      req.fileAttrb = {
        files: files,
        fields: fields,
      };
      // kirim ke controller
      next();
    });
};
// untuk menampilkan file yang sudah di upload
const showFile = async (req, res) => {
  // mengambil nama file dari parameters
  const filename = req.params.filename;
  // mengambil file yang sudah di simpan di dalam storages sesuai dengan namanya
  const url = `${process.cwd()}/storages/${filename}`;
  fs.createReadStream(url)
    .on("error", () => responseNotFound(req, res))
    .pipe(res);
};
// menampilkan jika not respon
function responseNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("not found");
}
// export function yang sudah di buat untuk di import dalam route agar dapat menerima data karena di route sudah di atur alur dari filenya
export default {
  uploadFiles,
  showFile,
};
