import React from "react";
import { Platform, View, Dimensions } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const BannerAd = () => {
    const adUnitID = Platform.select({
        android: "ca-app-pub-1616332876405841/9016669808",
    });

    return (
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <AdMobBanner
                adUnitID={adUnitID}
                bannerSize="banner"
                servePersonalizedAds={true}
                style={{
                    width: Dimensions.get('window').width,
                }}
            />
        </View>
    );
};

export default BannerAd;