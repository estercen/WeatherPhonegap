// JQuery Mobile


$(document).on("mobileinit", function(){

	$(function(){



			$("#lista").on("pageinit", function(){
				
				// guardo en un array los datos 
				var sitio = JSON.parse(localStorage.getItem('ciudades'));
				//preguntar si contiene algo
				//si contiene,
				if (sitio != null){
				//recorro el array y los añado a la lista de ciudades
					$.each(sitio, function(i, val) {
  						$("#listaciudades").append("<li><a href='#'>" + sitio[i] + "</a></li>");
  						$("#listaciudades").listview( "refresh" );
					});
				}

			});
			
			$("#main").on("pageinit", function(){
			//$("#getweather").click(function(){
				var lat;
				var long;
				var city = "madrid";
				var country = "spain"
				var key = '314d0dcc8fd61af30f18e7a1a5e359f0';

				navigator.geolocation.getCurrentPosition(successF, errorF);
				function successF(position) {
					lat = position.coords.latitude;
					long = position.coords.longitude;
					//alert('Your latitude is :'+lat+' and longitude is '+long);
					$.ajax({
						url:'http://api.openweathermap.org/data/2.5/weather',
						dataType:'json',
						type:'GET',
						data:{ lat: lat, lon: long, appid: key, units: 'metric'},

						success: function(data){
							var wf = '';
							$.each(data.weather, function(index,val){

								wf +='<p><b>' + data.name + ',' + data.sys.country + "</b><img src='icon/"+ val.icon + ".png'></p>"+ '<h2>' +
								 Math.round(data.main.temp) + '&deg;C ' + ' | ' + '<span>' + val.main + ", " +
								val.description + '</span></h2>' + "<sub><img src='icon/maxmin.png  '>" + Math.round(data.main.temp_min)
								+ '&deg;C ' + ' - ' + Math.round(data.main.temp_max) + '&deg;C' + '<big> | </big>' + "<img src='icon/humidity.png'>"
								+ data.main.humidity + '%   ' + '<big> | </big>' + "<img src='icon/wind.png'>" + Math.round(data.wind.speed) + '  km/h</sub>' 
								
								console.log(data);
	 						});
	 						$("#showweather").html(wf);
						}

					});

					//añadir de forma dinámica 
					/*var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+key+'&units=metric';
					$.getJSON(url)
					.done(function(response){
						$.each(response, function(){
								console.log(response);
	 					});
					});*/
				}
				function errorF(position){
					alert('Error!');
				}	
			}); 

			$("#busca").on("pageinit", function(){
		
				$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
			        var $ul = $( this ),
			            $input = $( data.input ),
			            value = $input.val(),
			            html = "";
			        $ul.html( "" );
			        if ( value && value.length > 2 ) {
			            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
			            $ul.listview( "refresh" );
			            $.ajax({
			                url: "http://gd.geobytes.com/AutoCompleteCity",
			                dataType: "jsonp",
			                crossDomain: true,
			                data: {
			                    q: $input.val()
			                }
			            })
			            .then( function ( response ) {
			                $.each( response, function ( i, val ) {
			                    html += "<li><a href ='#'>" + val + "</a></li>";
			                });
			                $ul.html( html );
			                $ul.listview( "refresh" );
			                $ul.trigger( "updatelayout");
			            });
			        }
			    });
			});



			//añadir ciudad en la lista de ciudades 

			$("#autocomplete").on('click', 'li', function() {
				$.mobile.changePage("#lista", { transition: "slideup" });
				let ciudad = "<li><a href='#'>" + $(this).text() + "</a></li>";
				$("#listaciudades").append(ciudad);
				$("#listaciudades").listview( "refresh" );
				/*$.ajax({
					url: "http://api.openweathermap.org/data/2.5/weather?appid=8d95980ea77ed071e770126d777bde48",
					data: {
						q: $(this).text()
					}
				})
			
				.then( function ( response ) {
				console.log(response);
				
				});*/


				//si existen,
				//traer datos actuales de localstorage y guardarlos en un array
				var sitio;
				if (JSON.parse(localStorage.getItem('ciudades')) != null){
					sitio = JSON.parse(localStorage.getItem('ciudades'));									
				}else{
					sitio = [];
				}

				sitio.push($(this).text());
				//guardar el array en localstorage
				localStorage.setItem('ciudades', JSON.stringify(sitio));

				// 

			});
		//ver otra ciudad

			$("#listaciudades").on('click', 'li', function() {
				$.mobile.changePage("#main", { transition: "slideup" });
				$.ajax({
					url: "http://api.openweathermap.org/data/2.5/weather?appid=8d95980ea77ed071e770126d777bde48",
					data: {
						q: $(this).text(),
						units: 'metric'

					},
					success: function(data){
							var wf = '';
							$.each(data.weather, function(index,val){

								wf +='<div class="nom"><p><b>' + data.name + ',' + data.sys.country + "</b></div><img src='icon/"+ val.icon + ".png'></p>"+ '<h2>' +
								 Math.round(data.main.temp) + '&deg;C ' + ' | ' + '<span>' + val.main + ", " +
								val.description + '</span></h2>' + "<sub><img src='icon/maxmin.png  '>" + Math.round(data.main.temp_min)
								+ '&deg;C ' + ' - ' + Math.round(data.main.temp_max) + '&deg;C' + '<big> | </big>' + "<img src='icon/humidity.png'>"
								+ data.main.humidity + '%   ' + '<big> | </big>' + "<img src='icon/wind.png'>" + Math.round(data.wind.speed) + '  km/h</sub>' 
								
								console.log(data);
	 						});
	 						$("#showweather").html(wf);
						}
				});

			
				//$.getJSON"http://api.openweathermap.org/data/2.5/weather?appid=8d95980ea77ed071e770126d777bde48",
			
				//localStorage.setItem("ciudad", JSON.stringify(ciudad));

				//var storedNames = JSON.parse(localStorage.getItem("ciudad"));

			});

		
		
	



	});
});


