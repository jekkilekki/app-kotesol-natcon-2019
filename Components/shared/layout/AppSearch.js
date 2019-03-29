import React from 'react' 
import { View, TextInput } from 'react-native'

const AppSearch = (props) => {
  return (
    <View>
      <TextInput style={searchStyle} />
    </View>
  )
}

const searchStyle = {
  backgroundColor: '#fff',
  width: 200,
  height: 20
}

export default AppSearch