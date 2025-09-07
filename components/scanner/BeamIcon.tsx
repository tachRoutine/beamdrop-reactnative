import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { AppColors } from '@/constants/Colors'

const iconPath = require("../../assets/images/beam.png")

const BeamIcon = () => {
  return (
    <View style={{
      backgroundColor: AppColors.primary,
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