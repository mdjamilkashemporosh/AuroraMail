# AuroraMail

This is an open-source project that provides a SMTP server implementation using Node.js and Nodemailer. It allows you to send emails using a customizable HTML template (.hbs file) with dynamic data.

## Demo


https://github.com/mdjamilkashemporosh/AuroraMail/assets/50365984/3b95abd1-311d-48bc-b40d-3f7e9af0a4da


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
- The ``` /send-email ``` route serves as the primary route for sending emails.
- To send an email, you need to provide the following data: \
``` email (required) ```: The recipient's email address. \
``` subject (required) ```: The subject line of the email. \
``` templateURL (required)```: The URL of the uploaded template.hbs file on the CDN network. \
``` data ```: An object containing the required data for dynamic content in the template. The properties of this object may vary depending on the specific template you are using. For example:

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

Or using docker: 

build command: (for development)
```
docker build -t your-image-name --build-arg NODE_ENV=development .
```

run command: (for development)
```
docker run -e NODE_ENV=development -p 8000:8000 your-image-name 
```

build command: (for production)
```
docker build -t your-image-name .
```

run command: (for production)
```
docker run -p 8000:8000 your-image-name 
```

## Testing

In sha'Allah, the test code will be released within the next couple of months, as we continue to work diligently on its development.

## Contributing

If you would like to contribute to this web application, please open an issue on GitHub to discuss your ideas or proposed changes. Pull requests are also welcome.

## License

This SMTP application is available under the MIT License. You are free to use, modify, and distribute this project as you see fit.
