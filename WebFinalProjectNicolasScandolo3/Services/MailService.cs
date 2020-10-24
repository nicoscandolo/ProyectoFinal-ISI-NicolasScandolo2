using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebFinalProjectNicolasScandolo3.Models;
using WebFinalProjectNicolasScandolo3.Settings;

namespace WebFinalProjectNicolasScandolo3.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }
        //public async Task SendEmailAsync(MailRequest mailRequest)
        //{
        //    var email = new MimeMessage();
        //    email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
        //    email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
        //    email.Subject = mailRequest.Subject;
        //    var builder = new BodyBuilder();
        //    if (mailRequest.Attachments != null)
        //    {
        //        byte[] fileBytes;
        //        foreach (var file in mailRequest.Attachments)
        //        {
        //            if (file.Length > 0)
        //            {
        //                using (var ms = new MemoryStream())
        //                {
        //                    file.CopyTo(ms);
        //                    fileBytes = ms.ToArray();
        //                }
        //                builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
        //            }
        //        }
        //    }
        //    builder.HtmlBody = mailRequest.Body;
        //    email.Body = builder.ToMessageBody();
        //    using var smtp = new SmtpClient();
        //    smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
        //    smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
        //    await smtp.SendAsync(email);
        //    smtp.Disconnect(true);
        //}

        public async Task SendEmailAsync(MailRequest request)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\WelcomeTemplate.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            var email = new MimeMessage();
            switch (request.tipo)
            {
                case "upload":
                    email.Subject = "Hey, un archivo acaba de ser subido en E-Group";
                    MailText = MailText.Replace("[Titulo]", "Hey!!").Replace("[Leyenda]","El usuario " + request.Name + " acaba de subir un archivo en el proyecto " + request.Proyecto);
                    break;
                case "consulta":
                    email.Subject = "Hey, una consulta acaba de ser publicada en E-Group";
                    MailText = MailText.Replace("[Titulo]", "Hey!!").Replace("[Leyenda]", "El usuario " + request.Name + " acaba de realizar una consulta en el proyecto " + request.Proyecto);
                    break;
                case "ComentarioConsulta":
                    email.Subject = "Hey, un usuario comento la consulta que realizaste";
                    MailText = MailText.Replace("[Titulo]", "Hey!!").Replace("[Leyenda]", "El usuario " + request.Name + " acaba de comentar una consulta que realizaste en el grupo " + request.Proyecto);
                    break;
                case "welcome":
                    email.Subject = "Bienvenido a E-Group";
                    MailText = MailText.Replace("[Titulo]", "Hey!!").Replace("[Leyenda]", "Bienvenido a E-Group. Accede a nuestra web para saber como continuar");
                    break;
                case "welcomeGroup":
                    email.Subject = "Hey, acabas de ser agregado a un nuevo proyecto";
                    MailText = MailText.Replace("[Titulo]", "Hey!!").Replace("[Leyenda]",  "Acabas de ser agregado al proyecto "  + request.Proyecto + " en E-Group. Accede a nuestra web para saber como continuar");
                    break;
                case "SolicitudNueva":
                    email.Subject = "Hey, hay una nueva solicitud de acceso";
                    MailText = MailText.Replace("[Titulo]", "Hey!!").Replace("[Leyenda]", " " + request.Name + " acaba de enviar una solicitud para acceder al proyecto " + request.Proyecto + " en E-group");
                    break;
                default:
                    // Default stuff
                    break;
            }



            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            foreach (string mail in request.ToEmails)
            {
                email.To.Add(MailboxAddress.Parse(mail));
            };

            var builder = new BodyBuilder();
            builder.HtmlBody = MailText;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }


        //public async Task SendUploadEmailAsync(MailRequest mailRequest)
        //{
        //    var email = new MimeMessage();
        //    email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
        //    foreach (string mail in mailRequest.ToEmails)
        //    {
        //        email.To.Add(MailboxAddress.Parse(mail));
        //    };
        //    email.Subject = "Se acaba de subir un archivo en E-Group";
        //    var builder = new BodyBuilder();

        //    builder.HtmlBody = "Hola Usuario, le informamos que un archivo fue subido recientemente en un grupo al cual usted pertenece";
        //    email.Body = builder.ToMessageBody();
        //    using var smtp = new SmtpClient();
        //    smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
        //    smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
        //    await smtp.SendAsync(email);
        //    smtp.Disconnect(true);
        //}
    }
}
