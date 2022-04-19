#!/usr/bin/env sh

read -r _ uri _

while read -r line; do
  line=$(echo $line | tr -d "\n\r")
  [ -z "$line" ] && break
done

token=$(echo "$uri" | sed -n -E 's/.+\.well-known\/acme-challenge\/([[:graph:]]+)/\1/p')
if [ -z "$token" ]; then
  printf "HTTP/1.0 404 Not Found\r\n\r\n"
else
  printf 'HTTP/1.0 200 OK\r\n\r\n%s.%s' "$token" "$ACCOUNT_THUMBPRINT"
fi
