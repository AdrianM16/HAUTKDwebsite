# HAU Taekwondo Sports Program Website

Website for the **Holy Angel University Taekwondo Sports Program** in Angeles City, Philippines. It shows the program, coaches, squads, training schedule, competition record, events, and how HAU students can join.

**Live site:** https://adrianm16.github.io/HAUTKDwebsite/

## Pages

| Page | Content |
| --- | --- |
| `index.html` | Home: program tracks, training videos, medal wall, squads, mission, how to join |
| `about.html` | Coaches, gallery, training levels, the five tenets, facilities, weekly schedule |
| `event.html` | Competition record by year, event calendar, registration form |
| `contact.html` | Contact details, message form, map |
| `404.html` | Not-found page |

## Design

- **Colors:** HAU maroon `#6E0A16`, wine `#7A2B3A`, off-white `#F3EFE9`, ash `#8C8C8C` and ink `#141113`, with gold `#E7B21F` from the HAU crest. Belt colors are used for small details.
- **Fonts:** Big Shoulders Display for headings, Instrument Sans for text, Noto Serif KR for the Korean words.
- **Motion:** sections slide in on scroll, a belt-colored progress bar, a drawn underline in the hero, taped photos, and a ticker of the five tenets. Motion turns off when "reduce motion" is enabled on the device.

Colors and fonts are set at the top of `styles.css`.

## Forms

The registration and contact forms open the visitor's email app with the message already filled in, addressed to `hautaekwondo@gmail.com`. To change the address, edit `CONTACT_EMAIL` in `script.js` and the `mailto:` links in the HTML.

## Updating content

- **Events:** in `event.html`, copy an `<article class="event">` block and change its `data-end="YYYY-MM-DD"`, date, text and image. The Upcoming / Completed label updates by itself.
- **Competition record:** in `event.html`, copy an `<li class="rec">` block inside `#record`.
- **Schedule:** edit the `.timetable` block in `about.html`.
- **Photos:** add the image to the folder and update the `src` and `alt`.

## Run locally

```bash
git clone https://github.com/AdrianM16/HAUTKDwebsite.git
cd HAUTKDwebsite
```

Then open `index.html` in a browser.

## Built with

HTML, CSS and JavaScript. Hosted on GitHub Pages.
