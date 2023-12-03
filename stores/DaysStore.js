import { observable, action, computed, runInAction, makeObservable, makeAutoObservable } from "mobx";
import DatabaseStore from "./DatabaseStore";

class DayModel {
  @observable id;
  @observable date;

  constructor(props) {
    makeAutoObservable(this);
    this.id = props.id;
    this.date = props.date;
  }
}

class DaysStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable days = [];
  @observable currentDay = "";

  DAYS_WEEK = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  @action
  getDaysFromSQL = async () => {
    await DatabaseStore.openDatabase();
    await DatabaseStore.createDatabase("days", [
      { col: "id", type: "INTEGER PRIMARY KEY" },
      { col: "date", type: "TEXT" },
    ]);

    const receivedDays = await DatabaseStore.getTable("days");
    receivedDays && this.setDays(receivedDays);
  };

  @action
  resetDays = () => {
    this.days = [];
  };

  _createDayObj = (day) => {
    return new DayModel(day);
  };
  _createDaysSection = (days) => {
    return days.map((day) => {
      return this._createDayObj(day);
    });
  };

  @action
  setDays = (days) => {
    this.days = this._createDaysSection(days);
  };

  @action
  deleteAllDays = () => {
    (async () => {
      await DatabaseStore.dropTable("days");
      await DatabaseStore.dropTable("workouts");
      await DatabaseStore.dropTable("repetitions");
    })()
      .then(async () => {
        this.resetDays();
        console.log("Все таблицы успешно очищены.");
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
      });
    // this.getDaysFromSQL();
  };

  @action
  _getStringTime = () => {
    const date = new Date();
    const currTime = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const currMonth = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const currYear = date.getFullYear();
    const currDay = this.DAYS_WEEK[date.getDay()];
    const currHours = date.getUTCHours() + 8 < 10 ? `0${date.getUTCHours() + 8}` : date.getUTCHours() + 8;
    const currMins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const stringTime = `${currTime}.${currMonth}.${currYear}, ${currDay} ${currHours}:${currMins}`;

    return stringTime;
  };

  @action
  addDay = async () => {
    await DatabaseStore.openDatabase();
    await DatabaseStore.createDatabase("days", [
      { col: "id", type: "INTEGER PRIMARY KEY" },
      { col: "date", type: "TEXT" },
    ]);

    const newDate = this._getStringTime();

    let currentID;
    if (this.days.length > 0) {
      const lastIndex = this.days.length - 1;
      currentID = this.days[lastIndex].id + 1;
    } else {
      currentID = 0;
    }

    const result = await DatabaseStore.insertToTable("days", ["id", "date"], [currentID, newDate]);
    console.log("result", result.rowsAffected);

    if (result.rowsAffected > 0) {
      runInAction(() => this.days.push({ id: currentID, date: newDate }));
    }
    // await this.getDaysFromSQL();
  };

  @action
  delDay = async (id) => {
    const result = await DatabaseStore.deleteRow("days", id);

    if (result.rowsAffected > 0) {
      const foundDayIndex = this.days.findIndex((day) => day.id == id);
      runInAction(() => this.days.splice(foundDayIndex, 1));
    }
    // this.getDaysFromSQL();
  };

  @action
  setCurrentDay = (day) => {
    this.currentDay = this._createDayObj(day);
  };
}

export default new DaysStore();
