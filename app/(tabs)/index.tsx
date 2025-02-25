import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { homeFeed } from "@/placeholder";

// Feed Item Component
const FeedItem = ({ item }) => {
  return (
    <View style={styles.feedItem}>
      <Image source={{ uri: item.image }} style={styles.feedImage} />
      <View style={styles.captionContainer}>
        <Text style={styles.username}>{item.createdBy}</Text>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlashList
        data={homeFeed}
        renderItem={({ item }) => <FeedItem item={item} />}
        estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    marginBottom: 70,
  },
  feedItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  feedImage: {
    width: width,
    height: width - 20,
    borderRadius: 30,
  },
  captionContainer: {
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  caption: {
    color: "#333",
  }
});
