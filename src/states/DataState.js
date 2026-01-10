import secureLocalStorage from "react-secure-storage";
var DataState = {
  preload() {},

  create() {


    function saveData(key, data) {
      if (key && data !== undefined) {
        if (key === "Todays_Customers") {
            //console.log("~~~Saving Todays_Customers:", data);
          } else {
            //console.log(`~~~Saving ${key}:`, data);
          }
        if(Array.isArray(data)){
          
          secureLocalStorage.setItem(key, JSON.stringify(data));
        } else {
          secureLocalStorage.setItem(key, data);
        }
      }
    }
     this.registry.events.on("changedata", function (parent, key, data) {
      saveData(key, data);
    });
    this.registry.events.on("setdata", function (parent, key, data) {
      saveData(key, data);
    });
  },

  update() {
  },
};

export default DataState;
