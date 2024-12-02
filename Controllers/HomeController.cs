using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using RealEliteContractingWebsite1.Models;

namespace RealEliteContractingWebsite1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // Home page
        public IActionResult Index()
        {
            return View();
        }

        // About page
        public IActionResult About()
        {
            return View();
        }

        // Services page
        public IActionResult Services()
        {
            return View();
        }

        // Portfolio page
        public IActionResult Portfolio()
        {
            return View();
        }

        // Testimonials page
        public IActionResult Testimonials()
        {
            return View();
        }

        // Contact page
        public IActionResult Contact()
        {
            return View();
        }

        // Get a Quote page - GET request
        public IActionResult GetQuote()
        {
            return View();
        }

        // Get a Quote page - POST request
        [HttpPost]
        public IActionResult GetQuote(string name, string email, string phone, string projectDetails)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(projectDetails))
            {
                ViewBag.Message = "Please fill in all required fields.";
                return View();
            }

            // Sending an email using SMTP (basic example)
            try
            {
                var smtpClient = new SmtpClient("smtp.example.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("your-email@example.com", "your-email-password"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("your-email@example.com"),
                    Subject = "New Quote Request",
                    Body = $"Name: {name}\nEmail: {email}\nPhone: {phone}\nDetails: {projectDetails}",
                    IsBodyHtml = false,
                };
                mailMessage.To.Add("your-email@example.com");

                smtpClient.Send(mailMessage);
                ViewBag.Message = "Thank you for requesting a quote! We will get back to you soon.";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while sending the email.");
                ViewBag.Message = "There was an error processing your request. Please try again later.";
            }

            return View();
        }

        // Privacy policy page
        public IActionResult Privacy()
        {
            return View();
        }

        // Error handling (for any errors that may occur)
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
