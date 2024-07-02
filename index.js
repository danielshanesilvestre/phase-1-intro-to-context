
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(record, date) {
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date.substring(11, 13)) * 100,
    date: date.substring(0, 10),
  });
  return record;
}

function createTimeOutEvent(record, date) {
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(date.substring(11, 13)) * 100,
    date: date.substring(0, 10),
  });
  return record;
}

function hoursWorkedOnDate(record, date) {
  let time_in = record.timeInEvents.find(event => {
    return event.date === date;
  });
  let time_out = record.timeOutEvents.find(event => {
    return event.date === date;
  });

  return (time_out.hour - time_in.hour) / 100;
}

function wagesEarnedOnDate(record, data) {
  return hoursWorkedOnDate(record, data) * record.payPerHour;
}

function allWagesFor(record) {
  return record.timeInEvents.reduce((accumulator, event) => {
    return accumulator + wagesEarnedOnDate(record, event.date);
  }, 0);
}

function calculatePayroll(records) {
  return records.reduce((accumulator, record) => {
    return accumulator + allWagesFor(record);
  }, 0)
}