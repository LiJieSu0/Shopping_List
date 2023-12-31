import { View, Text, Button, TextInput, FlatList, TouchableWithoutFeedback, Keyboard, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useState,useEffect } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';

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
            {/* TODO title */}
           <View style={styles.topTitle}>
            {/* {renderItemList()} */}
            <View style={styles.title}>
                <Text>Produce</Text>
                <Text>Pcs</Text>
                <Text>Pcs/Price</Text>
                <Text>Price</Text>
            </View>

            {/* content */}
            <View>
                <FlatList
                    data={itemList}
                    renderItem={({item})=>(
                        <View style={styles.content}>

                            {/* name input */}
                            <TextInput 
                                value={item.itemName}
                                onChangeText={(text)=>{updateItemName(text,item.itemKey)}}
                            />

                            {/* Button -  */}
                            <View style={styles.subBtn}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        let updateList=[...itemList];
                                        updateList.filter((i)=>{
                                            if(i.itemKey==item.itemKey&&i.quantity>0){
                                                i.quantity--;
                                            }
                                        })
                                        setItemList(updateList);
                                        console.log(itemList);
                                    }}>
                                    <AntDesign name="minus" size={15} color="black" />
                                </TouchableOpacity>
                            </View>
                            
                            {/* pcs input  */}
                            <View style={styles.pcsInput}>
                                <TextInput
                                    placeholder="0"
                                    keyboardType='numeric'
                                    value={item.quantity==0?'':item.quantity.toString()}
                                    onChangeText={(text)=>{updateItemQuantity(text,item.itemKey)}}
                                />         
                            </View>
                            
                            {/* Button +  */}
                            <View style={styles.addBtn}>
                                <TouchableOpacity
                                    onPress={()=>{
                                            let updateList=[...itemList];
                                            updateList.filter((i)=>{
                                                if(i.itemKey==item.itemKey&&i.quantity<99){
                                                    i.quantity++;
                                                }
                                            })
                                            setItemList(updateList);
                                    }}>
                                    <AntDesign name="plus" size={15} color="black" />
                                </TouchableOpacity>
                            </View>

                             {/* pcs/price */}
                            <View style={styles.pcsPrice}>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder="0"
                                    value={item.price==0?'':item.price.toString()}
                                    onChangeText={(text)=>{updateItemPrice(text,item.itemKey)}}
                                />
                            </View>

                            {/* totoal price  */}
                            <View style={styles.totalPrice}>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder="0"
                                    value={item.price==0?'':item.price.toString()}
                                    onChangeText={(text)=>{updateItemPrice(text,item.itemKey)}}
                                />
                            </View>
                            
                            {/* delete button  */}
                            <View style={styles.delBtn}>
                                <TouchableOpacity
                                    onPress={()=>deleteItem(item.itemKey)} /> 
                                <Entypo name="cross" size={18} color="black" />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.itemKey}
                />
                </View>
            </View>

            {/* add item button  */}
            <View style={styles.BtnLayout}>
                <TouchableOpacity style={styles.addContent} onPress={addItem}>
                    <Text style={styles.addItemBtnTitle}>+</Text>
                </TouchableOpacity>
            </View>

            {/* TODO summary */}
            <View style={styles.summaryBox}>
                <Text style={styles.subtotal}>Subtotal: {priceSum.toString()}</Text>       
                <Text style={styles.itemCount}>Item Count: {quantitySum.toString()}</Text>
                <Text style={styles.tax}>Tax:</Text>      
            </View>
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    topTitle:{
        flex: 7,
        
        // backgroundColor: 'red'
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
    },
    BtnLayout:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: 'red'
    },
    addContent:{
        width: 44,
        height: 44,
        borderRadius: 80,
        position: 'absolute',
        left: 180,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato',
    }, 
    addItemBtnTitle:{
        color: '#fff',
        fontSize: 30,
        paddingLeft: 2,
        textAlign: 'center',
    },
    content:{
        paddingLeft: 40,
        flexDirection: 'row',
        // backgroundColor: 'yellow'
    },
    subBtn:{
        position: 'absolute',
        left: 125,
        top: 10
    },
    addBtn:{
        position: 'absolute',
        left: 170,
        top: 10
    },
    pcsInput:{
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 50,
        position: 'absolute',
        left: 143,
        marginTop: 3,
        paddingLeft: 7,
    },
    pcsPrice:{
        position: 'absolute',
        right: 140,
    },
    totalPrice:{
        position: 'absolute',
        right: 28,
    },
    delBtn:{
        position: 'absolute',
        right: 0,
        top: 4,

    }

})