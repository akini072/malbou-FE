export const isUrlValid = (userInput) => {
  const regexQuery =
    '^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$';
  const url = new RegExp(regexQuery, 'i');
  return url.test(userInput);
};
