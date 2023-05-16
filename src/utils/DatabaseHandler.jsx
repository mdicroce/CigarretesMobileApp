import {
  initDatabase,
  openDatabase,
  closeDatabase,
  insertCigarrete,
  fetchCigarretes,
  modifyCigarrete,
  deleteCigarrete,
  deleteAllCigarretes,
} from "./Data";
import { useDispatch, useSelector } from "react-redux";
import {
  setCigarretes,
  addCigarrete,
  changeCigarrete,
  deleteStateCigarrete,
  cleanState,
} from "../store/CigarretesSlice";

import cigarretesJson from "../json/cigarretes.json";

export function useDatabase() {
  const dispatch = useDispatch();
  const cig = useSelector((state) => state.cigarrete);

  async function dataInicializer() {
    try {
      openDatabase();
      await initDatabase();
      const data = await readDB();
      if (data.length === 0) {
        populateDB(cigarretesJson);
        dispatch(
          setCigarretes(cigarretesJson.map((c, index) => ({ id: index, ...c })))
        );
      } else {
        dispatch(setCigarretes(data));
      }
    } catch (e) {
      console.error(e);
    }
  }

  function populateDB(cigarretes = []) {
    openDatabase();
    cigarretes.forEach(async (cigarro) => {
      await insertCigarrete(cigarro);
    });
  }

  async function readDB() {
    openDatabase();
    return fetchCigarretes()
      .then((r) => {
        return r.rows._array;
      })
      .catch((e) => console.error(e))
      .finally(() => {
        // closeDatabase();
      });
  }

  async function addCigarreteDB(cigarreteToAdd) {
    let insertId;
    openDatabase();
    return insertCigarrete(cigarreteToAdd)
      .then((r) => {
        insertId = r.insertId;
      })
      .then(() => {
        dispatch(addCigarrete({ ...cigarreteToAdd, id: insertId }));
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  }
  async function modifyCigarreteDB(cigarrete) {
    openDatabase();
    return modifyCigarrete(cigarrete)
      .then((r) => console.log(r))
      .then(() => {
        dispatch(changeCigarrete({ changedCigarrete: cigarrete }));
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  }

  async function deleteCigarreteDB(id) {
    openDatabase();
    return deleteCigarrete(id)
      .then((r) => {
        console.log(r);
      })
      .then(dispatch(deleteStateCigarrete({ id: id })))
      .catch((e) => console.error(e))
      .finally(() => {
        closeDatabase();
      });
  }

  async function cleanEverything(clean) {
    openDatabase();
    return deleteAllCigarretes(clean)
      .then((r) => {
        console.log(r);
      })
      .then(() => {
        dispatch(cleanState());
      })
      .catch((e) => console.error(e))
      .finally(() => {
        closeDatabase();
      });
  }

  return {
    dataInicializer,
    readDB,
    addCigarreteDB,
    modifyCigarreteDB,
    deleteCigarreteDB,
    cleanEverything,
  };
}
