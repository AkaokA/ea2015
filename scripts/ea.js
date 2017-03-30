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

var fullscreenMode = false;
var animationSpeed = 500;

function enableFullscreen(callback){
	fullscreenMode = true;
	$spinner.fadeIn(animationSpeed, 'easeInOutCubic');
	$fullscreenWrapper.fadeIn(animationSpeed, 'easeInOutCubic', callback);
	
	// prevent scroll on body
	$html.css("overflow", "hidden");
	
	$fullscreenWrapper.click(function(){
		$(this).fadeOut(animationSpeed, 'easeInOutCubic', function(){
			
			$fullscreenWrapper.contents().filter(function(){
			    return !$(this).is('.spinner');
			}).remove();
			
			$fullscreenWrapper.hide();

			$html.css("overflow", "");
		});
		
		fullscreenMode = false;
	});
}

var pageToLoad = 1;
var imagesPerPage = 36;

function load500pxThumbnails() {
	// get my photos
  _500px.api('/users/769630/galleries/3bda7726ae3b92e5448ce63ffcebce38077fd72d0a7fd6e390fd08cb18a01599/items', {image_size: 21, sort: 'taken_at', sort_direction: 'desc', page: pageToLoad, rpp: imagesPerPage, include_missing: 1}, function (response) {
	  	  
		$.each(response.data.photos, function(){			
			$photoGallery.append('<div class="thumbnail" style="background-image: url(' + this.images[0].url + ')" data="'+ this.id +'"></div>');
// 			$photoGallery.append('<img class="thumbnail" src="'+ this.images[0].url +'" data="'+ this.id +'"/>');
		});
	});
		
	pageToLoad++;	
	
}

function clickEvents() {
/*
	$portfolioTile.click(function(){
		enableFullscreen();
	});
*/
	
	$photoGallery.on("click", ".thumbnail", function(){
		var photoId = $(this).attr("data");
		
		enableFullscreen(function() {
			$fullscreenWrapper.append('<div class="fullscreen-photo"></div>');
			$fullscreenPhoto = $(".fullscreen-photo");
			
			// get photo by id
		  _500px.api('/photos/'+ photoId, {image_size: 2048}, function(response) {
				var imageUrl = response.data.photo.images[0].url;
				var photoTitle = response.data.photo.name;
		
		    var bgImg = new Image();
		    bgImg.onload = function(){
					$fullscreenPhoto.css("background-image", "url(" + bgImg.src + ")");
					$fullscreenPhoto.fadeIn(animationSpeed+1000, 'easeInOutCubic', function(){
						$fullscreenWrapper.append('<div class="fullscreen-photo-info"><p><strong>'+ photoTitle +'</strong><a href="https://500px.com/photo/'+ photoId +'">view on 500px</a></p></div>');
						$(".fullscreen-photo-info").fadeIn(animationSpeed, 'easeInOutCubic');
					});
					$spinner.fadeOut(animationSpeed, 'easeInOutCubic');
		    };
		    bgImg.src = imageUrl;
			});			
		});
	});
	
	$(".load-more-photos").click(function(event){
		event.preventDefault();
		load500pxThumbnails();
	});
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
	// DOM setup
	registerElements();
/* 	setGlobalColor(baseColor); */
	
	if ($photoGallery) {
  	// initialize 500px SDK
  	_500px.init({
  	  sdk_key: '92d730ffbdca5625f0ded59fb58648fb840133f1'
  	});
  	
  	load500pxThumbnails();
  	clickEvents();
  }

	if ($homepageIntroDiv) {
  	scrollEvents();
	}
	
});