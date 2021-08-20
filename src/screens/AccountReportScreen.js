import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import {VictoryPie} from 'victory-native';

import {Svg} from 'react-native-svg';

import {COLORS, FONTS, SIZES, icons} from '../../component';

import DatePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'react-moment';
import moment from 'moment';

let config = require('../../Config');

const AccountReportScreen = () => {
  // dummy data
  const confirmStatus = 'C';
  const pendingStatus = 'P';

  let categoriesData = [
    {
      id: 1,
      name: 'Education',
      //     icon: icons.education,
      color: COLORS.primary,
      expenses: [
        {
          id: 1,
          title: 'Tuition Fee',
          description: 'Tuition fee',
          location: "ByProgrammers' tuition center",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 2,
          title: 'Arduino',
          description: 'Hardward',
          location: "ByProgrammers' tuition center",
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 3,
          title: 'Javascript Books',
          description: 'Javascript books',
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
        {
          id: 4,
          title: 'PHP Books',
          description: 'PHP books',
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 2,
      name: 'Nutrition',
      //icon: icons.food,
      color: COLORS.lightBlue,
      expenses: [
        {
          id: 5,
          title: 'Vitamins',
          description: 'Vitamin',
          location: "ByProgrammers' Pharmacy",
          total: 25.0,
          status: pendingStatus,
        },

        {
          id: 6,
          title: 'Protein powder',
          description: 'Protein',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 3,
      name: 'Child',
      //      icon: icons.baby_car,
      color: COLORS.darkgreen,
      expenses: [
        {
          id: 7,
          title: 'Toys',
          description: 'toys',
          location: "ByProgrammers' Toy Store",
          total: 25.0,
          status: confirmStatus,
        },
        {
          id: 8,
          title: 'Baby Car Seat',
          description: 'Baby Car Seat',
          location: "ByProgrammers' Baby Care Store",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 9,
          title: 'Pampers',
          description: 'Pampers',
          location: "ByProgrammers' Supermarket",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 10,
          title: 'Baby T-Shirt',
          description: 'T-Shirt',
          location: "ByProgrammers' Fashion Store",
          total: 20.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 4,
      name: 'Beauty & Care',
      //icon: icons.healthcare,
      color: COLORS.peach,
      expenses: [
        {
          id: 11,
          title: 'Skin Care product',
          description: 'skin care',
          location: "ByProgrammers' Pharmacy",
          total: 10.0,
          status: pendingStatus,
        },
        {
          id: 12,
          title: 'Lotion',
          description: 'Lotion',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
        {
          id: 13,
          title: 'Face Mask',
          description: 'Face Mask',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
        {
          id: 14,
          title: 'Sunscreen cream',
          description: 'Sunscreen cream',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 5,
      name: 'Sports',
      //      icon: icons.sports_icon,
      color: COLORS.purple,
      expenses: [
        {
          id: 15,
          title: 'Gym Membership',
          description: 'Monthly Fee',
          location: "ByProgrammers' Gym",
          total: 45.0,
          status: pendingStatus,
        },
        {
          id: 16,
          title: 'Gloves',
          description: 'Gym Equipment',
          location: "ByProgrammers' Gym",
          total: 15.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 6,
      name: 'Clothing',
      //       icon: icons.cloth_icon,
      color: COLORS.red,
      expenses: [
        {
          id: 17,
          title: 'T-Shirt',
          description: 'Plain Color T-Shirt',
          location: "ByProgrammers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 18,
          title: 'Jeans',
          description: 'Blue Jeans',
          location: "ByProgrammers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
  ];

  //this function is to retrive the data in selected month, will retrieve the total amount of each categories spent in the selected month.-------
  //each return row has 2 attributes {'total','category_name'}
  const selectAllCategory_inMonth = () => {
    //preprocess the date format----------
    var selectedDate;
    if (this.state.date == 0) selectedDate = new Date();
    else selectedDate = this.state.date; //change the 'this.state.date' to the correct date input, just need to make sure it is number of milliseconds like normal DateTimePicker do.

    var selectedmonth = new Date(selectedDate).getMonth();
    var selectedyear = new Date(selectedDate).getFullYear();
    let monthsText = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var selectedMonthName = monthsText[selectedmonth];

    let nextmonthPointer = monthsText.indexOf(selectedMonthName) + 1; //point to next month
    let nextmonthName = '';

    let selectedMonth_parsed = Date.parse(
      selectedMonthName + ' 1,' + selectedyear,
    ); //(data type: integer)the first day of the selected month in integer format. Ex: 1 Aug 2021 for August 2021, 1 Sept 2021 for September 2021.
    let nextMonth_parsed = ''; //(data type: integer)the first day of the next month in integer format. Ex: 1 Sept 2021 for August 2021, 1 Oct 2021 for 1 September 2021.
    let nextYear = selectedyear;
    if (nextmonthPointer === 12) {
      nextmonthName = monthsText[0];
      nextYear = selectedyear + 1;
      nextMonth_parsed = Date.parse(nextmonthName + ' 1,' + nextYear);
    } else {
      nextmonthName = monthsText[nextmonthPointer];
      nextMonth_parsed = Date.parse(nextmonthName + ' 1,' + nextYear);
    }
    console.log(
      'Viewing Transactions from:' +
        selectedMonthName +
        selectedyear +
        ' to ' +
        nextmonthName +
        nextYear,
    );

    //preprocess the date format----------
    let url =
      config.settings.serverPath +
      '/api/transaction/monthlyReport/' +
      selectedMonth_parsed +
      '/' +
      nextMonth_parsed;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(reportData => {
        this.setState({reportData}); //returned rows of {'total','category_name'}
      })
      .catch(error => {
        console.error(error);
      });
  };
  //---------------------------------------------------------------------------------------------------------------------------------------

  const [categories, setCategories] = React.useState(categoriesData);
  const [viewMode, setViewMode] = React.useState('chart');
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  //date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [chosenDate, setChosenDate] = useState('Choose Month');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setChosenDate(moment(date).format('MMMM,YYYY'));
  };

  function renderHeader() {
    return <View style={{paddingHorizontal: SIZES.padding}}></View>;
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: SIZES.padding,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/icons/calendar_icon.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue,
              }}
            />
          </View>

          <View style={{marginLeft: SIZES.padding}}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={{fontSize: 18}}>{chosenDate}</Text>
              <DatePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Title */}
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h3}}>CATEGORIES</Text>
          <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
            {categories.length} Total
          </Text>
        </View>
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map(item => {
      let confirmExpenses = item.expenses.filter(a => a.status == 'C');
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map(item => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
  }

  function setSelectCategoryByName(name) {
    let category = categories.filter(a => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map(item => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0,
    );

    console.log('Check Chart');
    console.log(chartData);

    {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e8e8e8',
          }}>
          <Svg
            width={SIZES.width}
            height={SIZES.width}
            style={{width: '100%', height: 'auto'}}>
            <VictoryPie
              standalone={false} // Android workaround
              data={chartData}
              labels={datum => `${datum.y}`}
              radius={({datum}) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? SIZES.width * 0.4
                  : SIZES.width * 0.4 - 10
              }
              innerRadius={70}
              labelRadius={({innerRadius}) =>
                (SIZES.width * 0.4 + innerRadius) / 2.5
              }
              style={{
                labels: {fill: 'white', ...FONTS.body3},
                parent: {
                  ...styles.shadow,
                },
              }}
              width={SIZES.width}
              height={SIZES.width}
              colorScale={colorScales}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: 'labels',
                          mutation: props => {
                            let categoryName = chartData[props.index].name;
                            setSelectCategoryByName(categoryName);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
          <View style={{position: 'absolute', top: '42%', left: '42%'}}>
            <Text style={{...FONTS.h1, textAlign: 'center'}}>
              {totalExpenseCount}
            </Text>
            <Text style={{...FONTS.body3, textAlign: 'center'}}>Expenses</Text>
          </View>
        </View>
      );
    }
  }

  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay();

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}>
        {/* Name/Category */}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}>
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}>
            RM{item.y} - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    const getHeader = () => {
      return <Text style={{fontSize: 16}}>{'Category'}</Text>;
    };

    const getFooter = () => {
      return <Text>{''}</Text>;
    };

    return (
      <View style={{padding: SIZES.padding}}>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={getHeader}
            ListFooterComponent={getFooter}
          />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightGray2}}>
      {/* Header section */}
      {renderHeader()}

      {/* Category Header Section */}
      {renderCategoryHeaderSection()}

      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        {viewMode == 'list' && (
          <View>
            {renderCategoryList()}
            {renderIncomingExpenses()}
          </View>
        )}
        {viewMode == 'chart' && (
          <View>
            {renderChart()}
            {renderExpenseSummary()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default AccountReportScreen;
