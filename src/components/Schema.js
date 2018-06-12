import React from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactNative, {Text,TextInput, StyleSheet,View, TouchableHighlight,   Dimensions,TouchableOpacity,Button, Image, ScrollView } from 'react-native';


const submit = values => {
  console.log('submitting form', values)
}

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput onChangeText={onChange} {...restInput} />
}

const Schema = props => {
  const { handleSubmit } = props

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput onChangeText={renderInput}/>
      <Field name="email" component={renderInput} />
      <TouchableOpacity onPress={handleSubmit(submit)}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default reduxForm({
  form: 'test'
})(Schema)

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  container: {

  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
})
