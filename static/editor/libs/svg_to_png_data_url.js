function svg_to_png_data_url(sourceSVG, done) {
  // https://developer.mozilla.org/en/XMLSerializer
  var cvs = document.createElement('canvas');
  cvs.height = sourceSVG.getAttribute('height');
  cvs.width = sourceSVG.getAttribute('width');

  var ctx = cvs.getContext('2d');
  // this is just a JavaScript (HTML) image
  var img = document.createElement('img');
  // http://en.wikipedia.org/wiki/SVG#Native_support
  // https://developer.mozilla.org/en/DOM/window.btoa
  // 
  // var url = 'data:image/svg+xml;base64,' + 
  img.src = "data:image/svg+xml;base64," 
             + btoa(new XMLSerializer()
                        .serializeToString(sourceSVG).replace('Raphaël',''));
  img.onerror = function( e ) {
    console.log('error', e );
  }
  img.onload = function() {
    // after this, Canvas’ origin-clean is DIRTY
    ctx.drawImage(img, 0, 0);
    done && done(null, cvs.toDataURL('png'));
  }
}