FROM alpine/socat:1.7.4.3-r0

ENV ACCOUNT_THUMBPRINT ""

COPY ./server.sh ./server.sh

EXPOSE 80

ENTRYPOINT ["socat", "tcp-listen:80,fork,reuseaddr", "exec:./server.sh"]
