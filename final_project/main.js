// Things to do: 
// 1!!!!!(FIST PRIORITY) Get data from the urls
// the urls will appear in the error console when you click on two different locations 
// 2. using that data get the square to display the ratio 
// 3. get the sliders to work 

var table;
var table_2;
var mainPrice;
var mainPriceNumber;
var timeMinutes;
var text;
//slider 
var timeSlider
var costSlider;
var timeValue;
var costValue;
//for drop down box 
var sel; 
var sel2;  
//for boxes 
var x = window.innerWidth/ 10; 
var h = 55; 
//for sliderText 
var x1 = window.innerWidth/2 - 50; 

var windowWidth = window.innerWidth; 
var windowHeight = window.innerHeight;

var trainTime;
var trainPrice;
var taxiTime;
var taxiPrice;

function setup(){
    drawSlider(); 
	dropDownBox(); 
}

function draw(){
	createCanvas(window.innerWidth, window.innerHeight);
	//fill(150); 
	drawTaxiBox();
	drawTrainBox();  
	drawWalkingBox(); 
	sliderText();   
}

function runComparison() {
  myTrip();
}

function dropDownBox(){ 
  	//Location / Current Location
  	textAlign(CENTER); 
  	sel = createSelect(); 
  	sel.position((windowWidth/2)-130, windowHeight /3.5); 
  	sel.option('Asakusa') ; 
  	sel.option('Ikebukuro'); 
  	sel.option('Otemachi'); 
  	sel.option('Roppongi');
  	sel.option('Shibuya') ; 
  	sel.option('Shimbashi'); 
  	sel.option('Shinjuku');
  	sel.option('Tokyo'); 
  	sel.option('Ueno');
  	sel.changed(myLocation);
  	//Destination 
  	textAlign(CENTER); 
  	sel2 = createSelect(); 
  	sel2.position((windowWidth/2)+40, windowHeight /3.5); 
  	sel2.option('Asakusa') ; 
  	sel2.option('Ikebukuro'); 
  	sel2.option('Otemachi'); 
  	sel2.option('Roppongi');
  	sel2.option('Shibuya') ; 
  	sel2.option('Shimbashi'); 
  	sel2.option('Shinjuku');
  	sel2.option('Tokyo'); 
  	sel2.option('Ueno');
  	sel2.changed(myDestination);
  	//Enter Box 
    button = createButton('Enter');
  	button.position((windowWidth/2-20),  windowHeight /3.5);
  	button.mousePressed(runComparison);

}

function myLocation(){ 
	return loca = sel.value(); 
}

function myDestination(){ 
	return dest = sel2.value(); 
}

function myTrip() { 
	var a = myLocation(); 
	var b = myDestination(); 
	if (a == b){
   		text("Error You cannot have the same location and destination.", windowWidth, 50); 
    }else{
    	text("My location is "+a+"! My destination is "+b+"! ", windowWidth, 50); 
    	print(a)
   		print(b); 
   		getTaxiUrl(); 
   		getWalkingUrl(); 
   		getTrainUrl();  
    }
}
function drawSlider(){ 

	fill(0);
	timeSlider = createSlider(0, 200, 4);
  	timeSlider.position(x1, windowHeight /2.8);

  	costSlider = createSlider(0, 200, 4);
  	costSlider.position(x1, windowHeight /2.4);

  	timeValue = timeSlider.value();
	costValue = costSlider.value();
  	
}
function sliderText(){
	textSize(12);
	fill(0); 
	text("Cost", x1, windowHeight /5 );
	text("Time", x1, windowHeight /5.6);
	text("Most Important", x1 + 150, windowHeight /5.2);
	text("Not Important", x1 - 50, windowHeight /5.2); 
}

function drawTaxiBox(){
	fill(0);
	var taxiPrice; 
	var taxiTime; 
	var y2 = windowHeight/ 4; 
	var y1 = windowHeight/ 3.9; 
	fill(150);
	//costValue = a/5; 
	rect(windowWidth/2, windowHeight/2, taxiTime, h); //price 
	rect((windowWidth/2)+taxiPrice, windowHeight/2, taxiPrice, h); //time 
	textSize(12);
	fill(0); 
	text("Taxi:", x, y2);
	fill(255); 
	text("Price", x*1.2, y2+ h/2); 
	text("Time", a/5 + x*1.2, y2 + h/2); 
}

