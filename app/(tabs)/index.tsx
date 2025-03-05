import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LongPressGestureHandler, TapGestureHandler, State } from "react-native-gesture-handler";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const PAGE_SIZE = 10;

// This is the key fix - using a proper key for each image to prevent recycling issues
const FeedImage = ({ uri, imageKey }) => {
  // Each image needs its own unique loading state
  const [imageLoading, setImageLoading] = useState(true);
  
  // Reset loading state when URI changes
  useEffect(() => {
    setImageLoading(true);
  }, [uri]);
  
  return (
    <View style={styles.imageContainer}>
      {imageLoading && (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Image 
        key={imageKey} // Critical: Use a unique key per image
        source={{ uri }}
        style={styles.feedImage}
        onLoadStart={() => setImageLoading(true)}
        onLoad={() => setImageLoading(false)}
        // Disable caching to prevent recycled images
        defaultSource={null}
      />
    </View>
  );
};

const FeedItem = ({ item }) => {
  const [showCaption, setShowCaption] = useState(false);
  const doubleTapRef = React.useRef();

  const handleLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setShowCaption(true);
    } else if (event.nativeEvent.state === State.END) {
      setShowCaption(false);
    }
  };

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert("Double Tap", `You liked ${item.createdBy}'s post!`);
    }
  };

  return (
    <View style={styles.feedItem}>
      <View style={{ marginHorizontal: 2 }}>
        <TapGestureHandler 
          waitFor={doubleTapRef}
          shouldCancelWhenOutside={true}>
          <View>
            <TapGestureHandler 
              ref={doubleTapRef} 
              numberOfTaps={2} 
              onHandlerStateChange={handleDoubleTap}
              shouldCancelWhenOutside={true}>
              <View>
                <LongPressGestureHandler 
                  onHandlerStateChange={handleLongPress} 
                  minDurationMs={500}
                  shouldCancelWhenOutside={true}>
                  <View>
                    {/* Pass both URI and a unique key for this image */}
                    <FeedImage 
                      uri={item.image} 
                      imageKey={`image-${item.id}`}
                    />
                    {showCaption && (
                      <View style={styles.overlayCaption}>
                        <Text style={styles.overlayCaptionText}>{item.caption}</Text>
                      </View>
                    )}
                  </View>
                </LongPressGestureHandler>
              </View>
            </TapGestureHandler>
          </View>
        </TapGestureHandler>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);

  const fetchPosts = async (isRefreshing = false) => {
    try {
      if (isRefreshing) setRefreshing(true);
      else setLoadingMore(true);

      let q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(PAGE_SIZE));

      if (!isRefreshing && lastVisible) {
        q = query(collection(db, "posts"), orderBy("createdAt", "desc"), startAfter(lastVisible), limit(PAGE_SIZE));
      }

      const snapshot = await getDocs(q);
      const newPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (isRefreshing) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }

      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert("Error", "Failed to load posts. Please try again.");
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchPosts(true);
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && lastVisible) {
      fetchPosts();
    }
  };

  const renderItem = useCallback(({ item }) => {
    // Create a stable rendering function with proper item identity
    return <FeedItem item={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        renderItem={renderItem}
        estimatedItemSize={400}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        bounces={true}
        overScrollMode="always"
        refreshing={refreshing}
        onRefresh={handleRefresh}
        // Force the list to re-create components instead of recycling
        extraData={posts} 
        initialScrollIndex={0}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        // Disable optimization that causes recycling problems
        removeClippedSubviews={false}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    marginBottom: 90,
    paddingHorizontal: 2,
  },
  feedItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: width - 4,
    height: width - 20,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  feedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  caption: {
    color: "#333",
  },
  overlayCaption: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  overlayCaptionText: {
    color: "#fff",
    fontSize: 16,
    padding: 20,
    textAlign: "center",
  }
});