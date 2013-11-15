mass:werk termlib.js
=====================
The JavaScript library "termlib.js" provides a `Terminal' object, which facillitates a simple and object oriented approach to generate and control a terminal-like interface for web services.
"termlib.js" features direct keyboard input and powerful output methods for multiple and simultanious instances of the 'Terminal' object.
The library was written with the aim of simple usage and a maximum of compatibility with minimal foot print in the global namespace.

A short example:
```js
var term = new Terminal( {handler: termHandler} );
  term.open();

  function termHandler() {
     this.newLine();
     var line = this.lineBuffer;
     if (line != "") {
        this.write("You typed: "+line);
     }
     this.prompt();
  }
```

Key Features:
==============
 - Object oriented: Handle multiple instances independently at the same time!

 - Type styles: Ready-to-use type styles and support for custom styles and mark up.

 - Colors: Extended support for colors.

 - ANSI codes: Limited ANSI-support for SGR codes.

 - Text wrapping: Automatic text wrapping (v 1.3 and higher, see faq for details)

 - Remote communications: The socket extension for client-server remote communication (commonly known as AJAX) provides a tightly integrated API for a simple and object oriented approach to XMLHttpRequests. (Starting with version 1.5 the socket extension is included in the main library.)

 - Import methods: "termlib.js" provides methods for text import via dialogs or copy'n'paste.

 - Parser: Set up your own shell-like application using the included parser.

 - Documentation: Extensive documentation and loads of usage examples.

 - Free: Best of all: "termlib.js" is free, see the licence below.


Note on Backward Compatibility:
===============================

Version 1.5
 - Changed the license.
 - Also dropped support for Netscape 4 (layers) and included the socket extension in the main library.
 - As the socket extension is now included in the library, please delete any script-tags refering to "termlib_socket.js" from older applications!
 
Version 1.52
 - Re-organized the Parser. The parser is now a self-contained object with a constructor.
