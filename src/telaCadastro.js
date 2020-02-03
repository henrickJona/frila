import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image, Alert } from 'react-native';
import {Container,Header,Left,Right,Radio } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {TextInput} from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import Loader from './Loader'
import axios from 'axios';
class telaCadastro extends React.Component {
  static navigationOpotions ={
    header:null
}
  state = {
    telefone: '',
    id :''
  };
  componentDidMount(){
    this.setState({id: this.props.navigation.state.params.idd})
  }
  validaFone = (fone) =>{
    let regex = new RegExp(/^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/);
    if(regex.test(fone)){
      return true;
    }else{
      return false;
    }
  }

  send = async () =>{
     this.setState({
          loading: true
        });
    if(this.validaFone('(96) 99158-3485')){
      try{
        const resp = await axios.put(`http://172.16.53.97:3333/autonomo/${this.state.id}`,
          {telefone_autonomo: this.state.telefone},)
          this.setState({
            loading: false
          });
          const {usuario, token}= resp.data
          await AsyncStorage.multiSet([
            ['@CodeFrila:token', token],
            ['@CodeFrila:usuario',JSON.stringify(usuario)],
          ])
          this.props.navigation.navigate('ScreenThree')
        } 
      
          catch(error) {
            console.log(error);

          };
    }else{
      alert('Insira um Número Válido');
    }
  }


  render(){
    return (
        
      <KeyboardAwareScrollView style={estilo.scroll}
      enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
        <View style={{ backgroundColor:'#F6F6F6'}}>

        
<View style={{backgroundColor:'#0A2745', height:250}}>
        <Image
                    style={{width: '100%', height:210,position:'absolute'}}
                    source={require('./fundo.png')}
                    resizeMode='contain'
                    />
        <Text style={estilo.Titulo}>Frila</Text>
        </View>
        </View>
        <View style={estilo.principal}>
        
          <Text h1 bold style={estilo.titulo}>Quase lá</Text>
          <TextInput style={estilo.entrada}
            label='Telefone'
            
            render={props =>
              <TextInputMask  style={{paddingTop:40,paddingLeft:15}}
              
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={this.state.telefone}
                onChangeText={telefone => this.setState({ telefone })}
              />}
              
           />
          
          
          
          <TouchableOpacity style={estilo.botao} onPress={this.send}>
            <Text style={estilo.botaoTexto}>Continuar</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAwareScrollView>
    );
  }
  
}
export default telaCadastro
const estilo = StyleSheet.create({
principal:{
  flex: 1,
  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  padding: 10,
  backgroundColor:"#F0F0F0",
  borderRadius:15,
  padding:10,borderTopLeftRadius:20,borderTopRightRadius:20, borderWidth:.1,margin:10
},
Titulo:{textAlign:"center",fontSize:50, color:'white',paddingTop:160},
entrada:{
  
  borderBottomWidth: 0,
  marginBottom: 10,
  borderRadius: 2,
  paddingVertical: 5,
  width: '100%',
  backgroundColor:'white'
  
},
titulo:{
  color:'#477fad',
  
  fontSize:25,
  paddingBottom:40

},
botao:{
  borderBottomWidth: 0,
  marginBottom: 10,
  borderRadius: 10,
  paddingVertical: 10,
  width: '50%',
  backgroundColor:'#0186AF',
  height:40,
  
},
botaoTexto:{
  textAlign:'center',
  fontSize:20,
  color:'white'
  
},
esqsenha:{
  paddingTop:20,
  alignItems:'center'
},
scroll:{
  flex:1,
  
  backgroundColor:'#F6F6F6'
}

});
