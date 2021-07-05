import email, smtplib, ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config import config

port = 465


def send_listings_email(listings=[]):

    sender_email = config.SERVICE_EMAIL
    receiver_email = config.TESTING_RECEIVER_EMAIL
    password = config.EMAIL_PASSWORD
    subject = "New listings notification"

    message = MIMEMultipart("alternative")
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    text = """
        Pozdrav,
        U nastavku su novoobjavljeni oglasi s vasim kriterijima:\n
    """
    html = """
        <html>
            <body>
                <h1>
                Pozdrav
                </h1>
                <h2>
                U nastavku su novoobjavljeni oglasi s vasim kriterijima:\n\n
                </h2>
                <p>
    """
    for stan_listing in listings:
        title = stan_listing.get("title")
        link = stan_listing.get("link")
        cijena = stan_listing.get("cijena")
        text += f"{link} {cijena} \n"
        html += f"<a href={link}>{title}</a> {cijena}<br>"

    html += f"</p></body></html>"

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        print(f"Mail sent to {receiver_email}")
