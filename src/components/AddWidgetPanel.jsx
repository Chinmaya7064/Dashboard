import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWidget, confirmSelection } from '../redux/widgetSlice';
import './AddWidgetPanel.css';
import { Button } from '@mui/material';
import { WidthFull } from '@mui/icons-material';

const AddWidgetPanel = ({ onClose }) => {
  const dispatch = useDispatch();
  const allWidgets = useSelector((state) => state.widgets.allWidgets);
  const selectedWidgets = useSelector((state) => state.widgets.selectedWidgets);

  const [activeTab, setActiveTab] = useState('CSPM');

  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
  };

  const handleWidgetToggle = (widgetId) => {
    dispatch(toggleWidget(widgetId));
  };

  const handleConfirm = () => {
    dispatch(confirmSelection());
    onClose();
  };

  const filteredWidgets = Object.values(allWidgets).filter(widget => widget.category === activeTab);

  return (
    <div className="add-widget-panel">
      <p>Personalise your dashboard by adding the following widget</p>
      <div className="tabs">
        <Button className={activeTab === 'CSPM' ? 'active' : ''} onClick={() => handleTabSwitch('CSPM')} >CSPM</Button>
        <Button className={activeTab === 'CWPP' ? 'active' : ''} onClick={() => handleTabSwitch('CWPP')}>CWPP</Button>
        <Button className={activeTab === 'Image' ? 'active' : ''} onClick={() => handleTabSwitch('Image')}>Image</Button>
        <Button className={activeTab === 'Ticket' ? 'active' : ''} onClick={() => handleTabSwitch('Ticket')}>Ticket</Button>
      </div>
      <div className="widget-list">
        {filteredWidgets.map((widget) => (
          <div key={widget.id} className="widget-item">
            <input
              type="checkbox"
              checked={!!selectedWidgets[widget.id]}
              onChange={() => handleWidgetToggle(widget.id)}
            />
            {widget.name}
          </div>
        ))}
      </div>
      <div className="actions">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
    </div>
  );
};

export default AddWidgetPanel;
