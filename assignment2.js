class Records{ //this class creates objects from the file that is read
    constructor(identifier, inTime, weight, units, color,labBegin, labEnd, labIdentifier,labTime, labUnits, labColor, labWeight){
        this.identifier = identifier;
        this.inTime = inTime;
        this.weight = weight;
        this.units = units;
        this.color = color;
        this.labBegin = labBegin;
        this.labEnd=labEnd;
        this.labIdentifier = labIdentifier;
        this.labTime = labTime;
        this.labUnits = labUnits;
        this.labColor = labColor;
        this.labWeight = labWeight;  

    }


}
let recordCollection = [];


const fs = require('node:fs');

function ReadingTheFile(filePath) {//takes the input file and reads the data from it
    const fs = require('fs');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return '';
    }
}

function WritingTheFile(fileContent){ //function takes the output file and writes the read data into a new file
    let buf="";
    for (let i=0; i<fileContent.length;i++) //need to use the objects from the Records class to make sure the file is written correctly/ 
    {
        buf = buf+fileContent[i].labBegin+"\n";
        buf= buf+ fileContent[i].labIdentifier+":" + fileContent[i].identifier +"\n";
        buf=buf+fileContent[i].labTime+":" + fileContent[i].inTime +"\n";
        if(fileContent[i].color){
            buf=buf+fileContent[i].labColor+":"+fileContent[i].color +"\n";
        }
        if(fileContent[i].weight && fileContent[i].units){
            buf=buf+fileContent[i].labUnits+":"+fileContent[i].units +"\n";
            buf=buf+fileContent[i].labWeight+":"+fileContent[i].weight +"\n";
        }
        buf=buf+fileContent[i].labEnd+"\n";
    }

    //fs.writeFile('./assignment2_out.txt', buf, (err) => { //writes the file if it does not fail any of the test cases
        //if (err) {
          //console.error('Error writing to file:', err);
        //} else {
          //console.log('File has been written successfully!');
        //}
    //});
}

