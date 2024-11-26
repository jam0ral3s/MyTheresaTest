# Technical Test Application

This repository contains a technical test application developed using React Native.

## Features Implemented

- **Dynamic Carousels**:

  - Instead of loading just three carousels, all categories are retrieved from the API, and movies are loaded for each of them.
  - Carousels only load when they become visible, with items loaded in batches of five.
  - The carousel continues loading more items as the user scrolls to the end of the list.

- **Dark and Light Modes**:

  - Users can toggle between Dark and Light modes on the Home screen.
  - Note: This mode switch does not follow the system's theme.

- **Movie Detail Page Styles**:

  - Multiple genre lists are supported.
  - The style of the movie detail page is determined by an enum with three values, changing depending on the list from which the movie is accessed.

- **Favorite Movies**:

  - Users can view their favorite movies by clicking the heart icon on the Home screen.

- **Minimal Style Changes**:

  - Button color, text size, and font changes have been applied on the movie detail page.
  - Only default React Native fonts (system, serif, monospace) are used, as no external fonts were added.

- **ThemeProvider**:

  - Created using `styled-components`, including example functions for theming.

- **Testing**:
  - The application is not fully tested, but examples of component, screen, and hook tests are included.

## Libraries

- **Navigation**:

  - I did not use the `react-navigation` library. I think I should have because the current navigation is managed in pure JavaScript with `useState`, and it's not native as it would be with the library.

- **Others**:
  - **axios**: I used library because it is very similar to using `fetch`.
  - **async-storage**: To manage favorites. Since using the themoviedb API required user authentication, I opted for local storage instead.
  - **react-native-dotenv**: To handle the API KEY environment variable for themoviedb.

## How to Compile the Application

1. **Set Up the Environment Variables**:

   - Copy the `env.example` file to `.env` and add your API Key from [The Movie Database (TMDB)](https://www.themoviedb.org/) in the `TMDB_API_KEY` field.
   - Instructions for obtaining the API Key can be found in the [TMDB Documentation](https://developers.themoviedb.org/).

2. **Install Dependencies**:
   Run the following commands in the project root folder:
   ```bash
   npm cache clean --force
   npm install
   cd ios && pod install && cd ..
   npm start --reset-cache
   npm run ios    # For iOS
   npm run android # For Android
   ```

## Known Issues

- **Appetize Deployment**:

  - When deploying the app to [Appetize.io](https://appetize.io/), the icons for the top bar's resources did not load. Instead, text is displayed in place of the icons.
  - This issue does not occur when running the app locally with Metro, where the icons are displayed correctly.

- **Scroll Position on the Home Screen**:
  - There is a known issue with maintaining the scroll position on the Home screen. The scroll position is preserved only up to certain elements, and the expected behavior of resuming the exact previous position is not fully achieved.
