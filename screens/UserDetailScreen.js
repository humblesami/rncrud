import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

class UserDetailScreen extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            key: '',
            name: '',
            email: '',
            mobile: '',
            isLoading: true
        };
    }

    componentDidMount() {
        console.log('Mount');
        // const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
        //this.save_user_data_to_state(user);
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        console.log(prop, 'yyyy', val);
        this.setState(state);
    }

    get_user_data_from_state(){
        let user_data = {
            id: this.state.id,
            key: this.state.id,
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            isLoading: true
        };
        return user_data;
    }

    save_user_data_to_state(user){
        this.setState({
            id: user.id,
            key: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            isLoading: false
        });
    }

    updateUser() {
        this.setState({
            isLoading: true,
        });
        // const updateDBRef = firebase.firestore().collection('users').doc(this.state.key);
        const dbRef = firebase;
        let user_data = this.make_user_data();

        dbRef.post_data('/user-update', user_data).then((res) => {
            if(res.status == 'success')
            {
                this.setState(user_data);
            }
            this.props.navigation.navigate('UserScreen');
        }).catch((error) => {
            console.error("Error: ", error);
            this.setState({
                isLoading: false,
            });
        });
    }

    deleteUser() {
        // const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey);
        const dbRef = firebase;
        let user_data = this.make_user_data();
        dbRef.post_data('/user-delete', user_data).then((res) => {
            if(res.status == 'success'){
                console.log('Item removed from database')
                this.props.navigation.navigate('UserScreen');
            }
        })
    }

    openTwoButtonAlert = () => {
        Alert.alert(
            'Delete User',
            'Are you sure?', [
                { text: 'Yes', onPress: () => this.deleteUser() },
                { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
            ], {
                cancelable: true
            }
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Name'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Email'}
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Mobile'}
                        value={this.state.mobile}
                        onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Update'
                        onPress={() => this.updateUser()}
                        color="#19AC52"
                    />
                </View>
                <View>
                    <Button
                        title='Delete'
                        onPress={this.openTwoButtonAlert}
                        color="#E37399"
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 7,
    }
})

export default UserDetailScreen;