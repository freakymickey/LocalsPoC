import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ConsoleLogs } from './ConsoleLogListener';
import { useIsFocused } from '@react-navigation/native';

const InAppConsole = () => {
  const [logs, setLogs] = useState([]);
  // const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // setLogs([...ConsoleLogs]);
      setLogs(ConsoleLogs);
    }

    return () => {};
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: '#000', maxHeight: 660 }}>
      <FlatList
        data={[...logs].reverse()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              color:
                item.type === 'error'
                  ? 'red'
                  : item.type === 'warn'
                  ? 'yellow'
                  : 'lime',
            }}
          >
            {item.message}
          </Text>
        )}
        style={{ padding: 10, height: 600, paddingBottom: 50 }}
        inverted
      />
    </View>
  );
};

export { InAppConsole };
