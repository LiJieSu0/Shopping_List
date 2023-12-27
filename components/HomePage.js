import { View, Text,Button,TextInput,FlatList, StyleSheet } from "react-native";

export default function HomePage(props){
    const {navigation}=props;
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Recently list
            </Text>

            <View style={styles.btnStyle}>
                <Button
                    color={'tomato'}
                    title='Create new list'
                    onPress={() => navigation.navigate('Shopping List')}
                />
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        position: 'absolute',
        left: 0,
        color: '#989898',
        paddingTop: 20,
        borderWidth: 1,
        borderBottomColor: '#fff',
    },
    btnStyle:{
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: 600,
        borderRadius: 50,
    }
})