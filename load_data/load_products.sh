#!/bin/bash

curl "http://localhost:1337/enterpriseProducts/create?entrpPrdctNam=Prescriber+Rx" && \
curl "http://localhost:1337/enterpriseProducts/create?entrpPrdctNam=Weekly+Launchtrac" && \
curl "http://localhost:1337/enterpriseProducts/create?entrpPrdctNam=Customer+Source"

