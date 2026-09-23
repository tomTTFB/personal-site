# TomTTFB Personal Site

My personal site for Hack Club Pixl, it shows who I am, some of my projects and my contact links.

## Description

A personal portfolio site built with plain HTML, CSS and JavaScript. It has three pages, a home page, a projects page and a links page with my GitHub, LinkedIn and TryHackMe.

It also includes a ripple mouse trail effect drawn on a canvas and a text-unscrambling effect on page load.

The site is self-hosted on my Homelab, served by an nginx Docker container behind Nginx Proxy Manager and Cloudflare.

Rather than using a hosting service, I made the site runs on my own Homelab. It's served by an nginx Docker container, with Nginx Proxy Manager handling the reverse proxy and SSL, and Cloudflare in front for DNS and caching:

```
Visitor → Cloudflare → Nginx Proxy Manager → nginx container → site files
```

Visit it at https://tomttfb.com

### Screenshots

![Home page](images/home.png)

## Getting Started

### Dependencies

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled, for the ripple and text effects

## Help

- If the effects don't show, check JavaScript is enabled
- If the page looks outdated, do a hard refresh (Ctrl + Shift + R) since Cloudflare may be serving a cached version

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
