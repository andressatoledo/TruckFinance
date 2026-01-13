import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  filterBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },

  filter: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E9E62',
    color: '#1E9E62',
  },

  filterActive: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#1E9E62',
    color: '#FFF',
  },

  periodTitle: {
    fontSize: 12,
    color: '#1E9E62',
    marginTop: 8,
  },

  periodMonth: {
    fontSize: 16,
    fontWeight: '600',
  },

  periodRange: {
    fontSize: 12,
    color: '#777',
  }
});
