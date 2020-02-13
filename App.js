import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,ScrollView,Image,TouchableOpacity, AsyncStorage } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import telaInicial from './src/telaInicial';
import telaCadastro from './src/telaCadastro';
import anuncioDetalhes from './src/AnuncioDetalhes';
import telaMapa from './src/telaMapa';
import Icon from 'react-native-vector-icons/FontAwesome';
import telaEditar from './src/telaEditar';
import telaHistorico from './src/telaHistorico';
import { createRootNavigator,} from './src/routes';
import splash from './src/splashScreen'


logOut = async ()=>{
  await AsyncStorage.removeItem('@CodeFrila:token')
  await AsyncStorage.removeItem('@CodeFrila:usuario')
}
const CustomDrawerComponent = (props)=>(
  <SafeAreaView style={{flex:1}}>
    <View style={{height:270, backgroundColor:'#0A2745',alignItems:"center", justifyContent:'center',paddingTop:60}}>
      <Image source={require('./src/default.jpg')} style={{height:120,width:120,borderRadius:60}} />
      <Text style={{fontSize:20, paddingTop:20, color:'#F6F6F6'}}>
       Nome do Usuário
      </Text>
      
      <TouchableOpacity>
        <View style={{alignItems:'center', justifyContent:"center"}}>
        <Text style={{fontSize:10, color:'#F6F6F6'}}>
          Nota do Usuário
        </Text>
        <Icon name='star' color={'#F6F6F6'}/>
        </View>
      </TouchableOpacity>
      
    </View>
    <ScrollView style={{backgroundColor:'#F6F6F6'}}>
      <DrawerItems {...props}
       
        
      />
    </ScrollView>
    <View style={{height:60, backgroundColor:'#F76064',alignItems:"center", justifyContent:'center'}}>
      <TouchableOpacity style={{width:'100%',height:'100%',  alignItems:'center', justifyContent:"center"}}onPress={()=>{props.navigation.navigate('auth');logOut()} }>
        <Icon name='sign-out' style={{fontSize:20, color:'#F6F6F6'}}/>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
)
const DrawerNavigator = createDrawerNavigator(
  {
    mapa: telaMapa,
    editar: telaEditar,
    historico: telaHistorico,

    
  },
  {
    contentComponent: CustomDrawerComponent,
    hideStatusBar: false,
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    overlayColor: 'rgba(52, 52, 52, 0.8)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#4d6273',
      
    },
    
    
  },
  
);

const Logado = createStackNavigator({
  PrimeiraTela: { 
    screen: DrawerNavigator,
    navigationOptions:{
      headerShown:false
    },
    
  },SegundaTela: { 
    screen: anuncioDetalhes,
    navigationOptions:{
      headerTransparent:true,
        headerTintColor:'white'
    },
    
  }
});

const NaoLogado = createStackNavigator({
  Inicio: { 
    screen: telaInicial,
    navigationOptions:{
      headerShown: false
    },
    
},
ScreenTwo: { 
  screen: telaCadastro,
  navigationOptions:{
    headerTransparent:true,
      headerTintColor:'white'
  },
  
}
});





export default createAppContainer(createSwitchNavigator({
  authLoading: splash,
  app: Logado,
  auth: NaoLogado,

  
},{
  initialRouteName: 'authLoading'
}))












/* componentWillM = async ()=>{
  console.log('APProdou')
  const token = await AsyncStorage.getItem('@CodeFrila:token');
  const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'));
  if(token && usuario)
    this.setState(logado=true);
  
}
const CustomDrawerComponent = (props)=>(
  <SafeAreaView style={{flex:1}}>
    <View style={{height:270, backgroundColor:'#0A2745',alignItems:"center", justifyContent:'center',paddingTop:60}}>
      <Image source={require('./src/default.jpg')} style={{height:120,width:120,borderRadius:60}} />
      <Text style={{fontSize:20, paddingTop:20, color:'#F6F6F6'}}>
        Nome do Usuário
      </Text>
      
      <TouchableOpacity>
        <View style={{alignItems:'center', justifyContent:"center"}}>
        <Text style={{fontSize:10, color:'#F6F6F6'}}>
          Nota do Usuário
        </Text>
        <Icon name='star' color={'#F6F6F6'}/>
        </View>
      </TouchableOpacity>
      
    </View>
    <ScrollView style={{backgroundColor:'#F6F6F6'}}>
      <DrawerItems {...props}
       
        
      />
    </ScrollView>
    <View style={{height:60, backgroundColor:'#F76064',alignItems:"center", justifyContent:'center'}}>
      <TouchableOpacity style={{width:'100%',height:'100%',  alignItems:'center', justifyContent:"center"}}>
        <Icon name='sign-out' style={{fontSize:20, color:'#F6F6F6'}}/>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
)

export default class App extends React.Component {
  state = {
    signed: false,
    signLoaded: false,
  };

  componentDidMount = async ()=>{
    console.log('APProdou')
    const token = await AsyncStorage.getItem('@CodeFrila:token');
    const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'));
    if(token && usuario)
      this.setState({logado:true});
    
  }

  render() {
   
    
    const Layout = createRootNavigator(this.state.logado);
    
    
    return <Layout />;
  }
} */






















/*
const DrawerNavigator = createDrawerNavigator(
  {
    mapa: telaMapa,
    editar: telaEditar,
    historico: telaHistorico,

    
  },
  {
    contentComponent: CustomDrawerComponent,
    hideStatusBar: false,
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    overlayColor: 'rgba(52, 52, 52, 0.8)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#4d6273',
      
    },
    
    
  },
  
);

const Logado = createStackNavigator({
  PrimeiraTela: { 
  screen: DrawerNavigator,
  navigationOptions:{
    headerShown:false
  },
  
},
  
  
});
const NaoLogado = createStackNavigator({
  Inicio: { 
      screen: telaInicial,
      navigationOptions:{
        headerShown: false
      },
      
  },
  ScreenTwo: { 
    screen: telaCadastro,
    navigationOptions:{
      headerTransparent:true,
        headerTintColor:'white'
    },
    
}
  
  
});



const MainNavigation = createSwitchNavigator({
  HomeDrawer: this.state.logado ? Logado : NaoLogado,
  
})
const appConatainer  = createAppContainer(MainNavigation)
export default appConatainer*/