import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const config: SMTPTransport.Options = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f7f1e3ca500258",
        pass: "c87e9fb931c311"
    }
}

const transporter = nodemailer.createTransport(config);

export async function writeEmail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string) {

    const mailContent: Mail.Options = {
        from,
        to,
        subject,
        text,
        html
    }

    transporter.sendMail(mailContent, (error: Error | null, info: any)=>{
        if(error){
            throw new Error(error.message);
        }else{
            console.log("E-mail enviado");
        }
    });

}

