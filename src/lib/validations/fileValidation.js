import { toast } from "react-toastify";

const totalCapacity = sizes =>
  sizes.reduce((acc, value) => {
    return acc + value.size;
  }, 0);

function readFileAsync(files) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject;
    reader.readAsDataURL(files);
  })
}

async function fileValidation(files, sizes) {
  try {
    if (
      files[0].size < 5120 &&
      totalCapacity(sizes) + files[0].size < 20480
    ) {
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
      }
    } else {
      toast.error("File is too large", { autoClose: 1500 });
    }
  } catch (err) {
    console.log(err)
  }
}

export {
  fileValidation,
};