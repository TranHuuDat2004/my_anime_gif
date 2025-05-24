# Personal Anime GIF Collection

This is a static website built with pure HTML, CSS, and JavaScript, hosted on GitHub Pages, designed to store and browse a personal collection of favorite anime GIFs. The interface is inspired by Giphy, allowing users to easily search and view GIFs.

## Features

*   **Grid GIF Display:** Browse GIFs visually, similar to Giphy.
*   **Filter by Anime Series:** Easily view GIFs from specific anime series.
*   **Display Size Options:** Users can choose to display GIFs in small, medium, or large sizes.
*   **Powerful Search:** Search for GIFs by title, tags, or series name.
*   **GIF Detail Page:** View GIFs obstáculos larger size along with detailed information (title, series, tags) and a download option.
*   **Responsive Design:** The interface is optimized for both desktop and mobile devices.
*   **Separated Data:** The GIF list is managed in a separate `data.js` file, making updates easy.
*   **Hosted on GitHub Pages:** Free and easy to deploy.

## Demo

You can view the live website at: `https://tranhuudat2004.github.io/my_anime_gif/`


## Usage and Customization

1.  **Clone Repository (Optional):**
    ```bash
    git clone https://github.com/tranhuudat2004/my_anime_gif.git
    cd my_anime_gif
    ```

2.  **Add GIFs:**
    *   Place your GIF files into the `gifs/` directory, categorized by anime series. For example, GIFs from the "Otonari no Tenshi" series would go into `gifs/otonari_no_tenshi/`.
    *   Open the `data.js` file.
    *   Add or update information for each GIF using the following structure:
        ```javascript
        // Inside the corresponding series object, e.g., "OtonariNoTenshi":
        {
            id: "otonari_mahiru_X", // UNIQUE ID for each GIF sitewide
            fileName: "Mahiru (X).gif", // Filename within the series directory
            title: "Short description of the GIF",
            tags: ["tag1", "tag2", "character"]
        }

        // For external GIF links (e.g., Giphy):
        // Place within a series object with isExternal: true
        {
            id: "giphy_unique_id_XYZ", // UNIQUE ID
            url: "https://link.to.your/external/giphy.gif", // Direct URL to the GIF
            title: "Title for the external GIF",
            tags: ["external_tag_1", "external_tag_2"]
        }
        ```
    *   **Important:** Each GIF must have a unique `id`.

3.  **Configure CSS (Optional):**
    *   The main styles are located within the `<style>` tags of `index.html` and `detail.html`. You can customize colors, fonts, spacing, etc.
    *   The number of columns displayed for different grid sizes (`.view-small`, `.view-medium`, `.view-large`) and breakpoints are defined in the CSS of `index.html`.

4.  **Run the Website:**
    *   Open the `index.html` file with a web browser to view the website locally.

5.  **Deploy to GitHub Pages:**
    *   Commit and push all changes (including `index.html`, `detail.html`, `data.js`, and the `gifs/` directory) to your GitHub repository.
    *   In your repository's "Settings", go to the "Pages" section.
    *   Select the `main` (or `master`) branch and the `/ (root)` directory as the source, then click "Save".
    *   Your website will be accessible after a few minutes.

## Technologies Used

*   HTML5
*   CSS3 (Flexbox, Grid)
*   JavaScript (Vanilla JS - no external libraries)
*   GitHub Pages

## Future Development (Possible)

*   [ ] Separate CSS and JavaScript into their own files (`style.css`, `script.js`).
*   [ ] Add a "Copy Link" button for GIFs on the detail page.
*   [ ] Display related GIFs on the detail page.
*   [ ] Add smoother page transition effects.
*   [ ] Implement pagination or infinite scroll for `index.html` if the GIF count becomes very large.
*   [ ] Add a dark mode / light mode toggle (Currently dark mode by default).

## Contributing

As this is a personal project, contributions are likely not necessary. However, if you have ideas or suggestions, feel free to create an Issue!

## License

This project is released under the [MIT License](./LICENSE) (If you wish to add a LICENSE file).
Or simply: "This source code is provided for reference and personal use."

---

*Enjoy your GIF collection!* ✨