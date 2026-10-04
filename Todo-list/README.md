## Tokenization
* Tokenization means breaking a piece of code into smaller part called tokens, so that it helps to understand structure during parsing.

## Parsing
* parsing means creating relationship between this pieces of codes called tokens used when machine compiles the code.

## DOM Tree
* DOM is a tree like structure of HTML page created by browser.
when HTML file loads on browser , it parses the HTML and create a DOM tree structure.

## CSSOM Tree
* CSSOM tells the browser how to style that content.

## Render Tree
* The Render Tree is the final blueprint the browser uses to paint pixels onto your screen. It is created by combining the DOM Tree (the content) and the CSSOM Tree (the styles) together.
- HTML -> Parsing -> DOM Tree
- CSS -> Parsing -> CSSOM Tree -> DOM + CSSOM -> Render Tree -> Layout -> Paint -> Screen

## Event Bubbling
* Event bubbling is the process where an event starts from the target element and propagates upward through its parent elements.
- Bubbling: child → parent → grandparent 

## Event Capturing
* In capturing, an event travels from the outermost parent toward the target/child element.
- Capturing: parent → child → target.

## Event Delegation
- Event delegation is a technique of attaching a single event listener to a parent element to handle events from its child elements using event bubbling.

            
               

