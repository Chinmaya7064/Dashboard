import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddWidgetPanel from "./AddWidgetPanel";
import { removeWidget } from "../redux/WidgetSlice";
import { Chart } from "react-google-charts";
import { Grid, Card, CardContent, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./Dashboard.css";
import Navbar from "./Navbar"

const Dashboard = () => {
  const dispatch = useDispatch();
  const selectedWidgets = useSelector((state) => state.widgets.selectedWidgets);
  const allWidgets = useSelector((state) => state.widgets.allWidgets);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const handleRemoveWidget = (widgetId) => {
    dispatch(removeWidget(widgetId));
  };

  const openAddWidgetPanel = () => {
    setIsPanelOpen(true);
  };

  const closeAddWidgetPanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
      <Typography variant="h6" gutterBottom>
        <strong>CNAPP Dashboards</strong>
      </Typography>

      {/* CSPM Executive Dashboard */}
      <div className="dashboard-section">
        <Typography variant="h7" gutterBottom>
          <strong>CSPM Executive Dashboard</strong>
        </Typography>
        <Grid container spacing={1} className="widgets-container">
          {Object.values(allWidgets).map(
            (widget) =>
              widget.category === "CSPM" &&
              selectedWidgets[widget.id] && (
                <Grid item xs={12} sm={6} md={4} key={widget.id}>
                  <Card className="widget" sx={[{height: 30 + "vh"}, {minWidth: 50 + "vh"}]}>
                    <CardContent>
                      <IconButton
                        className="close-btn"
                        onClick={() => handleRemoveWidget(widget.id)}
                        style={{ position: 'absolute', top: 1, right: 1 }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h8">{widget.name}</Typography>
                      <Typography variant="body2">{widget.content}</Typography>
                      {widget.chartData && widget.chartOptions && (
                        <Chart className="chart"
                          chartType="PieChart"
                          width="58vh"
                          height="150px"
                          data={widget.chartData}
                          options={widget.chartOptions}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )
          )}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="widget" sx={[{height: 30 + "vh"}, {minWidth: 50 + "vh"}]}>
              <CardContent>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={openAddWidgetPanel}
                  className="add-widget-btn"
                >
                  + Add Widget
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* CWPP Dashboard */}
      <div className="dashboard-section">
        <Typography variant="h7" gutterBottom>
          <strong>CWPP Dashboard</strong>
        </Typography>
        <Grid container spacing={2} className="widgets-container">
          {Object.values(allWidgets).map(
            (widget) =>
              widget.category === "CWPP" &&
              selectedWidgets[widget.id] && (
                <Grid item xs={12} sm={6} md={4} key={widget.id}>
                  <Card className="widget" sx={[{height: 30 + "vh"}, {minWidth: 50 + "vh"}]}>
                    <CardContent>
                      <IconButton
                        className="close-btn"
                        onClick={() => handleRemoveWidget(widget.id)}
                        style={{ position: 'absolute', top: 1, right: 1 }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h8">{widget.name}</Typography>
                      <Typography variant="body2" margin={7}>{widget.content}</Typography>
                      {/* Add charts or other content as needed */}
                    </CardContent>
                  </Card>
                </Grid>
              )
          )}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="widget" sx={[{height: 30 + "vh"}, {minWidth: 50 + "vh"}]}>
              <CardContent>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={openAddWidgetPanel}  
                  className="add-widget-btn"
                >
                  + Add Widget
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {isPanelOpen && <AddWidgetPanel onClose={closeAddWidgetPanel} />}
    </div>
    </div>
  );
};

export default Dashboard;
