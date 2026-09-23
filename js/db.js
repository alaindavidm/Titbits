const NS = "titbits";

function readTable(entity) {
  try {
    return JSON.parse(localStorage.getItem(`${NS}:${entity}`) || "[]");
  } catch {
    return [];
  }
}

function writeTable(entity, rows) {
  localStorage.setItem(`${NS}:${entity}`, JSON.stringify(rows));
}

function uid() {
  return "id_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export const db = {
  all(entity) {
    return readTable(entity);
  },
  where(entity, predicate) {
    return readTable(entity).filter(predicate);
  },
  find(entity, id) {
    return readTable(entity).find((r) => r.id === id) || null;
  },
  insert(entity, row) {
    const rows = readTable(entity);
    const record = { id: uid(), created_at: new Date().toISOString(), ...row };
    rows.push(record);
    writeTable(entity, rows);
    return record;
  },
  update(entity, id, patch) {
    const rows = readTable(entity);
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    rows[idx] = { ...rows[idx], ...patch };
    writeTable(entity, rows);
    return rows[idx];
  },
  remove(entity, id) {
    const rows = readTable(entity).filter((r) => r.id !== id);
    writeTable(entity, rows);
  },
  removeWhere(entity, predicate) {
    const rows = readTable(entity).filter((r) => !predicate(r));
    writeTable(entity, rows);
  }
};

export const ENTITIES = [
  "users", "incomeEntries", "expenseEntries", "emergencyFunds", "emergencyFundTransactions",
  "investmentHoldings", "investmentContributions", "investmentProfiles", "alerts", "simulationRuns",
  "budgetLines"
];

export function exportUserData(userId) {
  const out = {};
  for (const entity of ENTITIES) {
    out[entity] = db.where(entity, (r) => r.user_id === userId || r.id === userId);
  }
  return out;
}

export function deleteUserData(userId) {
  for (const entity of ENTITIES) {
    if (entity === "users") {
      db.remove("users", userId);
    } else {
      db.removeWhere(entity, (r) => r.user_id === userId);
    }
  }
}
