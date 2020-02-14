import React, { Component } from 'react';
import { Picker,Alert, StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image, Modal, AsyncStorage } from 'react-native';
import {Container,Header,Left,Right,Radio, CardItem } from 'native-base';
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile, Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import axios from "axios"
import {TextInput} from 'react-native-paper'
import api from '../services/api'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from "react-native-elements";
import { round } from 'react-native-reanimated';
import TimeAgo from 'react-native-timeago'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -0.0063376;
const LONGITUDE = -51.0848025;
const LATITUDE_DELTA = 0.018;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const  moment = require('moment');
require('moment/locale/pt-br');
moment.locale('pt-br')
 var coordinate=[];
class telaMapa extends React.Component {
  static navigationOptions = {
    title: 'mapa',
    drawerLabel: 'Inicio',
    drawerIcon: (
      <Icon name='home' size={25} color={'#1F2A33'} />
    ),
   
};
constructor(props) {
   super(props);
     this.state = {
       menu1:false,
       menu2:false,
       menuRodape:true,
       titulo:'',
       descricao:'',
       valor:'',
       anexo:'',
       localizacao:'atual',
       x:null,
       region:null,
       escolha:false,
       localizacaoMenu:false,
       info:false,
       data:[],
       aux:false,
	   
	   route: [],
	  
	  
     };
    }
    componentDidMount = async()=>{
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          
  
          this.setState({
           
            region: {
              latitude,
              longitude,
              latitudeDelta: 0.002,
              longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
            }
          });
        }, //sucesso
        () => {}, //erro
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000
        }
      );
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({x:position.coords})
      }
      );
      const opcao = await AsyncStorage.getItem('@CodeFrila:opcao');
      if(opcao.localeCompare('1')){
        console.log('contratante')
      }else if(opcao === 1){
        console.log('autonomo')
      }
    }
    
    acessarTodosAnuncios = async ()=>{
      const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'))
      try{
        const response = await api.get(`http://172.16.53.97:3333/contratante/${usuario[0].id}/anuncio`)
        console.log(response.data)
        
        this.setState({
          data:response.data
        })

        
      }catch(error){
        console.log(error)
      }
    }
    trataDetalhes = async(id)=>{
      console.log('nnnanan')
      this.setState({
        menu1:false,
        menu2:false,
        menuRodape:true},() => {
          this.props.navigation.navigate('SegundaTela', {id:id})
        }
      )
      
    }
    adicionarAnuncio = async()=>{
      if(this.state.titulo === '' || this.state.descricao === '' || this.state.valor ===''||  this.state.anexo === ''){
        alert('Preencha todos os campos!!')
      }else{
        const titulo = this.state.titulo;
      const descricao = this.state.descricao;
      const valor = this.state.valor;
      const anexo = this.state.anexo;
      const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'))
      if(this.state.localizacao == 'escolher'){
        const locali = this.state.x
        try{
          const response = await api.post(`http://172.16.53.97:3333/contratante/${usuario[0].id}/anuncio`,
           {titulo_anuncio : titulo,
            descricao_anuncio: descricao,
            valor_maximo_anuncio: valor,
            anexo_anuncio: anexo}
          )
          try{
            const responseLocal = await api.post(`http://172.16.53.97:3333/contratante/${usuario[0].id}/anuncio/${response.data.id}/localizacao`,{
              latitude:locali.latitude,
              longitude:locali.longitude
            })
    
            console.log(responseLocal)
            alert('Anúncio Adicionado!!')
            this.setState({
              titulo:'',
              descricao:'',
              valor:'',
              anexo:'',
              localizacao:'atual',
              localizacaoMenu:false
            })
          }catch(error){
            console.log(error)
          }
        }catch(error){
          console.log(error, 'foi aqui')
        }
      }else{
        const local = this.state.region
        try{
          const response = await api.post(`http://172.16.53.97:3333/contratante/${usuario[0].id}/anuncio`,
           {titulo_anuncio : titulo,
            descricao_anuncio: descricao,
            valor_maximo_anuncio: valor,
            anexo_anuncio: anexo}
          )
          try{
            const responseLocal = await api.post(`http://172.16.53.97:3333/contratante/${usuario[0].id}/anuncio/${response.data.id}/localizacao`,{
              latitude:local.latitude,
              longitude:local.longitude
            })
    
            console.log(responseLocal)
            alert('Anúncio Adicionado!!')
            this.setState({
              titulo:'',
              descricao:'',
              valor:'',
              anexo:'',
              localizacao:'atual',
              localizacaoMenu:false
            })
          }catch(error){
            console.log(error)
          }
        }catch(error){
          console.log(error, 'foi aqui')
        }
      }  
      }
      
      
    }

    botaoAdicionar = () => { 
      
      if (!this.state.menu1 && this.state.menuRodape) {
        this.setState( {menu1: true} );
        this.setState({ menuRodape: false });
      } else if(!this.state.menu1 && !this.state.menuRodape) {
        this.setState({ menu2: false });
        this.setState({ menu1: true });
        
      }
    };
    botaoIformacao = () => {
      this.acessarTodosAnuncios();
      if (!this.state.menu2 && this.state.menuRodape) {
        this.setState({ menu2: true });
        this.setState({ menuRodape: false });
      } else if(!this.state.menu2 && !this.state.menuRodape) {
        this.setState({ menu1: false });
        this.setState({ menu2: true });
        
      }
    };
    Mudanca= async(itemValue)=>{
      
      const itemvalue = itemValue
      this.setState({localizacao:itemvalue}, () => { 
        this.setEscolha() 
      })
      
    }
     
    setEscolha= ()=>{
      
      if(this.state.localizacaoMenu){
        //quando apertar finalizar ou quando apertar cancelar, falta implementar
        this.setState({localizacaoMenu:false})
      } 
      else if(this.state.escolha){
        this.setState({localizacaoMenu:true})
        this.setState({escolha:false})
        
      }else if(!this.state.escolha && this.state.localizacao != 'atual' && !this.state.localizacaoMenu){
        console.log(this.state.localizacao)
        this.setState({escolha:true})
      }
     
    }
    
    botaoInfo = () =>{
      if(this.state.info){
        this.setState({info:false})
      }else{
        this.setState({info:true})
      }
      
    }
    

    botaoFecharModal = () => {

      if (this.state.menu1 && this.state.titulo != '' || this.state.descricao != ''|| this.state.valor != ''|| this.state.anexo != '') {
        Alert.alert(
          'Atenção!',
          'Cancelando, você perderá os dados inseridos nos campos!!',
          [
            
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.setState({menuRodape:true, menu1:false,menu2:false,  
              titulo:'',
              descricao:'',
              valor:'',
              anexo:'',
              localizacao:'atual',
              localizacaoMenu:false
            }) },
          ],
          {cancelable: false},);
         } else {
          this.setState({ menu1: false });
          this.setState({ menu2: false });
          this.setState({menuRodape:true})
          
      }
    };
