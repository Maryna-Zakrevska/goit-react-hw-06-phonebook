const saveContacts = (key, item) => {
  try {
    if (key?.length > 0) {
      localStorage.setItem(key, JSON.stringify(item));
    }
  } catch (error) {
    console.log(error);
  }
};

const loadContacts = (key) => {
  try {
    const isSaved = localStorage.getItem(key);
    return isSaved?.length > 0 ? JSON.parse(isSaved) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export { saveContacts, loadContacts };
