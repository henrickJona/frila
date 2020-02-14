import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image, Alert } from 'react-native';
import {Container,Header,Left,Right,Radio } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {TextInput} from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import Loader from './Loader'
import axios from 'axios';
import { round } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
class AnuncioDetalhes extends React.Component {
  static navigationOpotions ={
      
  }
  constructor(props) {
    super(props);
      this.state = {
        menu1:true,
        menu2:false,
        titulo:'',
        descricao:'',
        valor:'',
        anexo:'',
    
      
     
      };
     }

     botaoInteressados = () => { 
      
      if (!this.state.menu1) {
        this.setState( {menu1: true} );
        this.setState({ menu2: false });
      } else if(!this.state.menu1) {
        this.setState({ menu2: false });
        this.setState({ menu1: true });
        
      }
    };
    botaoEditar = () => {
      
      if (!this.state.menu2) {
        this.setState({ menu2: true });
        this.setState({ menu1: false });
      } else if(!this.state.menu2) {
        this.setState({ menu1: false });
        this.setState({ menu2: true });
        
      }
    };
  render(){
    return (
        
      <KeyboardAwareScrollView style={estilo.scroll}
      enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
        <View style={{ backgroundColor:'#F6F6F6'}}>
        
        
<View style={{  backgroundColor:'#0A2745', height:85}}>
<Text h1 bold style={estilo.titulo}>Detalhes</Text>
        
                    
        
        </View>
        </View>
        <View  style={{ borderWidth:1, backgroundColor:'#F6F6F6',width:'100%', height:80, borderTopRightRadius:25, borderTopLeftRadius:25, borderColor:'#C9D0DB', flexDirection:'row', justifyContent:'space-around'  }}>
                    <TouchableOpacity onPress={this.botaoInteressados} style={{borderRadius:15, backgroundColor:'#F6F6F6', height:70, marginTop:2, width:'40%', alignSelf:"center"}}>
                    {this.state.menu2 ?(
                            <Icon name='bell-o' size={40} color='#8d9ba6' style={{alignSelf:'center', marginTop:5}}/>
                            ):null}
                            {this.state.menu2 ?(
                            <Text style={{color:'#aab6bf',textAlign:"center", fontSize:15, marginTop:1}}>
                              Interessados
                            </Text>
                          
                          ):null}
                          {!this.state.menu2 ?(
                          <Icon name='bell-o' size={40} color='#4d6273' style={{alignSelf:'center', marginTop:5}}/>
                          ):null}
                          {!this.state.menu2 ?(
                          <Text style={{color:'#727272',textAlign:"center", fontSize:15, marginTop:1}}>
                            Interessados
                          </Text>
                          ):null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.botaoEditar} style={{borderRadius:15, backgroundColor:'#F6F6F6', height:70, marginTop:2, width:'40%', alignSelf:"center"}}>
                    {this.state.menu1 ?(
                    <Icon name='edit' size={40} color='#8d9ba6' style={{alignSelf:'center', marginTop:5}}/>
                    ):null}
                    {this.state.menu1 ?(
                      <Text style={{color:'#aab6bf',textAlign:"center", fontSize:15, marginTop:1}}>
                          Editar
                        </Text>
                        ):null}
                        {!this.state.menu1 ?(
                      <Icon name='edit' size={40} color='#4d6273' style={{alignSelf:'center', marginTop:5}}/>
                      ):null}
                      {!this.state.menu1 ?(
                      <Text style={{color:'#727272',textAlign:"center", fontSize:15, marginTop:1}}>
                          Editar
                        </Text>
                        ):null}
                    </TouchableOpacity>
            
                  </View>
        <View >
        {this.state.menu2 ? (   
        <Animatable.View  animation={'fadeIn'} style={estilo.principal} >
          <TextInput  style={estilo.entrada}  theme={{ colors: { primary: "#4d6273" }}} label='Titulo' value={this.state.titulo}
              onChangeText={titulo => this.setState({ titulo })}></TextInput>
       
                    <TextInput label='Descrição'  multiline={true} style={estilo.s} theme={{ colors: { primary: "#4d6273" }}}value={this.state.descricao}
              onChangeText={descricao => this.setState({ descricao })}> 

                    </TextInput>
                    <TextInput label='Até quanto você pagaria?' keyboardType = 'number-pad' style={estilo.entrada} theme={{ colors: { primary: "#4d6273" }}}value={this.state.valor}
              onChangeText={valor => this.setState({ valor })}>

                    </TextInput>
                    <TextInput label='Anexo'  style={estilo.entrada} theme={{ colors: { primary: "#4d6273" }}}value={this.state.anexo}
              onChangeText={anexo => this.setState({ anexo })}></TextInput>     

          
          
          <TouchableOpacity style={estilo.botao} onPress={this.send}>
            <Text style={estilo.botaoTexto}>Atualizar</Text>
          </TouchableOpacity>
        </Animatable.View>
          ):null}
          {this.state.menu1 ? (
            
          <Animatable.View  animation={'fadeIn'} style={estilo.principal}>
               {/*  {    <FlatList
                    style={{height:450}}
                    data={ 'test'}
                    renderItem={({ item: rowData }) => {
                      return (
                        <View style={{paddingLeft:10, paddingRight:10, paddingTop:5,paddingBottom:5, }}>
<TouchableOpacity onPress={() => console.log('teste')} style={{height:70, width:"100%", padding:10, borderWidth:1, borderColor:'#E0E0E0', flexDirection:"row", justifyContent:'space-between'}}>
                              
                            
                            <View>
                            <Text style={{fontSize:18}}>
                              
                              {rowData.titulo_anuncio}
                              
                            </Text>
                            <TimeAgo style={{color:'#717c85'}} time={rowData.createdAt} />
                            </View>
                            
                            <Icon name="arrow-right" color='#4d6273' size={20} style={{alignSelf:'flex-end'}} />
                            
                            </TouchableOpacity>
                        </View> 
                            
                           /* /* <Card
                              
                              title={rowData.titulo_anuncio}
                            titleStyle={{alignSelf:'flex-start'}}
                            
                            onPress={console.log('terte')}
                            containerStyle={{   borderRadius:6,height:100, marginTop:10 }}>
                             
                              <Text>
                              {rowData.title}
                              
                            </Text>
                           
                <Icon name="arrow-right" />
                              
                              
              
                             
                              
                            
                              </Card> */
                            
                            
                        
                         
                   /*    );
                    }}
                    keyExtractor={(item, index) => item}
                    /> */ 

                /*     
                  </Animatable.View> 
                  /* 
                  <View style={{flexDirection:"row", justifyContent:'space-around', width:'100%', marginBottom:20, marginTop:10}}>
                  
                    <TouchableOpacity style={{borderRadius:15, backgroundColor:'#FAFBFB', height:40, marginTop:2, width:'35%', alignSelf:"center", borderWidth:1, borderColor:'#C9D0DB'}}>
                      
                      
                      <Text onPress={this.botaoFecharModal} style={{color:'#4F5D77',textAlign:"center", fontSize:15, marginTop:7}}>
                          Fechar
                        </Text>
                    </TouchableOpacity>
            
                  </View>
                   */}
                  </Animatable.View>
              ) : null}
             
        </View>
      </KeyboardAwareScrollView>
    );
  }
  
}
export default AnuncioDetalhes
const estilo = StyleSheet.create({
principal:{

  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  padding: 10,
  backgroundColor:"#F0F0F0",
  borderRadius:15,
  padding:10,borderTopLeftRadius:20,borderTopRightRadius:20, borderWidth:.1,margin:10
},
Titulo:{textAlign:"center",fontSize:50, color:'#F6F6F6',paddingTop:160, },
entrada:{
  
  height:50,
    
  marginBottom: 10,
  borderRadius: 2,
  paddingVertical: 5,
  width: '100%',
  backgroundColor:'#E2E2E2'
  
},
s:{
  
  height:95,
    
  marginBottom: 10,
  borderRadius: 2,
  paddingVertical: 5,
  width: '100%',
  backgroundColor:'#E2E2E2'
  
},
titulo:{
  color:'#F6F6F6',
  width:"80%",
  fontSize:25,
  paddingTop:35,
  textAlign:"center",
  paddingLeft:'15%'


},
botao:{
  borderBottomWidth: 0,
  marginBottom: 10,
  borderRadius: 10,
  paddingVertical: 5,
  width: '50%',
  backgroundColor:'#466494',
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
