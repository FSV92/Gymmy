import { observable, action, computed, runInAction, makeObservable, makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatabaseStore from "./DatabaseStore";

class DaysStore {
  @observable days = [];
  @observable currentDay = {};

  constructor() {
    makeAutoObservable(this);
  }

  setDays = (days) => {
    this.days = days;

    //   console.log(this.days);

    this.saveToMemory();
  };

  DAYS_WEEK = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  getStringTime = () => {
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

  addDay = () => {
    const indexLastDay = this.days.length - 1;

    //  const newDay = {
    //    id: this.days[indexLastDay] ? this.days[indexLastDay].id + 1 : 0,
    //    date: this.getStringTime(),
    //    // exercises: []
    //  };
    const newDate = this.getStringTime();

    DatabaseStore.insertToTable(newDate);
    this.getFromSQL();
  };

  delDay = (id) => {
    DatabaseStore.deleteRow(id);
    this.getFromSQL();

    //  const filteredDays = this.days.filter((day) => day.id !== id);
    //  this.setDays(filteredDays);

    //  this.saveToMemory();
  };

  setExercise = (day) => {
    const indexLastExercise = day.exercises.length - 1;

    const newExercise = {
      id: `${day.exercises[indexLastExercise] ? Number(day.exercises[indexLastExercise].id) + 1 : 0}`,
      name: "",
      description: "",
      approaches: [{ weight: "", count: "" }],
    };

    const foundDay = this.days.find((elDay) => elDay.id === day.id);
    runInAction(() => this.days.find((elDay) => elDay.id === day.id).exercises.push(newExercise));

    //   console.log("foundDay.exercises", foundDay.exercises);
    //   console.log("this.days", this.days);

    this.saveToMemory();
  };

  saveToMemory = () => {
    AsyncStorage.setItem("@DAYS", JSON.stringify(this.days));
  };

  getFromMemory = async () => {
    //   await AsyncStorage.removeItem("@DAYS");
    const receivedDays = await AsyncStorage.getItem("@DAYS").then((json) => JSON.parse(json));

    receivedDays && this.setDays(receivedDays);
  };

  getFromSQL = async () => {
    await DatabaseStore.openDatabase();
    await DatabaseStore.createDatabase();
    //  await DatabaseStore.readTable();

    await DatabaseStore.readTable();

    const receivedDays = await DatabaseStore.getTable();
    receivedDays && this.setDays(receivedDays);

    //  console.log("receivedDays", DatabaseStore.daysTable);

    //  const receivedDays = AsyncStorage.getItem("@DAYS").then((json) => JSON.parse(json));
    //  receivedDays && this.setDays(receivedDays);
  };

  deleteAll = () => {
    DatabaseStore.clearTable();
    this.getFromSQL();
  };
}

export default new DaysStore();
