import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = (): ViewStyle => {
    let buttonStyle: ViewStyle = {
      ...styles.button,
      ...styles[size],
    };

    if (variant === 'primary') {
      buttonStyle = { ...buttonStyle, ...styles.primary };
    } else if (variant === 'secondary') {
      buttonStyle = { ...buttonStyle, ...styles.secondary };
    } else if (variant === 'outline') {
      buttonStyle = { ...buttonStyle, ...styles.outline };
    } else if (variant === 'danger') {
      buttonStyle = { ...buttonStyle, ...styles.danger };
    }

    if (disabled) {
      buttonStyle = { ...buttonStyle, ...styles.disabled };
    }

    return buttonStyle;
  };

  const getTextStyle = (): TextStyle => {
    let textStyleObj: TextStyle = {
      ...styles.text,
      ...styles[`${size}Text`],
    };

    if (variant === 'primary') {
      textStyleObj = { ...textStyleObj, ...styles.primaryText };
    } else if (variant === 'secondary') {
      textStyleObj = { ...textStyleObj, ...styles.secondaryText };
    } else if (variant === 'outline') {
      textStyleObj = { ...textStyleObj, ...styles.outlineText };
    } else if (variant === 'danger') {
      textStyleObj = { ...textStyleObj, ...styles.dangerText };
    }

    if (disabled) {
      textStyleObj = { ...textStyleObj, ...styles.disabledText };
    }

    return textStyleObj;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? Colors.primary : Colors.white}
          size="small"
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 44,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 52,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  disabled: {
    backgroundColor: Colors.gray300,
    borderColor: Colors.gray300,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  dangerText: {
    color: Colors.white,
  },
  disabledText: {
    color: Colors.gray500,
  },
});

export default Button;
