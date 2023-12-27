import { View, Text,Button,TextInput,FlatList,TouchableWithoutFeedback,Keyboard, StyleSheet } from "react-native";
import { useState,useEffect } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function CurrListPage(){
    const uuid=uuidv4();
    const [itemList,setItemList]=useState([
        {
            itemKey:uuid,
            itemName:'new',
            quantity:1,
            price:0
        }
        ]);
    const [quantitySum,setQuantitySum]=useState(0);
    const [priceSum,setPriceSum]=useState(0);

    const addItem=()=>{
        const newId=uuidv4();
        const newItemList=[...itemList,
            {
                itemKey:newId,
                itemName:'new',
                quantity:0,
                price:0
            }];
        setItemList(newItemList);
    }

    function updateTotalQuantity(){
        let total=parseInt(0);
        for(const item of itemList){
            total+=parseInt(item.quantity);
        }
        
        setQuantitySum(total);
    }
    function updateTotalPrice(){
        let total=0;
        for(const item of itemList){
            total+=parseFloat(item.price);
        }
        setPriceSum(total);
    }

    function updateItemName(text,updatedKey){
        let updatedList=[...itemList];
        updatedList.filter((item)=>{
            if(item.itemKey!=updatedKey)
                return item;
            let tmp=item;
            tmp.itemName=text;
            return tmp;
        })
        setItemList(updatedList);
    }

    function updateItemQuantity(text,updatedKey){
        let updatedList=[...itemList];
        const match = text.match(/^\d+/);
        let formattedValue = match ? match[0] : '';
        if(formattedValue=='')
            formattedValue=0;
        updatedList.filter((item)=>{
            if(item.itemKey!=updatedKey)
                return item
            let tmp=item;
            tmp.quantity=formattedValue;
            return tmp;
        })
        setItemList(updatedList);
        updateTotalQuantity();
    }   

    function updateItemPrice(text,updatedKey){
        let updatedList=[...itemList];
        const match = text.match(/^\d+(\.\d{0,2})?/);
        let formattedValue = match ? match[0] : '';
        if(formattedValue=='')
            formattedValue=0;
        updatedList.filter((item)=>{
            if(item.itemKey!=updatedKey)
                return item;
            let tmp=item;
            tmp.price=formattedValue
            return tmp;
        })
        setItemList(updatedList);
        updateTotalPrice();
    }

    function deleteItem(deletedKey){
        let updatedList=[...itemList];
        updatedList=updatedList.filter((item)=>{
            if(item.itemKey!=deletedKey)
                return item;
            return;
        });
        setItemList(updatedList);
    }

    return(
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
            {/* TODO subtitle */}

            {/* add item button  */}
            <View >
                <TouchableWithoutFeedback style={styles.addBtn}>
                    <Button
                        title="+"    
                        onPress={addItem}
                        color='tomato'
                    />
                </TouchableWithoutFeedback>
            </View>
            
           
            {/* {renderItemList()} */}
            <FlatList
                data={itemList}
                renderItem={({item})=>(
                    <View>
                        <TextInput 
                            value={item.itemName}
                            onChangeText={(text)=>{updateItemName(text,item.itemKey)}}
                        />
                        <Button
                            title="+"
                            onPress={()=>{
                                let updateList=[...itemList];
                                updateList.filter((i)=>{
                                    if(i.itemKey==item.itemKey&&i.quantity<99){
                                        i.quantity++;
                                    }
                                })
                                setItemList(updateList);
                            }}
                        />
                        <TextInput
                            placeholder="0"
                            keyboardType='numeric'
                            value={item.quantity==0?'':item.quantity.toString()}
                            onChangeText={(text)=>{updateItemQuantity(text,item.itemKey)}}
                        />

                        <Button
                            title="-"
                            onPress={()=>{
                                let updateList=[...itemList];
                                updateList.filter((i)=>{
                                    if(i.itemKey==item.itemKey&&i.quantity>0){
                                        i.quantity--;
                                    }
                                })
                                setItemList(updateList);
                                console.log(itemList);
                            }}
                        />

                        <TextInput
                            keyboardType='numeric'
                            placeholder="0"
                            value={item.price==0?'':item.price.toString()}
                            onChangeText={(text)=>{updateItemPrice(text,item.itemKey)}}
                        />

                        <Button
                            title="delete"
                            onPress={()=>deleteItem(item.itemKey)}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.itemKey}
            />

            {/* TODO summary */}
            <View style={styles.summaryBox}>
                <Text style={styles.subtotal}>Subtotal: {priceSum.toString()}</Text>       
                <Text style={styles.itemCount}>Item Count: {quantitySum.toString()}</Text>
                <Text style={styles.tax}>Tax:</Text>      
            </View>
          
            {/* TODO change page */}
            
        </View>
    </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    addBtn:{
        flex: 1,
        width: 44,
        height: 43,
        backgroundColor: 'tomato',
        alignContent:'flex-end',
        borderRadius: 80,
    },
    summaryBox:{
        width: '100%',
        height: 63,
        backgroundColor: 'tomato',
        borderRadius: 80,
    },
    subtotal:{
        textAlign: 'center',
        color: '#fff'
    },
    itemCount:{
        textAlign: 'center',
        color: '#fff'
    },
    tax: {
        textAlign: 'center',
        color: '#fff'
    }


})