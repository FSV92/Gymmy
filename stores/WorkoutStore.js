import { observable, action, computed, runInAction, makeObservable, makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatabaseStore from "./DatabaseStore";
import DaysStore from "./DaysStore";

class WorkoutModel {
  @observable id;
  @observable dayID;
  @observable name;
  @observable description;
  @observable repetitions;
  @observable workoutStore;
  @observable setFocus = false;

  constructor(props) {
    makeAutoObservable(this);
    this.id = props.id;
    this.dayID = props.dayID;
    this.name = props.name;
    this.description = props.description;
    this.repetitions = props.repetitions;
  }
}

class WorkoutStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable currentWorkouts = [];
  @observable lastChangedObj = {};
  @observable wasAddedNew = false;
  @observable isMountedCard;

  @action
  setIsMountedCard = () => {
    this.isMountedCard = true;

    setTimeout(() => {
      runInAction(() => (this.isMountedCard = false));
    }, 300);
  };

  @action setWasAddedNew = () => {
    this.wasAddedNew = true;

    setTimeout(() => {
      this.wasAddedNew = false;
    }, 1000);
  };

  @action
  setLastChanged = (val) => {
    this.lastChangedObj = val;
  };

  @action
  resetLastChanged = () => {
    this.lastChangedObj = {};
  };

  @action
  updateColLoseFocus = () => {
    if (Object.keys(this.lastChangedObj).length > 0) {
      const { col, id, type, val } = this.lastChangedObj;
      this.updateCol(type, id, col, val);
    }
  };

  _createWorkoutsTable = async () => {
    await DatabaseStore.openDatabase();
    await DatabaseStore.createDatabase("workouts", [
      { col: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { col: "name", type: "TEXT" },
      { col: "description", type: "TEXT" },
      { col: "repetitions", type: "TEXT" },
      { col: "dayID", type: "NUMBER" },
    ]);
  };

  @action
  getWorkoutsFromSQL = async (currentDay) => {
    await this._createWorkoutsTable();

    const receivedWorkouts = await DatabaseStore.getTable("workouts", ["dayID"], [currentDay.id]);

    if (receivedWorkouts.length > 0) {
      receivedWorkouts.forEach((workout, index) => {
        const currentWorkout = new WorkoutModel(workout);

        this.pushCurrentWorkouts(currentWorkout);
      });
    }
  };

  @action
  addWorkout = async (currentDay) => {
    await this._createWorkoutsTable();

    const result = await DatabaseStore.insertToTable("workouts", ["name", "description", "repetitions", "dayID"], ["", "", "", `${currentDay.id}`]);

    if (result.rowsAffected > 0) {
      const receivedWorkouts = await DatabaseStore.getTable("workouts", ["dayID"], [currentDay.id]);
      const currentWorkoutID = this._getIdLastElement(receivedWorkouts);

      this.currentWorkouts.map((workout) => runInAction(() => (workout.setFocus = false))); // сброс фокусов
      runInAction(() =>
        this.currentWorkouts.push({ id: currentWorkoutID, name: "", description: "", dayID: currentDay.id, repetitions: "", setFocus: true })
      );
      await this._createRepetitionsTable();

      let i = 0;
      while (i < 4) {
        const res = await DatabaseStore.insertToTable(
          "repetitions",
          ["workoutID", "dayID", "weight", "count"],
          [`${currentWorkoutID}`, `${currentDay.id}`, "", ""]
        );

        i++;
      }

      await this.getRepetitionsFromSQL(currentWorkoutID);
    }
  };

  _getIdLastElement = (list) => {
    let currentID = 0;
    if (list.length > 0) {
      const lastIndex = list.length - 1;
      //   // currentID = list[lastIndex].id + 1;
      currentID = list[lastIndex].id;
    }
    return currentID;
  };

  @action
  delWorkout = async (workoutID) => {
    const result = await DatabaseStore.deleteRow("workouts", workoutID);

    if (result.rowsAffected > 0) {
      const foundWorkoutIndex = this.currentWorkouts.findIndex((day) => day.id == workoutID);

      runInAction(() => this.currentWorkouts.splice(foundWorkoutIndex, 1));
    }
    // this.getWorkoutsFromSQL();
  };

  @action
  setCurrentWorkouts = (arrayWorkouts) => {
    this.currentWorkouts = arrayWorkouts;
  };

  @action
  resetWorkouts = () => {
    this.currentWorkouts = [];
  };

  @action
  pushCurrentWorkouts = (workoutModel) => {
    this.currentWorkouts.push(workoutModel);
  };

  _createRepetitionsTable = async () => {
    await DatabaseStore.openDatabase();
    const result = await DatabaseStore.createDatabase("repetitions", [
      { col: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { col: "workoutID", type: "TEXT" },
      { col: "dayID", type: "TEXT" },
      { col: "weight", type: "TEXT" },
      { col: "count", type: "TEXT" },
    ]);

    return result;
  };

  @action
  getRepetitionsFromSQL = async (workoutID) => {
    this._createRepetitionsTable();

    const receivedRepetitions = await DatabaseStore.getTable("repetitions", ["dayID", "workoutID"], [DaysStore.currentDay.id, workoutID]);
    receivedRepetitions.length > 0 && this.setRepetitionsToWorkouts(workoutID, receivedRepetitions);
  };

  @action
  setRepetitionsToWorkouts = (workoutID, receivedRepetitions) => {
    this.currentWorkouts.find((el) => el.id == workoutID).repetitions = receivedRepetitions;
  };

  @action
  deleteAllWorkouts = () => {
    (async () => {
      // await DatabaseStore.dropTable("workouts");
      // await DatabaseStore.dropTable("repetitions");
      // await DatabaseStore.clearTable("days");
      await DatabaseStore.clearTable("workouts");
      await DatabaseStore.clearTable("repetitions");
    })()
      .then(async () => {
        this.resetWorkouts();
        console.log("Все таблицы успешно очищены.");
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
      });
    // this.getWorkoutsFromSQL();
  };

  @action
  updateCol = (tableName, id, field, newValue) => {
    DatabaseStore.updateCol(tableName, id, field, newValue);
  };
}

export default new WorkoutStore();
