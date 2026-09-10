import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Linkedin, 
  Github, 
  Phone, 
  Check, 
  Copy, 
  Sparkles, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { ContactFormData } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ContactProps {
  initialService?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialService }) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    projectType: initialService || 'Desenvolvimento de Sites',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
  }>({});

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, projectType: initialService }));
    }
  }, [initialService]);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactEmail = 'antonioestefanoprando@gmail.com';
  const whatsappNumber = '5515997075641'; // (15)99707-5641
  const whatsappDisplay = '(15) 99707-5641';

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Validation functions
  const validateName = (name: string): string => {
    const trimmed = name.trim();
    if (!trimmed) {
      return 'Informe seu nome e sobrenome.';
    }
    const words = trimmed.split(/\s+/).filter((word) => word.length >= 2);
    if (words.length < 2) {
      return 'Por favor, preencha nome e sobrenome completos (somente letras).';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    const trimmed = email.trim();
    if (!trimmed) {
      return 'Informe um endereço de e-mail.';
    }
    // Strict email check with @ and domain extension (e.g. .com, .com.br, .tech, etc.)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return 'Insira um e-mail válido com @ e sua extensão (ex: nome@empresa.com).';
    }
    return '';
  };

  const validatePhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length > 0 && digits.length < 10) {
      return 'Informe o número completo com DDD (mínimo 10 dígitos).';
    }
    return '';
  };

  // Input change handlers with strict restrictions
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only letters (including accents and spaces)
    const onlyLetters = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setFormData((prev) => ({ ...prev, name: onlyLetters }));
    if (touched.name) {
      setFormErrors((prev) => ({ ...prev, name: validateName(onlyLetters) }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));
    if (touched.email) {
      setFormErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only numbers
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 11);
    
    // Format strictly as (**)*****-****
    let formatted = rawDigits;
    if (rawDigits.length > 0) {
      if (rawDigits.length <= 2) {
        formatted = `(${rawDigits}`;
      } else if (rawDigits.length <= 6) {
        formatted = `(${rawDigits.slice(0, 2)})${rawDigits.slice(2)}`;
      } else if (rawDigits.length <= 10) {
        formatted = `(${rawDigits.slice(0, 2)})${rawDigits.slice(2, 6)}-${rawDigits.slice(6)}`;
      } else {
        formatted = `(${rawDigits.slice(0, 2)})${rawDigits.slice(2, 7)}-${rawDigits.slice(7, 11)}`;
      }
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (touched.phone) {
      setFormErrors((prev) => ({ ...prev, phone: validatePhone(formatted) }));
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'phone') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'name') {
      setFormErrors((prev) => ({ ...prev, name: validateName(formData.name) }));
    } else if (field === 'email') {
      setFormErrors((prev) => ({ ...prev, email: validateEmail(formData.email) }));
    } else if (field === 'phone') {
      setFormErrors((prev) => ({ ...prev, phone: validatePhone(formData.phone) }));
    }
  };

  const handleSendViaWhatsApp = () => {
    const nameError = validateName(formData.name);
    const emailError = formData.email ? validateEmail(formData.email) : '';
    const phoneError = formData.phone ? validatePhone(formData.phone) : '';

    setTouched({
      name: true,
      email: Boolean(formData.email),
      phone: Boolean(formData.phone),
    });

    setFormErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    if (nameError || emailError || phoneError) {
      return;
    }

    const text = encodeURIComponent(
      `Olá! Meu nome é ${formData.name.trim() || 'Visitante'}.\n` +
      `Gostaria de falar sobre um projeto de *${formData.projectType}*.\n` +
      (formData.email ? `E-mail: ${formData.email.trim()}\n` : '') +
      (formData.phone ? `WhatsApp: ${formData.phone}\n` : '') +
      (formData.message ? `Mensagem: ${formData.message}` : '')
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendViaWhatsApp();
  };

  return (
    <section id="contato" className={`relative py-24 border-t transition-colors duration-300 overflow-hidden ${
      isDark ? 'bg-[#0c081e] border-[#251951]' : 'bg-[#fafafc] border-[#dedee2]'
    }`}>
      {/* Glow ambient background */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#673de6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#7b66ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono mb-4 border ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68] text-[#bcbdff]' 
                : 'bg-purple-50 border-purple-200 text-[#673de6]'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-[#7b66ff]" />
            <span>Vamos Tirar Sua Ideia do Papel</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Entre em{' '}
            <span className="bg-gradient-to-r from-[#7b66ff] via-[#9d99ff] to-[#673de6] bg-clip-text text-transparent">
              Contato
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm sm:text-base mt-4 leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Tem um projeto em mente ou deseja modernizar seus sistemas? Envie uma mensagem e receba uma análise técnica rápida.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Links & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct WhatsApp Card */}
            <div className={`rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group border ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68]' 
                : 'bg-white border-[#dedee2] shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                  isDark 
                    ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800/40' 
                    : 'text-emerald-800 bg-emerald-100 border-emerald-300'
                }`}>
                  Resposta Rápida
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>WhatsApp Direto</h3>
              <p className={`text-xs sm:text-sm font-mono text-emerald-400 mb-2 font-semibold`}>
                {whatsappDisplay}
              </p>
              <p className={`text-xs sm:text-sm mb-4 font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Converse diretamente comigo pelo WhatsApp para esclarecer dúvidas e iniciar propostas com agilidade.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Email Card */}
            <div className={`rounded-2xl p-6 backdrop-blur-md border ${
              isDark ? 'bg-[#14102c] border-[#332a68]' : 'bg-white border-[#dedee2] shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#251951] border border-[#332a68] flex items-center justify-center text-[#bcbdff]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>E-mail Profissional</div>
                    <div className={`text-sm font-semibold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{contactEmail}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(contactEmail, 'email')}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-[#251951] hover:bg-[#332a68] text-slate-300 hover:text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950'
                  }`}
                  title="Copiar E-mail"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="text-xs text-[#7b66ff] hover:text-[#9d99ff] flex items-center gap-1 font-semibold mt-2"
              >
                <span>Abrir cliente de e-mail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Channels (LinkedIn & GitHub - desvinculados) */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                title="LinkedIn (Em breve)"
                className={`rounded-2xl p-4 flex flex-col justify-between transition-all group border cursor-default ${
                  isDark 
                    ? 'bg-[#14102c] hover:bg-[#1c183a] border-[#332a68] hover:border-[#7b66ff]/50' 
                    : 'bg-white hover:bg-slate-50 border-[#dedee2] hover:border-[#673de6]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Linkedin className="w-5 h-5 text-[#7b66ff] group-hover:scale-110 transition-transform" />
                  <ArrowUpRight className={`w-4 h-4 group-hover:text-[#7b66ff] ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <div>
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>LinkedIn</div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Em breve</div>
                </div>
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                title="GitHub (Em breve)"
                className={`rounded-2xl p-4 flex flex-col justify-between transition-all group border cursor-default ${
                  isDark 
                    ? 'bg-[#14102c] hover:bg-[#1c183a] border-[#332a68] hover:border-[#7b66ff]/50' 
                    : 'bg-white hover:bg-slate-50 border-[#dedee2] hover:border-[#673de6]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Github className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDark ? 'text-slate-200' : 'text-slate-800'}`} />
                  <ArrowUpRight className={`w-4 h-4 group-hover:text-[#7b66ff] ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <div>
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>GitHub</div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Em breve</div>
                </div>
              </a>
            </div>

            {/* Response Time Badge */}
            <div className={`flex items-center gap-2.5 text-xs font-mono p-3 rounded-xl border ${
              isDark 
                ? 'text-slate-400 bg-[#14102c] border-[#332a68]' 
                : 'text-slate-600 bg-slate-50 border-slate-200'
            }`}>
              <Clock className="w-4 h-4 text-[#7b66ff]" />
              <span>Tempo médio de resposta: <strong>menos de 2 horas</strong></span>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 backdrop-blur-xl border ${
            isDark 
              ? 'bg-[#14102c] border-[#332a68] shadow-md' 
              : 'bg-white border-[#dedee2] shadow-sm'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={formData.name}
                      onChange={handleNameChange}
                      onBlur={() => handleBlur('name')}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all border focus:outline-none focus:ring-1 ${
                        formErrors.name && touched.name
                          ? 'border-red-500 bg-red-950/20 text-white focus:border-red-500 focus:ring-red-500'
                          : isDark 
                            ? 'bg-[#0c081e] border-[#332a68] text-white placeholder-slate-500 focus:border-[#7b66ff] focus:ring-[#7b66ff]' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#673de6] focus:ring-[#673de6]'
                      }`}
                    />
                    {touched.name && formErrors.name && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <span>•</span> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Seu E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: carlos@empresa.com"
                      value={formData.email}
                      onChange={handleEmailChange}
                      onBlur={() => handleBlur('email')}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all border focus:outline-none focus:ring-1 ${
                        formErrors.email && touched.email
                          ? 'border-red-500 bg-red-950/20 text-white focus:border-red-500 focus:ring-red-500'
                          : isDark 
                            ? 'bg-[#0c081e] border-[#332a68] text-white placeholder-slate-500 focus:border-[#7b66ff] focus:ring-[#7b66ff]' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#673de6] focus:ring-[#673de6]'
                      }`}
                    />
                    {touched.email && formErrors.email && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <span>•</span> {formErrors.email}
                      </p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone / WhatsApp */}
                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      WhatsApp / Telefone (somente números)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="(**)*****-****"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all border focus:outline-none focus:ring-1 ${
                        formErrors.phone && touched.phone
                          ? 'border-red-500 bg-red-950/20 text-white focus:border-red-500 focus:ring-red-500'
                          : isDark 
                            ? 'bg-[#0c081e] border-[#332a68] text-white placeholder-slate-500 focus:border-[#7b66ff] focus:ring-[#7b66ff]' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#673de6] focus:ring-[#673de6]'
                      }`}
                    />
                    {touched.phone && formErrors.phone && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <span>•</span> {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Tipo de Projeto
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all border focus:outline-none focus:ring-1 ${
                        isDark 
                          ? 'bg-[#0c081e] border-[#332a68] text-white focus:border-[#7b66ff] focus:ring-[#7b66ff]' 
                          : 'bg-white border-slate-300 text-slate-900 focus:border-[#673de6] focus:ring-[#673de6]'
                      }`}
                    >
                      <option value="Desenvolvimento de Sites">Desenvolvimento de Sites</option>
                      <option value="Sistemas Web & SaaS">Sistemas Web & SaaS</option>
                      <option value="Aplicativos Mobile (iOS/Android)">Aplicativos Mobile (iOS/Android)</option>
                      <option value="Dashboards & Business Intelligence">Dashboards & BI</option>
                      <option value="Bancos de Dados & Cloud">Bancos de Dados & Cloud</option>
                      <option value="Soluções com Inteligência Artificial">Soluções com IA</option>
                      <option value="Outro Projeto">Outro Projeto / Consultoria</option>
                    </select>
                  </div>

                </div>

                {/* Subject */}
                <div>
                  <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Assunto
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Novo site institucional com painel admin"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all border focus:outline-none focus:ring-1 ${
                      isDark 
                        ? 'bg-[#0c081e] border-[#332a68] text-white placeholder-slate-500 focus:border-[#7b66ff] focus:ring-[#7b66ff]' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#673de6] focus:ring-[#673de6]'
                    }`}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Detalhes do Projeto / Mensagem *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva seu projeto, prazos desejados, funcionalidades prioritárias..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all resize-none border focus:outline-none focus:ring-1 ${
                      isDark 
                        ? 'bg-[#0c081e] border-[#332a68] text-white placeholder-slate-500 focus:border-[#7b66ff] focus:ring-[#7b66ff]' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#673de6] focus:ring-[#673de6]'
                    }`}
                  />
                </div>

                {/* Submit Action Bar */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Enviar direto no WhatsApp</span>
                  </button>
                </div>

              </form>
          </div>

        </div>

      </div>
    </section>
  );
};

