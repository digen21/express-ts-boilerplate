/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db) => {
  const perms = await db
    .collection("permissions")
    .find({
      key: { $in: ["SERVICE_REQUEST:CREATE", "SERVICE_REQUEST:READ"] },
    })
    .toArray();
  const permIds = perms.map((p) => p._id);

  await db
    .collection("roles")
    .updateOne(
      { name: "CUSTOMER" },
      { $addToSet: { permissions: { $each: permIds } } },
    );
};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
  const perms = await db
    .collection("permissions")
    .find({
      key: { $in: ["SERVICE_REQUEST:CREATE", "SERVICE_REQUEST:READ"] },
    })
    .toArray();

  const permIds = perms.map((p) => p._id);

  await db
    .collection("roles")
    .updateOne(
      { name: "CUSTOMER" },
      { $pull: { permissions: { $in: permIds } } },
    );
};
