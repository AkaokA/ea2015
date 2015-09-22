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

$( document ).ready(function() {
	// setup
	registerElements();
	setGlobalColor(baseColor);
	
	var homepageIntroHeight = $homepageIntroDiv.height();
	var homepageIntroMinHeight = 280;
	
	// transitions on scroll
	$( window ).scroll(function() {
// 		var scrollPercent = $body.scrollTop() / ( bodyScrollHeight - $body.outerHeight() );		
// 		var transitionColor = baseColor.transition(otherColor, scrollPercent);
// 		setGlobalColor(transitionColor);
		
		$homepageIntroDiv.css( "-webkit-transform", "translateY("+ $body.scrollTop()/3 +"px)" );
		
	});
});