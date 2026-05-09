import React, { memo, useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  Easing,
  View,
  type ColorValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import type { IAnimatedMaskedText } from "./AnimatedMaskedText.types";

const DEFAULT_COLORS: readonly string[] = [
  "transparent",
  "rgba(255,255,255,0.5)",
  "rgba(255,255,255,1)",
  "rgba(255,255,255,0.2)",
  "transparent",
];

function AnimatedMaskedTextInner({
  children,
  style,
  speed = 1,
  colors = [...DEFAULT_COLORS],
  baseTextColor = "#000000",
}: IAnimatedMaskedText): React.ReactElement {
  const shimmerTranslate = useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;
  const [textWidth, setTextWidth] = useState<number>(0);
  const [textHeight, setTextHeight] = useState<number>(0);

  useEffect(() => {
    if (textWidth > 0) {
      shimmerTranslate.setValue(0);
      Animated.loop(
        Animated.timing(shimmerTranslate, {
          toValue: 1,
          duration: 2500 / speed,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [shimmerTranslate, speed, textWidth]);

  const waveWidth = textWidth * 0.4;

  const translateX = shimmerTranslate.interpolate<number>({
    inputRange: [0, 1],
    outputRange: [-waveWidth, textWidth + waveWidth],
  });

  return (
    <View style={{ position: "relative" }}>
      <Text
        style={[styles.text, style, { color: baseTextColor }]}
        onTextLayout={(e) => {
          const { width, height } = e.nativeEvent.lines[0];
          setTextWidth(width);
          setTextHeight(height);
        }}
      >
        {children}
      </Text>

      {textWidth > 0 && (
        <MaskedView
          style={[
            StyleSheet.absoluteFill,
            {
              width: textWidth,
              height: textHeight || 50,
            },
          ]}
          maskElement={
            <Text style={[styles.text, style, { color: "white" }]}>
              {children}
            </Text>
          }
        >
          <View
            style={{
              width: textWidth,
              height: textHeight || 50,
              backgroundColor: baseTextColor,
              overflow: "hidden",
            }}
          >
            <Animated.View
              style={{
                transform: [{ translateX }],
                width: waveWidth,
                height: textHeight || 50,
              }}
            >
              <LinearGradient
                colors={
                  colors as unknown as readonly [
                    ColorValue,
                    ColorValue,
                    ...ColorValue[],
                  ]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: waveWidth,
                  height: textHeight || 50,
                }}
              />
            </Animated.View>
          </View>
        </MaskedView>
      )}
    </View>
  );
}

AnimatedMaskedTextInner.displayName = "AnimatedMaskedText";

export const AnimatedMaskedText = memo(AnimatedMaskedTextInner);

export default AnimatedMaskedText;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