function drawTrainBox(){
	var a = 700; //price
	var b = 60; //time
	var y2 = windowHeight/ 2.8; 
	var y1 = windowHeight/ 2.75; 
	fill(150);
	rect(x, y1, a/5, h); //price
	rect(a/5 + x, y1, b, h); //time
	textSize(12);
	fill(0); 
	text("Train:", x, y2);
	fill(255); 
	text("Price", x*1.2, y2 + h/2);
	text("Time", a/5 + x*1.2, y2 + h/2);

}

function drawWalkingBox(){
	var a = 0; 
	var b = 120; 
	var y1 = windowHeight/ 2.05; 
	var y2 = windowHeight/ 2.1; 
	fill(150);
	rect(a/5 + x, y1, b, h); 
	textSize(12);
	fill(0);
	text("Walking:", x, y2);
	fill(255);
	text("Time", a/5 + x*1.2, y2+ h/2); //time
} 
function getTrainUrl() { 
	var a = myLocation(); 
	var b = myDestination(); 
	//get Date 
	var today = new Date();
	var year = today.getYear()
	var month = today.getMonth()+1;
	var day = today.getDate();
	var hour = today.getHours(); 
	var min = today.getMinutes(); 
	if(day<10) {
    	day='0'+day
	} 
	month
	if(month<10) {
    	month='0'+month

	}  
	// var trainResultsURL = "http://www.navitime.co.jp/transfer/searchlist?orvStationName="+a+"&dnvStationName="+b+"&thrStationName1=&thrStationCode1=&thrStationName2=&thrStationCode2=&thrStationName3=&thrStationCode3=&month="+year+"%2F"+month+"&+&day="+day+"&hour="+hour+"&minute="+min+"&orvStationCode=&dnvStationCode=&basis=1&from=view.transfer.top&sort=0&wspeed=100&airplane=1&sprexprs=1&utrexprs=1&mtrplbus=1&othexprs=1&intercitybus=1&ferry=1&ctl=020010&atr=2&init="
	// var getTrainSource = "view-source:"+trainResultsURL; 
	// return getTrainSource; 

	// var trainResultsURL = "http://www.navitime.co.jp/transfer/searchlist?orvStationName="+a+"&dnvStationName="+b+"&thrStationName1=&thrStationCode1=&thrStationName2=&thrStationCode2=&thrStationName3=&thrStationCode3=&month="+year+"%2F"+month+"&+&day="+day+"&hour="+hour+"&minute="+min+"&orvStationCode=&dnvStationCode=&basis=1&from=view.transfer.top&sort=0&wspeed=100&airplane=1&sprexprs=1&utrexprs=1&mtrplbus=1&othexprs=1&intercitybus=1&ferry=1&ctl=020010&atr=2&init="
	// var getTrainSource = "view-source:"+trainResultsURL; 
	// return getTrainSource; 
	trainResultsURL = "http://www.navitime.co.jp/transfer/searchlist?orvStationName="+a+"&dnvStationName="+b+"&thrStationName1=&thrStationCode1=&thrStationName2=&thrStationCode2=&thrStationName3=&thrStationCode3=&month="+year+"%2F"+month+"&+&day="+day+"&hour="+hour+"&minute="+min+"&orvStationCode=&dnvStationCode=&basis=1&from=view.transfer.top&sort=0&wspeed=100&airplane=1&sprexprs=1&utrexprs=1&mtrplbus=1&othexprs=1&intercitybus=1&ferry=1&ctl=020010&atr=2&init="
	//console.log(trainResultsURL);
	$.get(trainResultsURL, function(result) {
		var priceRegex = /<div class="cash">(...)/;
		var timeRegex = /(...)<span class="unit">/;
		var price = result.match(priceRegex);
		var time = result.match(timeRegex);
		console.log(price[1]);
		console.log(time[1]);

		trainPrice = int(price[1]);
		trainTime = int(time[1]);

		//console.log("ajax went through");
		// console.log(result);
	});
	return trainPrice; 
	return trainTime; 
}

