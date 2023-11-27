import { View, Text,TextInput, Button } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useState,useEffect } from "react";



export default function SqlitePage(){

    const db=SQLite.openDatabase('test.db');
    const [currName,setCurrName]=useState();
    const [names,setNames]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{
        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
        });

        db.transaction(tx=>{
            tx.executeSql('SELECT * FROM names',null,
                (txObj,res)=>setNames(res.rows._array),
                (txObj,error)=>console.log(error)
            );
        });

        setIsLoading(false);
    },[])

    if(isLoading){
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const showNames=()=>{
        return names.map((name,idx)=>{
            <View>
                <Text>{name.name}</Text>
            </View>
        })
    }

    const addName=()=>{
        db.transaction(tx=>{
            tx.executeSql('INSERT INTO names (name) values (?)',[currentName],
                (txObj,res)=>{
                    let existingNames=[...existingNames];
                    existingNames.push({id:res.insertId,name:currName});
                    setNames(existingNames);
                    setCurrName(undefined);
                },
                (txtObj,error)=>console.log(error)
            )
        })

    }
    return(
        <View>
            <TextInput
                placeholder="Curr Name"
                value={currName}
                onChangeText={(text)=>setCurrName(text)}
            />

            <Button
                title="Add Name"
                onPress={addName}
            />
            {showNames()}
        </View>
    );
}