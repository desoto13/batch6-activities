function Details() {
    var JohnMass = 65;
    var JohnHeight = 1.2;
    var VictorMass = 70;
    var VictorHeight = 1.3;
    BMIcalculate(JohnMass, JohnHeight, VictorMass, VictorHeight);
}

function BMIcalculate(a,b,c,d) {
    var BMIJohn = a / (b*b);
    var BMIVictor = c / (d*d);
    var compare = Boolean(BMIVictor>BMIJohn);
    var statement = "Is Victor's BMI Higher than John?";
    console.log("John's BMI: ",BMIJohn.toFixed(2));
    console.log("Victor's BMI: ",BMIVictor.toFixed(2));
    console.log(statement, compare);  
}

Details();

