import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  FlatList,
} from "react-native";
import Dialog from "react-native-dialog";
import { Picker } from "@react-native-picker/picker";
import Header from "../../Header";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
import ResetDatabase from "../../Components/ResetDatabase";
import FormComp from "../../Components/FormComp";
import AddAllStates from "./AddAllStates";
import AddAllCustomers from "./AddAllCustomers";
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default ({ navigation }) => {
  const [customerPV, setcustomerPV] = useState("Select customer");
  const [projectPV, setprojectPV] = useState("Select model");
  const [statePV, setstatePV] = useState("Select state");
  const [districtPV, setdistrictPV] = useState("Select district");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [dataArray, setDataArray] = useState();
  const [customerList, setcustomerList] = useState([]);
  const [projectList, setprojectList] = useState([]);
  const [stateList, setstateList] = useState([]);
  const [districtList, setdistrictList] = useState([]);
  const [customer, setcustomer] = useState();
  const [project, setproject] = useState();
  const [state, setstate] = useState();
  const [district, setdistrict] = useState();
  const [siteAddress, setsiteAddress] = useState();
  const [otherDetails, setotherDetails] = useState();

  const [customerVisible, setcustomerVisible] = useState(false);
  const [projectVisible, setprojectVisible] = useState(false);

  let fileUri = "/xyz123.db";
  const db = SQLite.openDatabase(fileUri);

  // Use Effect to fetch the customers
  useEffect(() => {
    console.log("fatching customers");
    db.transaction(
      (tx) => {
        tx.executeSql("select * from customers", [], (_, { rows }) => {
          setDataArray(rows["_array"]);
          setcustomerList(removeDuplicates(rows["_array"]));
          console.log(removeDuplicates(rows["_array"]));
        });
        tx.executeSql("select * from allstates1", [], (_, { rows }) => {
          setDataArray(rows["_array"]);
          setstateList(removeDuplicatesStates(rows["_array"]));
          console.log(removeDuplicates(rows["_array"]));
        });
      },
      null,
      null
    );
  }, []);

  // to add a new customer
  function addK1Coefficient({ input_value }) {
    let x = customer + project;
    db.transaction(
      (tx) => {
        const values = {
          customer_id: x,
          customer: input_value["customer"],
          project: input_value["project"],
          country: input_value["country"],
          district: input_value["district"],
          siteAddress: input_value["siteAddress"],
          otherDetails: input_value["otherDetails"],
        };
        const len = JSON.stringify(Object.keys(values)).length;
        const sqlFields = JSON.stringify(Object.keys(values)).slice(1, len - 1);
        const sqlValues = Object.values(values);
        console.log(
          `insert or replace into vehicles1 (${sqlFields}) values (?,?,?,?,?,?,?,?,?)`
        );
        console.log(sqlValues);

        tx.executeSql(
          `insert or replace into vehicles1 (${sqlFields}) values (?,?,?,?,?,?,?,?,?)`,
          sqlValues
        );
        tx.executeSql(
          "select * from vehicles1",
          [],
          (_, { rows }) => {
            setDataArray(rows["_array"]);
            console.log(rows["_array"]);
          },
          (err) => console.log(err)
        );
      },
      null,
      null
    );

    setcustomerPV("Select customer");
    setprojectPV("Select project");
    setstate("");
    setdistrict("");
    setsiteAddress("");
    setotherDetails("");
  }

  function fillproject(textValue) {
    console.log("fillproject");
    console.log(textValue);
    setstate("");
    setdistrict("");
    setsiteAddress("");
    setotherDetails("");

    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from customers where customer = '${textValue}';`,
          [],
          (_, { rows }) => {
            setprojectList(rows["_array"]);
            console.log(123);
            console.log(rows["_array"]);
          }
        );
      },
      null,
      null
    );
  }

  function filldistricts(textValue) {
    setstate("");
    setdistrict("");
    setsiteAddress("");
    setotherDetails("");

    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from vehicles1 where state = '${textValue}';`,
          [],
          (_, { rows }) => {
            setdistrictList(rows["_array"]);
          }
        );
      },
      null,
      null
    );
  }

  let input_value = {
    customer: customer,
    project: project,
    state: state,
    district: district,
    siteAddress: siteAddress,
    otherDetails: otherDetails,
  };
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleAddMake = () => {
    customerList.push({
      customer: customer,
      project: projectPV,
    });
    setcustomerVisible(false);
  };
  const handleAddModel = () => {
    console.log(projectPV);
    console.log(customer);
    projectList.push({
      customer: customer,
      project: projectPV,
    });
    console.log(projectList);
    setprojectVisible(false);
  };
  const fillCustomerData = (textValue) => {
    setstate("");
    setdistrict("");
    setsiteAddress("");
    setotherDetails("");

    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from customers where customer = '${customerPV}' and project = '${textValue}' ;`,
          [],
          (_, { rows }) => {
            //setprojectList(rows['_array']);
            console.log(123);
            console.log(rows["_array"]);
            setstate(rows["_array"][0]["state"]);
            setdistrict(rows["_array"][0]["district"]);
            setsiteAddress(rows["_array"][0]["siteAddress"]);
            setotherDetails(rows["_array"][0]["otherDetails"]);
          }
        );
      },
      null,
      null
    );
  };

  const handleCancel = () => {
    setcustomerVisible(false);
    setprojectVisible(false);
  };

  const clearOtherFields = () => {
    setstate("");
    setdistrict("");
    setsiteAddress("");
    setotherDetails("");
  };

  return (
    <View
      style={{
        marginTop: Constants.StatusBarHeight,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 30,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            alignSelf: "center",
            margin: 10,
            color: "darkred",
          }}
        >
          Add Vehicle Details
        </Text>

        <ResetDatabase />
      </View>

      {/* Vehicle Make*/}
      <View style={styles.ltCombo}>
        <Text style={styles.level}>Customer</Text>
        <Picker
          selectedValue={customerPV}
          onValueChange={(textValue, textIndex) => {
            if (textValue === "Add customer") {
              setcustomerVisible(true);
            } else {
              fillproject(textValue);
              setcustomerPV(textValue);
              setcustomer(textValue);
            }
          }}
          mode="dialog"
          style={styles.textInput}
          textStyle={styles.pickerText}
        >
          <Picker.Item label="Select customer" value="Select customer" />
          {customerList.map((person, index) => (
            <Picker.Item label={person.customer} value={person.customer} />
          ))}
          <Picker.Item label="Add new customer" value="Add new customer" />
        </Picker>
      </View>
      <Dialog.Container
        visible={customerVisible}
        onBackdropPress={handleCancel}
      >
        <Dialog.Title>Enter Vehicle Make</Dialog.Title>
        <Dialog.Input
          onChangeText={(text) => {
            setcustomerPV(text);
            setcustomer(text);
          }}
        />
        <Dialog.Button label="Add" onPress={handleAddMake} />
      </Dialog.Container>
      {/* Vehicle Model*/}
      <View style={styles.ltCombo}>
        <Text style={styles.level}>Project</Text>
        <Picker
          selectedValue={projectPV}
          onValueChange={(textValue, textIndex) => {
            if (textValue === "Add new project") {
              setprojectVisible(true);
            } else {
              setprojectPV(textValue);
              setproject(textValue);
              fillCustomerData(textValue);
            }
          }}
          mode="dialog"
          style={styles.textInput}
          textStyle={styles.pickerText}
        >
          <Picker.Item label="Select project" value="Select project" />
          {projectList.map((person, index) => (
            <Picker.Item label={person.project} value={person.project} />
          ))}
          <Picker.Item label="Add new project" value="Add new project" />
        </Picker>
      </View>
      <Dialog.Container visible={projectVisible} onBackdropPress={handleCancel}>
        <Dialog.Title>Enter Vehicle Model</Dialog.Title>
        <Dialog.Input
          onChangeText={(text) => {
            setprojectPV(text);
            setproject(text);
          }}
        />
        <Dialog.Button label="Add" onPress={handleAddModel} />
      </Dialog.Container>

      {/* State*/}
      <View style={styles.ltCombo}>
        <Text style={styles.level}>State</Text>
        <Picker
          selectedValue={statePV}
          onValueChange={(textValue, textIndex) => {
            if (textValue === "Select state") {
            } else {
              setstatePV(textValue);
              setstate(textValue);
              fillDistrictData(textValue);
            }
          }}
          mode="dialog"
          style={styles.textInput}
          textStyle={styles.pickerText}
        >
          <Picker.Item label="Select state" value="Select state" />
          {stateList.map((person, index) => (
            <Picker.Item label={person.state} value={person.state} />
          ))}
        </Picker>
      </View>

      {/* District*/}
      <View style={styles.ltCombo}>
        <Text style={styles.level}>Vehicle Model</Text>
        <Picker
          selectedValue={districtPV}
          onValueChange={(textValue, textIndex) => {
            if (textValue === "Select District") {
            } else {
              setdistrictPV(textValue);
              setdistrict(textValue);
            }
          }}
          mode="dialog"
          style={styles.textInput}
          textStyle={styles.pickerText}
        >
          <Picker.Item label="Select district" value="Select district" />
          {projectList.map((person, index) => (
            <Picker.Item label={person.district} value={person.district} />
          ))}
        </Picker>
      </View>

      <FormComp
        value={siteAddress}
        level={"Site Address"}
        placeholder={"Enter Site Address"}
        method={setsiteAddress}
      />
      <FormComp
        value={otherDetails}
        level={"Other Details"}
        placeholder={"If Any"}
        method={setotherDetails}
      />

      <Button
        title="Save Vehicle Details"
        color="darkblue"
        onPress={() => {
          if (customerPV === "Select make" || projectPV === "Select model") {
            alert("Please enter vehicle name");
            console.log("Please fill required fields");
          } else {
            console.log(123);
            console.log(JSON.stringify(input_value));

            addK1Coefficient({ input_value });
          }
        }}
      />
      <AddAllCustomers />
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  ltCombo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#d9d9d9",
  },

  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    width: "49%",
    backgroundColor: "black",
    borderRadius: 5,
    fontSize: 15,
    paddingLeft: 5,
    color: "yellow",
  },
  level: {
    height: 50,
    width: "50%",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});

//function to remove duplicates from the object of an array.
function removeDuplicates(books) {
  console.log(books);
  let newArray = [];
  let uniqueObject = {};
  for (let i in books) {
    let objTitle = books[i]["customer"];
    uniqueObject[objTitle] = books[i];
  }
  for (let j in uniqueObject) {
    newArray.push(uniqueObject[j]);
  }
  console.log(newArray);
  return newArray;
}

function removeDuplicatesStates(books) {
  console.log(books);
  let newArray = [];
  let uniqueObject = {};
  for (let i in books) {
    let objTitle = books[i]["district"];
    uniqueObject[objTitle] = books[i];
  }
  for (let j in uniqueObject) {
    newArray.push(uniqueObject[j]);
  }
  console.log(newArray);
  return newArray;
}