render() {
  const {navigate} = this.props.navigation;
  return (
    
     <View>
       {this.state.escolha?(
       <View>
        <MapView
        region={this.state.region}
        provider={null}
        
        rotateEnabled={false}
        
        style={styles.map}
        showsUserLocation>
          <Marker draggable

              coordinate={this.state.x}
              onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            />
        </MapView>
        <Animatable.View animation='bounce' style={{padding:30,alignItems:"center", backgroundColor:'rgba(0,0,0,0.2)',position: 'absolute',left:30,top:120,right:30 }}>
        <Text style={{position:"absolute", textAlign:"center",  fontSize:20,color:'#3C3839'}}>
          Segure e Arraste o Marcador para definir uma localização
        </Text>
        </Animatable.View>
        <TouchableOpacity style={{borderRadius:15, backgroundColor:'#466494', height:40, marginTop:2, width:'35%', alignSelf:"center",position:'absolute', bottom:0,margin:50}}>
          <Text style={{color:'white',textAlign:"center", fontSize:15, marginTop:7}} onPress={this.setEscolha}>
            Aplicar
          </Text>
        </TouchableOpacity>
      </View>
      ):null}

      {!this.state.escolha ?(
        <View>
      <MapView
       region={this.state.region}
       provider={null}
       
       rotateEnabled={false}
       
       style={styles.map}
       showsUserLocation
      
       >
    
       <MapView.Marker
                                coordinate={{ latitude: -0.0070825,longitude: -51.0845708}}
                                onCalloutPress={() => navigate('ScreenTwo')}>
                                
                                  <MapView.Callout >
                                      
                                          <View >
                                              <Text>teste</Text>
                                          </View>
                                      
                                    </MapView.Callout>
       </MapView.Marker>
      </MapView>
      
      <Animatable.View animation='fadeInLeft'  style={{paddingTop:50, paddingLeft:20, paddingBottom:20, paddingRight:20, flexDirection:"row",justifyContent:"space-between",alignItems:"center", backgroundColor:'rgba(0,0,0,0.0)',position: 'absolute', width:'100%'}}>
        <Icon onPress={() => this.props.navigation.openDrawer()} name="bars" size={40} color="#4d6273" />  
        
     </Animatable.View>
    {this.state.menuRodape ?(
     <Animatable.View animation='fadeInUp' style={{ borderWidth:1, backgroundColor:'#F6F6F6',width:'100%', height:70,position:'absolute', bottom:0, borderTopRightRadius:25, borderTopLeftRadius:25, borderColor:'#C9D0DB', flexDirection:'row', justifyContent:'space-around'  }}>
      <TouchableOpacity onPress={this.botaoAdicionar} style={{borderRadius:15, backgroundColor:'#F6F6F6', height:70, marginTop:2, width:'40%', alignSelf:"center"}}>
              <Icon name='plus-circle' size={40} color='#4d6273' style={{alignSelf:'center', marginTop:5}}/>
             
              <Text style={{color:'#727272',textAlign:"center", fontSize:15, marginTop:1}}>
                Adicionar Anúncio
              </Text>
              
              
            </TouchableOpacity>
            <TouchableOpacity onPress={this.botaoIformacao} style={{borderRadius:15, backgroundColor:'#F6F6F6', height:70, marginTop:2, width:'40%', alignSelf:"center"}}>
              <Icon name='info-circle' size={40} color='#4d6273' style={{alignSelf:'center', marginTop:5}}/>
              
              <Text style={{color:'#727272',textAlign:"center", fontSize:15, marginTop:1}}>
                  Meus Anúncios Ativos
                </Text>
            </TouchableOpacity>
            
        </Animatable.View>
        ) : null}
        <Modal  transparent={true} visible={!this.state.menuRodape} >
          <Animatable.View style={{backgroundColor:'rgba(52, 52, 52, 0.8)', width:'100%', height:'100%', padding:5}}>
            <Animatable.View  animation='fadeInUpBig' duration={500} style={{backgroundColor:'#F6F6F6',borderTopRightRadius:25, borderTopLeftRadius:25, top:'10%'}}>
               
                <View  style={{ borderWidth:1, backgroundColor:'#F6F6F6',width:'100%', height:80, borderTopRightRadius:25, borderTopLeftRadius:25, borderColor:'#C9D0DB', flexDirection:'row', justifyContent:'space-around'  }}>
                    <TouchableOpacity onPress={this.botaoAdicionar} style={{borderRadius:15, backgroundColor:'#F6F6F6', height:70, marginTop:2, width:'40%', alignSelf:"center"}}>
                    {this.state.menu2 ?(
                            <Icon name='plus-circle' size={40} color='#8d9ba6' style={{alignSelf:'center', marginTop:5}}/>
                            ):null}
                            {this.state.menu2 ?(
                            <Text style={{color:'#aab6bf',textAlign:"center", fontSize:15, marginTop:1}}>
                              Adicionar Anúncio
                            </Text>
                          
                          ):null}
                          {!this.state.menu2 ?(
                          <Icon name='plus-circle' size={40} color='#4d6273' style={{alignSelf:'center', marginTop:5}}/>
                          ):null}
                          {!this.state.menu2 ?(
                          <Text style={{color:'#727272',textAlign:"center", fontSize:15, marginTop:1}}>
                            Adicionar Anúncio
                          </Text>
                          ):null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.botaoIformacao} style={{borderRadius:15, backgroundColor:'#F6F6F6', height:70, marginTop:2, width:'40%', alignSelf:"center"}}>
                    {this.state.menu1 ?(
                    <Icon name='info-circle' size={40} color='#8d9ba6' style={{alignSelf:'center', marginTop:5}}/>
                    ):null}
                    {this.state.menu1 ?(
                      <Text style={{color:'#aab6bf',textAlign:"center", fontSize:15, marginTop:1}}>
                          Meus Anúncios Ativos
                        </Text>
                        ):null}
                        {!this.state.menu1 ?(
                      <Icon name='info-circle' size={40} color='#4d6273' style={{alignSelf:'center', marginTop:5}}/>
                      ):null}
                      {!this.state.menu1 ?(
                      <Text style={{color:'#727272',textAlign:"center", fontSize:15, marginTop:1}}>
                          Meus Anúncios Ativos
                        </Text>
                        ):null}
                    </TouchableOpacity>
            
                  </View>
                  
                  <View
                    style={{
                      borderBottomColor: '#C9D0DB',
                      borderBottomWidth: 1
                    }}
                  />
                  {this.state.menu1 ? (
                  <KeyboardAwareScrollView 
        enableOnAndroid={true}>
                  <Animatable.View   animation={'fadeIn'} style={{backgroundColor:'#F6F6F6', padding:10}}>
                    <TextInput required label='Titulo' style={styles.entrada} theme={{ colors: { primary: "#4d6273" }}} value={this.state.titulo}
              onChangeText={titulo => this.setState({ titulo })}>

                    </TextInput>
                    <TextInput label='Descrição'  multiline={true} style={styles.entrada, {height:120,marginBottom: 10, marginTop:0}} theme={{ colors: { primary: "#4d6273" }}}value={this.state.descricao}
              onChangeText={descricao => this.setState({ descricao })}> 

                    </TextInput>
                    <TextInput label='Até quanto você pagaria?' keyboardType = 'number-pad' style={styles.entrada} theme={{ colors: { primary: "#4d6273" }}}value={this.state.valor}
              onChangeText={valor => this.setState({ valor })}>

                    </TextInput>
                    <TextInput label='Anexo'  style={styles.entrada} theme={{ colors: { primary: "#4d6273" }}}value={this.state.anexo}
              onChangeText={anexo => this.setState({ anexo })}>

                    </TextInput>
                    <Text style={{fontSize:15, color:'#1A2127'}}>
                      Informe uma Localização:
                    </Text>
                    <TouchableOpacity onPress={this.botaoInfo}>
                      <Icon name='info-circle' color='#40AFE0' size={20} style={{textAlign:"left",alignSelf:'flex-end'}} />
                    </TouchableOpacity>
                    <Modal transparent={true} visible={this.state.info }   >
                      <TouchableWithoutFeedback onPress={this.botaoInfo}>
                    <Animatable.View style={{backgroundColor:'rgba(52, 52, 52, 0.8)', width:'100%', height:'100%', padding:5, flexDirection:'column'}}>
                      <View style={{backgroundColor:'#F6F6F6', alignSelf:"center",justifyContent:"center", top:120,margin:20}}>
                      <View style={{backgroundColor:'#4d6273', padding:0,margin:0}}>
                      <Text style={{color:'white', fontSize:35, paddingLeft:10}}>
                        Informação
                      </Text>
                      </View>
                      <View style={{paddingTop:20}}>
                      <Icon name='map' size={40} color='#68869e' style={{alignSelf:"center", justifyContent:"center"}}/>
                          <Text style={{fontSize:20, color:'#2E2D2D', textAlign:"center", paddingTop:20}}>
                            Esta localização determina onde será exercido o trabalho
                          </Text>
                      </View>
                      <View style={{paddingTop:20}}>
                        <TouchableOpacity style={{borderWidth:1,borderColor:'#E1E1E1',height:55}} onPress={this.botaoInfo}>
                          <Text style={{textAlign:"center",fontSize:20, alignSelf:"center",justifyContent:"center",paddingTop:10}}>
                            Entendi
                          </Text>
                        </TouchableOpacity>
                      </View>
                      </View>
                      </Animatable.View>
                      </TouchableWithoutFeedback>
                    </Modal>
                    {!this.state.localizacaoMenu?(
                    <Picker
                    
                      selectedValue={this.state.localizacao}
                      
                      style={{height: 50, width: 200}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.Mudanca(itemValue)
                        
                      }>
                      
                       
                      <Picker.Item label="Localização Atual" value="atual" />
                      <Picker.Item label="Escolher no Mapa" value="escolher"/>
                    </Picker>
                    ):null}
                    {this.state.localizacaoMenu?(
                      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                  <Text style={{fontSize:15}}>
                        Localização Informada
                              <Icon name='check' color='#99B78F' size={20}/>
                      </Text>
                      <Text style={{color:'#40AFE0'}} onPress={this.setEscolha}>
                      Editar
                    </Text>
                      </View>
                      
                    ):null}
                  </Animatable.View>
                  
                  <View style={{flexDirection:"row", justifyContent:'space-around', width:'100%', marginBottom:20}}>
                  <TouchableOpacity style={{borderRadius:15, backgroundColor:'#466494', height:40, marginTop:2, width:'35%', alignSelf:"center"}} onPress={this.adicionarAnuncio}>
                          
             
                          <Text style={{color:'white',textAlign:"center", fontSize:15, marginTop:7}}>
                            Finalizar
                          </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.botaoFecharModal} style={{borderRadius:15, backgroundColor:'#FAFBFB', height:40, marginTop:2, width:'35%', alignSelf:"center", borderWidth:1, borderColor:'#C9D0DB'}}>
                      
                      
                      <Text style={{color:'#4F5D77',textAlign:"center", fontSize:15, marginTop:7}}>
                          Cancelar
                        </Text>
                    </TouchableOpacity>
            
                  </View>
                  
                  </KeyboardAwareScrollView>
                ) : null}
              {this.state.menu2 ? (
                  <KeyboardAwareScrollView 
        enableOnAndroid={true}>
                  <Animatable.View  animation={'fadeIn'} style={{backgroundColor:'#F6F6F6', padding:0}}>
                    <FlatList
                    style={{height:450}}
                    data={this.state.data? this.state.data: 'test'}
                    renderItem={({ item: rowData }) => {
                      return (
                        <View style={{paddingLeft:10, paddingRight:10, paddingTop:5,paddingBottom:5, }}>
<TouchableOpacity onPress={() => this.trataDetalhes(rowData.id)} style={{height:70, width:"100%", padding:10, borderWidth:1, borderColor:'#E0E0E0', flexDirection:"row", justifyContent:'space-between'}}>
                              
                            
                            <View>
                            <Text style={{fontSize:18}}>
                              
                              {rowData.titulo_anuncio}
                              
                            </Text>
                            <TimeAgo style={{color:'#717c85'}} time={rowData.createdAt} />
                            </View>
                            
                            <Icon name="arrow-right" color='#4d6273' size={20} style={{alignSelf:'flex-end'}} />
                            
                            </TouchableOpacity>
                        </View>
                            
                           /* <Card
                              
                              title={rowData.titulo_anuncio}
                            titleStyle={{alignSelf:'flex-start'}}
                            
                            onPress={console.log('terte')}
                            containerStyle={{   borderRadius:6,height:100, marginTop:10 }}>
                             
                              <Text>
                              {rowData.title}
                              
                            </Text>
                           
                <Icon name="arrow-right" />
                              
                              
              
                             
                              
                            
                              </Card> */
                            
                            
                        
                         
                      );
                    }}
                    keyExtractor={(item, index) => item}
                    />

                    
                  </Animatable.View>
                  
                  <View style={{flexDirection:"row", justifyContent:'space-around', width:'100%', marginBottom:20, marginTop:10}}>
                  
                    <TouchableOpacity style={{borderRadius:15, backgroundColor:'#FAFBFB', height:40, marginTop:2, width:'35%', alignSelf:"center", borderWidth:1, borderColor:'#C9D0DB'}}>
                      
                      
                      <Text onPress={this.botaoFecharModal} style={{color:'#4F5D77',textAlign:"center", fontSize:15, marginTop:7}}>
                          Fechar
                        </Text>
                    </TouchableOpacity>
            
                  </View>
                  
                  </KeyboardAwareScrollView>
              ) : null}
            </Animatable.View>
            
          
          </Animatable.View>
          
        </Modal> 
        </View>):null}
     </View>
   
   );
  }
}
export default telaMapa

const styles = StyleSheet.create({
   map: {
    width: '100%',
    height: '100%',
   },
   entrada:{
    height:50,
    
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: '100%',
    backgroundColor:'#E2E2E2'
    
  },
  estiloPressionado:{

  },
  estiloNaoPressionado:{
    
  }
 
   
});
