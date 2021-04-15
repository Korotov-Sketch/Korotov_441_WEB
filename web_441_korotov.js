class Storage {

    constructor() {
        this._map = new Map()
    }

    add(value) {
        let id = this.generateUId();
        this._map.set(id, value);
        return id;
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

    validate(oldValue, value) {
        if (oldValue === value) {
            return true;
        }

        if (!(oldValue instanceof Object) || !(value instanceof Object)) {
            return false;
        }

        if (oldValue.constructor !== value.constructor) {
            return false;
        }

        for (const field in oldValue) {
            if (!value.hasOwnProperty(field)) {
                return false;
            }
        }

        for (const field in value) {
            if (value.hasOwnProperty(field) && !oldValue.hasOwnProperty(field)) {
                return false;
            }
        }

        return true;
    }

    generateUId() {
        while(true) {
            let id = this.uuidv4();
            if (!this._map.has(id)) {
                return id;
            }
        }
    }


    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
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

let id1 = storage.add(String("stringElem1"));
let id2 = storage.add(new ValueType1("SecondVal1", "SecondVal2"));
let id3 = storage.add(new ValueType1("ThirdVal1", "ThirdVal2"));
let id4 = storage.add(new ValueType2("FourthVal1", "FourthVal2", "FourthVal3"));
let id5 = storage.add(new ValueType2("FifthVal1", "FifthVal2", "FifthVal3"));

console.log("Get element by id")
let elementById = storage.getById(id1);
console.log("Item: { id:" + id1 + ", value: " + JSON.stringify(elementById) + "}")

let elementById2 = storage.getById(id2);
console.log("Item: { id:" + id2 + ", value: " + JSON.stringify(elementById2) + "}")

let elementById3 = storage.getById(id3);
console.log("Item: { id:" + id3 + ", value: " + JSON.stringify(elementById3) + "}") //без JSON.stringify возвращает типы эл-ов


elementById4 = storage.getById(id4);
console.log("Item: { id:" + id4 + ", value: " + JSON.stringify(elementById4) + "}")

console.log("Delete element by id: ")
console.log("All elements: ", storage.getAll())
let deleteById = storage.deleteById(id3);
console.log(deleteById)
console.log("All elements: ", storage.getAll())
storage.getById(id3) // error
deleteById = storage.deleteById(id3);
console.log(deleteById)
console.log("All elements: ", storage.getAll())

console.log("Replace by id: ")
let replaceById = storage.replaceById(id3, String("ERROR"))
console.log(replaceById)
replaceById = storage.replaceById(id5, String("SUCCESS"));
console.log(replaceById)
console.log("All elements: ", storage.getAll())

console.log("Update by id: ")
let updateById = storage.updateById(id2, new ValueType2("field1", "field2", "field3"));
console.log(updateById)
updateById = storage.updateById(id3, new ValueType1("newField1!", "newField2!"));
console.log(updateById)
updateById = storage.updateById(id2, new ValueType1("newField1", "newField2"));
console.log(updateById)
console.log("All elements: ", storage.getAll())