

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { onValue, ref } from 'firebase/database';
import { db } from './firebase-config';


  type ItemData = {
  id: string;
  name: string;
  service: string;
  seasons: string;
  rated: string;
  imdb: string;
  show_url: string;
  images: string;
};
 

type ItemProps = {
  item: ItemData;
   onPress: () => void;
 
};


function App() {
 
  const [selectedName, setSelectedName] = useState<string>();
   const [selectedService, setSelectedService] = useState<string>();
   const [selectedSeasons, setSelectedSeasons] = useState<string>();
   const [selectedRated, setSelectedRated] = useState<string>();
   const [selectedImdb, setSelectedImdb] = useState<string>();
   const [selectedtvShowUrl, setSelectedtvShowUrl] = useState<string>();
   const [selectedImage, setSelectedImage] = useState<string>();
   const [database, setDatabase] = useState([]);
   const [data, setData] = useState([]);

   const [modalVisible, setModalVisible] = useState(false);

   useEffect(() => {
    fetch('https://www.nolansapps.com/w2wapp/w2w_tvshows.php')
      .then(response => response.json())
      .then(data => setData(data) )
        
      .catch(error => console.log(error));
  }, []);
 
   
  
const Item = ({item}: ItemProps) => (
  <TouchableOpacity   onPress={() => { 
           
    setSelectedId(item.id);
    setSelectedName(item.name); 
    
    setSelectedSeasons(item.seasons);
    setSelectedRated(item.rated); 
    setSelectedImdb(item.imdb);
    setSelectedtvShowUrl(item.show_url);
    setModalVisible(true)
    switch (selectedService) {
      case "Prime Video":
        setSelectedService('PrimeVideo'); 
        break;
        case "Apple TV+":
          setSelectedService('AppleTV+'); 
          break;
    
      default:
        setSelectedService(item.service); 
        break;
    }
      
    
  }} 
   style={[styles.item]}>
    
   
 
    <Image  style={styles.tinyLogo}
    source={{uri: 'http://www.nolansapps.com/images/tvshows/'+ item.id +'/'+ item.id +'.jpg'}} />

  </TouchableOpacity>
);

  function readData() {

    const starCountRef = ref(db, '/');
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    setDatabase(data);
     
   
    
  });

  }

 const [selectedId, setSelectedId] = useState<string>();

 const renderItem = ({item}: {item: ItemData}) => {
  

  return (
    <Item
      item={item}
     // onPress={() => createTwoButtonAlert({item})   }  
        onPress={() => { setModalVisible(true) ;
          setSelectedId(item.id);
          setSelectedName(item.name); 
          setSelectedService(item.service); 
          setSelectedSeasons(item.seasons);
          setSelectedRated(item.rated); 
          setSelectedImdb(item.imdb);
          setSelectedtvShowUrl(item.show_url);
         
          switch (selectedService) {
            case "Prime Video":
              setSelectedService('PrimeVideo'); 
              break;
              case "Apple TV+":
                setSelectedService('AppleTV+'); 
                break;
          
            default:
              setSelectedService(item.service); 
              break;
          }

   
          
        }}  
      // backgroundColor={backgroundColor}
      // textColor={color}
    />
  );
};

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
      
        <View style={styles.centeredView}    >  
       
        <TouchableOpacity  onPress={()=> {
    
          setModalVisible(!modalVisible)
    }
  }>
   
 
          <View style={styles.modalView }>
          {/* Here is the View for the Modal */}
      
          <Image
        style={styles.modalLogo}
        source={{uri: 'http://www.nolansapps.com/images/tvshows/'+ selectedId +'/'+selectedId +'.jpg'}} />
            <Text style={styles.modalText}>{selectedName}</Text>
            <Text style={styles.modalText}>Seasons: {selectedSeasons}</Text>  
            <Text style={styles.modalText}>Rated: {selectedRated}</Text>  
            <Text style={styles.modalText}>IMDb: {selectedImdb}</Text>  
            <Text style={styles.serviceText}>Available On </Text>  
    
 
 
    <Pressable style={styles.servicePressable} 
     onPress={() => { 
    console.log(selectedtvShowUrl);
     Linking.openURL(''+selectedtvShowUrl) ;
    
    }}>
  
             <Image style={styles.serviceLogo} 
            
            source={{uri: 'http://www.nolansapps.com/images/services/'+ selectedService + '.png'}} />
            
            </Pressable>
           
          </View>
          </TouchableOpacity>
        </View>
        
      </Modal>
      <FlatList
        data={data.sort((a, b) => a.id - b.id)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />

     
      
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     
    backgroundColor: '#fff',
    
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
      
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 240,
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  serviceText: {
    top: -75,
    marginBottom: 2,
    textAlign: 'left',
    left: 220,  
    fontSize: 15,  
  },
  modalText: {
    top: 5,
    marginBottom: 2,
    textAlign: 'left',
    fontSize: 15,
    left: 15,
  },
  modalLogo: {
    width: 360,
    height: 128,
     
    borderRadius: 10,

  },

  serviceLogo: {
    width: 65,
    height: 65,
    top: -75,
    left: 230,
  },

  servicePressable: {
    width: 65,
    height: 65,
    
  },

  
  item: {
     
    marginVertical: 8,
   
  },
  title: {
    fontSize: 32,
  },
  tinyLogo: {
    width: 377,
    height: 128,
    left: 6,
  },
  
});


 

export default App;
