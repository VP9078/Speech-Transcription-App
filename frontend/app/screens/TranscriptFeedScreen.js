import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import axios from "axios";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import routes from "../navigation/routes";
import colors from "../config/colors";
import { deleteTranscript } from "../utils/api";

export default function TranscriptFeedScreen({ navigation }) {
  const [transcripts, setTranscripts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTranscripts = () => {
    setRefreshing(true);

    axios
      .get("http://127.0.0.1:8000/api/transcripts/")
      .then((res) => {
        setTranscripts(res.data);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const handleDelete = (message) => {
    setTranscripts(transcripts.filter((m) => m.id !== message.id));
    deleteTranscript(message.id);
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={transcripts}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.created_at}
            onPress={() => navigation.navigate(routes.TRANSCRIPT_VIEW, item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={fetchTranscripts}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
