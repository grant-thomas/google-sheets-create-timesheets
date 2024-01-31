function copyGoogleSheetsTemplate() {
  // THIS SCRIPT MAKES A COPY OF A BLANK TIMESHEET TEMPLATE FOR EACH EMPLOYEE IN THE EMPLOYEE NAMES LIST
  // RUNS EVERY MONDAY AT 1AM

  // HOW IT WORKS:
  // THIS SCRIPT MAKES A COPY OF A BLANK TIMESHEET TEMPLATE,
  // THEN ADDS TODAY'S DATE THROUGH 6 DAYS FROM NOW (MONDAY - SUNDAY),
  // THEN LOOPS THROUGH THE EMPLOYEE LIST AND ADDS EACH NAME AND UPDATED DATES TO THE TITLE, NAME CELL, AND DATES CELLS,
  // THEN ADDS EACH EMPLOYEE'S PAYRATE TO THE FORMULA IN THE CELL THAT CALCULATES THE TOTAL PAY FOR THE WEEK,
  // THEN THE TIMESHEET IS SHARED WITH EACH EMPLOYEE AND THEY ARE GIVEN EDIT PRIVILEDGES AND NOTIFIED VIA EMAIL.

  var companyEmail = '@iconstudiobr.com';

  var employeeList = [
    { name: 'employee1', payRate: 35 },
    { name: 'employee2', payRate: 40 }
  ];
 
  // Sheet IDs are found in the url after "/d/", see images below
  // Hard coded ID from timesheet template file in Google Drive /root
  var templateID = '1t8XJ6NjYqAzgZxHfodwh66yBz-pZsSCrx0znb1ArjgU';

  var templateSheet = SpreadsheetApp.openById(templateID);

  // Get current date
  var date_begin = new Date();
  date_begin.setDate(date_begin.getDate());
  date_begin = Utilities.formatDate(date_begin, "CST-6", "MM/dd/yy");

  // Get date 6 days from today
  var date_end = new Date();
  date_end.setDate(date_end.getDate()+6);
  date_end = Utilities.formatDate(date_end, "CST-6", "MM/dd/yy");

  // Loop through list of employees to make a copy of the template sheet for each employee
  for (var i in employeeList) {  

    // Make a copy of the template sheet and add each emplpoyee's name and dates to the title of the new sheet
    var newSheet = DriveApp.getFileById(templateSheet.getId()).
    makeCopy(employeeList[i].name.toString() + " Timesheet " + date_begin + " - " + date_end);

    // Get the ID of the newly created sheet
    var newID = newSheet.getId();

    // Add each employee's name to the name cell "C8" in the new sheet
    var name_cell = SpreadsheetApp.openById(newID).getRange("C8"); 
    name_cell.setValue(employeeList[i].name.toString());

    // Add the dates to the dates cells "B10:J10" in the new sheet
    var date_cell = SpreadsheetApp.openById(newID).getRange("B10:J10"); 
    date_cell.setValue("WEEK OF " + date_begin + " - " + date_end);

    // Add each employee's pay rate to the pay calculation cell "G29" in the new sheet
    var pay_cell = SpreadsheetApp.openById(newID).getRange("G29"); 
    pay_cell.setValue("=sum(G26:G28)+F29*" + employeeList[i].payRate);

    // Share the new timesheet with the employee and give them edit priviledges via their email
    newSheet.addEditor(employeeList[i].name.split(' ')[0].toLowerCase().toString() + companyEmail);
  }
}
