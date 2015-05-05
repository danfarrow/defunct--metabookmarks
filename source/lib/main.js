// Add a toolbar button to open the bookmark search page
let buttons = require('sdk/ui/button/action');
var button = buttons.ActionButton({
  id: "metabookmarks",
  label: "Metabookmarks",
  icon: {
    "16": "./book_open_bookmark-16.png",
    "32": "./book_open_bookmark-32.png",
    "64": "./book_open_bookmark-64.png"
  },
  onClick: handleMetaBookmarksClick
});

/**
 * Metabookmarks toolbar button handler
 *
 * @todo Load search-bookmarks-by-tag.html
 */
function handleMetaBookmarksClick( state ){
	showBookmarksByTag( 'project_javascript' );
}

/**
 * Output list of bookmarks tagged with `tag`
 *
 * @param Array tags The tags
 * @return Null
 * @todo Accept an array of tags
 */
function showBookmarksByTag ( tags ) {
	clearOutput();

	// Convert tags to array
	if ( "string" === typeof tags ){
		tags = [ tags ];
	}

	output ( '<ul>' );

	let { search } = require("sdk/places/bookmarks");

	let emitter = search( { tags: tags } );

	emitter.on( "data", function ( data ){
		output( formatBookmark( data.url, data.title, data.tags ) );
	})
	.on( "end", function ( results ){
		output ( '</ul>' );
		output(
			( results.length || "No" )
			+ " results found for tags \"[ " + tags.join(", ") + " ]\""
		);
	});
}

/**
 * Create bookmarks HTML snippet
 *
 * @param String url Link URL, wrapped in " "
 * @param String title Title of link
 * @param Array tags Disregarded for now (see @todo below)
 * @return String HTML snippet
 * @todo Display list of clickable tags after main link
 */
 function formatBookmark( url, title, tags ){
	return "<li><a target=\"_blank\" href=" + url + ">" + title + "</a></li>";
 }

/**
 * Append some HTML to the specified tab
 *
 * @param String content The html to append
 * @param Object tab OPTIONAL The tab to append it to
 * @return Null
 */
function output( content, tab ){
	let tabs = require("sdk/tabs");
	tab = tab || tabs.activeTab;

	if ( 'string' !== typeof content ){
		content = content.toString();
	}

	console.log( 'typeof tab: ' + typeof tab );

	// Escape " from content
	content = content.replace( /"/g, '\\');

	tab.attach({
		contentScript: 'document.body.innerHTML += "' + content + '<br>";'
	});
}

/**
 * Clear the innerHTML of the specified tab
 *
 * @param Object OPTIONAL tab
 * @return Null
 */
function clearOutput( tab ){
	let tabs = require("sdk/tabs");
	tab = tab || tabs.activeTab;

	tab.attach({
		contentScript: 'document.body.innerHTML = ""'
	});
}


/* DUMP! */

/*
function handlerAttempt(){
	// Attempting custom protocol for bookmark://
	let {Cc, Ci} = require( "chrome" );
	let xpcom = require( "sdk/platform/xpcom" );

	var handler = Cc[ "@mozilla.org/uriloader/web-handler-app;1" ]
	    .createInstance( Ci.nsIWebHandlerApp );

	// Handle bookmark: protocol
	handler.name = 'Bookmark protocol';
	handler.uriTemplate = 'http://localhost/bookmark/#%s';

	var eps = Cc[ "@mozilla.org/uriloader/external-protocol-service;1" ].
	getService( Ci.nsIExternalProtocolService );

	var handlerInfo = eps.getProtocolHandlerInfo( 'bookmark' );
	handlerInfo.possibleApplicationHandlers.appendElement(handler, false);
	handlerInfo.alwaysAskBeforeHandling = false;// don't ask the user
	handlerInfo.preferredApplicationHandler = handler;  // set my handler as default
	hi = handlerInfo;

	var hs = Cc[ "@mozilla.org/uriloader/handler-service;1" ].getService( Ci.nsIHandlerService );
	hs.store(handlerInfo);
}

/*
function makeTestBookmarks () {
	makeTestBookmark( "Test bookmark 1", "http://example.com#1", ["test"] );
	makeTestBookmark( "Test bookmark 2", "http://example.com#2", ["test", "banana"] );
	makeTestBookmark( "Test bookmark 3", "http://example.com#3", ["test", "orange"] );
	output ( 'Test bookmarks made. <a target="_blank" href="http://localhost/bookmarks/test">Click here</a>' );
}
*/


/*
function makeTestBookmark( title, url, tags ) {
	// Convert tags to array
	if ( "string" === typeof tags ){
		tags = [ tags ];
	}

	let { Bookmark, save } = require( "sdk/places/bookmarks" );

	// Create a new bookmark instance, unsaved
	let bookmark = Bookmark({ title: title, url: url, tags: tags });

	// Attempt to save the bookmark instance to the Bookmarks database
	// and store the emitter
	let emitter = save( bookmark );

	// Listen for events
	emitter.on( "data", function ( saved, inputItem ) {
	  // on a "data" event, an item has been updated, passing in the
	  // latest snapshot from the server as `saved` (with properties
	  // such as `updated` and `id`), as well as the initial input
	  // item as `inputItem`
	  console.log( saved.title === inputItem.title ); // true
	  console.log( saved !== inputItem ); // true
	  console.log( inputItem === bookmark ); // true
	}).on( "end" , function ( savedItems, inputItems ) {
	  // Similar to "data" events, except "end" is an aggregate of
	  // all progress events, with ordered arrays as `savedItems`
	  // and `inputItems`
	});


}
*/