function getTaxiUrl() {
	var a = myLocation(); 
	var b = myDestination(); 
	var today = new Date();
	var year = today.getYear()
	var month = today.getMonth()+1;
	var day = today.getDate();
	var hour = today.getHours(); 
	var min = today.getMinutes(); 
	var sec = today.getSeconds(); 
	if (a == 'Asakusa') { 
		var name = decodeURIComponent('%E6%B5%85%E8%8D%89'); 
		var lat = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	} 
	if (b == 'Asakusa') { 
		var name2 = decodeURIComponent('%E6%B5%85%E8%8D%89'); 
		var lat2 = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	}
	if (a == 'Ikebukuro') { 
		var name = decodeURIComponent('%E6%B5%85%E8%8D%89'); 
		var lat = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	} 
	if (b == 'Ikebukuro') { 
		var name2 = decodeURIComponent('%E6%B5%85%E8%8D%89'); 
		var lat2 = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	} 
	if (a == 'Otemachi') { 
		var name = decodeURIComponent('%E5%A4%A7%E6%89%8B%E7%94%BA'); 
		var lat = decodeURIComponent('%22%3A35.687042%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.766334%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200005630%22%2C%22'); 
	} 
	if (b == 'Otemachi') { 
		var name2 = decodeURIComponent('%E5%A4%A7%E6%89%8B%E7%94%BA'); 
		var lat2 = decodeURIComponent('%22%3A35.687042%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.766334%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200005630%22%2C%22'); 
	} 
	if (a == 'Roppongi') { 
		var name = decodeURIComponent('%E5%85%AD%E6%9C%AC%E6%9C%A8'); 
		var lat = decodeURIComponent('%22%3A35.66268%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.731139%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200009098%22%2C%22'); 
	} 
	if (b == 'Roppongi') { 
		var name2 = decodeURIComponent('%E5%85%AD%E6%9C%AC%E6%9C%A8'); 
		var lat2 = decodeURIComponent('%22%3A35.66268%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.731139%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200009098%22%2C%22'); 
	} 
	if (a == 'Shibuya') { 
		var name = decodeURIComponent('%E6%B8%8B%E8%B0%B7'); 
		var lat = decodeURIComponent('%22%3A35.656236%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.703142%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200003544%22%2C%22'); 
	}
	if (b == 'Shibuya') { 
		var name2 = decodeURIComponent('%E6%B8%8B%E8%B0%B7'); 
		var lat2 = decodeURIComponent('%22%3A35.656236%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.703142%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200003544%22%2C%22'); 
	}  
	if (a == 'Shinjuku') { 
		var name = decodeURIComponent('%E6%96%B0%E5%AE%BF'); 
		var lat = decodeURIComponent('%22%3A35.689575%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.700685%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200004254%22%2C%22'); 
	} 
	if (b == 'Shinjuku') { 
		var name2 = decodeURIComponent('%E6%96%B0%E5%AE%BF'); 
		var lat2 = decodeURIComponent('%22%3A35.689575%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.700685%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200004254%22%2C%22'); 
	} 
	if (a == 'Shinbashi') { 
		var name = decodeURIComponent('E6%96%B0%E6%A9%8B'); 
		var lat = decodeURIComponent('%22%3A35.666458%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.758887%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200004212%22%2C%22'); 
	}  
	if (b == 'Shinbashi') { 
		var name2 = decodeURIComponent('%E6%96%B0%E6%A9%8B'); 
		var lat2 = decodeURIComponent('%22%3A35.666458%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.758887%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200004212%22%2C%22'); 
	} 
	if (a == 'Tokyo'){ 
		var name = decodeURIComponent('%E6%9D%B1%E4%BA%AC'); 
		var lat = decodeURIComponent('%22%3A35.680805%2C%22');
		var lon = decodeURIComponent('%22%3A139.767798%2C%22');
		var node = decodeURIComponent('%22%3A%2200006668%22%2C%22road-type%22%3A%22default%22%7D&'); 
	}
	if (b == 'Tokyo'){ 
		var name2 = decodeURIComponent('%E6%9D%B1%E4%BA%AC'); 
		var lat2 = decodeURIComponent('%22%3A35.680805%2C%22');
		var lon2 = decodeURIComponent('%22%3A139.767798%2C%22');
		var node2 = decodeURIComponent('%22%3A%2200006668%22%2C%22road-type%22%3A%22default%22%7D&'); 
	} 
	if (a == 'Ueno') { 
		var name = decodeURIComponent('%E4%B8%8A%E9%87%8E'); //{"name":"上野","
		//var name = "{\"name\":\"上野\",\""; 
		var lat = decodeURIComponent('%22%3A35.713649%2C%22'); //":35.713649,"
		var lon = decodeURIComponent('%22%3A139.777345%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200004067%22%2C%22'); 
	} 
	if (b == 'Ueno') { 
		var name2 = decodeURIComponent('%E4%B8%8A%E9%87%8E'); //{"name":"上野","
		//var name = "{\"name\":\"上野\",\""; 
		var lat2 = decodeURIComponent('%22%3A35.713649%2C%22'); //":35.713649,"
		var lon2 = decodeURIComponent('%22%3A139.777345%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200004067%22%2C%22'); 
	} 
	if(day<10) {
    	day='0'+day
	} 
	if(month<10) {
    	month='0'+month

	} 
	if(min<10) {
    	min='0'+min

	} 

	var taxiResultsURL = "http://www.navitime.co.jp/taxi/result/?start=%7B%22lon"+lon+"lat"+lat+"nodeId"+node+"name%22%3A%22"+name+"%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon"+lon2+"lat"+lat2+"nodeId"+node2+"name%22%3A%22"+name2+"%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-"+month+"-"+day+"T"+hour+"%3A"+min+"%3A00&basis=1"
	// //http://www.navitime.co.jp/taxi/result/?start={"lon":139.706361,"lat":35.653,"nodeId":"00003544","name":"渋谷","road-type":"default"}&goal={"lon":139.703905,"lat":35.686343,"nodeId":"00004254","name":"新宿","road-type":"default"}&roadFare=free&time=2016-05-02T10:17:00&basis=1
	// //http://www.navitime.co.jp/taxi/result/?start=%7B%22lon%22%3A139.706361%2C%22lat%22%3A35.653%2C%22nodeId%22%3A%2200003544%22%2C%22name%22%3A%22%E6%B8%8B%E8%B0%B7%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon%22%3A139.703905%2C%22lat%22%3A35.686343%2C%22nodeId%22%3A%2200004254%22%2C%22name%22%3A%22%E6%96%B0%E5%AE%BF%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-05-02T10%3A17%3A00&basis=1
	// var getTaxiSource = "view-source:"+taxiResultsURL; 
	// print(getTaxiSource); 
	// return(getTaxiSource);  
	// var taxiResultsURL = "http://www.navitime.co.jp/taxi/result/?start=%7B%22lon"+lon+"lat"+lat+"nodeId"+node+"name%22%3A%22"+name+"%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon"+lon2+"lat"+lat2+"nodeId"+node2+"name%22%3A%22"+name2+"%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-"+month+"-"+day+"T"+hour+"%3A"+min+"%3A00&basis=1"
	// //http://www.navitime.co.jp/taxi/result/?start={"lon":139.706361,"lat":35.653,"nodeId":"00003544","name":"渋谷","road-type":"default"}&goal={"lon":139.703905,"lat":35.686343,"nodeId":"00004254","name":"新宿","road-type":"default"}&roadFare=free&time=2016-05-02T10:17:00&basis=1
	// //http://www.navitime.co.jp/taxi/result/?start=%7B%22lon%22%3A139.706361%2C%22lat%22%3A35.653%2C%22nodeId%22%3A%2200003544%22%2C%22name%22%3A%22%E6%B8%8B%E8%B0%B7%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon%22%3A139.703905%2C%22lat%22%3A35.686343%2C%22nodeId%22%3A%2200004254%22%2C%22name%22%3A%22%E6%96%B0%E5%AE%BF%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-05-02T10%3A17%3A00&basis=1
	// var getTaxiSource = "view-source:"+taxiResultsURL; 
	// print(taxiResultsURL); 
	// print(getTaxiSource); 
	// return(getTaxiSource);  

	var taxiResultsURL = "http://www.navitime.co.jp/taxi/result/?start=%7B%22lon"+lon+"lat"+lat+"nodeId"+node+"name%22%3A%22"+name+"%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon"+lon2+"lat"+lat2+"nodeId"+node2+"name%22%3A%22"+name2+"%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-"+month+"-"+day+"T23%3A17%3A00&basis=1"; 
	//http://www.navitime.co.jp/taxi/result/?start={"lon":139.706361,"lat":35.653,"nodeId":"00003544","name":"渋谷","road-type":"default"}&goal={"lon":139.703905,"lat":35.686343,"nodeId":"00004254","name":"新宿","road-type":"default"}&roadFare=free&time=2016-05-02T10:17:00&basis=1
	//http://www.navitime.co.jp/taxi/result/?start=%7B%22lon%22%3A139.706361%2C%22lat%22%3A35.653%2C%22nodeId%22%3A%2200003544%22%2C%22name%22%3A%22%E6%B8%8B%E8%B0%B7%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon%22%3A139.703905%2C%22lat%22%3A35.686343%2C%22nodeId%22%3A%2200004254%22%2C%22name%22%3A%22%E6%96%B0%E5%AE%BF%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-05-02T10%3A17%3A00&basis=1
	// var getTaxiSource = "view-source:"+taxiResultsURL; 
	// print(taxiResultsURL); 
	// print(getTaxiSource); 
	// return(getTaxiSource);  

	var taxiResultsURL = "http://www.navitime.co.jp/taxi/result/?start=%7B%22lon"+lon+"lat"+lat+"nodeId"+node+"name%22%3A%22"+name+"%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon"+lon2+"lat"+lat2+"nodeId"+node2+"name%22%3A%22"+name2+"%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-"+month+"-"+day+"T23%3A17%3A00&basis=1"; 
	//http://www.navitime.co.jp/taxi/result/?start={"lon":139.706361,"lat":35.653,"nodeId":"00003544","name":"渋谷","road-type":"default"}&goal={"lon":139.703905,"lat":35.686343,"nodeId":"00004254","name":"新宿","road-type":"default"}&roadFare=free&time=2016-05-02T10:17:00&basis=1
	//http://www.navitime.co.jp/taxi/result/?start=%7B%22lon%22%3A139.706361%2C%22lat%22%3A35.653%2C%22nodeId%22%3A%2200003544%22%2C%22name%22%3A%22%E6%B8%8B%E8%B0%B7%22%2C%22road-type%22%3A%22default%22%7D&goal=%7B%22lon%22%3A139.703905%2C%22lat%22%3A35.686343%2C%22nodeId%22%3A%2200004254%22%2C%22name%22%3A%22%E6%96%B0%E5%AE%BF%22%2C%22road-type%22%3A%22default%22%7D&roadFare=free&time=2016-05-02T10%3A17%3A00&basis=1
	var getTaxiSource = "view-source:"+taxiResultsURL; 
	print(taxiResultsURL); 
	print(getTaxiSource); 
	return(getTaxiSource);  
	
	console.log(taxiResultsURL);
	$.get(taxiResultsURL, function(result) {
		var regex1 = /<li class="mainPrice">(.....)/;
		var n1 = result.match(regex1);
		console.log(n1[1].replace(",",""));
		taxiPrice = int(n1[1].replace(",",""));

		var regex2 = /<li class="times"><span class="detailTitle">出発時刻<\/span>(.....)/;
		var n2 = result.match(regex2);
		console.log(n2);
	});

	print(taxiResultsURL); 

	print(taxiResultsURL); 

	
	print(testURL); 

}



