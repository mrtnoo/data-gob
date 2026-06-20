import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { nombre, apellido, email, telefono, empresa, asunto, mensaje } =
            data;

        // Validación mínima — todos los campos son obligatorios en el form
        if (!nombre || !email || !mensaje) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios." },
                { status: 400 }
            );
        }

        await resend.emails.send({
            // En Resend, mientras no verifiques un dominio propio, debes usar
            // este remitente de prueba. Una vez verifiques tu dominio (paso 5
            // más abajo) puedes cambiarlo a algo como "contacto@tudominio.com".
            from: "Formulario web <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL_TO ?? "huertabarra.martin@gmail.com",
            replyTo: email,
            subject: `Nueva consulta: ${asunto || "Sin asunto"} — ${empresa || "Sin empresa"}`,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido ?? ""}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono ?? "—"}</p>
        <p><strong>Empresa:</strong> ${empresa ?? "—"}</p>
        <p><strong>Asunto:</strong> ${asunto ?? "—"}</p>
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