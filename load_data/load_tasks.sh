#!/bin/bash

curl "http://localhost:1337/productTasks/create?entrpPrdctGid=1&taskNam=create+drug+dimension" && \
curl "http://localhost:1337/productTasks/create?entrpPrdctGid=1&taskNam=create+plan+dimension" && \
curl "http://localhost:1337/productTasks/create?entrpPrdctGid=1&taskNam=load+transaction+data" && \
curl "http://localhost:1337/productTasks/create?entrpPrdctGid=2&taskNam=create+drug+dimension" && \
curl "http://localhost:1337/productTasks/create?entrpPrdctGid=2&taskNam=create+plan+dimension" && \
curl "http://localhost:1337/productTasks/create?entrpPrdctGid=2&taskNam=load+transaction+data"

