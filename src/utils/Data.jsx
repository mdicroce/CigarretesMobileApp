import * as SQLite from "expo-sqlite";

let database = SQLite.openDatabase("cigarros.db");

export function initDatabase() {
  let database = SQLite.openDatabase("cigarros.db");
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS cigarrillos
  			(id INTEGER PRIMARY KEY,
  			name TEXT,
  			photo TEXT,
  			price REAL)`,
        [],
        (_, result) => {
          console.log("Tabla creada correctamente");
          resolve(result);
        },
        (_, error) => {
          console.log("Error al crear la tabla:", error);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function openDatabase() {
  if (!database._running) {
    database = SQLite.openDatabase("cigarros.db");
  }
}

export async function closeDatabase() {
  return database.closeAsync();
}

export function fetchCigarretes() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cigarrillos",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertCigarrete(cigarrillo) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO cigarrillos (name, photo, price) 
			VALUES (?,?,?)`,
        [cigarrillo.name, cigarrillo.photo, cigarrillo.price],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function deleteAllCigarretes() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS cigarrillos",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function deleteCigarrete(id) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM cigarrillos WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result);
          console.log(`Se eliminó correctamente el registro con ID ${id}`);
        },
        (_, error) => {
          reject(error);
          console.log(`Error al eliminar el registro con ID ${id}:`, error);
        }
      );
    });
  });
}

export function modifyCigarrete(cigarrillo) {
  console.log("oo", cigarrillo);
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE cigarrillos
			SET name = ?, photo = ?, price = ?
			WHERE id = ?`,
        [cigarrillo.name, cigarrillo.photo, cigarrillo.price, cigarrillo.id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}
