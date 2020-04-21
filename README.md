# react-native-woodpicker

Customisable picker and datePicker react-native components for Android and iOS.

## Preview

<img src="https://raw.githubusercontent.com/thodubois/react-native-woodpicker/master/assets/exampleApp.gif" alt='Preview' />
<img src="https://raw.githubusercontent.com/thodubois/react-native-woodpicker/master/assets/exampleApp-android.gif" alt='Preview-Android' />

## Installation

```bash
yarn install react-native-woodpicker
yarn add @react-native-community/datetimepicker
yarn add @react-native-community/picker
```

or

```bash
npm install react-native-woodpicker --save
npm install @react-native-community/datetimepicker --save
npm install @react-native-community/picker --save
```

## Version

### 0.1.0

New Version 0.1.0 integrate new React-Native component **DateTimePicker** from `@react-native-community/datetimepicker` and **Hooks**.
Don't forget to add it to your project.

### 0.2.0

New Version 0.2.0 integrate new React-Native component **Picker** from `@react-native-community/picker`.

## Contribution

Thanks to everyone for your contribution!
I try my best to review and update this repository.
PR and feedback are welcomed!

## Usage

### Picker

You can use Picker to pick values/objects.

```jsx
import { Picker } from 'react-native-woodpicker'

[...]

class ExampleApp extends Component {
  state = {
    pickedData: null
  };

  data = [
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 }
  ];

  handlePicker = data => {
    this.setState({ pickedData: data });
  };

  render() {
    return (
      <View>
        <Picker
          onItemChange={this.handlePicker}
          items={this.data}
          title="Data Picker"
          placeholder="Select Data"
          item={this.state.pickedData}
          //androidPickerMode="dropdown"
          //isNullable
          //disable
        />
      </View>
    );
  }
}
```

### DatePicker

You can use DatePicker to pick Dates.
Unlike the Picker, you need to handle the placeholder.

```jsx
import { DatePicker } from 'react-native-woodpicker'

[...]

class ExampleApp extends Component {
  state = {
    pickedDate: null
  };

  handlePicker = data => {
    this.setState({ pickedData: data });
  };

  handlePlaceholder = () =>
    this.state.pickedDate
      ? this.state.pickedDate.toDateString()
      : "No value Selected";

  render() {
    return (
      <View>
        <DatePicker
          onDateChange={this.handleDatePicker}
          value={this.state.pickedDate}
          title="Date Picker"
          placeholder={this.handlePlaceholder()}
          //iosPickerMode="date"
          //androidPickerMode="spinner"
          //locale="fr"
          //isNullable
          //disable
        />
      </View>
    );
  }
}
```

## Props

### General

| Name                 | type     | Required | Description                                                    |
| -------------------- | -------- | -------- | -------------------------------------------------------------- |
| **title**            | string   | false    | Configure the picker title (not the placeholder)               |
| **placeholder**      | string   | false    | Configure the placeholder when no value is selected            |
| **style**            | StyleObj | false    | Configure the input style (View)                               |
| **containerStyle**   | StyleObj | false    | Configure the input container style (View)                     |
| **placeholderStyle** | StyleObj | false    | Configure the placeholder style (Text)                         |
| **disabled**         | boolean  | false    | Disable the input                                              |
| **isNullable**       | boolean  | false    | Picker : Add null value on items, DatePicker: add reset button |
| **InputComponent**   | Node     | false    | Component to replace input.                                    |
| **DoneBarComponent** | Node     | false    | Component to replace iOS Picker Done Bar                       |
| **onOpen**           | function | false    | Triggered when the picker is opening                           |
| **onClose**          | function | false    | Triggered when the picker is closing                           |

### Picker specific

| Name                  | type                                        | Required | Description                                         |
| --------------------- | ------------------------------------------- | -------- | --------------------------------------------------- |
| **item**              | { label: string, value: any }               | true     | Configure the picker title (not the placeholder)    |
| **onItemChange**      | (item: { label: string, value: any }) => {} | true     | Configure the placeholder when no value is selected |
| **items**             | Array<{ label: string, value: any }>        | true     | Configure the input style (View)                    |
| **androidPickerMode** | "dialog" or "dropdown"                      | false    | Configure the input container style (View)          |

### DatePicker specific

| Name                  | type                                                                                                                                                                | Required | Description                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------- |
| **date**              | Date                                                                                                                                                                | true     | Configure the picker title (not the placeholder)    |
| **onDateChange**      | (date: ?Date) => {}                                                                                                                                                 | true     | Configure the placeholder when no value is selected |
| **locale**            | "string" ([Locale IDs](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html)) | false    | Change the iOS picker locale                        |
| **iosPickerMode**     | "date" or "time" or "datetime"                                                                                                                                      | false    | Change the iOS picker interface                     |
| **androidPickerMode** | "calendar" or "spinner" or "default"                                                                                                                                | false    | Change the Android picker interface                 |
| **minDate**           | Date                                                                                                                                                                | false    | Restrict date selection with a minimum date         |
| **maxDate**           | Date                                                                                                                                                                | false    | Restrict date selection with a minimum date         |

### ItemComponent specific

| Name                 | type       | Description                                                           |
| -------------------- | ---------- | --------------------------------------------------------------------- |
| **resetValue**       | () => null | Reset value to null if nullable (DatePicker only)                     |
| **togglePicker**     | () => null | Close Picker (iOS only)                                               |
| **placeholder**      | String     | Placeholder recieve from the current element                          |
| **placeholderStyle** | StyleObj   | placeholderStyle props configured in the picker component             |
| **isNullable**       | boolean    | isNullable props configured in the picker component (DatePicker only) |

### DoneBar Picker specific (iOS only)

| Name            | type       | Description                                       |
| --------------- | ---------- | ------------------------------------------------- |
| **title**       | string     | title props configured in the picker component    |
| **doneText**    | string     | doneText props configured in the picker component |
| **onDonePress** | () => null | Close the picker and trigger onChange             |
