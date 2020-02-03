import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image, Modal } from 'react-native';
import {Container,Header,Left,Right,Radio } from 'native-base';
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile, Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import axios from "axios"
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -0.0063376;
const LONGITUDE = -51.0848025;
const LATITUDE_DELTA = 0.018;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
       
       region: {
         latitude: LATITUDE,
         longitude: LONGITUDE,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
	   },
	   
	   route: [],
	  
	  
     };
    }
    LogOut = async()=>{
      await AsyncStorage.removeItem('@CodeFrila:token')
      await AsyncStorage.removeItem('@CodeFrila:usuario')
      this.props.navigate.navigation('Inicio');
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

      if (!this.state.menu2 && this.state.menuRodape) {
        this.setState({ menu2: true });
        this.setState({ menuRodape: false });
      } else if(!this.state.menu2 && !this.state.menuRodape) {
        this.setState({ menu1: false });
        this.setState({ menu2: true });
        
      }
    };
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
            {text: 'OK', onPress: () => this.setState({menuRodape:true, menu1:false,menu2:false}) },
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
                    <TextInput label='Titulo' style={styles.entrada} theme={{ colors: { primary: "#4d6273" }}} value={this.state.titulo}
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
                  </Animatable.View>
                  
                  <View style={{flexDirection:"row", justifyContent:'space-around', width:'100%', marginBottom:20}}>
                  <TouchableOpacity style={{borderRadius:15, backgroundColor:'#466494', height:40, marginTop:2, width:'35%', alignSelf:"center"}}>
                          
             
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
                  <Animatable.View  animation={'fadeIn'} style={{backgroundColor:'#F6F6F6', padding:10}}>
                    <TextInput label='Titulo' style={styles.entrada} theme={{ colors: { primary: "#4d6273" }}}>

                    </TextInput>
                    <TextInput label='Descrição'  multiline={true} style={styles.entrada, {height:120,marginBottom: 10, marginTop:0}} theme={{ colors: { primary: "#4d6273" }}}> 

                    </TextInput>
                    <TextInput label='Até quanto você pagaria?' style={styles.entrada} theme={{ colors: { primary: "#4d6273" }}}>

                    </TextInput>
                    <TextInput label='Anexo'  style={styles.entrada} theme={{ colors: { primary: "#4d6273" }}}>

                    </TextInput>
                  </Animatable.View>
                  
                  <View style={{flexDirection:"row", justifyContent:'space-around', width:'100%', marginBottom:20}}>
                  
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
