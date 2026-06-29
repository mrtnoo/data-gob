import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await request.json();
        const { nombre, apellido, email, telefono, empresa, asunto, mensaje } = data;

        if (!nombre || !email || !mensaje) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios." },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: "Contacto DataGob <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL_TO || "il.9hetto@gmail.com",
            replyTo: email,
            subject: `Nueva consulta: ${asunto || "Sin asunto"} — ${empresa || "Sin empresa"}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre} ${apellido || ""}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono || "—"}</p>
                <p><strong>Empresa:</strong> ${empresa || "—"}</p>
                <p><strong>Asunto:</strong> ${asunto || "—"}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error enviando email:", error);
        return NextResponse.json(
            { error: "No se pudo enviar el mensaje." },
            { status: 500 }
        );
    }
}