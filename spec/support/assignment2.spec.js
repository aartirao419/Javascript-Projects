//delete require.cache[require.resolve('/Users/ar/Desktop/HW2/assignment2.js')];
const {ProcessFile} = require('../../assignment2.js');
describe('File Processing', () => {
  it('should process the file successfully', () => {
    const filePath = 'testcase1.txt'; //this test case shows the code works for one record and its properties
    const result = ProcessFile(filePath);
    expect(result).toEqual(true);
  });
  
  it('should process the file successfully', () => { //shows code works for a set of records and its properties properly formatted
    const filePath = 'testcase2.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(true);
  });

  it('should process the file successfully', () => { //shows code works for a set of records despite the order of properties
    const filePath = 'testcase3.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(true);
  });
  
  it('should process the file successfully', () => { //shows code is case insensitive
    const filePath = 'testcase4.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(true);
  });
  it('should process the file successfully', () => { //shows code works even if there is no color for some of the records
    const filePath = 'testcase5.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(true);
  });
  it('should process the file successfully', () => { //shows code works for a collection of records even if there is no weight and units given in some of them
    const filePath = 'testcase6.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(true);
  });
  it('should process the file successfully', () => { //shows code works for records with no time, weight, or units
    const filePath = 'testcase7.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(true);
  });
  it('should not process the file successfully', () => { //shows code does not work for multiple identifiers in one record
    const filePath = 'testcase8.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  
  it('should not process the file successfully', () => { //shows code does not work for multiple times
    const filePath = 'testcase9.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  
  it('should not process the file successfully', () => { //shows code does not work for multiple weights, or units
    const filePath = 'testcase10.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  
  it('should not process the file successfully', () => { //shows code does not work if there is a weight but no unit
    const filePath = 'testcase11.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  
  it('should not process the file successfully', () => { //shows code does not work if a record has a unit but no weight
    const filePath = 'testcase12.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  it('should not process the file successfully', () => { //shows code will not work if the identifier is the same for two records
    const filePath = 'testcase13.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  it('should not process the file successfully', () => { //--shows code will not work if there is no BEGIN or END record--
    const filePath = 'testcase14.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  it('should not process the file successfully', () => { //shows code will not work if there are multiple properties on one line
    const filePath = 'testcase15.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  it('should not process the file successfully', () => { //shows code will not work if user input for time is not correct (ie if the user puts 61 for minutes or seconds or 24 for hour
    const filePath = 'testcase16.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  it('should not process the file successfully', () => { //shows code does not work if they put a wrong color
    const filePath = 'testcase17.txt'; 
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });
  it('should not process the file successfully', () => { //shows code will not work if there is no value assigned to a property
    const filePath = 'testcase18.txt';
    const result = ProcessFile(filePath);
    expect(result).toEqual(false);
  });


});