Google Sheets (ICON Timesheets Create)

function copyGoogleSheetsTemplate() {
  // THIS SCRIPT MAKES A COPY OF A BLANK TIMESHEET TEMPLATE FOR EACH EMPLOYEE IN THE EMPLOYEE NAMES LIST
  // RUNS EVERY MONDAY AT 1AM

  // HOW IT WORKS:
  // THIS SCRIPT MAKES A COPY OF A BLANK TIMESHEET TEMPLATE,
  // THEN ADDS TODAY'S DATE THROUGH 6 DAYS FROM NOW (MONDAY - SUNDAY),
  // THEN LOOPS THROUGH THE EMPLOYEE NAMES LIST AND ADDS EACH NAME AND DATES TO THE TITLE, NAME CELL, AND DATES CELLS,
  // THEN THE TIMESHEET IS SHARED WITH EACH EMPLOYEE AND THEY ARE GIVEN EDIT PRIVILEDGES VIA THEIR EMAIL

  var employee_names = ['Toren Spears']
  var employee_emails = ['toren@iconstudiobr.com']
 
  // Sheet IDs are found in the url after "/d/", see images below
  // Hard coded ID from timesheet template file in Google Drive /root
  var templateID = '1t8XJ6NjYqAzgZxHfodwh66yBz-pZsSCrx0znb1ArjgU';

  var templateSheet = SpreadsheetApp.openById(templateID);

  // Get current date
  var date_begin = new Date();
  date_begin.setDate(date_begin.getDate());
  date_begin = Utilities.formatDate(date_begin, "CST-6", "MM/dd/yy")

  // Get date 6 days from today
  var date_end = new Date();
  date_end.setDate(date_end.getDate()+6);
  date_end = Utilities.formatDate(date_end, "CST-6", "MM/dd/yy")

  // Loop through list of employees and copy template for each employee
  for (var i = 0; i < employee_names.length; i++) {  

    // Add each emplpoyee's name and dates to the title
    var newSheet = DriveApp.getFileById(templateSheet.getId()).
    makeCopy(employee_names[i] + " Timesheet " + date_begin + " - " + date_end);

    // Get the ID of the newly created sheet
    var newID = newSheet.getId()

    // Add each employee's name to the name cell "C8"
    var name_cell = SpreadsheetApp.openById(newID).getRange("C8"); 
    name_cell.setValue(employee_names[i]);

    // Add the dates to the dates cells "B10:J10"
    var date_cell = SpreadsheetApp.openById(newID).getRange("B10:J10"); 
    date_cell.setValue("WEEK OF " + date_begin + " - " + date_end);

    // Share the new timesheet with the employee and give them edit priviledges via their email
    newSheet.addEditor(employee_emails[i]);
  }
}