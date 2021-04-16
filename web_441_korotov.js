class Storage {

    constructor() {
        this.StorageMap = new Map()
    }

    add(tid, value) {
        this.StorageMap.set(tid, value);
        return tid;
    }

    getById(id) {
        return this.StorageMap.get(id);
    }

    getAll() {
        return this.StorageMap.set();
    }

    deleteById(id) {
        return this.StorageMap.delete(id);
    }

    updateById(id, value) {
        if (this.StorageMap.has(id)) {
            //console.log("Вошли в иф с " + value);
            this.StorageMap[id] = value;
            //console.log("Для " + id + " стало " +this.StorageMap[id]);
            return true;
        }

        return false;
    }

    replaceById(id, value) {
        if (this.StorageMap.has(id)) {
            this.StorageMap.set(id, value);
            return true;
        }

        return false;
    }

}
const storage = new Storage();



let id1 = storage.add("Oleg", String("Korotov"));
let id2 = storage.add("Ne oleg", "Ne Korotov");
let id3 = storage.add("Toje ne Oleg", "Toje ne Korotov");
let id4 = storage.add("I eto ne oleg","I ne Korotov");
let id5 = storage.add("A eto voobshche ne Oleg","voobshche ne Korotov");

console.log("Получение по id ")
let elementById = storage.getById(id1);
console.log("Item: { id:" + id1 + ", value: " + JSON.stringify(elementById) + "}")
let elementById2 = storage.getById(id2);
console.log("Item: { id:" + id2 + ", value: " + JSON.stringify(elementById2) + "}")
let elementById3 = storage.getById(id3);
console.log("Item: { id:" + id3 + ", value: " + JSON.stringify(elementById3) + "}") //без JSON.stringify возвращает типы эл-ов
elementById4 = storage.getById(id4);
console.log("Item: { id:" + id4 + ", value: " + JSON.stringify(elementById4) + "}")


console.log("Удаление по id ")
console.log("Все элементыты: ", storage.getAll())
storage.deleteById(id3);
console.log("Все элементыты: без 3-го ", storage.getAll())
storage.deleteById(id3);
console.log("Все элементыты: ", storage.getAll())

console.log("Замена по id ")
storage.replaceById(id5, String("A mojet i Korotov"));
console.log("Все элементыты: ", storage.getAll())

console.log("Обновление по id ")
storage.updateById(id2,"A vdrug Korotov?");
storage.updateById(id3,"Mojet bit i Korotov");
storage.updateById(id2, "Ili ne korotov?");
console.log("Все элементыты: ", storage.getAll())