import { View, Text,TouchableWithoutFeedback,Keyboard, Alert, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SqlitePage from "./components/SQLitePage";
import CurrListPage from "./components/CurrListPage";
import HomePage from "./components/HomePage";
import { globalStyles } from "./GlobalStyle";

export default function App() {
  const Stack=createNativeStackNavigator();
  function LogoTitle(){
    return(
      <View>
        <Text style={styles.title}>My first list</Text>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <Stack.Navigator>
            <Stack.Screen 
              name="Shopping Lists" 
              component={HomePage} 
            />
            <Stack.Screen name="Shopping List" component={CurrListPage}      
                              options={{
                                headerTitle: (props) => <LogoTitle {...props} />,
                                headerRight: () => (
                                <Button
                                  onPress={() => alert('This is a button!')}
                                  title="Info"
                                  color="#fff"
                                />
                                ),
                              }} />
        </Stack.Navigator>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title:{
    width: 250,
    textAlign: 'center',
    fontSize: 20,
    // color: '#fff'
  }
})
