import { observable, action, computed, runInAction, makeObservable, makeAutoObservable } from "mobx";
import * as SQLite from "expo-sqlite";

class DatabaseStore {
  db;
  @observable daysTable;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  openDatabase = async () => {
    this.db = SQLite.openDatabase("db.testDb");
  };

  createDatabase = async () => {
    // Создаем таблицу
    await this.db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS days (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)`,
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

  readTable = async () => {
    await this.db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM days",
        null,
        (txObj, { rows: { _array } }) => {
          runInAction(() => (this.daysTable = _array));

          // this.setState({ data: _array })
        },
        (txObj, error) => console.log("Error ", error)
      );

      //   console.log("read", this.daysTable);
    });
  };

  getTable = async () => {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM days",
          null,
          (txObj, { rows: { _array } }) => {
            runInAction(() => {
              this.daysTable = _array;
              resolve(_array);
            });
          },
          (txObj, error) => {
            console.log("Error ", error);
            reject(error);
          }
        );
      });
    });
  };

  deleteRow = (id) => {
    this.db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM days WHERE id = ? ",
        [id],
        (txObj, resultSet) => console.log("resultSet", resultSet),
        (txObj, error) => console.log("Error", error)
      );
    });
  };

  insertToTable = async (date) => {
    this.db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO days (date) values (?)",
        [date],
        (txObj, resultSet) => console.log("resultSet", resultSet),
        (txObj, error) => console.log("Error", error)
      );
    });

    this.readTable();
  };

  clearTable = () => {
    this.db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM days",
        [],
        (tx, results) => {
          console.log("УДАЛЕНО");
          // Обработка успешного выполнения запроса
          //   this.readTable();
        },
        (error) => {
          console.log("ОШИБКА УДАЛЕНИЯ");
          // Обработка ошибки выполнения запроса
          //   this.readTable();
        }
      );
    });
  };
}
export default new DatabaseStore();
