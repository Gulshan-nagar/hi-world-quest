import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageName: string;
  bookingDate: string;
  groupSize: number;
  totalPrice: number;
  specialRequests?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      packageName,
      bookingDate,
      groupSize,
      totalPrice,
      specialRequests,
    }: BookingEmailRequest = await req.json();

    console.log("Sending booking confirmation email...", {
      customerName,
      customerEmail,
      packageName,
    });

    // Send email to business owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Jaisalmer Safari <onboarding@resend.dev>",
      to: ["gulshannagar5525@gmail.com"],
      subject: `New Booking: ${packageName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">New Booking Received</h1>
          
          <div style="margin: 20px 0;">
            <h2 style="color: #333;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${customerPhone}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h2 style="color: #333;">Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Package:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${packageName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Group Size:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${groupSize} ${groupSize === 1 ? 'person' : 'people'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total Price:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">₹${totalPrice.toLocaleString()}</td>
              </tr>
              ${specialRequests ? `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Special Requests:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${specialRequests}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="margin: 30px 0; padding: 15px; background-color: #fef3c7; border-left: 4px solid #d97706;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please contact the customer to confirm their booking.
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Jaisalmer Safari <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Booking Confirmation - Jaisalmer Safari",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">Thank You for Your Booking!</h1>
          
          <p style="font-size: 16px; color: #333;">Dear ${customerName},</p>
          
          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            Thank you for choosing Jaisalmer Safari! We have received your booking request and will contact you shortly to confirm the details.
          </p>

          <div style="margin: 20px 0;">
            <h2 style="color: #333;">Your Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Package:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${packageName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Group Size:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${groupSize} ${groupSize === 1 ? 'person' : 'people'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total Price:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">₹${totalPrice.toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
            <h3 style="color: #d97706; margin-top: 0;">Contact Us</h3>
            <p style="margin: 5px 0; color: #333;">
              <strong>Phone/WhatsApp:</strong> +91 8690305357
            </p>
            <p style="margin: 5px 0; color: #333;">
              <strong>Contact Person:</strong> Gulshan
            </p>
          </div>

          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            We look forward to making your desert safari experience unforgettable!
          </p>

          <p style="font-size: 14px; color: #666;">
            Best regards,<br>
            <strong>Jaisalmer Safari Team</strong>
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", {
      ownerEmail: ownerEmailResponse,
      customerEmail: customerEmailResponse,
    });

    return new Response(
      JSON.stringify({
        success: true,
        ownerEmail: ownerEmailResponse,
        customerEmail: customerEmailResponse,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
