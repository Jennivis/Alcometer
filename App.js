import { Alert, Text, View, ScrollView, Pressable } from 'react-native';
import { RadioButton, Switch, TextInput } from 'react-native-paper';
import { useState } from 'react';
import NumericInput from 'react-native-numeric-input';
import styles from './style/style';

export default function App() {

  const [weight, setWeight] = useState(0);
  const [bottle, setBottle] = useState(0);
  const [hour, setHour] = useState(0);
  const [gender, setGender] = useState('female');
  const [result, setResult] = useState(0);

  const [isOn, setIsOn] = useState(false);
  const backgroundColor = isOn ? '#4E7AA5' : '#F1F9FA'

  function calculate() {

    const noWeight = () =>
      Alert.alert(
        "Weight input can not be empty.",
        " ",
        [
          { text: "OK", }
        ]
      );


    const gramsleft = ((bottle * 0.33) * 8 * 4.5) - ((weight / 10) * hour);
    let result = null;

    if (weight == 0) {
      noWeight();
      return;
    }

    if (gender === "female") {
      result = gramsleft / (weight * 0.6);
    } else {
      result = gramsleft / (weight * 0.7);
    }

    if (result < 0) {
      result = 0;
    }

    setResult(result);

  }

  function resultcolor() {
    if (result >= 0 && result < 0.3) {
      return {
        color: '#B6CE65'
      }
    }
    if (result >= 0.3 && result < 0.5) {
      return {
        color: '#F3E483'
      }
    }
    if (result >= 0.5) {
      return {
        color: '#FF8F8F'
      }
    }
  }


  return (
    <View style={styles.container} backgroundColor={backgroundColor}>
      <ScrollView
        style={styles.scrollContainer} automaticallyAdjustContentInsets={false}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.nightmode}>Nightmode </Text>
          <Switch
            style={styles.switch}
            value={isOn}
            onValueChange={() => setIsOn(!isOn)}
            trackColor={{ true: '#203C5D' }}
          />
        </View>

        <Text style={styles.header1}>Alcometer</Text>

        <Text style={styles.header2}>Weight</Text>

        <TextInput
          placeholder='Enter your weight'
          keyboardType='number-pad'
          value={weight}
          onChangeText={t => setWeight(t)}
          style={styles.input}
          mode='outlined'
        />

        <Text style={styles.header2}>Bottles</Text>
        <NumericInput
          onChange={b => setBottle(b)}
          minValue={0}
          totalWidth={140}
          totalHeight={50}
          rounded
          rightButtonBackgroundColor={'#314D69'}
          leftButtonBackgroundColor={'#314D69'}
          iconStyle={{ color: '#FFFFFF' }}
        />

        <Text style={styles.header2}>Hours</Text>
        <NumericInput
          onChange={h => setHour(h)}
          minValue={0}
          totalWidth={140}
          totalHeight={50}
          rounded
          rightButtonBackgroundColor={'#314D69'}
          leftButtonBackgroundColor={'#314D69'}
          iconStyle={{ color: '#FFFFFF' }}
        />

        <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
          <View style={styles.radioStyle} >
            <RadioButton value='female' color='#314D69'
            />
            <Text>Female</Text>
          </View>
          <View style={styles.radioStyle}>
            <RadioButton value='male' color='#314D69'
            />
            <Text>Male</Text>
          </View>
        </RadioButton.Group>

        <Pressable
          onPress={calculate}
          backgroundColor={'#314D69'}
          style={styles.pressable}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>Calculate</Text>
        </Pressable>
        <Text style={[styles.result, resultcolor()]}>{result.toFixed(2)} ‰</Text>
      </ScrollView>
    </View>
  );
}

