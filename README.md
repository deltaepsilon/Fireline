# Fireline

[Read the docs](https://fireline.chrisesplin.com/)

# Local Development

Front-end environments

1. Edit `app/environments/app-env.dev.js`
2. Edit `app/environments/app-env.prod.js`

Firebase Functions environments

1. See `app/functions/environments/functions-env.js`

## Make sure to base64 encode your service-account.json file

See [Export secret file to Gitlab pipeline](https://medium.com/@michalkalita/export-secret-file-to-gitlab-pipeline-75789eee35bd)

## Set the environment variables in your CI/CD environment

```
FIREBASE_DATABASE_URL=https://fireline-2020.firebaseio.com
FIREBASE_PROJECT=fireline-2020
FIREBASE_TOKEN=ABCDEFG
GOOGLE_APPLICATION_CREDENTIALS=/app/functions/service-account.json
STRIPE_PK=pk_test_ABCDEFG
STRIPE_SK=sk_test_ABCDEFG
STRIPE_SIGNING_SECRET_INVOICE=whsec_ABCDEFG
STRIPE_SIGNING_SECRET_PRICE=whsec_ABCDEFG
STRIPE_SIGNING_SECRET_PRODUCT=whsec_ABCDEFG
STRIPE_SIGNING_SECRET_SUBSCRIPTION=whsec_ABCDEFG
SERVICE_ACCOUNT_BASE64=ABCDEFG
```
Note: `FIREBASE_TOKEN` can obtained by running `yarn ci:login` from inside the `dev` container.

Obtain your base64-encoded service account with `cat path/to/service-account.json | base64 -w 0`.

## Certbot

Fireline development is much easier with HTTPS. Unfortunately, it's not easy to do local dev with HTTPS without a fair bit of local setup. You can still work directly from [http://localhost:4000](http://localhost:4000). If you decide that you want HTTPS, you can achieve that by finding a domain that you own and directing its DNS to your dev environment.

For example, `local.chrisesplin.com` points to `98.32.85.12` which is the public IP of Chris's home network. Chris configures his router to forward port 443 to the local IP of his development computer. He can then use Certbot to obtain valid certificates from [Let's Encrypt](https://letsencrypt.org/). This repo's `nginx` container is configured to serve those certificates. See `dev/nginx/app.conf`.

Run `docker-compose run certbot` to create or renew your certs. You'll need to change `local.chrisesplin.com` in both `dev/certbot/scripts/challenge.sh` and `dev/nginx/app.conf`

See [@pentacent's article on Certbot with Docker Compose](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)

Huge props to [Nic Raboy](https://twitter.com/nraboy) for [this article on Docker Compose reverse proxies](https://www.thepolyglotdeveloper.com/2017/03/nginx-reverse-proxy-containerized-docker-applications/)
