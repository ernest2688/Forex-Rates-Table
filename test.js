
//the GET request
fetch('http://data.fixer.io/api/latest?access_key=fe3a9b3f9ac173a3e51d8ea22951cf95', {})
.then((response) => {
  return response.json(); 
}).then((jsonData) => {
    //variable for foreign currency data
    rates = jsonData.rates;
    //variable for new foreign currency data
    newrates = {}
    currencies = Object.keys(rates);
    //add 10.0002 to each values for the new variable
    let decNo;
    
    for (let i = 0; i < currencies.length ; ++i){
        decNo = decimalCount(rates[`${currencies[i]}`]);
        newrates[`${currencies[i]}`] = decNo === 0 ?  rates[`${currencies[i]}`] + 10.0002 : (rates[`${currencies[i]}`] + 10.0002).toFixed(decNo);
    }



    //console.log(rates);
    //console.log(newrates);
    let rateString; 
    let newrateString; 
    let appendString = '';
    //display both variables to the table
    let table = document.getElementById('rateTable');
    //if the values is even number of currency is HKD, add a red border to the <td>, 
    //else add a white border
    //Then, append the <td> with <tr>
    //the variable appendString is to save all of the <tr> elements generated by the for loop
    //at last append the appendString to the table
    for (let i = 0; i < currencies.length; ++i){
        rateString = '';
        newrateString ='';
        if(isEven(String(rates[`${currencies[i]}`]))||currencies[i]==='HKD'){
            rateString = `<td style="border: 1px solid red;">${currencies[i]} : ${rates[`${currencies[i]}`]}</td>`;
        }
        else{
            rateString = `<td style="border: 1px solid white;">${currencies[i]} : ${rates[`${currencies[i]}`]}</td>`;
        }
        if(isEven(String(newrates[`${currencies[i]}`]))||currencies[i]==='HKD'){
            newrateString = `<td style="border: 1px solid red;">${currencies[i]} : ${newrates[`${currencies[i]}`]}</td>`;
        }
        else{
            newrateString = `<td style="border: 1px solid white;">${currencies[i]} : ${newrates[`${currencies[i]}`]}</td>`;
        }
        appendString = appendString + '<tr>' + rateString + newrateString + '</tr>';
    }
    table.insertAdjacentHTML('beforeend', appendString);
    //console.log(typeof(rates['ALL']));
    
}).catch((err) => {
  console.log('Error', err);
});

//the function to check if it is an even number
function isEven(s)
    {
        let l = s.length;
        
 
        // Loop to traverse number from LSB
        let dotSeen = false;
        for (let i = l - 1; i >= 0; i--) {
 
            // We ignore trailing 0s after dot
            if (s[i] == '0' && dotSeen == false)
                continue;
 
            // If it is '.' we will check next digit and it
            // means decimal part is traversed.
            if (s[i] == '.') {
                dotSeen = true;
                continue;
            }
 
            // If digit is divisible by 2
            // means even number.
            if ((s[i] - '0') % 2 == 0)
                return true;
 
            return false;
        }
 
        return false;
    }


const decimalCount = num => {
    // Convert to String
    const numStr = String(num);
    // String Contains Decimal
    if (numStr.includes('.')) {
       return numStr.split('.')[1].length;
    };
    // String Does Not Contain Decimal
    return 0;
    }
