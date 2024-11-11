FROM baserow/baserow:1.19.1

EXPOSE 80

ENV BASEROW_PUBLIC_URL=http://mskwo0gws0c8owwsswkc0c0k.104.37.187.180.sslip.io
ENV BASEROW_CADDY_ADDRESSES=:80
ENV DJANGO_SETTINGS_MODULE=baserow.config.settings.base
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/baserow
ENV REDIS_URL=redis://redis:6379

CMD ["/baserow/startup.sh"]
