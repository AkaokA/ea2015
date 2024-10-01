var $html;
var $body;
var $window;
var bodyScrollHeight;

var $homepageIntroDiv;
var $homepageHeader;
var $bgcolorElements;
var $colorElements;
var $strokeColorElements;
var $fillColorElements;

var $photoGallery;
var $fullscreenWrapper;
var $spinner;
var $fullscreenPhoto;
var $fullscreenPhotoInfo;



function registerElements(){
	$html = $("html");
	$body = $("body");
	$window = $(window);
	
	bodyScrollHeight = $("body")[0].scrollHeight;
	$bgcolorElements = $("h2");
	$colorElements = $("body, a");
	$strokeColorElements = $("svg.stroke path");
	$fillColorElements = $("svg.fill path");
	$homepageIntroDiv = $("#homepage-intro");
	$homepageHeader = $(".homepage-header");
	$portfolioTile = $(".section-work .tile");
	$photoGallery = $("#photo-gallery");
	$fullscreenWrapper = $(".fullscreen-wrapper");
	$spinner = $(".spinner");
}

var baseColor = jQuery.Color( "#222222" );

function setGlobalColor(color){
	$bgcolorElements.css("background-color", color.toRgbaString() );
	$colorElements.css("color", color.toRgbaString() );
	$strokeColorElements.attr("stroke", color.toHexString() );
	$fillColorElements.attr("fill", color.toHexString() );
}

function scrollEvents() {		
	$(window).scroll(function(event) {
			// intro section parallax
			
			$homepageIntroDiv.css( "-webkit-transform", "translateY("+ $window.scrollTop()/3 +"px)" );
			
			if ( $window.scrollTop() > ($window.height() - 160) ) {
				$homepageHeader.removeClass("hidden");
			} else {
				$homepageHeader.addClass("hidden");
			}
	});
	
	// prevent touch scrolling in fullscreen mode
	$(document).bind('touchmove', function(e){
		if (fullscreenMode) {
			e.preventDefault();           
		}
	});
}

$(window).load(function(){
	window.targetGlobalSettings = {
	  cookieDomain: "ericakaoka.com"
	};
	
	// DOM setup
		registerElements();

	if ($homepageIntroDiv) {
		scrollEvents();
	}
	
});