const { db } = require('./model');

const main = async () => {
  await db.sync({force: true});
  process.exit();
}

main();
