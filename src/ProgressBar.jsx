import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function ProgressBar({ progress }) {
  const colorStart = [238, 132, 215]
  const colorEnd = [142, 223, 252]

  const RGBArray1 = colorStart.map(x => progress * x)
  const RGBArray2 = colorEnd.map(x => (1 - progress) * x)
  const RGBArray = Array.from({ length: 3 }).map(
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
