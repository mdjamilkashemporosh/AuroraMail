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

## Usage

- Create a template file (e.g., ```template.hbs```). If you have an existing HTML template (e.g., ```template.htm```), rename it to ```template.hbs```.
- Modify the template file (```template.hbs```) by replacing the dynamic content with Handlebars syntax. For example:
``` html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div class="container">
      <div class="content">
        <h2>Test Email Template</h2>
        <p>Hello {{name}},</p>
      </div>
    </div>
  </body>
</html>
```
- Upload the template file (template.hbs) to any CDN network or a publicly accessible URL.
- When making a request to send an email, include the template URL and the required data within the data object. Here's an example request payload:
``` json 
{
  "email": "jamilkashem@zoho.com",
  "subject": "Test Subject",
  "templateURL": "https://example.com/template.hbs",
  "data": {
    "name": "porosh"
  }
}

```
```email```: The recipient's email address.
```subject```: The subject line of the email.
```templateURL```: The URL of the uploaded template.hbs file on the CDN network.
```data```: An object containing the required data for dynamic content in the template. The properties of this object may vary depending on the specific template you are using.

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
