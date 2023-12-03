import { observable, action, computed, runInAction, makeObservable, makeAutoObservable } from "mobx";
import * as SQLite from "expo-sqlite";

class DatabaseStore {
  db;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  openDatabase = async () => {
    this.db = SQLite.openDatabase("db.testDb");
  };

  _arrayToString = (array) => {
    return array.map((el) => el.col + " " + el.type).join(", ");
  };

  createDatabase = async (name, arrayCols) => {
    // Создаем таблицу
    this.db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${name} (${this._arrayToString(arrayCols)})`,
        [],
        (txObj, results) => {
          // console.log(`Таблица ${name} создана `, results);
        },
        (txObj, error) => {
          //   console.log("Error while creating the table", error);
        }
      );
    });
  };

  dropTable = async (name, arrayCols) => {
    console.log("dropTable");
    // Создаем таблицу
    await this.db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${name}`,
        [],
        (txObj, results) => {
          //   console.log("Table created successfully", results);
        },
        (txObj, error) => {
          //   console.log("Error while creating the table", error);
        }
      );
    });
  };

  _genereateSelect = (whereCols, whereData) => {
    return ` WHERE ${whereCols.map((el, i) => `${i > 0 ? " AND " : ""}${el} = ${whereData[i]}`)}`;
  };

  getTable = async (tableName, whereCols, whereData) => {
    const whereString = whereCols ? this._genereateSelect(whereCols, whereData).replaceAll(",", "") : "";

    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableName}${whereString}`,
          null,
          (txObj, { rows: { _array } }) => {
            runInAction(() => {
              resolve(_array);
            });
          },
          (txObj, error) => {
            reject(error);
          }
        );
      });
    });
  };

  deleteRow = (tableName, id) => {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM ${tableName} WHERE id = ? `,
          [id],
          (txObj, result) => {
            resolve(result);
          },
          (txObj, error) => {
            resolve(error);
          }
        );
      });
    });
  };

  _calculateElements = (array) => {
    return array.map((el) => "?").join(", ");
  };

  insertToTable = async (tablename, arrayCols, arrayData) => {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO ${tablename} (${arrayCols.join(", ")}) values (${this._calculateElements(arrayData)})`,
          [...arrayData],
          (txObj, resultSet) => resolve(resultSet),
          (txObj, error) => reject(error)
        );
      });
    });
  };

  clearTable = (name, whereValue) => {
    const whereString = whereValue ? ` WHERE dayID = ${whereValue}` : "";

    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM ${name}${whereString}`,
          [],
          (tx, results) => {
            resolve(results);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };

  updateCol = (tableName, id, field, newValue) => {
    this.db.transaction((transaction) => {
      transaction.executeSql(
        `UPDATE ${tableName} SET ${field} = ? WHERE id = ?;`,
        [newValue, id],
        () => {
          console.log(`Поле ${field} обновлено в таблице ${tableName}`);
        },
        (error) => {
          console.log(`Ошибка обновления поля ${field} в таблице ${tableName}:`, error);
        }
      );
    });
  };
}
export default new DatabaseStore();