function ParseString(indata){ //double checks edge cases including formatting errors, missing required properties, unknown property, missing property value, more than one property per line, etc. W
    let dataArr = indata.split('\n');
    let identifier;
    let inTime;
    let weight;
    let units;
    let color;
    let i=0;
    let temp;
    let isIdentifier = false; //lines 70-4 are booleans initialized to false to check if the properties are present
    let isThereTime = false;
    let isThereWeight = false;
    let isThereUnit = false;
    let isThereColor = false;
    let labBeg="";
    let labEnd="";
    let labId="";
    let labTime="";
    let labWt="";
    let labUn="";
    let labCol="";

    while (i< dataArr.length){ //this while is to make sure the conditions go through the entire text file. dataArr is the text file
        
        let temp1 = dataArr[i].split(':'); //splitting the BEGIN and the User input into temp 1 and temp
        isThereWeight = false;
        isThereUnit = false; 
        isThereColor=false;
        if((temp1[0].toUpperCase() ==='BEGIN') && (temp1[1].toUpperCase() ==='RECORD')){ //makes sure there is a BEGIN RECORD 
            labBeg=temp1[0]+ ":" + temp1[1];
            i++;
            temp = dataArr[i].split(':')
            if(temp.length != 2){ //makes sure that there is only one property per line
                return false;
            }
            
            while((temp[0].toUpperCase() !=='END') && (temp[1].toUpperCase() !=='RECORD') && dataArr[i]){//makes sure there is an END RECORD

                 temp = dataArr[i].split(':');
                 if(temp.length != 2){
                    return false;
                }
                if(!temp[1]){
                    return false;
                }
                if(temp[0].toUpperCase() === 'IDENTIFIER') {
                    labId=temp[0];
                    //console.log("wheee");
                    identifier =temp[1];
                    if(isIdentifier === true){ //if there is no identifier, return false
                        return false;
                    }
                    isIdentifier = true;
                }

                else if(temp[0].toUpperCase() ==='TIME'){
                    labTime=temp[0];
                    //console.log("not wheeeee");
                    inTime = temp[1];
                    let hour = temp[1].substring(0,2); //splits the user input by hour
                    let minutes = temp[1].substring(2,4); //splits user input by minutes
                    let seconds = temp[1].substring(4,6); //splits the user input by seconds
                    let formattedTime = TimeValidation(hour, minutes, seconds); //takes the split strings and validates each substring in the timeValidation() function to make sure the time edge cases are met
                    //console.log("formatted time" + formattedTime);
                    if(formattedTime === false){ //if the edge cases are not met return false
                        return false;
                    }
                    else{
                        //console.log("Is there time?")
                        if(isThereTime === true){  //if there is no time, return false. Ensures user input has a time per record
                            return false;
                        }
                        isThereTime = true;
                    }
                }
                else if(temp[0].toUpperCase() ==='WEIGHT'){//takes care of weights input as in checking for multiple weights in one record and returning false if that occurs
                    labWt=temp[0];
                    weight = temp[1];
                    if(isThereWeight === true){
                        return false;
                    }
                    isThereWeight = true;

                }
                else if(temp[0].toUpperCase() ==='UNITS'){ //takes care of units inputs as in checking for multiple units and returning false if that is the case
                    labUn=temp[0];
                    units = temp[1];
                    if(isThereUnit === true){
                        return false;
                    }
                    //console.log("UNITS" + units);
                    if(units.toUpperCase() !== "KG" && units.toUpperCase() !== "G" && units.toUpperCase() !== "OZ" && units.toUpperCase() !== "LBS" && units.toUpperCase() !== "MG"){
                        return false;
                    }
                    isThereUnit = true;
                }
                else if(temp[0].toUpperCase() ==='COLOR'){ //takes care of color edge cases including input and more than one color per record
                    labCol=temp[0];
                    if(isThereColor === true){
                        return false;
                    }
                    color = temp[1];
                    if(color.toUpperCase() !== "RED" && color.toUpperCase() !== "ORANGE" && color.toUpperCase() !== "YELLOW" && color.toUpperCase() !== "GREEN" && color.toUpperCase() !== "BLUE" && color.toUpperCase() !== "PURPLE" && color.toUpperCase() !== "PINK"){ //Restricts user input for color to only be these colors, otherwise file will not be written and sorted
                        return false;
                    }
                    isThereColor = true; 
                }
                
                else{
                    if(temp[0].toUpperCase() !== 'BEGIN' && temp[0].toUpperCase() !== 'END' ){ //this means if there is no BEGIN or END in the file, return false
                        return false; //takes care of formatting edge case
                    }
                }
                
        
                i++;
                 
                
            }
            

            if(isIdentifier === false || isThereTime===false){ //if there is no idetifier or time, then return false
                return false;
            }
            if((isThereWeight === false && isThereUnit===true)||(isThereWeight===true && isThereUnit===false)){ //if there is no weight but a unit or no unit but a weight, return false because there cannot be one without the other
                return false;
   
            }
            isThereWeight = false;
            isThereUnit = false;
            isIdentifier = false;
            isThereTime = false;
            labEnd=temp[0]+":"+temp[1];
            //(labBeg);
            let rec = new Records(identifier, inTime, weight, units, color,labBeg,labEnd,labId,labTime, labUn, labCol, labWt);
            recordCollection.push(rec);
            beginRec = false;
           
        }
        else{
           return false;
        }
        
    }
    
    let isDuplicate = checkIdentifierDuplicates(recordCollection); 
    if(isDuplicate === true){//if there is a duplicate identifier in throughout the text file, return false
        return false;
    }
    let finalArray = Sorting(recordCollection, "TIME"); //if not a single false is returned, then sort the array 
    WritingTheFile(finalArray); //write the final array using the WritingTheFile function 
    return true; //return true
}
function TimeValidation(hour, minutes, seconds){ //Checks the edge cases for time. If this function returns false at anytime, the file will not be written and sorted
   
 
    if(hour>23 || hour<0){ //user input cannot have an hour value more than 23 or less than 0
        return false;
    }
    if(minutes>59 || minutes<0){  //user input cannot have a minutes value greater than 59 or less than 0
        return false;
    }
    if(seconds>59 || seconds<0){ //user input cannot have a seconds value greater then 59 or less than 0
        return false;
    }
    return true;
    
}
function Sorting(recordCollection, field){
    if(field === "TIME"){ //organizes the file by time in ascending order
        return recordCollection.sort((a, b) => {
        const timeA = new Date(a.inTime);
        const timeB = new Date(b.inTime);
        return timeA - timeB;
        });
    }
    else if (field === "IDENTIFIER"){ //this is used to make sure each record per file has a different identifier
        return recordCollection.sort((a, b) => {
        const idA = a.identifier;
        const idB = b.identifier;
        return idB - idA;
        });
    }
    return recordCollection;
}

function checkIdentifierDuplicates(recordCollection){
    let idSortedCollection = Sorting(recordCollection, "IDENTIFIER");
    let currValue = ' ';
    for(let i = 0; i<idSortedCollection.length; i++){
        if(currValue === idSortedCollection[i].identifier){
       
            return true;
        }
        else{
         
            currValue=idSortedCollection[i].identifier;
        }
    }

    return false;
    
}

 function ProcessFile(filePath){ //this function processes the file mand calls the reading file function and parse string function
    
    let indata = ReadingTheFile(filePath);
    let stat = ParseString(indata);
    console.log(stat);
    //return stat;
  
    if (stat==true){
        return true; //only if the file passes the parse string function can the file move onto the WriteFile function
    }
    else{
    return false; //otherwise we have to return false
    }
}

//Check if the user has provided a file path as a command-line argument. THIS PART IS UNCOMMENTED OUT WHEN JASMINE TEST CASES ARE NOT BEING USED
//if (process.argv.length < 3) {//allows user to enter the file needed to be sorted
    //console.error('Please provide the file path as a command-line argument.');
    //process.exit(1);
//}
const userEnteredFilePath = process.argv[2]; //file name argument
ProcessFile(userEnteredFilePath); //take the inputted file and process it using the ProcessFile()
module.exports = {ProcessFile, ReadingTheFile, ParseString}; //export to the jasmine test cases