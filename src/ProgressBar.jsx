import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function ProgressBar({ progress }) {
  let RGBArray1 = [238, 132, 215].map(x => progress * x)
  let RGBArray2 = [142, 223, 252].map(x => (1 - progress) * x)
  let RGBArray = Array.from({ length: 3 }).map(
    (_, index) => RGBArray1[index] + RGBArray2[index]
  )

  return (
    <View style={style.progressBarBackground}>
      <View
        style={[
          style.progressBar,
          {
            width: `${100 * progress}%`,
            backgroundColor: `rgb(${RGBArray})`
          }
        ]}
      />
    </View>
  )
}

const style = StyleSheet.create({
  progressBar: {
    height: 10,
    borderRadius: 5
  },
  progressBarBackground: {
    backgroundColor: 'white',
    height: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 5
  }
})
