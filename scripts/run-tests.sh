for file_name in $@
do
  echo "-------------- RUNNING TESTS FOR FILE:" $file_name "-------------"
  npm test $file_name
done




