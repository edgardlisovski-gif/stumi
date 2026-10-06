const recipient = 'info@stumi.lt'
const allowedServices = ['Sniego valymas', 'Druskos barstymas', 'Sniego išvežimas']

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Šis veiksmas nepalaikomas.' })
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {}
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > 120 || !phone || phone.length > 40 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || !allowedServices.includes(service) || message.length > 5000) {
    return response.status(400).json({ error: 'Patikrinkite užpildytus laukus ir bandykite dar kartą.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const sender = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !sender) {
    console.error('Email delivery is not configured: set RESEND_API_KEY and RESEND_FROM_EMAIL.')
    return response.status(500).json({ error: 'Užklausų siuntimas dar nesukonfigūruotas.' })
  }

  const content = [
    `Vardas: ${name}`,
    `Telefonas: ${phone}`,
    `El. paštas: ${email}`,
    `Paslauga: ${service}`,
    '',
    `Žinutė: ${message || 'Nenurodyta'}`,
  ].join('\n')

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Nauja STUMI.lt užklausa: ${service}`,
        text: content,
      }),
    })

    if (!result.ok) {
      console.error('Resend rejected a contact email:', await result.text())
      return response.status(502).json({ error: 'Laiško išsiųsti nepavyko. Pabandykite vėliau arba paskambinkite.' })
    }

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact email request failed:', error)
    return response.status(502).json({ error: 'Laiško išsiųsti nepavyko. Pabandykite vėliau arba paskambinkite.' })
  }
}
