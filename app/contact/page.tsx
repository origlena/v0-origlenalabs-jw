"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, email, subject, message } = formData
    const developerEmail = "jarjishalam0299@gmail.com"

    // Create email body with all the form content
    const emailBody = `Hello Jarjish,

I am ${name} and I would like to contact you regarding Origlena Labs.

${message}

---
Sender Details:
Name: ${name}
Email: ${email}
Subject: ${subject}

This message was sent from Origlena Labs Contact Form.`

    // Create mailto link with encoded parameters
    const mailtoLink = `mailto:${developerEmail}?subject=${encodeURIComponent(`[Origlena Labs] ${subject}`)}&body=${encodeURIComponent(emailBody)}`

    // Open user's default email client
    window.location.href = mailtoLink
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Hero */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-16 text-center">
            <Badge className="mb-4">Contact</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Have questions or feedback about Origlena Labs? Reach out to the developer directly.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is this about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send via Email
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Clicking send will open your default email app with the message pre-filled.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info - Updated with developer details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Developer Contact</h2>
                  <p className="text-muted-foreground mb-6">
                    Origlena Labs is developed by Jarjish Alam. Feel free to reach out with any questions, feedback, or
                    collaboration ideas.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Developer Card */}
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-physics flex items-center justify-center text-white text-2xl font-bold">
                          JA
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Jarjish Alam</h3>
                          <p className="text-sm text-muted-foreground">Developer & Creator</p>
                          <p className="text-xs text-muted-foreground">Class 9 Student</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        PM SHRI Jawahar Navodaya Vidyalaya
                        <br />
                        Dakshin Dinajpur, West Bengal
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Email</div>
                        <a href="mailto:jarjishalam0299@gmail.com" className="text-sm text-primary hover:underline">
                          jarjishalam0299@gmail.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-physics/10">
                        <Phone className="h-5 w-5 text-physics" />
                      </div>
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-sm text-muted-foreground">
                          <a href="tel:+919609960381" className="hover:text-primary">
                            +91 9609960381
                          </a>
                          <span className="mx-2">|</span>
                          <a href="tel:+917679565807" className="hover:text-primary">
                            +91 7679565807
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-biology/10">
                        <MapPin className="h-5 w-5 text-biology" />
                      </div>
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">Dakshin Dinajpur, West Bengal, India</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Contact Buttons */}
                <div className="pt-4">
                  <h3 className="font-medium mb-3">Quick Contact</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                      <a href="mailto:jarjishalam0299@gmail.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Directly
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="tel:+919609960381">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
