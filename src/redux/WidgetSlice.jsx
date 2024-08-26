import { createSlice } from '@reduxjs/toolkit';

// Helper functions for local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('selectedWidgets');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('selectedWidgets', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const initialState = {
  allWidgets: {
    'widget-1': {
      id: 'widget-1',
      name: 'Cloud Accounts',
      // content: 'Some content...',
      category: 'CSPM',
      chartData: [
        ['Status', 'Count'],
        ['Connected', 2],
        ['Not Connected', 2]
      ],
      chartOptions: {
        // title: 'Cloud Accounts',
        pieHole: 0.4,
        is3D: false,
        slices: {
          0: { color: '#4285F4' }, // Blue for Connected
          1: { color: '#E0E0E0' }, // Grey for Not Connected
        },
        legend: { position: 'right' },
      }
    },
    'widget-2': {
      id: 'widget-2',
      name: 'Cloud Account Risk Assessment',
      // content: 'Some content...',
      category: 'CSPM',
      chartData: [
        ['Status', 'Count'],
        ['Failed', 1689],
        ['Warning', 681],
        ['Not Available', 136],
        ['Passed', 7253]
      ],
      chartOptions: {
        // title: 'Cloud Account Risk Assessment',
        pieHole: 0.4,
        is3D: false,
        slices: {
          0: { color: '#DB4437' }, // Red for Failed
          1: { color: '#F4B400' }, // Yellow for Warning
          2: { color: '#CCCCCC' }, // Grey for Not Available
          3: { color: '#0F9D58' }, // Green for Passed
        },
        legend: { position: 'right' },
      }
    },
    
    'widget-3': { id: 'widget-3', name: 'Top 5 Namespace Specific Alerts', content: 'No graph data available!', category: 'CWPP', hasChart: true },
    'widget-4': { id: 'widget-4', name: 'Workload Alerts', content: 'No graph data available!', category: 'CWPP' },
  },
  selectedWidgets: loadStateFromLocalStorage() || {
    'widget-1': true,
    'widget-2': true,
  },
};


const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleWidget: (state, action) => {
      const widgetId = action.payload;
      state.selectedWidgets[widgetId] = !state.selectedWidgets[widgetId];
      saveStateToLocalStorage(state.selectedWidgets);
    },
    removeWidget: (state, action) => {
      const widgetId = action.payload;
      state.selectedWidgets[widgetId] = false;
      saveStateToLocalStorage(state.selectedWidgets);
    },
    confirmSelection: (state) => {
      saveStateToLocalStorage(state.selectedWidgets);
    },
  },
});

export const { toggleWidget, removeWidget, confirmSelection } = widgetSlice.actions;
export default widgetSlice.reducer;
