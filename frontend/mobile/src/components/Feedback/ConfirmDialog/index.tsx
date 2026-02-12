import React from 'react';
import {
View,
Text,
Modal,
TouchableOpacity,
Pressable,
ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../../theme/themeContext';
import {styles} from './styles'
export interface ConfirmDialogProps {
visible?: boolean;
title?: string;
description?: string;
confirmText?: string;
cancelText?: string;
loading?: boolean;
onConfirm?: () => void;
onCancel?: () => void;
danger?: boolean; 
}

export function ConfirmDialog({
visible,
title = 'Confirmar ação',
description,
confirmText = 'Confirmar',
cancelText = 'Cancelar',
loading = false,
onConfirm,
onCancel,
danger = false
}: ConfirmDialogProps) {
const { theme } = useTheme();
const styleConfirmDialog = styles(theme,danger);

return (
  <Modal transparent visible={!!visible} animationType="fade">
    <Pressable
      style={styleConfirmDialog.overlay}
      onPress={() => onCancel?.()}
    >
      <Pressable
        style={styleConfirmDialog.container}
        onPress={() => {}}
      >
        <Text style={styleConfirmDialog.title}>{title}</Text>

        {description ? (
          <Text style={styleConfirmDialog.description}>
            {description}
          </Text>
        ) : null}

        <View style={styleConfirmDialog.actions}>
          <TouchableOpacity
            style={styleConfirmDialog.cancelBtn}
            onPress={() => onCancel?.()}
            disabled={loading}
          >
            <Text style={styleConfirmDialog.cancelText}>
              {cancelText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styleConfirmDialog.confirmBtn}
            onPress={() => onConfirm?.()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styleConfirmDialog.confirmText}>
                {confirmText}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

}
