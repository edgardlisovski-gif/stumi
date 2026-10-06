import React, { FormEvent, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Camera, Check, ChevronLeft, ChevronRight, Clock3, Mail, MapPin, Menu, Phone, Share2, ShieldCheck, Snowflake, Tractor, X } from 'lucide-react'
import './styles.css'
import './why-section.css'
import './gallery-layout.css'

const PHONE = '+37060161519'
const PHONE_2 = '+37065431581'
const PHONE_LINK = 'tel:+37060161519'
const PHONE_LINK_2 = 'tel:+37065431581'
const EMAIL = 'info@stumi.lt'
const images = [
  { url: '/sniego%20valymo%20darbai.jpeg', label: 'Sniego valymo darbai' },
  { url: '/A37472D7-656F-4A9D-B241-4353CC45D259%202.jpeg', label: 'Druskos barstymas' },
  { url: '/sniego-isvezimas.jpg', label: 'Sniego išvežimas' },
]

const services = [
  { icon: Snowflake, no: '01', title: 'Sniego valymas', copy: 'Kiemo aikštelės, privažiavimai, parkavimo aikštelės ir įmonių teritorijos.', tags: ['Aikštelės', 'Privažiavimai', 'Teritorijos'] },
  { icon: ShieldCheck, no: '02', title: 'Druskos barstymas', copy: 'Saugus ledo ir sniego tirpimo, slidumo mažinimo ir priežiūros aptarnavimas.', tags: ['Ledo valdymas', 'Saugumas', 'Priežiūra'] },
  { icon: Tractor, no: '03', title: 'Sniego išvežimas', copy: 'Sniego nuvežimas ir aikštelių valymas po stiprių žieminių apsnigdimų ar atšalimo.', tags: ['Nuvežimas', 'Valymas', 'Aikštelės'] },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const closeMenu = () => setMenuOpen(false)
  const navigate = (d: number) => setLightbox(i => i === null ? null : (i + d + images.length) % images.length)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (lightbox !== null) { if (e.key === 'Escape') setLightbox(null); if (e.key === 'ArrowLeft') navigate(-1); if (e.key === 'ArrowRight') navigate(1) } }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const invalidField = Array.from(e.currentTarget.elements).find(field => {
      if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement) {
        return !field.checkValidity()
      }
      return false
    })
    if (invalidField) {
      if (invalidField instanceof HTMLInputElement || invalidField instanceof HTMLSelectElement) {
        invalidField.reportValidity()
      }
      return
    }

    const form = new FormData(e.currentTarget)
    setSending(true)
    setSendError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      })
      const result = await response.json().catch(() => ({})) as { error?: string }
      if (!response.ok) throw new Error(result.error || 'Užklausos išsiųsti nepavyko. Bandykite dar kartą.')
      setSent(true)
    } catch (error) {
      setSendError(error instanceof Error ? error.message : 'Užklausos išsiųsti nepavyko. Bandykite dar kartą.')
    } finally {
      setSending(false)
    }
  }
  return <>
    <header className="site-header">
      <a href="#pagrindinis" className="brand" aria-label="STUMI pradžia">
        <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" role="img" aria-hidden="true"><path d="M2 23.5L9.5 13.5L15 19.5L22 8.5L30 23.5H2Z" /><path d="M8 23.5H24L19.5 18.5L15 23.5H8Z" opacity="0.7" /></svg></span>
        <span>STUMI</span>
      </a>
      <button className="menu-toggle" aria-label="Atidaryti meniu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'open' : ''} aria-label="Pagrindinė navigacija">
        {['Pagrindinis', 'Paslaugos', 'Apie mus', 'Galerija', 'Kontaktai'].map((x, i) => <a onClick={closeMenu} href={'#' + ['pagrindinis','paslaugos','apie','galerija','kontaktai'][i]} key={x}>{x}</a>)}
        <a onClick={closeMenu} className="nav-phone" href={PHONE_LINK}><Phone size={16}/>{PHONE}</a>
      </nav>
    </header>
    <main>
      <section id="pagrindinis" className="hero">
        <div className="hero-media" role="img" aria-label="Sniego valymo technika žiemos sąlygomis" />
        <div className="hero-shade" />
        <div className="hero-content wrap reveal">
          <p className="eyebrow"><span /> TECHNIKOS PASLAUGOS VILNIUJE</p>
          <h1>SNIEGO VALYMAS<br/><i>SU STUMI</i></h1>
          <p className="hero-lead">Švarios aikštelės, saugūs keliai, jūsų ramybė.</p>
          <p className="hero-copy">Teikiame profesionalias sniego valymo, druskos barstymo ir sniego išvežimo paslaugas privatiems bei verslo klientams. Greitai, kokybiškai ir patikimai.</p>
          <div className="hero-actions"><a className="button yellow" href="#kontaktai">UŽSAKYTI PASLAUGĄ <ArrowRight size={17}/></a><a className="button ghost" href={PHONE_LINK}><Phone size={16}/> SKAMBINTI</a></div>
        </div>
        <a className="scroll-cue" href="#paslaugos"><span /> SLINKTI ŽEMYN</a>
      </section>
      <section id="paslaugos" className="section wrap">
        <div className="section-head"><div><p className="eyebrow gold"><span /> KĄ GALIME ATLIKTI</p><h2>PASLAUGOS, KURIOS<br/>PALENGVINA <i>JŪSŲ DIENĄ.</i></h2></div><p className="section-note">Paslaugas plečiame pagal klientų poreikius. Susisiekite – aptarsime jūsų situaciją ir tinkamiausią sprendimą.</p></div>
        <div className="service-grid">{services.map(s => <article className="service-card" key={s.no}><div className="card-top"><s.icon /><span>{s.no}</span></div><h3>{s.title}</h3><p>{s.copy}</p><div className="tags">{s.tags.map(t => <span key={t}>{t}</span>)}</div></article>)}</div>
      </section>
      <section id="apie" className="why"><div className="wrap why-grid"><div className="why-photo" /><div className="why-content"><p className="eyebrow gold"><span /> KODĖL STUMI</p><h2>DARBAS, KURIUO<br/><i>GALIMA PASITIKĖTI.</i></h2><p>Vertiname aiškų susitarimą, gerai paruoštą techniką ir tvarkingą rezultatą. Mūsų tikslas – kad jūsų teritorija būtų saugi, švari ir prieinama net žiemos sąlygomis.</p><div className="benefits">{[['01','Greita reakcija','Operatyviai reaguojame į užsakymus.'],['02','Patikimumas','Dirbame atsakingai ir laikomės susitarimų.'],['03','Saugumas','Laikome kelio ir aikštelės dangą švarią ir saugią.']].map(x => <div className="benefit" key={x[0]}><b>{x[0]}</b><div><h3>{x[1]}</h3><p>{x[2]}</p></div></div>)}</div></div></div></section>
      <section className="callout"><div className="callout-bg"/><div className="wrap callout-inner"><p className="eyebrow"><span /> REIKIA PAGALBOS?</p><h2>PASIRŪPINKITE SAVO<br/>TERITORIJA <i>JAU DABAR.</i></h2><p>Kreipkitės ir aptarsime jūsų poreikius.</p><a className="button yellow" href={PHONE_LINK}><Phone size={16}/>{PHONE}</a></div></section>
      <section id="galerija" className="section wrap gallery-section"><div className="section-head"><div><p className="eyebrow gold"><span /> MŪSŲ DARBAI</p><h2>ŽIEMOS <i>VALYMAS.</i></h2></div><p className="section-note">Žiemos darbai su dėmesiu saugumui, tvarkai ir greitam rezultatu.</p></div><div className="gallery">{images.map((img, i) => <button key={`${img.url}-${i}`} onClick={() => setLightbox(i)} className={'gallery-item item-'+i} aria-label={'Atidaryti: '+img.label}><img src={img.url} alt={img.label} loading="lazy"/><span>{img.label}<ArrowRight size={17}/></span></button>)}</div></section>
      <section id="kontaktai" className="contact">
        <div className="wrap contact-grid">
          <div className="contact-info">
            <p className="eyebrow gold"><span /> SUSISIEKIME</p>
            <h2>PRADĖKIME<br/><i>POKALBĮ.</i></h2>
            <p>Parašykite apie planuojamus darbus arba paskambinkite – atsakysime, kai tik galėsime.</p>
            <div className="contact-list">
              <a href={PHONE_LINK}><Phone/><div><small>TELEFONAS</small><strong>{PHONE}</strong></div></a>
              <a href={PHONE_LINK_2}><Phone/><div><small>TELEFONAS</small><strong>{PHONE_2}</strong></div></a>
              <a href={`mailto:${EMAIL}`}><Mail/><div><small>EL. PAŠTAS</small><strong>{EMAIL}</strong></div></a>
              <div><MapPin/><div><small>APTARNAUJAMA TERITORIJA</small><strong>Vilnius ir aplinkiniai rajonai</strong></div></div>
              <div><Clock3/><div><small>DARBO LAIKAS</small><strong>I–VII, pagal susitarimą</strong></div></div>
            </div>
          </div>
          <form onSubmit={submit} noValidate>
            {sent ? <div className="success"><Check/><h3>Ačiū už užklausą!</h3><p>Jūsų užklausa išsiųsta į {EMAIL}. Netrukus su jumis susisieksime.</p><button className="text-button" type="button" onClick={() => setSent(false)}>SIŲSTI KITĄ UŽKLAUSĄ</button></div> : <>
              <div className="form-row">
                <label>Vardas<input required name="name" autoComplete="name" placeholder="Jūsų vardas"/></label>
                <label>Telefonas<input required name="phone" type="tel" autoComplete="tel" placeholder="+370 ..."/></label>
              </div>
              <label>El. paštas<input required name="email" type="email" autoComplete="email" placeholder="jusu@pastas.lt"/></label>
              <label>Paslauga<select required name="service" defaultValue=""><option value="" disabled>Pasirinkite paslaugą</option>{services.map(s=><option key={s.no}>{s.title}</option>)}</select></label>
              <label>Žinutė<textarea name="message" rows={5} placeholder="Trumpai aprašykite, ko reikia..."/></label>
              {sendError && <p className="form-help" role="alert">{sendError}</p>}
              <button className="button yellow submit" type="submit" disabled={sending}>{sending ? 'SIUNČIAMA...' : 'SIŲSTI UŽKLAUSĄ'} {!sending && <ArrowRight size={17}/>}</button>
              <p className="form-help">Užklausa bus išsiųsta tiesiai į {EMAIL}.</p>
            </>}
          </form>
        </div>
      </section>
    </main>
    <footer><div className="wrap footer-grid"><div><a href="#pagrindinis" className="brand"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" role="img" aria-hidden="true"><path d="M2 23.5L9.5 13.5L15 19.5L22 8.5L30 23.5H2Z" /><path d="M8 23.5H24L19.5 18.5L15 23.5H8Z" opacity="0.7" /></svg></span><span>STUMI</span></a><p>Technikos paslaugos atsakingiems sprendimams.</p></div><div><h4>NAVIGACIJA</h4><a href="#paslaugos">Paslaugos</a><a href="#apie">Apie mus</a><a href="#galerija">Galerija</a></div><div><h4>KONTAKTAI</h4><a href={PHONE_LINK}>{PHONE}</a><a href={PHONE_LINK_2}>{PHONE_2}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div><div><h4>SEKITE</h4><div className="social"><a href="#kontaktai" aria-label="Facebook"><Share2/></a><a href="#kontaktai" aria-label="Instagram"><Camera/></a></div></div></div><div className="wrap copyright">© {new Date().getFullYear()} STUMI. Visos teisės saugomos.</div></footer>
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galerijos nuotrauka"><button onClick={() => setLightbox(null)} className="lightbox-close" aria-label="Uždaryti"><X/></button><button onClick={() => navigate(-1)} className="lightbox-nav prev" aria-label="Ankstesnė"><ChevronLeft/></button><img src={images[lightbox].url} alt={images[lightbox].label}/><button onClick={() => navigate(1)} className="lightbox-nav next" aria-label="Kita"><ChevronRight/></button><p>{lightbox+1} / {images.length} — {images[lightbox].label}</p></div>}
    <script type="application/ld+json">{JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:'STUMI',description:'Sniego valymas, druskos barstymas ir sniego išvežimas Vilniuje.',telephone:PHONE,address:{'@type':'PostalAddress',addressLocality:'Vilnius',addressCountry:'LT'},areaServed:'Vilnius'})}</script>
  </>
}
createRoot(document.getElementById('root')!).render(<App />)
