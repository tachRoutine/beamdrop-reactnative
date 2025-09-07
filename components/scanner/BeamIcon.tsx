import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'

const iconPath = require("../../assets/images/beam.png")

const BeamIcon = () => {
  return (
    <View style={{
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 20,
      padding: 8,
    }}>
      <Image
        style={{
          width: 32,
          height: 32,
        }}
        source={iconPath}
      />
    </View>
  )
}

export default BeamIcon