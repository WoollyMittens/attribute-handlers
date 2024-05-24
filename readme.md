# Attribute Handlers

Assigns handler classes to specific CSS selectors.

## Example

https://woollymittens.github.io/attribute-handlers/

## Instructions

Start the handler class to watch for changes to the document:

``` javascript
import { AttributeHandlers } from "./attribute-handlers.js";

const attributeHandlers = new AttributeHandlers();
```

The handlers will be applied to the associated html attributes as soon as they appear on the page:

``` html
<dl data-accordion-list>
...
</dl>
```

## License

&copy; Maurice van Creij. Licensed under [The MIT License](https://opensource.org/licenses/MIT).
