#!/bin/bash

curl "http://localhost:1337/productFormatAttributes/create?atrbNam=Patient+Id&prdctFrmtGid=1" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=Pharmacy+Id&prdctFrmtGid=1" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=Drug+Id&prdctFrmtGid=1" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=Rx+fill+date&prdctFrmtGid=1" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=Pill+count&prdctFrmtGid=1" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=Pharmacy+Id&prdctFrmtGid=2" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=Pharmacy+name&prdctFrmtGid=2" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=City&prdctFrmtGid=2" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=State&prdctFrmtGid=2" && \
curl "http://localhost:1337/productFormatAttributes/create?atrbNam=ZIP+code&prdctFrmtGid=2"

