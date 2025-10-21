# DevOps Engineer Portfolio

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

1. Ensure you have .NET 8.0 SDK installed
2. Clone or download the project
3. Navigate to the project directory
4. Run `dotnet build` to build the project
5. Run `dotnet run` to start the development server
6. Open your browser and navigate to `https://localhost:5001` (or the URL shown in the console)

## Customization

- Replace placeholder images in `wwwroot/images/` with your actual photos and project screenshots
- Update personal information and DevOps experience in `Pages/Index.cshtml`
- Modify styles in `wwwroot/css/site.css`
- Add your DevOps project details, GitHub repositories, and professional links
- Update skill percentages and technologies based on your expertise

## Technologies Used

- **Backend**: ASP.NET Core 8.0, Razor Pages
- **Frontend**: Bootstrap 5, HTML5, CSS3, JavaScript
- **Icons**: Font Awesome
- **Deployment Ready**: Containerized with Docker support

## DevOps Project Structure

```
├── Pages/Index.cshtml          # Main portfolio page
├── wwwroot/
│   ├── css/site.css           # Custom styling
│   ├── js/site.js            # Client-side functionality
│   └── images/               # Portfolio images and project screenshots
├── Dockerfile                # Containerization (optional)
└── README.md                 # This file
```

## Contributing

Feel free to fork this repository and customize it for your own DevOps portfolio. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).