
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, CheckBox } from 'native-base';


const HomePage = () => {
    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        loadStore();
        // deleteFromList(0)

    }, [])
    useEffect(() => {
        save();
    }, [list])

    const save = async () => {
        await AsyncStorage.setItem('list', JSON.stringify(list));
    }
    const loadStore = async () => {
        const get = JSON.parse(await AsyncStorage.getItem('list'));
        setList(get)
    }




    const addToList = async (obj) => {
        setList(prev => [...prev, obj]);
        setNewItem("")
        // await AsyncStorage.setItem('list', JSON.stringify(list));
        // console.log("newlist", list, newList, await AsyncStorage.getItem('list'))
    };

    const deleteFromList = async (value) => {
        setList(prev => { return prev.filter(item => item.text != value) });
        // await AsyncStorage.setItem('list', JSON.stringify(list));
    };

    const updateItem = async (index, value) => {
        setList(prev => { prev[index].text = value; return [...prev] });
    };

    const checkItem = async (index) => {
        setList(prev => { prev[index].complated = !prev[index].complated; return [...prev] });
    };

    const editInput = async (index) => {
        setList(prev => { prev[index].editInput = !prev[index].editInput; return [...prev] });
    };

    const renderItem = (e) => {
        const item = e.item
        const index = e.index;
        return (!item.complated &&
            <View style={styles.column}>
                <View style={{ flexDirection: 'row' }}><CheckBox onPress={() => checkItem(index, item.text)} checked={item.complated} />
                    {!item.editInput && <Text style={styles.columnText}>{item.text}</Text>}
                    {item.editInput && <TextInput style={{ borderWidth: 1, marginLeft: 20, height: 30, paddingHorizontal: 10, maxWidth: 190, fontWeight: 'bold' }} value={item.text} onChangeText={text => updateItem(index, text)} />}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.container} onPress={() => editInput(index)}><Text>Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.container} onPress={() => deleteFromList(item.text)}><Text>Delete</Text></TouchableOpacity>
                </View>
            </View>
        )

    }
    const renderComplatedItem = (e) => {
        const item = e.item
        const index = e.index;
        return (item.complated &&
            <View style={styles.column}>
                <View style={{ flexDirection: 'row' }}><CheckBox onPress={() => checkItem(index, item.text)} checked={item.complated} />
                    {!item.editInput && <Text style={styles.columnText}>{item.text}</Text>}
                    {item.editInput && <TextInput style={{ borderWidth: 1, marginLeft: 20, height: 30, paddingHorizontal: 10, maxWidth: 190, fontWeight: 'bold' }} value={item.text} onChangeText={text => updateItem(index, text)} />}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.container} onPress={() => editInput(index)}><Text>Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.container} onPress={() => deleteFromList(item.text)}><Text>Delete</Text></TouchableOpacity>
                </View>
            </View>
        )

    }

    return (
        <SafeAreaView style={{ margin: 30 }}>

            <ScrollView >


                <Text style={styles.title}>Add an Item</Text>
                <View style={styles.addItemWrapper}>
                    <Input placeholder="Add an item" style={styles.input} value={newItem} onChangeText={text => setNewItem(text)} />
                    <Button onPress={() => addToList({ text: newItem, complated: false, editInput: false })} style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                    </Button>
                </View>

                <Text style={styles.title}>TODO</Text>

                <FlatList
                    data={list}
                    key={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
                <Text style={styles.title}>Complated</Text>
                <Text style={styles.title}>TODO</Text>

                <FlatList
                    data={list}
                    key={(item, index) => index.toString()}
                    renderItem={renderComplatedItem}
                />



            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: { marginLeft: 10 },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30

    },
    input: {
        borderWidth: 1,
        marginTop: 15,
        borderRadius: 10,
        borderColor: '#CCC'
    },
    button: { width: 60, height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 20 },
    buttonText: { color: '#FFF', fontWeight: 'bold' },
    addItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 100 + '%',


    },
    column: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        width: 90 + '%',
        height: 40,
        alignItems: 'center',
    },
    columnText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20
    }
})
export default HomePage;
