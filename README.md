# Senior Engineer & Tech Trainer Portfolio

A modern, responsive single-page DevOps Engineer portfolio website built with ASP.NET Core and Bootstrap, showcasing expertise in CI/CD pipelines, cloud infrastructure, containerization, and automation.

## Features

- Single-page application with smooth scrolling navigation
- Hero section with gradient background highlighting DevOps expertise
- About section with professional profile and experience summary
- DevOps Skills section with technology proficiency indicators
- Projects showcase featuring CI/CD pipelines, cloud migrations, and Kubernetes deployments
- Contact form and professional social links
- Fully responsive design optimized for all devices

## DevOps Expertise Highlighted

- **CI/CD Pipeline Automation**: Jenkins, Azure DevOps, Git workflows
- **Cloud Infrastructure**: AWS, Azure, Terraform, Infrastructure as Code
- **Containerization & Orchestration**: Docker, Kubernetes, Helm charts
- **Monitoring & Logging**: Prometheus, Grafana, ELK stack
- **Version Control & Collaboration**: Git, GitHub, GitLab
- **Scripting & Automation**: Python, Bash, PowerShell

## Getting Started

### Prerequisites
- .NET 8.0 SDK installed

### Development
1. Clone the repository
2. Navigate to the Sithin folder: `cd Sithin`
3. Run `dotnet build` to build the project
4. Run `dotnet run` to start the development server
5. Open your browser and navigate to `https://localhost:7243` or `http://localhost:5124`

### Production
To run the production-ready version:
```bash
cd Sithin
dotnet publish -c Release -o ./publish
cd ./publish
dotnet dotnet.dll --environment Production
```

The app will listen on `http://localhost:5000` with logging enabled.

### Health Check
The application includes a health check endpoint at `/health` for monitoring and Azure deployment validation.

## Customization

- Replace placeholder images in `Sithin/wwwroot/images/` with your actual photos and project screenshots
- Update personal information and DevOps experience in `Sithin/Pages/Index.cshtml`
- Modify styles in `Sithin/wwwroot/css/site.css`
- Add your DevOps project details, GitHub repositories, and professional links
- Update skill percentages and technologies based on your expertise

## Deployment to Azure Web App

### Azure Configuration
1. **Runtime Stack**: .NET 8 (LTS), Windows
2. **Application Settings**: 
   - `ASPNETCORE_ENVIRONMENT` = `Production`
3. **General Settings**: 
   - Always On: Enabled
   - HTTPS Only: On

### Deployment Steps
1. Build and publish: `cd Sithin && dotnet publish -c Release -o ./publish`
2. Deploy the `publish` folder contents to Azure Web App
3. Set up deployment slots (staging/production) for smooth deployments
4. The health check endpoint `/health` validates deployment readiness

## Technologies Used

- **Backend**: ASP.NET Core 8.0, Razor Pages
- **Frontend**: Bootstrap 5, HTML5, CSS3, JavaScript
- **Icons**: Font Awesome
- **Deployment Ready**: Containerized with Docker support

## DevOps Project Structure

```
portfolio/
├── .gitignore              # Git ignore rules
├── README.md               # This file
└── Sithin/                 # Main project folder
    ├── Pages/
    │   ├── Index.cshtml    # Main portfolio page
    │   ├── Error.cshtml    # Error page
    │   └── Privacy.cshtml  # Privacy page
    ├── Properties/
    │   └── launchSettings.json
    ├── wwwroot/
    │   ├── css/site.css           # Custom styling
    │   ├── js/site.js            # Client-side functionality
    │   ├── images/               # Portfolio images and project screenshots
    │   └── lib/                  # Bootstrap, jQuery, validation libraries
    ├── Program.cs                # Application entry point with health checks
    ├── dotnet.csproj             # Project configuration
    ├── appsettings.json          # Default settings
    ├── appsettings.Production.json
    ├── appsettings.Development.json
    └── publish/                  # Production build output
```

## Contributing

Feel free to fork this repository and customize it for your own DevOps portfolio. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).