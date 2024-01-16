for file_name in $@
do
  title="                    RUNNING TESTS FOR FILE: $file_name                   "
  length=${#title}
  echo -e "\n\n"
  for i in $( seq 0 $length ); do echo -n '-'; done
  echo -e "\n$title"
  for i in $( seq 0 $length ); do echo -n '-'; done
  npm test $file_name
done




