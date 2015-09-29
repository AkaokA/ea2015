var $html;
var $body;
var bodyScrollHeight;

var $homepageIntroDiv;
var $bgcolorElements;
var $colorElements;
var $strokeColorElements;
var $fillColorElements;

var $photoGallery;
var $fullscreenPhotoWrapper;
var $fullscreenPhoto;
var $fullscreenPhotoInfo;

function registerElements(){
	$html = $("html");
	$body = $("body");
	
	bodyScrollHeight = $("body")[0].scrollHeight;
	
	$bgcolorElements = $("h2");
	$colorElements = $("body, a");
	$strokeColorElements = $("svg.stroke path");
	$fillColorElements = $("svg.fill path");
	
	$homepageIntroDiv = $("#homepage-intro");
	
	$photoGallery = $("#photo-gallery");
	$fullscreenPhotoWrapper = $(".fullscreen-photo-wrapper");
	$fullscreenPhoto = $(".fullscreen-photo");
	$fullscreenPhotoInfo = $(".fullscreen-photo-info");
}

var baseColor = jQuery.Color( "#222222" );

function setGlobalColor(color){
	$bgcolorElements.css("background-color", color.toRgbaString() );
	$colorElements.css("color", color.toRgbaString() );
	$strokeColorElements.attr("stroke", color.toHexString() );
	$fillColorElements.attr("fill", color.toHexString() );
}

var pageToLoad = 1;
var imagesPerPage = 12;

function load500pxPhotos() {
	// get my photos
  _500px.api('/photos', {feature: 'user', username: 'akaoka', image_size: 21, page: pageToLoad, rpp: imagesPerPage}, function (response) {
	  	  
		$.each(response.data.photos, function () {			
			$photoGallery.append('<div class="thumbnail" style="background-image: url(' + this.images[0].url + ')" data="'+ this.id +'"></div>');
			
		});
	});
		
	pageToLoad++;	
}

var photoIsFullscreen = false;

function photoGalleryEvents() {
	$photoGallery.on("click", ".thumbnail", function(){
		photoIsFullscreen = true;
		
		// prevent scroll on body
		$html.css("overflow", "hidden");
		
		_this = $(this);
		var photoId = $(this).attr("data");
		
		$fullscreenPhotoWrapper.fadeIn( function(){
			
			// get photo by id
		  _500px.api('/photos/'+ photoId, {image_size: 2048}, function (response) {
				var imageUrl = response.data.photo.images[0].url;
				var photoTitle = response.data.photo.name;
				
				$fullscreenPhoto.load(imageUrl, function(){
					console.log("lol");
					$fullscreenPhoto.css("background-image", "url(" + imageUrl + ")").fadeIn();
					$fullscreenPhotoInfo.html('<p>'+ photoTitle +'</p>');
				});
				
			});			
		});
	});
	
	$fullscreenPhotoWrapper.click(function(){
		$(this).fadeOut( function(){
			$fullscreenPhoto.css("background-image", "none");
			$fullscreenPhotoInfo.empty();
			$html.css("overflow", "");
		});
		
		photoIsFullscreen = false;
	});
}

function scrollEvents() {		
	// transitions on scroll
	$( window ).scroll(function(event) {
			// intro section parallax
			$homepageIntroDiv.css( "-webkit-transform", "translateY("+ $body.scrollTop()/3 +"px)" );		
	});
}

$( document ).ready(function() {
	// setup
	registerElements();
	setGlobalColor(baseColor);
	
	// initialize 500px SDK
	_500px.init({
	  sdk_key: '92d730ffbdca5625f0ded59fb58648fb840133f1'
	});
	
	// load 500px photos
	load500pxPhotos();
	$(".load-more-photos").click(function(event){
		event.preventDefault();
		load500pxPhotos();
	});
	
	photoGalleryEvents();
	
	scrollEvents();
	
	$(document).bind('touchmove', function(e){
		if (photoIsFullscreen) {
			e.preventDefault();           
		}
	});
	
});