var $body;
var bodyScrollHeight;

var $homepageIntroDiv;
var $bgcolorElements;
var $colorElements;
var $strokeColorElements;
var $fillColorElements;


function registerElements(){
	$body = $("body");
	bodyScrollHeight = $("body")[0].scrollHeight;
	$bgcolorElements = $("h2");
	$colorElements = $("body, a");
	$strokeColorElements = $("svg.stroke path");
	$fillColorElements = $("svg.fill path");
	$homepageIntroDiv = $("#homepage-intro");
}

var baseColor = jQuery.Color( "#222222" );
var otherColor = jQuery.Color( "#447088" );

function setGlobalColor(color){
	$bgcolorElements.css("background-color", color.toRgbaString() );
	$colorElements.css("color", color.toRgbaString() );
	$strokeColorElements.attr("stroke", color.toHexString() );
	$fillColorElements.attr("fill", color.toHexString() );
}

function fivehundredpx() {
	// initialize 500px SDK
	_500px.init({
	  sdk_key: '92d730ffbdca5625f0ded59fb58648fb840133f1'
	});
	
	// get my photos
  _500px.api('/photos', {feature: 'user', username: 'akaoka', image_size: 21, page: 1, rpp: 18}, function (response) {
	  	  
		$.each(response.data.photos, function () {
			console.log(this);
			
			$('#photo-gallery').append('<a href="https://500px.com' + this.url + '"><div class="thumbnail" style="background-image: url(' + this.images[0].url + ')"></div></a>');

		});  });
}

$( document ).ready(function() {
	// setup
	registerElements();
	setGlobalColor(baseColor);
	
	fivehundredpx();
	
	var homepageIntroHeight = $homepageIntroDiv.height();
	var homepageIntroMinHeight = 280;
		
	// transitions on scroll
	$( window ).scroll(function() {
		
		// intro section parallax
		$homepageIntroDiv.css( "-webkit-transform", "translateY("+ $body.scrollTop()/3 +"px)" );
		
	});
});