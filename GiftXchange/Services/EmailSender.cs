using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//sendgridkey: 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

namespace GiftXchange.Services
{

  public class EmailSender : IEmailSender
  {
    private string sgkey = "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";
    public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

    public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
    {
      Options = optionsAccessor.Value;
    }
    public Task SendEmailAsync(string email, string subject, string message)
    {
      //return Task.CompletedTask;
      return Execute(sgkey, subject, message, email);
    }

    public Task Execute(string apiKey, string subject, string message, string email)
    {
      var client = new SendGridClient(apiKey);
      var msg = new SendGridMessage()
      {
        From = new EmailAddress("no-reply@giftxchange.com", "GiftXchange"),
        Subject = subject,
        PlainTextContent = message,
        HtmlContent = message
      };
      msg.AddTo(new EmailAddress(email));
      return client.SendEmailAsync(msg);
    }
  }
}
