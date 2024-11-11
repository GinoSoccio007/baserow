version: "3.4"
services:
  baserow:
    image: baserow/baserow:1.19.1
    container_name: baserow
    environment:
      - BASEROW_PUBLIC_URL=
      - BASEROW_CADDY_ADDRESSES=:80
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - baserow_data:/baserow/data
    restart: unless-stopped

volumes:
  baserow_data:
