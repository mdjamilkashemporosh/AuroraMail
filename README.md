# AuroraMail

This is an open-source project that provides a SMTP server implementation using Node.js and Nodemailer. It allows you to send emails using a customizable HTML template (.hbs file) with dynamic data.

## Features

- SMTP server implementation using Node.js and Nodemailer
- Customizable HTML email templates using .hbs files
- Dynamic data injection into email templates
- Easy setup and configuration

## How it Works

- When a request for an HTML template is made, the application first checks if it exists in the Redis cache.
- If the template is found in the cache, it is retrieved and served directly, avoiding the need for expensive template rendering.
- If the template is not found in the cache, it is fetched from the persistent storage, rendered, and then stored in Redis for future use.
- Subsequent requests for the same template can then be served directly from the cache, significantly reducing the response time.

## Getting Started

Clone this repository to your local machine:

```
git clone https://github.com/mdjamilkashemporosh/AuroraMail.git
```

Navigate to the project directory:
```
cd AuroraMail
```
Install the dependencies :
```
npm install
```

Configure the SMTP server settings in the ``` config.ts ``` file and Build the TypeScript code by running ``` npm run build ```.

Note that the configuration may vary for different email service providers such as Google Cloud. Please refer to the documentation of your specific provider for the appropriate configuration settings.

Start the SMTP server:

```
npm run start
```
The SMTP server will start and listen on ```localhost:8000``` by default or on the PORT specified in the ```.env``` file.

## Contributing

If you would like to contribute to this web application, please open an issue on GitHub to discuss your ideas or proposed changes. Pull requests are also welcome.

## License

This SMTP application is available under the MIT License. You are free to use, modify, and distribute this project as you see fit.
