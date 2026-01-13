import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F9F8',
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },

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
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  date: {
    fontSize: 12,
    color: '#777',
  },

  route: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 8,
  },

  valuesRow: {
    flexDirection: 'row',
    gap: 8,
  },

  box: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EEF3F0',
    alignItems: 'center',
  },

  green: {
    backgroundColor: '#EAF7F1',
  },

  yellow: {
    backgroundColor: '#FFF6E5',
  },

  label: {
    fontSize: 12,
    color: '#555',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
  },
});
