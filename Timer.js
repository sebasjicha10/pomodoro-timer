import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Vibration, Picker } from 'react-native'


const vibrate = () => Vibration.vibrate([500, 500, 500])
let invertal // Global interval to handle Pauses 
let mode = true // 


const Timer = () => {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [work, setWork] =  useState(25)
    const [breakt, setBreakt] = useState(5)
    const [pause, setPause] = useState(true) // Paused or Running 
    const [button, setButton] = useState("Start") // Button Display
    const [title, setTitle] = useState("Work Timer") // Description of current Timer

    const basicReset = () => {
      mode = true
      clearInterval(invertal)
      setSeconds(0)
      setTitle("Work Timer")
      setPause(true)
      setButton("Start")
    }

    // Update work
    const handleWork = (event) => {
      basicReset()
      setWork(event)
      setMinutes(event)
    }

    // Update break
    const handleBreak = (event) => {
      basicReset()
      setBreakt(event)
      setMinutes(work)
    }

    // Handle Start and Pausing 
    const start = () => {
      setPause(prevPause => !prevPause)
      if (pause === true) {
        setButton("Pause") 
        invertal = setInterval(dec, 1000)
      }
      else {
        setButton("Start")
        clearInterval(invertal)
      }
    }

    // Handle Reset 
    const reset = () => {
      basicReset()
      setMinutes(work)
    }

    const dec = () => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 0) { // End of time
                vibrate()
                mode = !mode
                if (mode === false) {
                  setTitle("Break")
                  return (breakt - 1)
                }
                setTitle("Work Timer")
                return (work - 1)
              }
              return prevMinutes - 1
            })
          return 59
        }
        return prevSeconds - 1
        }
        
      )
    }
  
    // Handle digits 0 to 9 to start with a 0
      function pad(number) {
        return (number < 10 ? "0" : "") + number
    }
  
    return (
      <View style={styles.viewer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.timer}>{pad(minutes) + ":" + pad(seconds)}</Text>

        <View style={styles.buttonsSection}>
          <Button 
            title={button} 
            onPress={start}
            color="white"
          />
          <Button 
            title="Reset" 
            onPress={reset}
            color="white"
          />
        </View>
        
        <View style={styles.pisckerSection}>
          <View style={{paddingRight: 25}}>
            <Text style={styles.inputs}>Work Time:</Text>    
            <Picker style={styles.picker} selectedValue={work} onValueChange={handleWork}>
              <Picker.Item label = "25" value = "25" />
              <Picker.Item label = "20" value = "20" />
              <Picker.Item label = "15" value = "15" />
              <Picker.Item label = "10" value = "10" />
              <Picker.Item label = "5" value = "5" />
            </Picker>
          </View>

          <View style={{paddingLeft: 25}}>
            <Text style={styles.inputs}>Break Time:</Text>  
            <Picker style={styles.picker} selectedValue={breakt} onValueChange={handleBreak}>
              <Picker.Item label = "25" value = "25" />
              <Picker.Item label = "20" value = "20" />
              <Picker.Item label = "15" value = "15" />
              <Picker.Item label = "10" value = "10" />
              <Picker.Item label = "5" value = "5" />
            </Picker>
          </View>
        
        </View>

      </View>
    )
  }
  const styles = StyleSheet.create({
    title: {
      fontSize: 48,
      color: "white",
      fontWeight: "bold",
    },
    timer: {
      fontSize: 80,
      color: "white",
      paddingTop: 20,
    },
    viewer: {
      alignItems: 'center'
    },
    buttonsSection: {
      flexDirection: "row",
      paddingBottom: 40,
      paddingTop: 10,
    },
    pisckerSection: {
      flexDirection: "row"
    },
    picker: {
      width: 70,
      marginLeft: 10
    },
    inputs: {
      color: "white",
      fontSize: 18,
    }
  });
  
  
  export default Timer

