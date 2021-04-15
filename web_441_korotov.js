class Storage {

    constructor() {
        this._map = new Map()
    }

    add(tid, value) {
        this._map.set(tid, value);
        return tid;
    }

    getById(id) {
        return this._map.get(id);
    }

    getAll() {
        return this._map.values();
    }

    deleteById(id) {
        return this._map.delete(id);
    }

    updateById(id, value) {
        let oldValue = this._map.get(id);
        if (oldValue || this._map.has(id)) {
            if (this.validate(oldValue, value)) {
                for (const field in oldValue) {
                    oldValue[field] = value[field];
                }

                return true;
            }
        }

        return false;
    }

    replaceById(id, value) {
        if (this._map.has(id)) {
            this._map.set(id, value);
            return true;
        }

        return false;
    }

    validate(val, value) {
        if (val === value) {
            return true;
        }

        if (!(val instanceof Object) || !(value instanceof Object)) {
            return false;
        }

        if (val.constructor !== value.constructor) {
            return false;
        }

        for (const field in val) {
            if (!value.hasOwnProperty(field)) {
                return false;
            }
        }

        for (const field in value) {
            if (value.hasOwnProperty(field) && !val.hasOwnProperty(field)) {
                return false;
            }
        }

        return true;
    }

}
const storage = new Storage();

class ValueType1 {
    constructor(value1, value2) {
        this.field1 = value1
        this.field2 = value2
    }
}

class ValueType2 {
    constructor(value1, value2, value3) {
        this.field1 = value1
        this.field2 = value2
        this.field3 = value3
    }
}

let id1 = storage.add("Oleg", String("Korotov"));
let id2 = storage.add("Ne oleg", new ValueType1("Ne Korotov", "Ne like bananas"));
let id3 = storage.add("Toje ne Oleg", new ValueType1("Toje ne Korotov", "Toje doesn't like bananas"));
let id4 = storage.add("I eto ne oleg",new ValueType2("I ne Korotov", "I doesn't like bananas",
                    "but like grapes"));
let id5 = storage.add("A eto voobshche ne Oleg",new ValueType2("voobshche ne Korotov",
                    "I voobshche doesn't like bananas", "but voobshche to like grapes"));

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
storage.updateById(id2, new ValueType2("field1", "field2", "field3"));
storage.updateById(id3, new ValueType1("newField1!", "newField2!"));
storage.updateById(id2, new ValueType1("newField1", "newField2"));
console.log("Все элементыты: ", storage.getAll())