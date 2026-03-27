import { BUSINESS } from '@/lib/constants';
import { CheckCircle2 } from 'lucide-react';
import { Button, Container, Section, Card } from '@/components/ui';
import Script from 'next/script';
import { useContactForm } from './useContactForm';
import { ContactSidebar } from './ContactSidebar';

export default function ContactPageClient() {
  const {
    formData,
    status,
    errorMessage,
    submittedName,
    attachmentError,
    fileInputRef,
    turnstileSiteKey,
    serviceOptions,
    handleChange,
    handleAttachmentUpload,
    handleSubmit,
    resetForm,
  } = useContactForm();

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
      )}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-oxblood text-4xl leading-tight font-black tracking-tight uppercase md:text-5xl">
              Send the Scope. We&apos;ll Take It From There.
            </h1>
            <p className="text-slate mt-4 text-lg leading-relaxed font-medium">
              {`Send the inspection report, lender notes, address, or a plain-English description of the problem. We handle repair scopes, mitigation work, maintenance, and urgent response.`}
            </p>
            <p className="text-slate mt-4 max-w-2xl text-base leading-relaxed font-medium">
              Typical requests include FHA and VA corrections,
              appraisal-required repairs, leak and moisture work, mold
              mitigation, board-ups, lock changes, insulation upgrades, and
              recurring maintenance scopes for occupied or vacant properties.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <Card
                  variant="outlined"
                  className="border-green-200 bg-green-50/50 p-8 text-center"
                >
                  <div className="mb-4 flex justify-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-charcoal text-2xl font-bold tracking-tight uppercase">
                    Message Sent!
                  </h2>
                  <p className="text-slate mt-2 font-medium">
                    Thanks, {submittedName.split(' ')[0]}. We&apos;ve received
                    your message and will get back to you within one business
                    day. If this is an emergency, please call our 24/7 line at{' '}
                    {BUSINESS.afterhoursPhone}.
                  </p>
                  <div className="mt-8">
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="font-black tracking-widest uppercase"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="sr-only">
                    <label htmlFor="company-field">
                      Leave this field blank
                    </label>
                    <input
                      type="text"
                      id="company-field"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => handleChange('honeypot', e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="text-oxblood/60 mb-2 block text-xs font-black tracking-widest uppercase"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="border-oxblood/10 text-oxblood focus:border-oxblood w-full rounded-xl border-2 bg-white px-4 py-3 font-bold transition-colors focus:ring-0"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-oxblood/60 mb-2 block text-xs font-black tracking-widest uppercase"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="border-oxblood/10 text-oxblood focus:border-oxblood w-full rounded-xl border-2 bg-white px-4 py-3 font-bold transition-colors focus:ring-0"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-oxblood/60 mb-2 block text-xs font-black tracking-widest uppercase"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="border-oxblood/10 text-oxblood focus:border-oxblood w-full rounded-xl border-2 bg-white px-4 py-3 font-bold transition-colors focus:ring-0"
                        placeholder="(541) 555-1234"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="text-oxblood/60 mb-2 block text-xs font-black tracking-widest uppercase"
                    >
                      Property Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="border-oxblood/10 text-oxblood focus:border-oxblood w-full rounded-xl border-2 bg-white px-4 py-3 font-bold transition-colors focus:ring-0"
                      placeholder="123 Main St, Salem, OR"
                    />
                    <p className="text-oxblood/40 mt-2 text-[10px] font-bold tracking-widest uppercase">
                      Providing an address allows us to research your
                      property&apos;s history before we talk, saving you time.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="text-oxblood/60 mb-2 block text-xs font-black tracking-widest uppercase"
                    >
                      I&apos;m Interested In...
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      className="border-oxblood/10 text-oxblood focus:border-oxblood w-full appearance-none rounded-xl border-2 bg-white px-4 py-3 font-bold transition-colors focus:ring-0"
                    >
                      <option value="">Choose the closest fit...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-oxblood/60 mb-2 block text-xs font-black tracking-widest uppercase"
                    >
                      What&apos;s Going On? *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="border-oxblood/10 text-oxblood focus:border-oxblood w-full resize-y rounded-xl border-2 bg-white px-4 py-3 font-bold transition-colors focus:ring-0"
                      placeholder="Tell us what failed, what the report says, or what kind of help you need..."
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="attachment"
                      className="text-oxblood/60 mb-2 block text-xs font-black tracking-widest uppercase"
                    >
                      Upload FHA Letter or Inspection Report
                    </label>
                    <input
                      ref={fileInputRef}
                      id="attachment"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleAttachmentUpload(e.target.files?.[0] ?? null)
                      }
                      className="border-oxblood/30 text-slate focus:border-oxblood w-full rounded-xl border-2 border-dashed bg-white px-4 py-3 text-sm font-bold transition-colors focus:ring-0"
                    />
                    <p className="text-oxblood/40 mt-2 text-[10px] font-bold tracking-widest uppercase">
                      PDF preferred. Limit 3.75MB per upload.
                    </p>
                    {attachmentError && (
                      <p className="mt-2 text-sm font-black tracking-widest text-red-700 uppercase">
                        {attachmentError}
                      </p>
                    )}
                    {formData.attachmentName && (
                      <div className="text-oxblood mt-3 flex items-center justify-between text-xs font-black tracking-widest uppercase">
                        <span>
                          {formData.attachmentName} (
                          {Math.round(formData.attachmentSize / 1024)} KB)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAttachmentUpload(null)}
                          className="text-oxblood/80 underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {turnstileSiteKey ? (
                    <div>
                      <div
                        id="turnstile-widget"
                        className="min-h-16"
                        aria-label="Spam protection"
                      />
                      <p className="text-oxblood/40 mt-2 text-[10px] font-bold tracking-widest uppercase">
                        This form uses Cloudflare Turnstile to block automated
                        spam.
                      </p>
                    </div>
                  ) : (
                    <p className="text-oxblood/40 text-[10px] font-bold tracking-widest uppercase">
                      Spam protection is active on the server side for this
                      form.
                    </p>
                  )}

                  {status === 'error' && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full px-8 font-black tracking-widest uppercase sm:w-auto"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            <ContactSidebar />
          </div>
        </Container>
      </Section>
    </>
  );
}
