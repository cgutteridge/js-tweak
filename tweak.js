

jQuery.prototype.position = function() 
{
	var hPos = 0.5;
	var vPos = 0.5;
	if( this.attr( 'data-pos-h' ) )
	{
		hPos = this.attr( 'data-pos-h' );
	}
	if( this.attr( 'data-pos-v' ) )
	{
		vPos = this.attr( 'data-pos-v' );
	}
	var xPos = this.parent().innerWidth()*hPos - this.outerWidth()*0.5;
	var yPos = this.parent().innerHeight()*vPos - this.outerHeight()*0.5;
	this.css( 'margin-left', xPos+'px' );
	this.css( 'margin-top', yPos+'px' );
}

jQuery.prototype.scale = function() 
{
	this.css('display','inline-block');
	var hRatio = 1;
	var vRatio = 1;
	if( this.attr( 'data-scale-h' ) )
	{
		hRatio = this.attr( 'data-scale-h' );
	}
	if( this.attr( 'data-scale-v' ) )
	{
		vRatio = this.attr( 'data-scale-v' );
	}
	var maxW = this.parent().innerWidth()*hRatio;
	var maxH = this.parent().innerHeight()*vRatio;
	this.css('max-width',(maxW-1)+"px");
	var css=0;
	var ttl=100;

	do {
		css+=10;
		this.css( 'font-size',css+"%" );
		this.find( 'img' ).css( 'width',css+"%" );
		ttl--;
	}
	while( ttl>0 && this.innerHeight() <= maxH && this.innerWidth() <= maxW );

//alert( "ttl:"+ttl+" oh:"+this.innerHeight()+" maxh:"+maxH+" ow:"+this.innerWidth()+" maxw:"+maxW+" css:"+css);

	ttl=30;
	do {
		css-=0.5;
		this.css( 'font-size',css+"%" );
		this.find( 'img' ).css( 'width',css+"%" );
		ttl--;
	}
	while( ttl>0 && ( this.innerHeight() > maxH || this.innerWidth() > maxW ) );
	this.find( 'img' ).each(function(i,img){
		img=$(img);
		var w=img.innerWidth();
		var h=img.innerHeight();
		img.width(w);
		img.height(h);
	});
	//this.css('display','inline-block');

	if( ttl==0 ) { alert( "error: ttl on sclaing "+this.html()+" ran out" ); }
}

$(document).ready( applyTweaks );
$(window).resize( applyTweaks );

function applyTweaks() {
	$('.scale-me').each( function(i,e){ $(e).scale(); } );
	$('.position-me').each( function(i,e){ $(e).position(); } );
}

