import { View, Text, Button, TextInput, FlatList, StyleSheet, Pressable  } from "react-native";

export default function HomePage(props){
    const {navigation}=props;
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Recently list
            </Text>

            <Text style={styles.line}></Text>

            {/* content */}
            <View style={styles.content}>
                {/* <Text>123</Text> */}
            </View>

            <Pressable 
                style={styles.botBtn} 
                onPress={() => navigation.navigate('Shopping List')}
            >
                <Text style={styles.botBtnTitle}>Create new list</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    title:{
        position: 'absolute',
        left: 0,
        color: '#989898',
        borderBottomColor: '#fff',
        paddingTop: 30,
        paddingLeft: 30,
    },
    line:{
        width: '85%',
        height: 1,
        marginTop: 55,
        marginLeft: 50,
        backgroundColor: '#B0B0B0',
    },
    content:{
        flex: 4,
    },
    botBtn:{
        justifyContent: 'flex-end',
        width: '100%',
        height: 63,
        backgroundColor: 'tomato',
        borderRadius: 80,
    },
    botBtnTitle:{
        fontSize: 18,
        paddingBottom: 20,
        alignContent: 'center',
        textAlign: 'center',
        color: '#fff',
    }
})