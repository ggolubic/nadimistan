import email, smtplib, ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config import config

port = 465


def send_registration_email(user, token):
    sender_email = config.SERVICE_EMAIL
    receiver_email = user.email
    password = config.EMAIL_PASSWORD
    subject = "Dobrodosli na NađiMiStan!"

    message = MIMEMultipart("alternative")
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    url = f"{config.FE_HOSTNAME}/activate/{token}"

    html = f"""
    <html>
    <body>
    <h3>
        Pozdrav {user.full_name}, </h3>
        <p>
        Registrirali ste se na stranicu NađiMiStan.\n
        Nadamo se da ćete biti uspješni u potrazi za stanom!\n
        </p>
        <a href="{url}"">Kliknite na link za verifikaciju računa</>
        </body>
        </html>
    """

    part1 = MIMEText(html, "html")

    message.attach(part1)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        print(f"Mail sent to {receiver_email}")


def send_reset_password_email(user, token):
    sender_email = config.SERVICE_EMAIL
    receiver_email = user.email
    password = config.EMAIL_PASSWORD
    subject = "Promjena lozinke - NađiMiStan"

    message = MIMEMultipart("alternative")
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    url = f"{config.FE_HOSTNAME}/reset-password/{token}"

    html = f"""
    <html>
    <body>
    <h3>
        Pozdrav {user.full_name}, </h3>
        <p>
        Zatražili ste promjenu lozinke.\n
        </p>
        <a href="{url}"">Kliknite na link za promjenu lozinke</>
        </body>
        </html>
    """

    part1 = MIMEText(html, "html")

    message.attach(part1)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        print(f"Mail sent to {receiver_email}")


def send_listings_email(listings=[]):

    sender_email = config.SERVICE_EMAIL
    receiver_email = config.TESTING_RECEIVER_EMAIL
    password = config.EMAIL_PASSWORD
    subject = "New listings notification"

    message = MIMEMultipart("alternative")
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    html = """
        <html>
            <body>
                <h1>
                Pozdrav
                </h1>
                <h2>
                U nastavku su novoobjavljeni oglasi prema vašim kriterijima:\n\n
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

    part1 = MIMEText(html, "html")

    message.attach(part1)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        print(f"Mail sent to {receiver_email}")
