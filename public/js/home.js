// fetch("data/gmsea-level.json")
// .then(response=>{
// 	fetch(response.url)
// 	.then(data=>{
// 	 return data.json()
// 	})
// 	.then(data=>{
// 		var	dataArray=new Array(0)
// 		var labelsArray = new Array()
// 		for (var i = 0; i < data.length; i++) {
// 			dataArray.push(data[i].GMSL)
// 			labelsArray.push(data[i].Time)
// 			console.log(labelsArray)
// 		}
// 		console.log(typeof(dataArray))
// 		var JsonData = [{
// 				label : "Date",
// 				data : dataArray  
// 			}]
// 		ctx = document.getElementById("GmslGraph")
// 		ctx.height = document.documentElement.clientHeight * .70
// 		ctx.width = document.documentElement.clientWidth
// 		chart = new Chart(ctx,{
// 			type:'line',
// 			data:{
// 				labels:labelsArray,
// 				datasets:JsonData
// 			},
// 			options:{
// 				label:"Rise in Sea level",
// 				backgroundColor:'rgba(20,20,23,1)',
// 				borderColor:'rgba(10,10,22,1)',
// 				borderWidth:5,
// 				lineTension:0.3,
// 			    responsive: true,
//     			scaleBeginAtZero: true,
// 				maintainAspectRatio: false,
// 				layout: {
//            			padding: {
// 	               		left: 10,
// 	                	right: document.documentElement.clientWidth * .50,
//                 		top: document.documentElement.clientHeight * 0.01,
//                 		bottom: document.documentElement.clientHeight * .01
//             				}
// 						},
// 				title:{
// 					display:true,
// 					text:'Rise in sea levels'
// 				}
// 			}
// 		})
// 		console.log(chart)
// 	})
// })

var seaChart = document.getElementsByClass("nasaSeaChart")
seaChart.height = document.documentElement.clientHeight*0.3