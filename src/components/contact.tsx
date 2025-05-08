"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";

import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";

import { useLanguage } from "@/components/language-provider";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="w-full scroll-mt-16 px-4 sm:px-0 py-8 sm:py-12"
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">
            {t("contact.title") || "Contact Me"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-2">
            {t("contact.subtitle") ||
              "Have a project in mind? Let's work together to bring your ideas to life."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="lg:col-span-2">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">
                {t("contact.form.title") || "Send Me a Message"}
              </CardTitle>
              <CardDescription>
                {t("contact.form.description") ||
                  "Fill out the form below and I'll get back to you as soon as possible."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  {t("contact.info.title") || "Contact Information"}
                </CardTitle>
                <CardDescription>
                  {t("contact.info.description") ||
                    "Feel free to reach out through any of these channels."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium">
                      {t("contact.info.email") || "Email"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      contact@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium">
                      {t("contact.info.phone") || "Phone"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium">
                      {t("contact.info.location") || "Location"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      New York, NY, USA
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium">
                      {t("contact.info.hours") || "Working Hours"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Mon - Fri: 9AM - 5PM EST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  {t("contact.response.title") || "Response Time"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-sm">
                  {t("contact.response.description") ||
                    "I typically respond to inquiries within 24-48 hours during business days. For urgent matters, please indicate in your message."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
