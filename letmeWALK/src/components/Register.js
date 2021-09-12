import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { insertObject } from '../database/DbUtils';
import axios from 'axios';

const Login = (props) => {
	const [user, setUser] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [cep, setCep] = React.useState("");
	const [endereco, setEndereco] = React.useState({})
	var emailRegex = /^([\w]\.?)+@([\w]+\.)+([a-zA-Z]{​​​2,4}​​​)+$/;

	useEffect(() => {
		axios.get(`https://api.pagar.me/1/zipcodes/${cep}`)
			.then(response => setEndereco(response.data))
			.then(console.log(endereco))
			.catch(error => console.log(error))
	}, [cep])

	return (
		<KeyboardAvoidingView
			enabled
			behavior="padding">
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.title}>Cadastre-se</Text>

					<Text style={styles.text}>Usuário</Text>
					<TextInput style={styles.input} value={user} onChangeText={setUser} />

					<Text style={styles.text}>Email</Text>
					<TextInput style={styles.input} value={email} onChangeText={setEmail} />

					<Text style={styles.text}>CEP</Text>
					<TextInput style={styles.input} value={cep} onChangeText={setCep} />

					<Text style={styles.text}>Senha</Text>
					<TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />

					<Text style={styles.text}>Confirme a senha</Text>
					<TextInput style={styles.input} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />

					<TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => {
						const userData = {
							user,
							endereco,
							password,
							email
						}

						if (!user.trim() || !email.trim() || !password || !confirmPassword) {
							alert('Cadastre todos campos corretamente')
							return
						}

						if (password !== confirmPassword) {
							alert('A confirmação de senha está errada')
							return
						}

						insertObject(user, userData, (error) => {
							if (error) {
								alert('Tenha certeza que todas informações estão corretas')
								return
							}
						});

						props.navigation.navigate('login')

					}}>
						<Text style={styles.buttonText}>Cadastrar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		flex: 1,
		padding: 15,
	},
	title: {
		fontSize: 25,
		fontWeight: "600",
		textAlign: 'center',
		marginBottom: 10
	},
	text: {
		color: '#000',
		fontSize: 20
	},
	input: {
		width: 370,
		borderRadius: 8,
		borderColor: "#000",
		backgroundColor: '#FFF',
		borderWidth: 1,
		padding: 5,
		marginBottom: 15,
		fontSize: 15,
		marginTop: 5
	},
	button: {
		width: 370,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		marginTop: 5
	},
	buttonText: {
		color: "#FFF",
		fontSize: 17
	},
	buttonSecondary: {
		backgroundColor: "#FFF",
		borderColor: "#4169e1",
		borderWidth: 2
	},
	buttonPrimary: {
		backgroundColor: "#321D5F"
	}
})

export default Login;