/*jslint white: true */
/*globals component */

(function(){
  "use strict";

  component('.card').assert( function(expect) {

  });

  component('.card-header').assert( function(expect) {
    expect.to.be.descendantOf('.card');
    expect.to.have.child('.card-headline');
  });
}());
