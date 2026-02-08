const permissions = [
  "VEHICLE:CREATE",
  "VEHICLE:READ",
  "VEHICLE:UPDATE",
  "VEHICLE:DELETE",
  "SERVICE:CREATE",
  "SERVICE:READ",
  "SERVICE:UPDATE",
  "SERVICE:DELETE",
  "SERVICE_REQUEST:CREATE",
  "SERVICE_REQUEST:READ",
  "SERVICE_REQUEST:UPDATE",
  "SERVICE_REQUEST:DELETE",
  "SERVICE_LOG:CREATE",
  "SERVICE_LOG:READ",
  "SERVICE_LOG:UPDATE",
  "SERVICE_LOG:DELETE",
  "CUSTOMER:READ",
  "CUSTOMER:UPDATE",
  "CUSTOMER:DELETE",
];

const Roles = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
};

export const up = async (db) => {
  const permissionCol = db.collection("permissions");
  const roleCol = db.collection("roles");

  for (const key of permissions) {
    await permissionCol.updateOne(
      { key },
      { $setOnInsert: { key, description: key.replace(":", " ") } },
      { upsert: true },
    );
  }

  const allPermissions = await permissionCol.find().toArray();

  const pick = (keys) =>
    allPermissions.filter((p) => keys.includes(p.key)).map((p) => p._id);

  const roles = [
    { name: Roles.ADMIN, permissions: allPermissions.map((p) => p._id) },
    {
      name: Roles.STAFF,
      permissions: pick([
        "CUSTOMER:READ",
        "VEHICLE:CREATE",
        "VEHICLE:READ",
        "VE6986e0d7d4089b7c786b32baHICLE:UPDATE",
        "SERVICE:CREATE",
        "SERVICE:READ",
        "SERVICE:UPDATE",
        "SERVICE_REQUEST:CREATE",
        "SERVICE_REQUEST:READ",
        "SERVICE_REQUEST:UPDATE",
        "SERVICE_LOG:READ",
      ]),
    },
    {
      name: Roles.CUSTOMER,
      permissions: pick([
        "CUSTOMER:READ",
        "VEHICLE:READ",
        "SERVICE:READ",
        "SERVICE_REQUEST:READ",
      ]),
    },
  ];

  for (const role of roles) {
    await roleCol.updateOne(
      { name: role.name },
      { $setOnInsert: role },
      { upsert: true },
    );
  }
};

export const down = async (db) => {
  await db.collection("roles").deleteMany({
    name: { $in: Object.values(Roles) },
  });

  await db.collection("permissions").deleteMany({
    key: { $in: permissions },
  });
};
