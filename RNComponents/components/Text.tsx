import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { SpacingProps } from "./Box";
import { PropsWithChildren, useMemo } from "react";
import useStyles from "../hooks/useStyles";

type TextProps = {
  color?: string;
} & SpacingProps &
  RNTextProps;

export default function Text(props: PropsWithChildren<TextProps>) {
  const { color } = props;
  const { colors } = useStyles();

  const styles = useMemo(() => {
    return StyleSheet.create({
      style: {
        color: color || colors.text,
      },
    });
  }, [colors.isDark]);

  return (
    <RNText {...props} style={[styles.style, props.style]}>
      {props.children}
    </RNText>
  );
}
