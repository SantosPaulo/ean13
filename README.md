# EAN13

Package for reasily generate EAN13 barcodes and validate them.

Basic usage:
```
// Import to your project
const EAN13 = require('ean13')

const country = 560;
const companyId = 4444;
const productId = 55555;

EAN13.generateEAN13(country, companyId, productId);

```

***Available methods:***
- getCountries(),
- calcEanDigit(barcode),
- validateEan13(barcode),
- generateEAN13(country, company, productId),

***Author: Paulo Santos***