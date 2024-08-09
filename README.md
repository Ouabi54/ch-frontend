## Introduction

Small friend management app frontend v0.1

## Project Dependencies

This project utilizes a variety of libraries and tools to create a robust and modern web application. Below is a list of the key dependencies used:

### Core Dependencies

- **React (`react`, `react-dom`)**: The core libraries for building user interfaces in a declarative manner using components.
- **@emotion/react & @emotion/styled**: Libraries for writing CSS styles with JavaScript, providing a flexible way to style components with support for dynamic styling.
- **@mui/material & @mui/lab**: Material-UI libraries that offer a wide range of ready-to-use UI components following Google's Material Design guidelines. The `lab` package contains experimental components.
- **@reduxjs/toolkit**: A library that simplifies the setup of Redux, a state management tool for React applications, making it easier to manage global state.
- **react-redux**: Official React bindings for Redux, facilitating easy integration of Redux with React components.
- **react-router-dom**: A library that enables dynamic routing in React applications, allowing for navigation between different views or components.
- **formik**: A library for building and managing forms in React, providing tools for handling form state, validation, and submission.
- **react-hook-form**: A performant, flexible, and extensible form library for handling form validations, submissions, and state management.
- **yup**: A schema validation library often used with form handling libraries like Formik or React Hook Form for validating form data.

### Data Handling & Utilities

- **date-fns**: A modern JavaScript date utility library for parsing, formatting, and manipulating dates.
- **lodash**: A utility library that provides a wide variety of functions for manipulating arrays, objects, and other types of data.
- **numeral**: A library for formatting and manipulating numbers, particularly useful for currency, percentages, and other numeral formats.
- **redux-persist**: A library that allows for persisting and rehydrating Redux state across sessions, using storage engines like localStorage.
- **socket.io-client**: A client-side library for establishing real-time, bidirectional communication between clients and servers, often used for chat applications or live updates.

### UI Enhancements

- **@iconify/react**: A library that allows for the use of a wide range of icons from different icon sets in a React application.
- **apexcharts & react-apexcharts**: Libraries for creating interactive and responsive charts in React applications.
- **simplebar-react**: A library that provides custom scrollbars with cross-browser support, enhancing the look and feel of scrollable content.

### Miscellaneous

- **@faker-js/faker**: A library for generating fake data, useful for testing and prototyping.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, enabling secure configuration management.
- **history**: A library that manages session history, used by routing libraries like React Router for navigation.
- **prop-types**: A library for type-checking React props, ensuring components receive the correct types of props.
- **react-helmet-async**: A library that manages changes to the document head, useful for setting meta tags, titles, and other head elements dynamically.
- **react-toastify**: A library for adding customizable, responsive toast notifications to React applications.


## Configuration

Before starting, make sure to set up your  `.env`. This file is for local development and should not be committed to version control.

## ⚒ How to Install

Install the dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

## ⚒ Lint

Run linting:

```bash
yarn lint
```

For other commands, please check the `package.json` file.