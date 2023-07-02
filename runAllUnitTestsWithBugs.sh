#!/bin/bash

mkdir -p testResults

total=10
for i in $(seq 1 $total); do
    echo "Running test for BUG_ID=$i"
    BUG_ID=$i npm run test:unit &> testResults/bug_id_$i.txt
    echo "Completed: $(( (i * 100) / total ))%"
done