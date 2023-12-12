export const getBase64 = (file) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
    return reader.result;
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
};
