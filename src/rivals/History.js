import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Menu} from 'react-native-paper';

const Card = ({correctPicks, totalPicks, opponent, date}) => {
  const ratio = totalPicks > 0 ? correctPicks / totalPicks : 0;
  const type = ratio > 0.5 ? 'overCard' : 'underCard'; // Calculate type based on ratio

  return (
    <View style={[styles[type], styles.commonCard]}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={styles.titleText}>
          {correctPicks}/{totalPicks} vs. {opponent}
        </Text>
        <Text style={styles.subText}>{date} week 14 NFL weekend league</Text>
      </View>
    </View>
  );
};

const History = () => {
  const [visibleMode, setVisibleMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState('All'); // Set default to "All"

  const [visibleResult, setVisibleResult] = useState(false);
  const [selectedResult, setSelectedResult] = useState('All'); // Set default to "All"

  const openModeMenu = () => {
    setVisibleMode(true);
    setVisibleResult(false); // Ensure only one menu is open at a time
  };

  const openResultMenu = () => {
    setVisibleResult(true);
    setVisibleMode(false); // Ensure only one menu is open at a time
  };

  const closeModeMenu = () => setVisibleMode(false);
  const closeResultMenu = () => setVisibleResult(false);
  return (
    <View style={styles.container}>
      <View style={styles.dropDowns}>
        {/* Mode Dropdown */}
        <Menu
          visible={visibleMode}
          onDismiss={closeModeMenu}
          anchor={
            <TouchableOpacity
              onPress={openModeMenu}
              style={styles.dropdownButton}>
              <Text style={styles.dropdownButtonText}>
                Mode: {selectedMode}
              </Text>
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              setSelectedMode('All');
              closeModeMenu();
            }}
            title="All"
          />
          <Menu.Item
            onPress={() => {
              setSelectedMode('H2H');
              closeModeMenu();
            }}
            title="H2H"
          />
          <Menu.Item
            onPress={() => {
              setSelectedMode('Weekend');
              closeModeMenu();
            }}
            title="Weekend"
          />
        </Menu>

        {/* Result Dropdown */}
        <Menu
          visible={visibleResult}
          onDismiss={closeResultMenu}
          anchor={
            <TouchableOpacity
              onPress={openResultMenu}
              style={styles.dropdownButton}>
              <Text style={styles.dropdownButtonText}>
                Result: {selectedResult}
              </Text>
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              setSelectedResult('All');
              closeResultMenu();
            }}
            title="All"
          />
          <Menu.Item
            onPress={() => {
              setSelectedResult('Win');
              closeResultMenu();
            }}
            title="Win"
          />
          <Menu.Item
            onPress={() => {
              setSelectedResult('Loss');
              closeResultMenu();
            }}
            title="Loss"
          />
          {/* Add more Menu.Item as needed */}
        </Menu>
      </View>

      <View style={styles.container}>
        <Card
          type="Over"
          correctPicks={4}
          totalPicks={5}
          opponent="SlimeGuy"
          date="Sunday"
        />
        <Card
          type="Under"
          correctPicks={2}
          totalPicks={5}
          opponent="SlimeGuy"
          date="Sunday"
        />
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  commonCard: {
    borderRadius: 14,
    borderWidth: 1,
    // marginTop: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  overCard: {
    backgroundColor: '#16B7B8',
  },
  underCard: {
    backgroundColor: '#FF563C',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // Use your app's color scheme
  },
  subText: {
    fontSize: 16,
    color: '#fff', // Use your app's color scheme
    marginTop: 4,
  },
  dropdownButton: {
    backgroundColor: '#252525', // Set the dropdown background color
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  dropdownButtonText: {
    color: '#FFFFFF', // Set the label text color to white
    fontSize: 16,
    textAlign: 'center',
  },
  dropDowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
