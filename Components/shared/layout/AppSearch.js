import React from 'react' 
import { View, TextInput } from 'react-native'

import AppInput from '../AppInput'

const AppSearch = (props) => {
  return (
    <View>
      <AppInput style={searchStyle} />
    </View>
  )
}

const searchStyle = {
  // backgroundColor: '#fff',
  // width: 200,
  // height: 20
}

export default AppSearch