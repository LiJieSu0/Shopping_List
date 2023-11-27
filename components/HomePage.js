import { View, Text,Button,TextInput,FlatList } from "react-native";

export default function HomePage(props){
    const {navigation}=props;
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title='To Shopping List'
                onPress={() => navigation.navigate('Shopping List')}  
            />
            <TextInput
                placeholder="testtesttesst"
            />
        </View>
    )
}