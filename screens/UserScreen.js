// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';

class UserScreen extends Component {

  constructor() {
    super();
    // this.firestoreRef = firebase.firestore().collection('users');
    this.dbRef = firebase;
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    // this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    let userArr = [];
    this.dbRef.get_data('/api/user-list').then((items)=>{
        userArr = items;
        this.setState({
            userArr,
            isLoading: false,
         });
    });
  }

  componentWillUnmount(){
    // this.unsubscribe();
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
          {
            this.state.userArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.name}
                  subtitle={item.email}
                  onPress={() => {
                    this.props.navigation.navigate('UserDetailScreen', {
                      userkey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UserScreen;