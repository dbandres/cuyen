import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import { useState } from "react";

export function CustomInput({ control, name, placeholder, rules = {}, secureTextEntry, editable,
	multiline, numberOfLines, maxLength, numeric, formIntro }) {

	const [visibility, setVisibility] = useState(false)

	const changeVisibility = () => {
		setVisibility(!visibility)
	}


	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
				<>
					<View style={{
						width: "100%",
						flexDirection: 'row',
						alignItems: 'center',
						borderWidth: 1,
						borderColor: '#CDD1DF',
						borderRadius: 10,
						padding: formIntro === true ? 0 : 5,
						height: multiline === true ? 150 : 50,
						marginBottom: "3%",
					}}>
						{
							placeholder === "Crea tu contraseña" ?
								<Image
									source={require("../../../assets/key.png")}
									style={{ width: 18, height: 10 }}
								/>
								:
								placeholder === "Repite tu contraseña" ?
									<Image
										source={require("../../../assets/key.png")}
										style={{ width: 18, height: 10 }}
									/>
									:
									placeholder === "Apellido" || placeholder === "Nombre" ?
										<Image
											source={require("../../../assets/account.png")}
											style={{ width: 18, height: 18 }}
										/>
										:
										placeholder === "Ingresa tu DNI" ?
											<Image
												source={require("../../../assets/badge.png")}
												style={{ width: 18, height: 18 }}
											/>
											:
											placeholder === "Email" ?
												<Image
													source={require("../../../assets/alternate_email.png")}
													style={{ width: 18, height: 18 }}
												/>
												:
												placeholder === "Número de Celular" ?
													<Image
														source={require("../../../assets/mobile_friendly.png")}
														style={{ width: 18, height: 22 }}
													/>
													:
													null
						}
						<TextInput
							placeholder={placeholder}
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							formIntro={formIntro}
							secureTextEntry={visibility !== true ? secureTextEntry : false}
							editable={editable}
							multiline={multiline}
							numberOfLines={numberOfLines}
							maxLength={maxLength}
							style={{
								width: formIntro === true ? "100%" : "85%",
								paddingLeft: 10,
								alignItems: "center",
								fontWeight: "600",
								fontSize: 14,
								lineHeight: 16,
								backgroundColor: formIntro === true ? "white" : "transparent",
								borderRadius:8
							}}
							placeholderTextColor="#CDD1DF"
							keyboardType={numeric}
						/>
						{
							secureTextEntry === true ?
								<TouchableOpacity onPress={changeVisibility} style={{ width: "10%" }}>
									{
										visibility === false ?
											<Image
												source={require("../../../assets/visibility_off.png")}
												style={{ width: 20, height: 20 }}
											/> :
											<Image
												source={require("../../../assets/Visibility_ON.png")}
												style={{ width: 25, height: 25, }}
											/>
									}
								</TouchableOpacity>
								: null
						}
					</View>
					{error && <Text style={{ color: "red", fontSize: 10 }}> {error.message || `Este campo es Requerido`}</Text>}
				</>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	icon: {
		marginHorizontal: 5,
	},
	input: {
		flex: 1,
	},
	textInputStyle: {
		width: "85%",
		paddingLeft: 10,
		alignItems: "center",
		fontWeight: "600",
		fontSize: 14,
		lineHeight: 16,
	}
});