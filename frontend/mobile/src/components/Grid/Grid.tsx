import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import { useStyles } from './styles';
import { Row } from '../Form/Row';
import { ConfirmDialog } from '../../components/Feedback/ConfirmDialog';
import { ConfirmDialogProps } from '../../components/Feedback/ConfirmDialog';

interface Column<T> {
  key: keyof T;
  label: string;
  keyboardType?: 'numeric' | 'default';
}

interface EditableGridProps<T> {
  data: T[];
  columns: Column<T>[];
  onSave: (item: T, index: number) => void;
  onDelete: (id: string) => void;
  ConfirmDialogProps?: ConfirmDialogProps;
}

export function Grid<T>({
  data,
  columns,
  onSave,
  onDelete,
  ConfirmDialogProps,
}: EditableGridProps<T>) {
  const { theme } = useTheme();
  const styleGrid = useStyles(theme);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempData, setTempData] = useState<T | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempData({ ...data[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempData(null);
  };

  const handleSave = () => {
    if (tempData && editingIndex !== null) {
      onSave(tempData, editingIndex);
      setEditingIndex(null);
    }
  };

  return (
    <View style={styleGrid.container}>
      {data.map((item, index) => {
        const isEditing = editingIndex === index;

        return (
          <View key={(item as any)._id} style={styleGrid.card}>
            <Row>
              {columns.map(col => (
                <View
                  key={String(col.key)}
                  style={[styleGrid.field, { flex: 1 }]}
                >
                  <Text style={styleGrid.label}>{col.label}</Text>

                  {isEditing ? (
                    <TextInput
                      style={styleGrid.input}
                      value={String(tempData?.[col.key] ?? '')}
                      keyboardType={col.keyboardType}
                      onChangeText={val =>
                        setTempData(prev => ({ ...prev!, [col.key]: val }))
                      }
                    />
                  ) : (
                    <Text style={styleGrid.value}>
                      {item[col.key] != null ? String(item[col.key]) : ''}
                    </Text>
                  )}
                </View>
              ))}
            </Row>

            {/* Ações */}
            <View style={styleGrid.actions}>
              {isEditing ? (
                <>
                  <TouchableOpacity
                    style={styleGrid.cancelBtn}
                    onPress={handleCancel}
                  >
                    <Text style={styleGrid.actionText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styleGrid.saveBtn}
                    onPress={handleSave}
                  >
                    <Text style={styleGrid.actionText}>Salvar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styleGrid.deleteBtn}
                    onPress={() => {
                      const id = (item as any)._id;

                      if (ConfirmDialogProps) {
                        setSelectedId(id);
                        setConfirmVisible(true);
                      } else {
                        onDelete(id);
                      }
                    }}
                  >
                    <MaterialCommunityIcons
                      name={'trash-can'}
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styleGrid.editBtn}
                    onPress={() => handleEdit(index)}
                  >
                    <MaterialCommunityIcons
                      name={'square-edit-outline'}
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        );
      })}
      {ConfirmDialogProps && (
        <ConfirmDialog
          {...ConfirmDialogProps}
          visible={confirmVisible}
          onCancel={() => {
            setConfirmVisible(false);
            setSelectedId(null);
          }}
          onConfirm={() => {
            if (selectedId) {
              onDelete(selectedId);
            }
            setConfirmVisible(false);
            setSelectedId(null);
          }}
        />
      )}
    </View>
  );
}