function getWalkingUrl() {
	var a = myLocation(); 
	var b = myDestination(); 
	var today = new Date();
	var year = today.getYear()
	var month = today.getMonth()+1;
	var day = today.getDate();
	var hour = today.getHours(); 
	var min = today.getMinutes(); 
	if (a == 'Asakusa') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E6%B5%85%E8%8D%89%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	} 
	if (b == 'Asakusa') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E6%B5%85%E8%8D%89%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	}
	if (a == 'Ikebukuro') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E6%B5%85%E8%8D%89%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	} 
	if (b == 'Ikebukuro') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E6%B5%85%E8%8D%89%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.709962%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.797214%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200005270%22%2C%22'); 
	} 
	if (a == 'Otemachi') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E5%A4%A7%E6%89%8B%E7%94%BA%EF%BC%88%E6%9D%B1%E4%BA%AC%E9%83%BD%EF%BC%89%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.687042%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.766334%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200005630%22%2C%22'); 
	} 
	if (b == 'Otemachi') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E5%A4%A7%E6%89%8B%E7%94%BA%EF%BC%88%E6%9D%B1%E4%BA%AC%E9%83%BD%EF%BC%89%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.687042%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.766334%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200005630%22%2C%22'); 
	} 
	if (a == 'Roppongi') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E5%85%AD%E6%9C%AC%E6%9C%A8%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.66268%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.731139%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200009098%22%2C%22'); 
	} 
	if (b == 'Roppongi') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E5%85%AD%E6%9C%AC%E6%9C%A8%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.66268%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.731139%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200009098%22%2C%22'); 
	} 
	if (a == 'Shibuya') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E6%B8%8B%E8%B0%B7%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.656236%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.703142%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200003544%22%2C%22'); 
	}
	if (b == 'Shibuya') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E6%B8%8B%E8%B0%B7%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.656236%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.703142%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200003544%22%2C%22'); 
	}  
	if (a == 'Shinjuku') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E6%96%B0%E5%AE%BF%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.689575%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.700685%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200004254%22%2C%22'); 
	} 
	if (b == 'Shinjuku') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E6%96%B0%E5%AE%BF%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.689575%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.700685%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200004254%22%2C%22'); 
	} 
	if (a == 'Shinbashi') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E6%96%B0%E6%A9%8B%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.666458%2C%22'); 
		var lon = decodeURIComponent('%22%3A139.758887%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200004212%22%2C%22'); 
	}  
	if (b == 'Shinbashi') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E6%96%B0%E6%A9%8B%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.666458%2C%22'); 
		var lon2 = decodeURIComponent('%22%3A139.758887%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200004212%22%2C%22'); 
	} 
	if (a == 'Tokyo'){ 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E6%9D%B1%E4%BA%AC%22%2C%22'); 
		var lat = decodeURIComponent('%22%3A35.680805%2C%22');
		var lon = decodeURIComponent('%22%3A139.767798%2C%22');
		var node = decodeURIComponent('%22%3A%2200006668%22%2C%22road-type%22%3A%22default%22%7D&'); 
	}
	if (b == 'Tokyo'){ 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E6%9D%B1%E4%BA%AC%22%2C%22'); 
		var lat2 = decodeURIComponent('%22%3A35.680805%2C%22');
		var lon2 = decodeURIComponent('%22%3A139.767798%2C%22');
		var node2 = decodeURIComponent('%22%3A%2200006668%22%2C%22road-type%22%3A%22default%22%7D&'); 
	} 
	if (a == 'Ueno') { 
		var name = decodeURIComponent('%7B%22name%22%3A%22%E4%B8%8A%E9%87%8E%22%2C%22'); //{"name":"上野","
		//var name = "{\"name\":\"上野\",\""; 
		var lat = decodeURIComponent('%22%3A35.713649%2C%22'); //":35.713649,"
		var lon = decodeURIComponent('%22%3A139.777345%2C%22'); 
		var node = decodeURIComponent('%22%3A%2200004067%22%2C%22'); 
	} 
	if (b == 'Ueno') { 
		var name2 = decodeURIComponent('%7B%22name%22%3A%22%E4%B8%8A%E9%87%8E%22%2C%22'); //{"name":"上野","
		//var name = "{\"name\":\"上野\",\""; 
		var lat2 = decodeURIComponent('%22%3A35.713649%2C%22'); //":35.713649,"
		var lon2 = decodeURIComponent('%22%3A139.777345%2C%22'); 
		var node2 = decodeURIComponent('%22%3A%2200004067%22%2C%22'); 
	} 
	if(day<10) {
    	day='0'+day
	} 
	month
	if(month<10) {
    	month='0'+month

	}  

	// var walkingResultsURL = "http://www.navitime.co.jp/maps/routeResult?start="+name+"lat"+lat+"lon"+lon+"node"+node+"road-type%22%3A%22default%22%7D&goal="+name2+"lat"+lat2+"lon"+lon2+"node"+node2+"road-type%22%3A%22default%22%7D&start-time=&month="+year+"%2F"+month+"&+&day="+day+"&hour="+hour+"&minute="+min+"&walk=only&walk-speed=standard&walk-route=distance"; 
	// var getWalkingSource = $("#walking_results").load(walkingResultsURL);
	// print(walkingResultsURL);	
	// //print(getWalkingSource); 
	// //findPrice(getWalkingSource);
	// return getWalkingSource;  
	// var walkingResultsURL = "http://www.navitime.co.jp/maps/routeResult?start="+name+"lat"+lat+"lon"+lon+"node"+node+"road-type%22%3A%22default%22%7D&goal="+name2+"lat"+lat2+"lon"+lon2+"node"+node2+"road-type%22%3A%22default%22%7D&start-time=&month="+year+"%2F"+month+"&+&day="+day+"&hour="+hour+"&minute="+min+"&walk=only&walk-speed=standard&walk-route=distance"; 
	// var getWalkingSource = $("#walking_results").load(walkingResultsURL);
	// print(walkingResultsURL);	
	// //print(getWalkingSource); 
	// //findPrice(getWalkingSource);
	// return getWalkingSource;  

	walkingResultsURl = "http://www.navitime.co.jp/maps/routeResult?start="+name+"lat"+lat+"lon"+lon+"node"+node+"road-type%22%3A%22default%22%7D&goal="+name2+"lat"+lat2+"lon"+lon2+"node"+node2+"road-type%22%3A%22default%22%7D&start-time=&month="+year+"%2F"+month+"&+&day="+day+"&hour="+hour+"&minute="+min+"&walk=only&walk-speed=standard&walk-route=distance"; 
	$.get(walkingResultsURl, function(result) {
		var regex = /"times"(...)/;
		console.log(result.match(regex));
		// console.log(result);
	});


	print(walkingResultsURl); 
}

/*
function getHTML(){ 
	var a = getWalkingUrl(); 
	var b = getTrainUrl(); 
	var c = getTaxiUrl(); 
	
	print(finalHTML); 
}

function HTMLParser(aHTMLString){
	var t = getTrainUrl(); 
  	var html = document.implementation.createDocument(t, "html", null),
    	body = document.createElementNS(t, "body");
  	html.documentElement.appendChild(body);

  	body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
    	.getService(Components.interfaces.nsIScriptableUnescapeHTML)
    	.parseFragment(aHTMLString, false, null, body));
	return body;
	print(body); 
}*/
/*
function findPrice(){
mainPrice = getWalkingSource.find('.mainPrice');
mainPriceNumber = mainPrice.text();
mainUnit = getWalkingSource.find('.mainUnit');
mainUnitText = mainUnit.text();
print(mainPriceNumber + mainUnitText);
}


function findTripTime(){
var times = table.find('.times');
var timesNumber = times.text();
var finalTime = timesNumber.match(/\d/g);
print(finalTime);
timeMinutes = finalTime[0]+finalTime[1];
print(int(timeMinutes));
}
*/
