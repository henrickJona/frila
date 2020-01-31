import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image } from 'react-native';
import {Container,Header,Left,Right,Radio } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import * as Facebook from 'expo-facebook';
import { GoogleSignIn } from 'expo-google-sign-in';
import axios from 'axios';
import api from '../services/api'
import * as Google from 'expo-google-app-auth';
import Loader from './Loader'
class telaInicial extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
            botaoContratante:true,
            botaoAutonomo:true,
            loading: false,
           id :''
          };
          
      }
      
      
      teste = async(nome, sobrenome, email, foto)=>{
        this.setState({
          loading: true
        });
    
        try{
          
            const resps = await axios.post('http://172.16.53.97:3333/autonomo/',{
              nome_autonomo: nome,
              sobrenome_autonomo: sobrenome,
              foto_perfil_autonomo:foto,
              email_autonomo: email
            })
            if(resps.data[0].telefone_autonomo == 'teste'){
              this.setState({
                loading: false
              });
              this.setState({
                id: resps.data[0].id
              });
              this.props.navigation.navigate('ScreenTwo',{
                idd :this.state.id
              });
            }else{
              this.setState({
                loading: false
              });
              this.props.navigation.navigate('ScreenThree')
            }
           console.log(resps.data[0].telefone_autonomo);     
            }
catch(error) {
  console.log(error);
};
        //alert();
        //console.log((await response.json()).name);
        
      }
      logIn = async ()=> {
        try {
          
          await Facebook.initializeAsync('1284563348398995');
         
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });
         
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email,picture.type(large)`);
            
            //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            //console.log((await response.json()).picture.data.url);
            //console.log( response.data);
             const nome = response.data.first_name;
            
            let sobrenome = response.data.last_name;
            let email = response.data.email;
            
            let foto = response.data.picture.data.url;
            this.teste(nome, sobrenome, email, foto);
          } else {
             type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }
      signInWithGoogleAsync = async () =>{
        try {
          const result = await Google.logInAsync({
            androidClientId: '229284470930-8di619af432vt8s9aa1a9p332f3k41av.apps.googleusercontent.com',
            
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            const nome = result.user.givenName;
            
            let sobrenome = result.user.familyName;
            let email = result.user.email;
            
            let foto = result.user.photoUrl;
            this.teste(nome, sobrenome, email, foto);
            
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    botaoAuto = () => {
  
        if (this.state.botaoContratante == true) {
          this.setState({ botaoContratante: false });
          
        } else {
          this.setState({ botaoContratante: true });
          
        }
      };
      botaoContra = () => {
  
        if (this.state.botaoAutonomo == true) {
          this.setState({ botaoAutonomo: false });
          
        } else {
          
          this.setState({ botaoAutonomo: true });
        }
      };
      checkF=()=>{
        if(this.state.botaoAutonomo && this.state.botaoContratante){
            alert('Selecione uma das opções primeiro!!');
        }else if(this.state.botaoAutonomo){
            this.logIn();
            //vai para a função de cadastrar autonomo
        }else if(this.state.botaoContratante){
          this.logIn();
          //vai para a função de cadastrar contratante
      }
      }
      checkG=()=>{
        if(this.state.botaoAutonomo && this.state.botaoContratante){
            alert('Selecione uma das opções primeiro!!');
        }
        else if(this.state.botaoContratante){
          this.signInWithGoogleAsync();
          //vai para a função de cadastrar contratante
           
      }
      else if(this.state.botaoAutonomo){
        this.signInWithGoogleAsync();
         this.navigate('verificacaoNumero')
        //vai para a função de cadastrar autonomo
    }
      }

      
    
    render(){
      const {navigate} = this.props.navigation;
        return(
            <KeyboardAwareScrollView style={estilo.scroll}
        enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
            <View style={estilo.Fundo}>
            <Loader
          loading={this.state.loading} />
                <View style={{backgroundColor:'#0A2745', height:250}}>
                <Image
                            style={{width: '100%', height:210,position:'absolute'}}
                            source={require('./fundo.png')}
                            resizeMode='contain'
                            />
                <Text style={estilo.Titulo}>Frila</Text>
                </View>
                
                <View style={{padding:10,borderTopLeftRadius:20, backgroundColor:'#FFFFFF',borderTopRightRadius:20, borderWidth:.1,margin:10}}>

                <Text style={estilo.texto}>
                    Selecione uma das opções abaixo e entre com sua conta:
                </Text>
                <View style={{flexDirection:'row' , justifyContent:'space-around',paddingTop:50,padding:10}}>
                
                {this.state.botaoContratante ? (
                <Animatable.View animation='fadeInLeft' style={estilo.Moldura}>
                
                    <TouchableOpacity onPress={this.botaoContra }>
                        
                            <Icon name='user-plus' size={55} style={estilo.Icone} >

                            </Icon>
                            <Text style={estilo.Botao}>
                                Contratante
                            </Text>
                            
                        
                    </TouchableOpacity>
                    
                    </Animatable.View>
                    ) : null}
                    {this.state.botaoAutonomo ? (

                    <Animatable.View animation='fadeInRight' style={estilo.Moldura}>
                    <TouchableOpacity onPress={this.botaoAuto }>
                        
                            <Icon name='money' size={55} style={estilo.Icone} >

                            </Icon>
                            <Text style={estilo.Botao}>
                                Autônomo
                            </Text>
                        
                    </TouchableOpacity>
                    </Animatable.View>
                    ) : null}
                </View>
                
                <View
                    style={{
                        borderBottomColor: '#93A2BB',
                        borderBottomWidth: .5,paddingTop:25
                    }}
                    />
                <View style={estilo.faceBotao}>
                    <TouchableOpacity onPress={this.checkF}>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Icon name='facebook' size={40} style={estilo.faceIcone}>

                            </Icon>
                            <Text style={estilo.faceTexto}>
                                Entrar com o Facebook
                            </Text>
                            </View>
                    </TouchableOpacity>
                    
                    </View>
                    <View style={estilo.googleBotao}>
                    <TouchableOpacity onPress={this.checkG } >
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Image
                            style={{width: 35, height: 35}}
                            source={require('./g.png')}
                            />
                            <Text style={estilo.googleTexto}>
                                Entrar com o Google
                            </Text>
                            </View>
                    </TouchableOpacity>
                    
                    </View>
                    
                    
                </View>
            </View>
            </KeyboardAwareScrollView>
        );
    }
}
export default telaInicial;
const estilo = StyleSheet.create({
    Fundo:{flex:1, backgroundColor:'#F6F6F6'},
    Titulo:{textAlign:"center",fontSize:50, color:'white',paddingTop:160},
    Botao:{textAlign:"center", fontSize:20,color:'#212731'},
    Icone:{textAlign:"center",color:'#DBE7FB'},
    Moldura:{backgroundColor:"#0186AF",width:'45%',height:125,paddingTop:25, borderRadius:15},
    faceBotao:{width:'100%', backgroundColor:'#3b5998',padding:10,marginTop:10},
    faceTexto:{color:'white',textAlign:'center',fontSize:20,width:'85%',paddingTop:5},
    faceIcone:{color:'#ffffff',width:'10%'},
    googleBotao:{width:'100%', backgroundColor:'#ffffff',padding:10,marginTop:10,borderWidth:1, borderColor:'#9fa6ad'},
    googleTexto:{color:'#323B4A',textAlign:'center',fontSize:20,width:'85%',paddingTop:5},
    googleIcone:{color:'#323B4A',width:'10%'},
    scroll:{
        flex:1,
        backgroundColor:'#eef5fd'
        
      },
      texto:{paddingTop:10,paddingLeft:10,paddingRight:10 ,textAlign:'justify',fontSize:20}
});