import { toast } from "react-toastify";

const totalCapacity = sizes =>
  sizes.reduce((acc, value) => {
    return acc + value.size;
  }, 0);

function readFileAsync(files) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(files);
  });
}

async function fileValidation(files, sizes) {
  try {
    if (files[0].size > 5120) {
      toast.info("Размер файла превышает 5МБ", { autoClose: 2000 });
      return null;
    }

    if (totalCapacity(sizes) + files[0].size > 20480) {
      toast.info("Размер файла превышает максимальный объем 20 МБ", {
        autoClose: 2000
      });
      return null;
    }

    if (isUnique(sizes, files[0].name)) {
      toast.info("Файл уже существует", { autoClose: 2000 });
      return null;
    } else {
      let contentBuffer = await readFileAsync(files[0]);
      return {
        attaches: {
          name: files[0].name,
          content: contentBuffer,
          encoding: "base64"
        },
        sizes: {
          name: files[0].name,
          size: files[0].size
        }
      };
    }
  } catch (err) {
    console.log(err);
  }
}

function isUnique(sizes, name) {
  return sizes.length === 0
    ? false
    : sizes.filter(size => size.name === name).length >= 1
    ? true
    : false;
}

export { fileValidation };
