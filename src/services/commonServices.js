const { randomUUID } = require("crypto");


const createItem = async (items, key, createFunc, objetName) => {
  const itemsModified = items.map((item) => ({
    ...item,
    [key]: randomUUID(),
  }));
  const errors = [];
  const added = [];
  for (const item of itemsModified) {
    try {
      await createFunc(item);
      added.push(item);
    } catch (error) {
      errors.push({ error: error, [objetName]: item });
    }
  }
  if (errors.length > 0) {
    console.error(`Error adding ${objetName}`, errors);
  }
  if (errors.length == customers.length) {
    throw new Error(`Error adding all the ${objetName}`);
  }
  return { created: added, errored: errors };
};


module.exports = {
createItem
};
