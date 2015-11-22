#!/bin/bash

curl "http://localhost:1337/productFormats/create?prdctFrmtNam=Transaction+file&entrpPrdctGid=1" && \
curl "http://localhost:1337/productFormats/create?prdctFrmtNam=Pharmacy+file&entrpPrdctGid=1" && \
curl "http://localhost:1337/productFormats/create?prdctFrmtNam=Control+file&entrpPrdctGid=1" && \
curl "http://localhost:1337/productFormats/create?prdctFrmtNam=Prescription+file&entrpPrdctGid=2" && \
curl "http://localhost:1337/productFormats/create?prdctFrmtNam=Pharmacy+file&entrpPrdctGid=2"

