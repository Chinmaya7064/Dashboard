  import { configureStore } from "@reduxjs/toolkit";
  import widgetReducer from "./WidgetSlice";  

  const Store = configureStore({
    reducer: {
      widgets: widgetReducer,
    },
  });

  export default Store;
