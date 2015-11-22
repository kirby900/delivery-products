#!/bin/bash

curl "http://localhost:1337/productParameters/create?entrpPrdctGid=1&parmNam=MIN_DATE" && \
curl "http://localhost:1337/productParameters/create?entrpPrdctGid=1&parmNam=MAX_DATE" && \
curl "http://localhost:1337/productParameters/create?entrpPrdctGid=1&parmNam=MARKET_KEY" && \
curl "http://localhost:1337/productParameters/create?entrpPrdctGid=2&parmNam=SLSFC_GID" && \
curl "http://localhost:1337/productParameters/create?entrpPrdctGid=2&parmNam=INCREMENTAL_FLAG" && \
curl "http://localhost:1337/productParameters/create?entrpPrdctGid=2&parmNam=SHOW_UNICORNS"

