// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';

class UserScreen extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            userArr: [],
            error: ''
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData(){
        let obj_this = this;

        firebase.get_data('/user-list', {a:1, b:2}).then(function(res){
            console.log("response", res);
            if(res.status == 'error'){
                obj_this.setState({ error: res.data, isLoading: false });
            }
            else{
                obj_this.setState({ userArr : [], isLoading: false});
            }
            console.log(obj_this.state);
        }).catch((err) => {
            obj_this.setState({ error: 'Error in request '+err, isLoading: false });
        });
    }

    render() {
        // console.log('rendering', this.state);
        let error_message = this.state.error;
        if (error_message) {
            return (
                <View style={styles.messageOnly}>
                    <Text>{error_message}</Text>
                </View>
            )
        }
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        if( !this.state.userArr.length ){
            return (
                <View style={styles.messageOnly}>
                    <Text>No List Items</Text>
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
                                    this.props.navigation.navigate('UserDetailScreen', { user: item });
                                }}
                            />
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
    messageOnly:{
        padding: 40,
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