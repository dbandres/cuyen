
import React from 'react';
import { View, ScrollView, Image, StatusBar, Dimensions, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

export const ContainerWithBackground=({children})=>{
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
        style={styles.gradient}
      />
      <StatusBar backgroundColor="#fff"
        barStyle="dark-content" />
      <View style={{ position: "absolute", height:"100%", width: "100%" }}>
        <View style={{ width: "100%", top: Platform.OS === 'android'  ?  height*0.12 : height*0.05 ,alignItems: "center", height: 715, justifyContent: "center" }}>
          <View style={{ height: height * 0.8, width: "95%", backgroundColor: "white", alignItems: "center", borderRadius: 10 }}>
            <View style={Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow}>
              <Image
                source={require("../assets/logoCuyen.png")}
                style={{ width: "50%" }}
              />
            </View>
            {children}
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		alignItems: "center",
	},
	text: {
		color: "black",
		fontSize: 25,
		fontWeight: "bold"
	}, gradient: {
		flex: 1,
		width: "100%"
	},
	androidShadow: {
		elevation: 5, // Ajusta este valor según tu preferencia
		height: '28%',
		width: '85%',
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		top: -100,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	iosShadow: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25, // Ajusta este valor según tu preferencia
		shadowRadius: 4, // Ajusta este valor según tu preferencia
		height: '32%',
		width: '85%',
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		top: -100,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
})