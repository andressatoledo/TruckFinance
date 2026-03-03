import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import { useStyles } from './styles';
import { Row } from '../Form/Row';
import { ConfirmDialog } from '../../components/Feedback/ConfirmDialog';
import { ConfirmDialogProps } from '../../components/Feedback/ConfirmDialog';
import { InputField } from '../Form/InputField';

interface Column<T> {
  key: keyof T;
  label: string;
  keyboardType?: 'numeric' | 'default';
}

interface EditableGridProps<T> {
  data: T[];
  columns: Column<T>[];
  onSave: (item: T, index: number) => boolean;
  onDelete: (id: string) => void;
  ConfirmProps?: ConfirmDialogProps;
  autoEditIndex?: number | null;
  errors?: Record<number, Record<string, string>>;
  onEditingChange?: (isEditing: boolean) => void;
}

export function Grid<T>({
  data,
  columns,
  onSave,
  onDelete,
  ConfirmProps,
  autoEditIndex,
  errors,
  onEditingChange,
}: EditableGridProps<T>) {
  const { theme } = useTheme();
  const styleGrid = useStyles(theme);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempData, setTempData] = useState<T | null>(null);

  // 🔹 informa tela se está editando
  useEffect(() => {
  onEditingChange?.(editingIndex !== null);
}, [editingIndex, onEditingChange]);
  // 🔹 auto edit quando adicionar linha
  useEffect(() => {
    if (
      autoEditIndex !== null &&
      autoEditIndex !== undefined &&
      data[autoEditIndex]
    ) {
      setEditingIndex(autoEditIndex);
      setTempData({ ...data[autoEditIndex] });
    }
  }, [autoEditIndex, data]);

  const handleEdit = (index: number) => {
    if (editingIndex !== null) return; // bloqueia múltiplas edições
    setEditingIndex(index);
    setTempData({ ...data[index] });
  };

  const handleCancel = () => {
    if (editingIndex === null) return;

    const currentItem = data[editingIndex] as any;

    /**
     * Se for uma linha recém adicionada
     * (valores zerados e ainda não persistidos),
     * remove ao cancelar
     */
    const isNewLine =
      currentItem?.pedagioValorNumeroEixos === 0 &&
      currentItem?.pedagioValorPedagio === 0;

    if (isNewLine && currentItem?._id) {
      onDelete(currentItem._id);
    }

    setEditingIndex(null);
    setTempData(null);
  };

  const handleSave = () => {
    if (!tempData || editingIndex === null) return;

    const success = onSave(tempData, editingIndex);

    if (success) {
      setEditingIndex(null);
      setTempData(null);
    }
  };

  return (
    <View style={styleGrid.container}>
      {data.map((item, index) => {
        const isEditing = editingIndex === index;
        const id = (item as any)._id;

        if (!id) return null;
        console.log('tempData', tempData);

        return (
          <View key={id} style={styleGrid.card}>
            <Row>
              {columns.map(col => (
                <View key={String(col.key)} style={{ flex: 1 }}>
                  {isEditing ? (
                    <InputField
                      label={col.label}
                      value={String(tempData?.[col.key] ?? '')}
                      keyboardType={col.keyboardType}
                      onChangeText={val =>
                        setTempData(prev => ({
                          ...prev!,
                          [col.key]: val,
                        }))
                      }
                      error={errors?.[index]?.[String(col.key)]}
                    />
                  ) : (
                    <>
                      <Text style={styleGrid.label}>{col.label}</Text>
                      <Text style={styleGrid.value}>
                        {item[col.key] != null
                          ? String(item[col.key])
                          : ''}
                      </Text>
                    </>
                  )}
                </View>
              ))}
            </Row>

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
                      if (editingIndex !== null) return; // bloqueia delete

                      if (ConfirmProps) {
                        setSelectedId(id);
                        setConfirmVisible(true);
                      } else {
                        onDelete(id);
                      }
                    }}
                  >
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styleGrid.editBtn}
                    onPress={() => handleEdit(index)}
                  >
                    <MaterialCommunityIcons
                      name="square-edit-outline"
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

      {ConfirmProps && (
        <ConfirmDialog
          {...ConfirmProps}
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
