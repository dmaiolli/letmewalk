import AsyncStorage from "@react-native-async-storage/async-storage";

const insertString = async (key, value, callback = null) => {
    if (typeof value !== 'string') throw new Error('Tipo de dado não é uma string para a inserção no banco');

    try {
        await AsyncStorage.setItem(key, value, callback);
    } catch (error) {
        throw new Error('Não foi possivel inserir a string no banco de dados');
    }
}

const insertObject = async (key, value, callback = null) => {
    try {
        const obj = JSON.stringify(value);
        await AsyncStorage.setItem(key, obj, callback);
    } catch (error) {
        throw new Error('Não foi possível inserir o objeto no banco de dados');
    }
}

const readByKey = async (key, callback = null) => {
    try {
        await AsyncStorage.getItem(key, callback);
    } catch (error) {
        throw new Error('Não foi possível buscar no banco de dados com a key ' + key);
    }
}

const readAll = async (callback = null) => {
    try {
        await AsyncStorage.getAllKeys(callback);
    } catch (error) {
        throw new Error('Não foi possível buscar todas as keys no banco de dados');
    }
}

const clearDatabase = async (callback = null) => {
    try {
        await AsyncStorage.clear(callback);
    } catch (error) {
        throw new Error('Não foi possível apagar o banco de dados');
    }
}

export {
    insertObject,
    insertString,
    readByKey,
    readAll,
    clearDatabase
};